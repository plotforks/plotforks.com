// Consistency audit for every stories/*-journey folder.
// Answers: does each run end where it should, is every chapter/choice/variant/beat reachable,
// does any ending rule shadow a later one, and does the "Chapter X of Y" label stay coherent.
// Usage: node tools/consistency.js
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..', 'stories');
let bad = 0;
for (const d of fs.readdirSync(root).filter(d => fs.statSync(path.join(root, d)).isDirectory())){
  const dir = path.join(root, d), all = fs.readdirSync(dir).filter(f => f.endsWith('.js'));
  const jid = /JOURNEYS\["([^"]+)"\]/.exec(fs.readFileSync(path.join(dir, 'journey.js'), 'utf8'))[1];
  const files = ['journey.js', ...all.filter(f => /^(ch|n\d)/.test(f)).sort(), 'endings.js'];
  const ctx = {window: {}}; vm.createContext(ctx);
  for (const f of files) vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), ctx, {filename: f});
  const J = ctx.window.JOURNEYS[jid];
  console.log('=== ' + jid + ' ===');
  bad += audit(J);
  console.log('');
}
process.exit(bad ? 1 : 0);

function audit(J){
  const clamp = n => Math.max(0, Math.min(100, n));
  const problems = [], notes = [];
  const chapters = J.chapters.slice().sort((a, b) => a.n - b.n);
  const ns = [...new Set(chapters.map(c => c.n))].sort((a, b) => a - b);
  const total = ns.length;
  const scoreKeys = new Set(Object.keys(J.start));
  function ev(w, s){
    if (!w) return true;
    return String(w).split('&&').map(x => x.trim()).filter(Boolean).every(t => {
      let m = t.match(/^(\w+)\s*(>=|<=|==|<|>)\s*(-?\d+)$/);
      if (m){
        const v = s.scores[m[1]], n = +m[3];
        if (v === undefined) return false;
        return {'>=': v >= n, '<=': v <= n, '==': v === n, '<': v < n, '>': v > n}[m[2]];
      }
      if (t[0] === '!') return !s.flags.has(t.slice(1));
      return s.flags.has(t);
    });
  }
  function next(st, afterN){
    for (const n of ns.filter(n => n > afterN)){
      const hit = chapters.filter(c => c.n === n).find(c => ev(c.when, st));
      if (hit) return hit;
    }
    return null;
  }

  // --- 1. structure -------------------------------------------------------
  for (let i = 0; i < ns.length; i++){
    if (ns[i] !== i + 1){ problems.push('chapter numbers are not 1..' + total + ': got ' + ns.join(',')); break; }
  }
  const openGroups = [], gatedGroups = [];
  ns.forEach(n => {
    const g = chapters.filter(c => c.n === n);
    if (g.some(c => !c.when)) openGroups.push(n);
    else gatedGroups.push(n + '  ' + g.map(c => c.id + ' when:' + c.when).join('  |  '));
    const open = g.filter(c => !c.when);
    if (open.length > 1) problems.push('n:' + n + ' has ' + open.length + ' ungated chapters (' + open.map(c => c.id).join(', ') + '); only the first can ever play');
    const openIdx = g.findIndex(c => !c.when);
    if (openIdx > -1 && openIdx < g.length - 1) problems.push('n:' + n + ': ' + g[openIdx].id + ' is ungated but listed before ' + g.slice(openIdx + 1).map(c => c.id).join(', ') + ', which can therefore never play');
  });
  const lastN = ns[ns.length - 1];
  // A fully gated group is still exhaustive when two of its chapters carry complementary gates ("x" and "!x").
  const exhaustive = n => {
    const g = chapters.filter(c => c.n === n);
    if (g.some(c => !c.when)) return true;
    const w = g.map(c => String(c.when).trim());
    return w.some(a => !a.startsWith('!') && w.includes('!' + a));
  };
  if (!exhaustive(lastN)) problems.push('the LAST step n:' + lastN + ' is fully gated with no complementary pair: a run can finish one chapter early');

  // --- 2. flags -----------------------------------------------------------
  const setFlags = new Map(), readFlags = new Set();
  chapters.forEach(c => c.choices.forEach(ch => (ch.flags || []).forEach(f => setFlags.set(f, (setFlags.get(f) || 0) + 1))));
  const collect = w => String(w || '').split('&&').map(t => t.trim().replace(/^!/, '')).forEach(t => {
    if (/^[A-Za-z]\w*$/.test(t) && !scoreKeys.has(t)) readFlags.add(t);
  });
  chapters.forEach(c => {
    collect(c.when);
    (c.setup.variants || []).forEach(v => collect(v.when));
    c.choices.forEach(ch => (ch.beats || []).forEach(b => collect(b.when)));
  });
  (J.endings || []).forEach(e => collect(e.when));
  [...setFlags.keys()].filter(f => !readFlags.has(f)).forEach(f => notes.push('flag "' + f + '" is set but never read by any when: (badges in index.html are checked separately)'));

  // --- 3. walks -----------------------------------------------------------
  let seed = 20260920;
  const rnd = () => {
    seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const SAMPLES = 150000;
  const playedCh = new Map(), playedChoice = new Set(), playedVariant = new Set(), playedBeat = new Set();
  const lenHist = new Map(), lastHist = new Map(), skipHist = new Map(), endHist = new Map();
  for (let w = 0; w < SAMPLES; w++){
    const st = {scores: Object.assign({}, J.start), flags: new Set()};
    let after = 0, ch, len = 0, endedAt = 0;
    const playedNs = [];
    while ((ch = next(st, after))){
      len++; endedAt = ch.n; playedNs.push(ch.n);
      playedCh.set(ch.id, (playedCh.get(ch.id) || 0) + 1);
      playedVariant.add(ch.id + '#' + (ch.setup.variants || []).findIndex(v => ev(v.when, st)));
      const pick = ch.choices[Math.floor(rnd() * ch.choices.length)];
      playedChoice.add(ch.id + '.' + pick.id);
      Object.entries(pick.effects || {}).forEach(([k, v]) => st.scores[k] = clamp((st.scores[k] || 0) + v));
      (pick.flags || []).forEach(f => st.flags.add(f));
      (pick.beats || []).forEach((b, i) => { if (ev(b.when, st)) playedBeat.add(ch.id + '.' + pick.id + '#' + i); });
      after = ch.n;
    }
    const skipped = ns.filter(n => !playedNs.includes(n)).join(',') || '(none)';
    lenHist.set(len, (lenHist.get(len) || 0) + 1);
    lastHist.set(endedAt, (lastHist.get(endedAt) || 0) + 1);
    skipHist.set(skipped, (skipHist.get(skipped) || 0) + 1);
    const e = (J.endings || []).find(e => ev(e.when, st));
    endHist.set(e ? e.id + (e.fallback ? ' (FALLBACK)' : '') : 'NONE', (endHist.get(e ? e.id + (e.fallback ? ' (FALLBACK)' : '') : 'NONE') || 0) + 1);
  }
  chapters.filter(c => !playedCh.has(c.id)).forEach(c => problems.push('chapter ' + c.id + ' (n:' + c.n + ') is NEVER reached in ' + SAMPLES + ' walks'));
  chapters.forEach(c => {
    c.choices.forEach(x => { if (!playedChoice.has(c.id + '.' + x.id)) problems.push('choice ' + c.id + '.' + x.id + ' never taken'); });
    (c.setup.variants || []).forEach((v, i) => { if (!playedVariant.has(c.id + '#' + i)) notes.push('setup variant ' + c.id + '#' + i + ' (when:' + v.when + ') never shown'); });
    c.choices.forEach(x => (x.beats || []).forEach((b, i) => { if (b.when && !playedBeat.has(c.id + '.' + x.id + '#' + i)) notes.push('beat ' + c.id + '.' + x.id + '#' + i + ' (when:' + b.when + ') never shown'); }));
  });

  // --- 3b. conditions that no state can ever satisfy ----------------------
  // Two flags set only by rival choices of one and the same chapter can never both be on,
  // and a score term outside the min..max the journey can reach is dead by arithmetic.
  const owner = {};
  chapters.forEach(c => c.choices.forEach(x => (x.flags || []).forEach(f => (owner[f] = owner[f] || []).push(c.n + '.' + x.id))));
  const rivals = (a, b) => {
    const A = owner[a] || [], B = owner[b] || [];
    return A.length && B.length && A.every(p => B.every(q => p.split('.')[0] === q.split('.')[0] && p !== q));
  };
  let lo = Object.assign({}, J.start), hi = Object.assign({}, J.start);
  const bounds = {};
  ns.forEach(n => {
    bounds[n] = {lo: Object.assign({}, lo), hi: Object.assign({}, hi)};
    const g = chapters.filter(c => c.n === n), nl = {}, nh = {};
    [...scoreKeys].forEach(k => {
      const ds = [].concat(...g.map(c => c.choices.map(x => (x.effects || {})[k] || 0)));
      nl[k] = clamp(lo[k] + Math.min(...ds)); nh[k] = clamp(hi[k] + Math.max(...ds));
    });
    lo = nl; hi = nh;
  });
  bounds.END = {lo: lo, hi: hi};
  const impossible = (w, where, at, own) => {
    if (!w) return;
    const t = String(w).split('&&').map(s => s.trim());
    const pos = t.filter(x => /^[A-Za-z]\w*$/.test(x) && !scoreKeys.has(x));
    const neg = t.filter(x => /^![A-Za-z]/.test(x)).map(x => x.slice(1));
    pos.forEach((p, i) => {
      if (neg.includes(p)) problems.push(where + ' asks for ' + p + ' and !' + p + ' at once');
      pos.slice(i + 1).forEach(q => { if (rivals(p, q)) problems.push(where + ': ' + p + ' and ' + q + ' are rival choices in one chapter, never both on'); });
      const src = owner[p] ? Math.min(...owner[p].map(s => +s.split('.')[0])) : null;
      if (src !== null && at !== null && (own ? src > at : src >= at)) problems.push(where + ' reads flag "' + p + '", ' + (src === at ? "which is set only by that same chapter, by its own choices, so the setup can never see it" : 'first set at step n:' + src + ', later than n:' + at));
    });
    const b = bounds[at === null ? 'END' : at];
    if (!b) return;
    t.forEach(x => {
      const m = x.match(/^(\w+)\s*(>=|<=|==|<|>)\s*(-?\d+)$/);
      if (!m || !scoreKeys.has(m[1])) return;
      const v = +m[3], L = b.lo[m[1]], H = b.hi[m[1]];
      const dead = {'>=': H < v, '>': H <= v, '<=': L > v, '<': L >= v, '==': v < L || v > H}[m[2]];
      if (dead) problems.push(where + ': ' + x + ' is impossible, ' + m[1] + ' can only be ' + L + '..' + H + ' there');
    });
  };
  chapters.forEach(c => {
    impossible(c.when, 'chapter ' + c.id + ' gate', c.n);
    (c.setup.variants || []).forEach((v, i) => impossible(v.when, 'setup variant ' + c.id + '#' + i, c.n));
    c.choices.forEach(x => (x.beats || []).forEach((b, i) => impossible(b.when, 'beat ' + c.id + '.' + x.id + '#' + i, c.n, true)));
  });
  (J.endings || []).forEach(e => impossible(e.when, 'ending ' + e.id, null));

  // --- 4. endings ---------------------------------------------------------
  const terms = e => new Set(String(e.when || '').split('&&').map(t => t.trim()).filter(Boolean));
  (J.endings || []).forEach((e, i) => {
    if (e.fallback) return;
    for (let k = 0; k < i; k++){
      if (J.endings[k].fallback) continue;
      const a = terms(J.endings[k]), b = terms(e);
      if (a.size && [...a].every(t => b.has(t))) problems.push('ending "' + e.id + '" can never fire: earlier "' + J.endings[k].id + '" (' + (J.endings[k].when || '') + ') already matches everything it asks for');
    }
  });
  const lastE = (J.endings || [])[J.endings.length - 1];
  if (!lastE || !lastE.fallback || lastE.when) problems.push('the last ending is not an unconditional fallback');

  // --- 5. report ----------------------------------------------------------
  const pct = v => (100 * v / SAMPLES).toFixed(2) + '%';
  console.log('steps: ' + total + ' (n ' + ns[0] + '..' + lastN + ')   chapter files: ' + chapters.length + '   endings: ' + (J.endings || []).filter(e => !e.fallback).length + ' findable + ' + (J.endings || []).filter(e => e.fallback).length + ' fallback');
  console.log('conditional steps:' + (gatedGroups.length ? '\n    n:' + gatedGroups.join('\n    n:') : ' none'));
  console.log('chapters played per run: ' + [...lenHist].sort((a, b) => a[0] - b[0]).map(([k, v]) => k + ':' + pct(v)).join('  '));
  console.log('run ends after step:    ' + [...lastHist].sort((a, b) => a[0] - b[0]).map(([k, v]) => 'n' + k + ':' + pct(v)).join('  '));
  console.log('steps skipped:          ' + [...skipHist].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([k, v]) => '{' + k + '} ' + pct(v)).join('  '));
  console.log('endings:                ' + [...endHist].sort((a, b) => b[1] - a[1]).map(([k, v]) => k + ' ' + pct(v)).join('  '));
  if (notes.length) console.log('NOTES:\n  ' + [...new Set(notes)].join('\n  '));
  console.log('PROBLEMS: ' + (problems.length ? '\n  ' + [...new Set(problems)].join('\n  ') : 'none'));
  return problems.length;
}
