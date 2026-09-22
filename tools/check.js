// Harness: loads every story file into a fake window, checks every scene against SUPPORTED, and runs buildScene on all of them.
const fs = require('fs'), path = require('path'), vm = require('vm');
const extract = require('./extract');
const root = path.join(__dirname, '..');
const files = [];
(function walk(d){ fs.readdirSync(d).sort().forEach(f => { const p = path.join(d, f); fs.statSync(p).isDirectory() ? walk(p) : f.endsWith('.js') && files.push(p); }); })(path.join(root, 'stories'));
const sandbox = { window: {}, module: { exports: {} }, console };
sandbox.window.window = sandbox.window;
vm.createContext(sandbox);
// load in the same order as index.html so shared arrays behave identically
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const order = [...html.matchAll(/<script src="(stories\/[^"]+)"/g)].map(m => path.join(root, m[1]));
const missing = files.filter(f => !order.includes(f));
if (missing.length){ console.error('Story files not loaded by index.html:', missing.map(f => path.relative(root, f))); process.exitCode = 1; }
order.forEach(f => vm.runInContext(fs.readFileSync(f, 'utf8'), sandbox, { filename: f }));
extract().forEach(code => vm.runInContext(code, sandbox, { filename: 'index.html(inline)' }));
const SUPPORTED = sandbox.module.exports, buildScene = SUPPORTED.buildScene;
let scenes = 0, problems = [];
function check(scene, where){
  if (!scene) return;
  scenes++;
  if (!SUPPORTED.sets.includes(scene.set)) problems.push(`${where}: unknown set "${scene.set}"`);
  Object.keys(scene.cast || {}).forEach(n => {
    if (!SUPPORTED.cast[n]) problems.push(`${where}: unknown cast "${n}"`);
    else if (!SUPPORTED.cast[n].includes(scene.cast[n])) problems.push(`${where}: unknown pose "${n}:${scene.cast[n]}"`);
  });
  (scene.fx || []).forEach(f => { if (!SUPPORTED.fx.includes(f)) problems.push(`${where}: unknown fx "${f}"`); });
  try {
    const svg = buildScene(scene);
    if (typeof svg !== 'string' || svg.length < 50) problems.push(`${where}: empty svg`);
    if (/undefined|NaN/.test(svg)) problems.push(`${where}: svg contains undefined/NaN`);
    /* A cast name that is in SUPPORTED but missing from the engine's draw order is skipped in silence and the
       scene still renders, so compare against the same scene with that person removed: identical means not drawn. */
    Object.keys(scene.cast || {}).forEach(n => {
      const without = Object.assign({}, scene, { cast: Object.assign({}, scene.cast) });
      delete without.cast[n];
      try { if (buildScene(without) === svg) problems.push(`${where}: "${n}" is never drawn (missing from DRAW_ORDER / SLOT_PRIORITY?)`); } catch (e) {}
    });
  } catch (e) { problems.push(`${where}: buildScene threw ${e.message}`); }
}
const beats = (bs, w) => (bs || []).forEach((b, i) => check(b.scene, `${w} beat${i}`));
const setup = (s, w) => { if (!s) return; check(s.scene, w + ' setup'); (s.variants || []).forEach((v, i) => check(v.scene, `${w} variant${i}`)); };
const J = sandbox.window.JOURNEYS || {};
Object.keys(J).forEach(id => (J[id].chapters || []).forEach(ch => {
  setup(ch.setup, `${id}/${ch.id}`);
  ch.choices.forEach(c => beats(c.beats, `${id}/${ch.id}/${c.id}`));
}));
console.log(`scenes checked: ${scenes}, problems: ${problems.length}`);
problems.slice(0, 40).forEach(p => console.log('  ' + p));
if (problems.length) process.exitCode = 1;
