// Renders the built pages in headless Edge against a mock /funds endpoint and checks what a visitor would see.
// Usage: node tools/test-funds-ui.js      (needs dist/ from `node tools/build.js`; uses Edge, no network)
'use strict';
const fs = require('fs'), path = require('path'), http = require('http'), cp = require('child_process');
const ROOT = path.join(__dirname, '..'), DIST = path.join(ROOT, 'dist');
const EDGE = ['C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'].find(fs.existsSync);
if (!EDGE) { console.log('Edge not found'); process.exit(2); }

let funds = null;                       // what the mock endpoint returns; null = 500
const mock = http.createServer((req, res) => {
  if (req.url === '/funds') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (!funds) { res.statusCode = 500; return res.end('x'); }
    res.setHeader('Content-Type', 'application/json'); return res.end(JSON.stringify(funds));
  }
  res.statusCode = 204; res.end();
});
const os = require('os');
/* Edge's --dump-dom hangs on http pages that keep connections open, but works on file:// pages. So test a copy of dist/
   with the counter URLs pointed at the mock server (CORS "*" allows the file:// origin). */
const TMP = path.join(os.tmpdir(), 'pf-funds-ui');
let mockPort;
function prepare() {
  fs.rmSync(TMP, { recursive: true, force: true });
  fs.cpSync(DIST, TMP, { recursive: true, filter: (src) => !/[\\/]og([\\/]|$)/.test(src) });
  (function walk(d) {
    fs.readdirSync(d, { withFileTypes: true }).forEach((e) => {
      const f = path.join(d, e.name);
      if (e.isDirectory()) return walk(f);
      if (!/\.html$/.test(e.name)) return;
      let t = fs.readFileSync(f, 'utf8');
      t = t.split('https://plotforks-counter.dimos-chatzinikolaou.workers.dev/funds').join('http://127.0.0.1:' + mockPort + '/funds')
           .split('https://plotforks-counter.dimos-chatzinikolaou.workers.dev/e').join('http://127.0.0.1:' + mockPort + '/e');
      fs.writeFileSync(f, t);
    });
  })(TMP);
}
const UD = path.join(os.homedir(), 'pf-edge-funds');
/* Async on purpose: the mock /funds server lives in this process, so a blocking spawnSync would starve it and the page's
   fetch would never be answered. Output goes to a file, not a pipe, because Edge's helper processes keep pipes open. */
async function dom(rel) {
  fs.rmSync(UD, { recursive: true, force: true });
  const url = 'file:///' + path.join(TMP, rel).split(path.sep).join('/');
  const out = path.join(TMP, 'dom.txt');
  const fd = fs.openSync(out, 'w');
  const child = cp.spawn(EDGE, ['--headless=new', '--disable-gpu', '--no-first-run', '--user-data-dir=' + UD, '--virtual-time-budget=6000', '--dump-dom', url], { stdio: ['ignore', fd, 'ignore'] });
  await new Promise((resolve) => {
    const t = setTimeout(() => { try { child.kill(); } catch (e) {} resolve(); }, 45000);
    child.on('exit', () => { clearTimeout(t); resolve(); });
    child.on('error', () => { clearTimeout(t); resolve(); });
  });
  fs.closeSync(fd);
  try { cp.spawnSync('taskkill', ['/F', '/IM', 'msedge.exe'], { stdio: 'ignore' }); } catch (e) {}
  if (process.env.PF_DEBUG) console.log('  [edge] ' + rel + ' bytes=' + fs.statSync(out).size);
  return fs.readFileSync(out, 'utf8');
}
/* The fragment from the element carrying this id up to the end of its section, so nested divs do not cut it short. */
const text = (html, id) => {
  const i = html.indexOf('id="' + id + '"');
  if (i < 0) return null;
  const start = html.lastIndexOf('<', i);
  const closer = html.startsWith('<p', start) ? '</p>' : '</section>';   // the one-line <p> ends at </p>, the block at the end of its section
  const end = html.indexOf(closer, i);
  return html.slice(start, end < 0 ? i + 3000 : end);
};
const isHidden = (frag) => !frag || /^<[^>]*\shidden(=|>|\s)/.test(frag);
let fails = 0;
const ok = (c, m) => { if (!c) { fails++; console.log('FAIL  ' + m); } else console.log('ok    ' + m); };

