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
    const files = ['journey.js', ...all.filter(f => /^ch/.test(f)).sort(), 'endings.js'];
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
let total = 0, canonEnding = null;
function next(st, afterN){
  for (const n of ns.filter(n => n > afterN)){
    const hit = chapters.filter(c => c.n === n).find(c => ev(c.when, st));
    if (hit) return hit;
  }
  return null;
}
function walk(st, afterN, allCanon){
  const ch = next(st, afterN);
  if (!ch){
    const e = J.endings.find(e => ev(e.when, st));
    const key = e ? e.id + (e.fallback ? ' (FALLBACK)' : '') : 'NONE';
    counts[key] = (counts[key] || 0) + 1; total++;
    if (allCanon) canonEnding = `${key} [${Object.entries(st.scores).map(([k, v]) => k + '=' + v).join(' ')}] flags=${[...st.flags].join(',')}`;
    return;
  }
  for (const c of ch.choices){
    const s = {scores: Object.assign({}, st.scores), flags: new Set(st.flags)};
    Object.entries(c.effects || {}).forEach(([k, v]) => s.scores[k] = clamp((s.scores[k] || 0) + v));
    (c.flags || []).forEach(f => s.flags.add(f));
    const vis = (c.beats || []).filter(b => ev(b.when, s)).length;
    const bk = `${ch.id}.${c.id}:${vis}`; beatCounts[bk] = (beatCounts[bk] || 0) + 1;
    if (vis < 2) emptyBeatRuns.push(bk);
    if (c.exit){ const k = 'EXIT ' + c.exit; counts[k] = (counts[k] || 0) + 1; total++; continue; }
    walk(s, ch.n, allCanon && c.id === ch.canon);
  }
}
walk({scores: Object.assign({}, J.start), flags: new Set()}, 0, true);
console.log(`Paths: ${total}`);
Object.entries(counts).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${k}: ${v}`));
const unreached = J.endings.filter(e => !e.fallback && !counts[e.id]).map(e => e.id);
const exitsUnreached = Object.keys(J.exits).filter(k => !counts['EXIT ' + k]);
console.log('Findable: ' + (J.endings.filter(e => !e.fallback).length + Object.keys(J.exits).length));
console.log('Unreached endings: ' + (unreached.join(', ') || 'none') + ' | unreached exits: ' + (exitsUnreached.join(', ') || 'none'));
console.log('Fallback hits: ' + Object.keys(counts).filter(k => k.includes('FALLBACK')).length);
console.log('All-canon ending: ' + canonEnding);
console.log('Beat-count keys with <2 visible beats: ' + [...new Set(emptyBeatRuns)].join(', '));
console.log('Problems: ' + (problems.length ? '\n  ' + [...new Set(problems)].join('\n  ') : 'none'));
