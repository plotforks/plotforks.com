// Dev tool: renders a contact sheet of scenes (greedy cover of every set / cast pose / fx) to an HTML file for a headless screenshot.
// usage: node tools/preview.js out.html [filterRegex]   (filter matches set, cast:pose or fx names to force-include)
const fs = require('fs'), path = require('path'), vm = require('vm');
const extract = require('./extract');
const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const sandbox = { window: {}, module: { exports: {} }, console };
sandbox.window.window = sandbox.window; vm.createContext(sandbox);
[...html.matchAll(/<script src="(stories\/[^"]+)"/g)].forEach(m => vm.runInContext(fs.readFileSync(path.join(root, m[1]), 'utf8'), sandbox));
extract().forEach(c => vm.runInContext(c, sandbox));
const { buildScene } = sandbox.module.exports;
const scenes = [];
const add = (sc, cap) => sc && scenes.push({ sc, cap });
Object.values(sandbox.window.JOURNEYS).forEach(j => j.chapters.forEach(ch => {
  add(ch.setup.scene, ch.id + ' setup'); (ch.setup.variants || []).forEach(v => v.scene && add(v.scene, ch.id + ' var'));
  ch.choices.forEach(c => (c.beats || []).forEach((b, i) => add(b.scene, `${ch.id}/${c.id}/${i}`)));
}));
const keys = s => [s.set, ...Object.entries(s.cast || {}).map(([n, p]) => n + ':' + p), ...(s.fx || []).map(f => 'fx:' + f)];
const need = new Set(); scenes.forEach(x => keys(x.sc).forEach(k => need.add(k)));
const chosen = [];
while (need.size){
  let best = null, bs = 0;
  scenes.forEach(x => { const n = keys(x.sc).filter(k => need.has(k)).length; if (n > bs){ bs = n; best = x; } });
  if (!best) break; chosen.push(best); keys(best.sc).forEach(k => need.delete(k));
}
const filter = process.argv[3] ? new RegExp(process.argv[3]) : null;
const list = filter ? scenes.filter(x => keys(x.sc).some(k => filter.test(k))) : chosen;
const page = Number(process.argv[4] || 0), per = 12;
const cards = list.slice(page * per, page * per + per).map(x => `<div class="c"><svg viewBox="0 0 480 300" width="440" height="275">${buildScene(x.sc)}</svg><div>${x.cap}: ${keys(x.sc).join(', ')}</div></div>`).join('');
const css = fs.readFileSync(path.join(root, 'index.html'), 'utf8').match(/<style>([\s\S]*?)<\/style>/)[1];
fs.writeFileSync(process.argv[2], `<!doctype html><meta charset="utf-8"><style>${css}body{padding:8px;background:#222}.c{display:inline-block;margin:4px;font:10px monospace;color:#ccc;width:440px;vertical-align:top}</style><body>${cards}`);
console.log('scenes in sheet:', list.length);
