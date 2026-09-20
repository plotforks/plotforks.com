// Path simulation for a plotforks journey.
// Usage: node tools/sim.js                       (runs every stories/*-journey folder)
//        node tools/sim.js <dir> <journeyId> <file1> <file2> ...   (one journey)
const fs = require('fs'), path = require('path'), vm = require('vm');
if (process.argv.length <= 2){
  const cp = require('child_process'), root = path.join(__dirname, '..', 'stories');
  let bad = 0;
  fs.readdirSync(root).filter(d => fs.statSync(path.join(root, d)).isDirectory()).forEach(d => {
    const dir = path.join(root, d), all = fs.readdirSync(dir).filter(f => f.endsWith('.js'));
    const jid = /JOURNEYS\["([^"]+)"\]/.exec(fs.readFileSync(path.join(dir, 'journey.js'), 'utf8'))[1];
    const files = ['journey.js', ...all.filter(f => /^(ch|n\d)/.test(f)).sort(), 'endings.js'];
    console.log('=== ' + jid + ' ===');
    const r = cp.spawnSync(process.execPath, [__filename, dir, jid, ...files], {encoding: 'utf8'});
    process.stdout.write(r.stdout + r.stderr); if (r.status) bad++;
  });
  process.exit(bad ? 1 : 0);
}
const [dir, jid, ...files] = process.argv.slice(2);
const ctx = {window: {}}; vm.createContext(ctx);
for (const f of files) vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), ctx, {filename: f});
const J = ctx.window.JOURNEYS[jid];
const clamp = n => Math.max(0, Math.min(100, n));
const problems = [];
const knownScores = new Set(Object.keys(J.start));
const setFlags = new Set();
J.chapters.forEach(c => c.choices.forEach(ch => (ch.flags || []).forEach(f => setFlags.add(f))));
function checkWhen(w, where){
  if (!w) return;
  if (w.includes('||')) problems.push(`|| in ${where}`);
  w.split('&&').map(s => s.trim()).forEach(t => {
    let m = t.match(/^(\w+)\s*(>=|<=|==|<|>)\s*(-?\d+)$/);
    if (m){ if (!knownScores.has(m[1])) problems.push(`unknown score ${m[1]} in ${where}`); return; }
    m = t.match(/^!?(\w+)$/);
    if (m){ if (!setFlags.has(m[1])) problems.push(`unknown flag ${m[1]} in ${where}`); return; }
    problems.push(`bad term "${t}" in ${where}`);
  });
}
function ev(w, s){
  if (!w) return true;
  return w.split('&&').map(x => x.trim()).filter(Boolean).every(t => {
    let m = t.match(/^(\w+)\s*(>=|<=|==|<|>)\s*(-?\d+)$/);
    if (m){ const v = s.scores[m[1]], n = +m[3];
      return {'>=': v >= n, '<=': v <= n, '==': v === n, '<': v < n, '>': v > n}[m[2]]; }
    if (t[0] === '!') return !s.flags.has(t.slice(1));
    return s.flags.has(t);
  });
}
const chapters = J.chapters.slice().sort((a, b) => a.n - b.n);
const ns = [...new Set(chapters.map(c => c.n))].sort((a, b) => a - b);
// static checks
chapters.forEach(c => {
  checkWhen(c.when, `chapter ${c.id}`);
  if (!c.canon) problems.push(`no canon on ${c.id}`);
  if (c.choices.length !== 3) problems.push(`${c.id} has ${c.choices.length} choices`);
  (c.setup.variants || []).forEach((v, i) => checkWhen(v.when, `${c.id} variant ${i}`));
  c.choices.forEach(ch => {
    if (ch.exit && !J.exits[ch.exit]) problems.push(`missing exit ${ch.exit}`);
    (ch.beats || []).forEach((b, i) => checkWhen(b.when, `${c.id}.${ch.id} beat ${i}`));
    Object.keys(ch.effects || {}).forEach(k => { if (!knownScores.has(k)) problems.push(`unknown effect ${k} in ${c.id}.${ch.id}`); });
  });
});
J.endings.forEach(e => checkWhen(e.when, `ending ${e.id}`));
const meterKey = J.meterScore || 'darkness';
const counts = {}, beatCounts = {}, emptyBeatRuns = [];
let canonEnding = null, total = 0;
function next(st, afterN){
  for (const n of ns.filter(n => n > afterN)){
    const hit = chapters.filter(c => c.n === n).find(c => ev(c.when, st));
    if (hit) return hit;
  }
  return null;
}
/* Randomised search instead of full enumeration: with 19 chapters there are more than a billion paths.
   Phase 1: SAMPLES random walks. Phase 2: for every ending still unreached, more walks that favour choices setting
   the flags (and raising the scores) its condition asks for. Every ending found is reachable by construction;
   an ending reported unreached after both phases needs a human look at its rule. Seeded, so runs repeat exactly. */