(async () => {
  await new Promise(r => mock.listen(0, '127.0.0.1', r)); mockPort = mock.address().port;
  prepare();
  const pages = { home: 'index.html', chapter: 'breaking-bad/felina/index.html', ending: 'breaking-bad/ending/felina/index.html' };

  // 1. nothing entered yet
  funds = { currency: 'EUR', since: '', updated: '', received: 0, gifts: 0, spent: 0, left: 0, spending: [] };
  let h = await dom(pages.home);
  ok(h.length > 5000, 'Edge rendered the home page (' + h.length + ' chars)');
  ok(h.includes('id="fundsShort"') && isHidden(text(h, 'fundsShort')), 'empty ledger: home line stays hidden');
  ok(isHidden(text(h, 'fundsFull')), 'empty ledger: home block stays hidden');

  // 2. endpoint down
  funds = null;
  h = await dom(pages.home);
  ok(isHidden(text(h, 'fundsShort')) && isHidden(text(h, 'fundsFull')), 'endpoint 500: nothing shown, no crash');
  ok(h.includes('id="donateRow"') && h.includes('paypal'), 'endpoint 500: donate button still there');

  // 3. real numbers, money left
  funds = { currency: 'EUR', since: '2026-09-01', updated: '2026-09-20', received: 12050, gifts: 9, spent: 1199, left: 10851,
    spending: [{ day: '2026-09-15', cents: 1199, note: 'plotforks.com domain, one year' }, { day: '2026-09-10', cents: 100, note: '<img src=x onerror=alert(1)>' }] };
  h = await dom(pages.home);
  const s = text(h, 'fundsShort'), full = text(h, 'fundsFull');
  ok(!isHidden(s), 'home: open-books line is visible');
  ok(/Open books: €120\.50 received in 9 gifts, €11\.99 spent, €108\.51 left\./.test(s || ''), 'home: line reads correctly  -> ' + ((s || '').replace(/<[^>]+>/g, '').trim()));
  ok(/href="#donate"/.test(s || ''), 'home: line links to the donate section');
  ok(!isHidden(full), 'home: full block visible');
  ok(/<b>€120\.50<\/b>received in 9 gifts/.test(full || '') && /<b>€11\.99<\/b>spent/.test(full || '') && /<b>€108\.51<\/b>left/.test(full || ''), 'home: three figures correct');
  ok(/plotforks\.com domain, one year/.test(full || ''), 'home: spending list shows the note');
  ok(!/<img src=x/.test(h.replace(/&lt;img src=x/g, '')) , 'home: markup in a note is escaped, not executed');
  ok(/counting from 2026-09-01/.test(full || '') && /last updated 2026-09-20/.test(full || ''), 'home: says since when and last update');
  ok(/id="donate"/.test(h), 'home: #donate anchor exists');

  // 4. static pages
  for (const k of ['chapter', 'ending']) {
    h = await dom(pages[k]);
    const t = text(h, 'fundsShort');
    ok(!isHidden(t) && /Open books: €120\.50 received in 9 gifts, €11\.99 spent, €108\.51 left\./.test(t || ''), k + ' page: same line visible');
    ok(/href="\/#donate"/.test(t || ''), k + ' page: Details links to /#donate');
  }

  // 5. overspent (owner paid first)
  funds = { currency: 'EUR', since: '2026-09-15', updated: '2026-09-15', received: 0, gifts: 0, spent: 1199, left: -1199, spending: [{ day: '2026-09-15', cents: 1199, note: 'domain' }] };
  h = await dom(pages.home);
  const o = (text(h, 'fundsShort') || '').replace(/<[^>]+>/g, '');
  ok(/€0\.00 received in 0 gifts, €11\.99 spent, €11\.99 paid by the owner so far/.test(o), 'overspent: says the owner covered it -> ' + o.trim());
  ok(!/-€/.test(text(h, 'fundsFull') || ''), 'overspent: full block never shows a negative "left"');

  // 6. one gift wording
  funds = { currency: 'EUR', since: '2026-09-20', updated: '2026-09-20', received: 500, gifts: 1, spent: 0, left: 500, spending: [] };
  h = await dom(pages.home);
  ok(/received in 1 gift,/.test(text(h, 'fundsShort') || ''), 'singular: "1 gift"');
  ok(!/What the money was spent on/.test(text(h, 'fundsFull') || ''), 'no spending: no empty spending list');

  mock.close(); fs.rmSync(TMP, { recursive: true, force: true });
  console.log(fails ? '\n' + fails + ' FAILED' : '\nall passed');
  process.exit(fails ? 1 : 0);
})();
