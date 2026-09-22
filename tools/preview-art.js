// Renders a few scenes to a PNG contact sheet so new art can actually be looked at before it ships.
// Usage: node tools/preview-art.js out.png  "set:cast=pose,cast=pose"  ["set:..." ...]
// Example: node tools/preview-art.js C:/tmp/a.png "nursinghome:hector=sit,walt=stand" "office:tuco=stand"
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), vm = require('vm'), cp = require('child_process');
const ROOT = path.join(__dirname, '..');
/* Same browser list as tools/build.js: any Chromium, Brave first, PF_BROWSER overrides. */
const EDGE = [
  process.env.PF_BROWSER || '',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
  'C:\\Program Files (x86)\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
].filter(Boolean).find(fs.existsSync);
if (!EDGE) { console.error('Edge not found'); process.exit(2); }

// Edge writes nothing when --screenshot is given a forward-slash path on Windows, so normalize it.
const out = process.argv[2] ? path.resolve(process.argv[2]) : '';
const specs = process.argv.slice(3);
if (!out || !specs.length) { console.error('usage: node tools/preview-art.js out.png "set:cast=pose,..." ...'); process.exit(2); }

const sandbox = { window: {}, module: { exports: {} }, console };
sandbox.window.window = sandbox.window;
vm.createContext(sandbox);
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
[...html.matchAll(/<script src="(stories\/[^"]+)"/g)].forEach(m => vm.runInContext(fs.readFileSync(path.join(ROOT, m[1]), 'utf8'), sandbox, { filename: m[1] }));
require('./extract')().forEach(c => vm.runInContext(c, sandbox, { filename: 'index.html(inline)' }));
const buildScene = sandbox.module.exports.buildScene;

const scenes = specs.map(spec => {
  const [set, rest] = spec.split(':');
  const scene = { set: set, cast: {} };
  (rest || '').split(',').filter(Boolean).forEach(pair => {
    const [who, pose] = pair.split('=');
    if (who === 'fx') (scene.fx = scene.fx || []).push(pose);
    else scene.cast[who] = pose;
  });
  return scene;
});

const cells = scenes.map(sc => {
  let svg;
  try { svg = buildScene(sc); } catch (e) { console.log('ERROR ' + JSON.stringify(sc) + ': ' + e.message); svg = ''; }
  const label = sc.set + '  ' + Object.entries(sc.cast).map(([k, v]) => k + ':' + v).join(' ') + (sc.fx ? '  fx:' + sc.fx.join('+') : '');
  return '<div><div style="color:#EEF0E6;font:12px ui-monospace,monospace;padding:4px 6px">' + label +
    '</div><svg viewBox="0 0 480 300" width="480" height="300">' + svg + '</svg></div>';
});
const cols = Math.min(2, cells.length);
const page = '<!doctype html><html><head><meta charset="utf-8"></head><body style="margin:0;background:#11190F;display:grid;grid-template-columns:repeat(' +
  cols + ',480px)">' + cells.join('') + '</body></html>';

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'pf-art-'));
const file = path.join(tmp, 'c.html');
fs.writeFileSync(file, page);
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'pf-edge-'));
const w = cols * 480 + 8, h = Math.ceil(cells.length / cols) * 326 + 8;
const HEADLESS = process.env.PF_HEADLESS || '--headless=old';
const r = cp.spawnSync(EDGE, [HEADLESS, '--disable-gpu', '--hide-scrollbars', '--no-first-run',
  '--user-data-dir=' + profile, '--screenshot=' + out, '--window-size=' + w + ',' + h,
  '--virtual-time-budget=4000', 'file:///' + file.split(path.sep).join('/')], { encoding: 'utf8', timeout: 90000 });
if (!fs.existsSync(out)) console.log('edge stderr: ' + String(r.stderr || '(none)').split('\n').filter(l => !/fallback_task_provider|Language Detection/.test(l)).join('\n').slice(0, 1200));
/* Edge may still hold the profile directory; leaving it behind is harmless and it lives in the temp folder. */
try { fs.rmSync(tmp, { recursive: true, force: true }); } catch (e) {}
try { fs.rmSync(profile, { recursive: true, force: true }); } catch (e) {}
console.log('edge status ' + r.status + (r.error ? ' (' + r.error.code + ')' : '') + ' -> ' + (fs.existsSync(out) ? fs.statSync(out).size + ' bytes' : 'MISSING'));