let seed = 20260920;
const rnd = () => { seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const SAMPLES = 300000, GOAL_SAMPLES = 60000;
const startState = () => ({scores: Object.assign({}, J.start), flags: new Set()});
function stepInto(st, c){
  Object.entries(c.effects || {}).forEach(([k, v]) => st.scores[k] = clamp((st.scores[k] || 0) + v));
  (c.flags || []).forEach(f => st.flags.add(f));
}
function randomWalk(weight){
  const st = startState(); let after = 0, ch;
  while ((ch = next(st, after))){
    let pick;
    if (weight){
      const w = ch.choices.map(c => weight(c)), sum = w.reduce((a, b) => a + b, 0);
      let r = rnd() * sum; pick = ch.choices[0];
      for (let k = 0; k < w.length; k++){ if ((r -= w[k]) <= 0){ pick = ch.choices[k]; break; } }
    } else pick = ch.choices[Math.floor(rnd() * ch.choices.length)];
    const s = {scores: Object.assign({}, st.scores), flags: new Set(st.flags)};
    stepInto(s, pick);
    const vis = (pick.beats || []).filter(b => ev(b.when, s)).length;
    if (vis < 2) emptyBeatRuns.push(`${ch.id}.${pick.id}:${vis}`);
    if (pick.exit){ counts['EXIT ' + pick.exit] = (counts['EXIT ' + pick.exit] || 0) + 1; total++; return; }
    Object.assign(st.scores, s.scores); st.flags = s.flags; after = ch.n;
  }
  const e = J.endings.find(e => ev(e.when, st));
  const key = e ? e.id + (e.fallback ? ' (FALLBACK)' : '') : 'NONE';
  counts[key] = (counts[key] || 0) + 1; total++;
}
for (let n = 0; n < SAMPLES; n++) randomWalk();
J.endings.filter(e => !e.fallback && !counts[e.id]).forEach(e => {
  const want = new Set(), wantScore = {};
  String(e.when || '').split('&&').map(x => x.trim()).filter(Boolean).forEach(t => {
    let m = t.match(/^(\w+)\s*(>=|>)\s*(-?\d+)$/); if (m){ wantScore[m[1]] = 1; return; }
    m = t.match(/^(\w+)\s*(<=|<)\s*(-?\d+)$/); if (m){ wantScore[m[1]] = -1; return; }
    m = t.match(/^!?(\w+)$/); if (m && t[0] !== '!') want.add(m[1]);
  });
  /* Flags that earlier endings test for would shadow this one, so steer away from them. */
  const blockers = new Set();
  J.endings.slice(0, J.endings.indexOf(e)).forEach(x => String(x.when || '').split('&&').map(t => t.trim()).forEach(t => { const m = t.match(/^(\w+)$/); if (m && !want.has(m[1])) blockers.add(m[1]); }));
  for (let n = 0; n < GOAL_SAMPLES && !counts[e.id]; n++){
    randomWalk(c => {
      const f = c.flags || [];
      return (1 + 6 * f.filter(x => want.has(x)).length + 2 * Object.keys(wantScore).filter(k => (c.effects || {})[k] * wantScore[k] > 0).length) * (f.some(x => blockers.has(x)) ? 0.1 : 1);
    });
  }
});
/* One straight walk along every chapter's canon choice, to report the all-canon ending. */
(function(){
  let st = {scores: Object.assign({}, J.start), flags: new Set()}, after = 0, ch;
  while ((ch = next(st, after))){
    const c = ch.choices.find(x => x.id === ch.canon) || ch.choices[0];
    Object.entries(c.effects || {}).forEach(([k, v]) => st.scores[k] = clamp((st.scores[k] || 0) + v));
    (c.flags || []).forEach(f => st.flags.add(f));
    if (c.exit) return;
    after = ch.n;
  }
  const e = J.endings.find(e => ev(e.when, st));
  canonEnding = `${e ? e.id : 'NONE'} [${Object.entries(st.scores).map(([k, v]) => k + '=' + v).join(' ')}] flags=${[...st.flags].join(',')}`;
})();
console.log(`Random walks: ${total}`);
Object.entries(counts).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${k}: ${v}`));
const unreached = J.endings.filter(e => !e.fallback && !counts[e.id]).map(e => e.id);
const exitsUnreached = Object.keys(J.exits).filter(k => !counts['EXIT ' + k]);
console.log('Findable: ' + (J.endings.filter(e => !e.fallback).length + Object.keys(J.exits).length));
console.log('Unreached endings: ' + (unreached.join(', ') || 'none') + ' | unreached exits: ' + (exitsUnreached.join(', ') || 'none'));
console.log('Fallback hits: ' + Object.keys(counts).filter(k => k.includes('FALLBACK')).length);
console.log('All-canon ending: ' + canonEnding);
console.log('Beat-count keys with <2 visible beats: ' + [...new Set(emptyBeatRuns)].join(', '));
console.log('Problems: ' + (problems.length ? '\n  ' + [...new Set(problems)].join('\n  ') : 'none'));
