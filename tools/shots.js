// Renders real screenshots of the app for store pages (itch.io, press, Reddit).
// Usage: node tools/shots.js <outDir>
// Copies dist/ to a short temp path, points the counter URL at a dead host so the shots never touch the live stats,
// and screenshots the app on each journey. Needs dist/ from `node tools/build.js`.
'use strict';
const fs = require('fs'), path = require('path'), cp = require('child_process');
const ROOT = path.join(__dirname, '..'), DIST = path.join(ROOT, 'dist');
const OUT = path.resolve(process.argv[2] || path.join(ROOT, 'dist-itch', 'shots'));
const BROWSER = [
  process.env.PF_BROWSER || '',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
].filter(Boolean).find(fs.existsSync);
if (!BROWSER) { console.error('no Chromium found'); process.exit(2); }

const WORK = 'C:\\pf-shots';
fs.rmSync(WORK, { recursive: true, force: true });
fs.cpSync(DIST, WORK, { recursive: true });
/* Never let a screenshot run register as a visit. */
(function walk(d){
  fs.readdirSync(d, { withFileTypes: true }).forEach(e => {
    const f = path.join(d, e.name);
    if (e.isDirectory()) return walk(f);
    if (!/\.html$/.test(e.name)) return;
    const t = fs.readFileSync(f, 'utf8')
      .split('https://plotforks-counter.dimos-chatzinikolaou.workers.dev').join('https://counter.invalid')
      .replace(/<script defer src="https:\/\/static\.cloudflareinsights\.com[^>]*><\/script>/g, '');
    fs.writeFileSync(f, t);
  });
})(WORK);

fs.mkdirSync(OUT, { recursive: true });
const shots = [
  { name: 'app-breaking-bad.png', url: 'index.html', w: 1100, h: 2600 },
  { name: 'app-matrix.png', url: 'index.html?journey=matrix&chapter=oracle', w: 1100, h: 2600 },
  { name: 'app-phone.png', url: 'index.html', w: 420, h: 2000 }
];
for (const s of shots) {
  const prof = path.join(WORK, 'prof-' + s.name);
  const out = path.join(OUT, s.name);
  const r = cp.spawnSync(BROWSER, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
    '--user-data-dir=' + prof, '--screenshot=' + out, '--window-size=' + s.w + ',' + s.h,
    '--virtual-time-budget=7000', 'file:///' + path.join(WORK, s.url).split(path.sep).join('/')],
    { stdio: 'ignore', timeout: 120000 });
  console.log(s.name.padEnd(24) + (fs.existsSync(out) ? fs.statSync(out).size + ' bytes' : 'MISSING') +
    (r.error ? '  (' + r.error.code + ')' : ''));
}
console.log('raw shots in ' + OUT);
