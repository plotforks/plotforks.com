/* plotforks-counter: a free, anonymous event counter (Cloudflare Worker + D1).
 *
 *   POST /e            anonymous event from the site (always 204)
 *   GET  /admin        private stats page (asks for the admin key in the browser)
 *   GET  /admin/data   aggregated JSON, needs header X-Key = secret ADMIN_KEY
 *   GET  /             "ok"
 *
 * Stored: only (UTC day, event key, count). No IP, user agent, cookie or referrer is read or kept.
 * Key = type|journey|a|b|source, source is "web" or "itch" (derived from the Origin header).
 */
import { META } from './meta.js';

const ID = /^[A-Za-z0-9_-]{1,40}$/;
const CLICKS = new Set(['donate', 'feedback', 'share', 'itch']);
const MAX_BODY = 300;          // bytes
const MAX_ROWS = 20000;        // abuse cap on distinct keys
const KEEP_DAYS = 35;          // daily rows older than this are folded into day = 'archive'

const utcDay = (d) => (d || new Date()).toISOString().slice(0, 10);
const noContent = () => new Response(null, { status: 204 });

function sourceOf(origin) {
  if (!origin) return null;
  let u;
  try { u = new URL(origin); } catch (e) { return null; }
  if (u.protocol !== 'https:') return null;
  if (u.origin === 'https://plotforks.com' || u.origin === 'https://www.plotforks.com' || u.origin === 'https://plotforks.github.io') return 'web';
  const h = u.hostname;
  if (h === 'itch.io' || h.endsWith('.itch.io') || h.endsWith('.itch.zone')) return 'itch';
  return null;
}

function keyOf(ev, source) {
  if (!ev || typeof ev !== 'object' || Array.isArray(ev)) return null;
  const ok = (v) => typeof v === 'string' && ID.test(v);
  let parts;
  switch (ev.t) {
    case 'start':
    case 'resume':
      if (!ok(ev.j)) return null;
      parts = [ev.t, ev.j]; break;
    case 'choice':
      if (!ok(ev.j) || !ok(ev.c) || !ok(ev.o)) return null;
      parts = ['choice', ev.j, ev.c, ev.o]; break;
    case 'ending':
      if (!ok(ev.j) || !ok(ev.e)) return null;
      parts = ['ending', ev.j, ev.e]; break;
    case 'click':
      if (!ok(ev.w) || !CLICKS.has(ev.w)) return null;
      parts = ['click', ev.w]; break;
    default:
      return null;
  }
  parts.push(source);
  return parts.join('|');
}

async function record(request, env) {
  const source = sourceOf(request.headers.get('Origin'));
  if (!source) return;
  const len = Number(request.headers.get('Content-Length'));
  if (len > MAX_BODY) return;
  const buf = await request.arrayBuffer();
  if (buf.byteLength > MAX_BODY) return;
  let ev;
  try { ev = JSON.parse(new TextDecoder().decode(buf)); } catch (e) { return; }
  const k = keyOf(ev, source);
  if (!k) return;
  const day = utcDay();
  const upd = await env.DB.prepare('UPDATE counts SET n = n + 1 WHERE day = ?1 AND k = ?2').bind(day, k).run();
  if (upd.meta && upd.meta.changes > 0) return;
  // New key for today: guard the table size, then insert (the upsert also covers a concurrent insert).
  const c = await env.DB.prepare('SELECT COUNT(*) AS c FROM counts').first();
  if (c && c.c > MAX_ROWS) return;
  await env.DB.prepare('INSERT INTO counts(day,k,n) VALUES(?1,?2,1) ON CONFLICT(day,k) DO UPDATE SET n = n + 1').bind(day, k).run();
}

async function sameKey(given, secret) {
  if (typeof given !== 'string' || typeof secret !== 'string' || !secret) return false;
  const enc = new TextEncoder();
  const [a, b] = await Promise.all([
    crypto.subtle.digest('SHA-256', enc.encode(given)),
    crypto.subtle.digest('SHA-256', enc.encode(secret)),
  ]);
  const x = new Uint8Array(a), y = new Uint8Array(b);
  let d = 0;
  for (let i = 0; i < x.length; i++) d |= x[i] ^ y[i];
  return d === 0;
}

async function adminData(request, env, url) {
  if (!(await sameKey(request.headers.get('X-Key'), env.ADMIN_KEY))) {
    return new Response('Unauthorized', { status: 401, headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } });
  }
  const days = Number(url.searchParams.get('days'));
  const win = days > 0 && days <= 400 ? Math.floor(days) : 0;          // 0 = all time
  const from = win ? utcDay(new Date(Date.now() - (win - 1) * 86400000)) : '';
  const from30 = utcDay(new Date(Date.now() - 29 * 86400000));
  // 'archive' (folded old days) counts only toward all time.
  const rows = await env.DB.prepare("SELECT k, SUM(n) AS n FROM counts WHERE day >= ?1 AND (?2 = 0 OR day <> 'archive') GROUP BY k").bind(from, win ? 1 : 0).all();
  const daily = await env.DB.prepare("SELECT day, k, n FROM counts WHERE day >= ?1 AND day <> 'archive' AND k LIKE 'start|%'").bind(from30).all();
  const body = {
    days: win,
    today: utcDay(),
    rows: (rows.results || []).map((r) => [r.k, r.n]),
    daily: (daily.results || []).map((r) => [r.day, r.k, r.n]),
  };
  return new Response(JSON.stringify(body), {
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' },
  });
}

async function compact(env) {
  const cutoff = utcDay(new Date(Date.now() - KEEP_DAYS * 86400000));
  await env.DB.batch([
    env.DB.prepare("INSERT INTO counts(day,k,n) SELECT 'archive', k, SUM(n) FROM counts WHERE day < ?1 AND day <> 'archive' GROUP BY k ON CONFLICT(day,k) DO UPDATE SET n = n + excluded.n").bind(cutoff),
    env.DB.prepare("DELETE FROM counts WHERE day < ?1 AND day <> 'archive'").bind(cutoff),
  ]);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const m = request.method;
    try {
      if (m === 'POST' && url.pathname === '/e') {
        try { await record(request, env); } catch (e) { /* never leak, never fail */ }
        return noContent();
      }
      if (m === 'GET' && url.pathname === '/') {
        return new Response('ok', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
      }
      if (m === 'GET' && url.pathname === '/admin') {
        return new Response(adminPage(), {
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'no-store',
            'X-Robots-Tag': 'noindex',
            'Referrer-Policy': 'no-referrer',
            'Content-Security-Policy': "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
          },
        });
      }
      if (m === 'GET' && url.pathname === '/admin/data') return await adminData(request, env, url);
    } catch (e) {
      return new Response('Not found', { status: 404 });
    }
    return new Response('Not found', { status: 404 });
  },
  async scheduled(event, env, ctx) {
    ctx.waitUntil(compact(env));
  },
};

/* ------------------------------------------------------------------ admin page ------------------------------------------------------------------ */

const CLIENT_JS = String.raw`
(function(){
var META = __META__;
var CLICK_NAMES = ['donate','feedback','share','itch'];
var RANGE = '30';
var $ = function(id){ return document.getElementById(id); };
function esc(s){ return String(s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
function fmt(n){ return Number(n).toLocaleString('en-US'); }
function pct(a, b){ return b > 0 ? (100 * a / b).toFixed(1) + '%' : '-'; }
function w(a, b){ return b > 0 ? Math.max(0, Math.min(100, 100 * a / b)).toFixed(1) : '0'; }
function store(k, v){ try { if (v == null) sessionStorage.removeItem(k); else sessionStorage.setItem(k, v); } catch (e) {} }
function recall(k){ try { return sessionStorage.getItem(k) || ''; } catch (e) { return ''; } }

var T = {};
function sum(prefix){ var s = 0; for (var k in T){ if (k.indexOf(prefix) === 0) s += T[k]; } return s; }
function bySource(prefix){ return { web: T[prefix + 'web'] || 0, itch: T[prefix + 'itch'] || 0 }; }

function niceScale(max){
  if (max < 4) return {step: 1, top: 4};
  var e = Math.pow(10, Math.floor(Math.log10(max / 4))), m = max / 4 / e;
  var s = m <= 1 ? 1 : m <= 2 ? 2 : m <= 5 ? 5 : 10, step = s * e;
  return {step: step, top: step * Math.ceil(max / step)};
}

function chartRuns(daily, today){
  var days = [], d0 = new Date(today + 'T00:00:00Z').getTime(), i;
  for (i = 29; i >= 0; i--) days.push(new Date(d0 - i * 86400000).toISOString().slice(0, 10));
  var web = {}, itch = {}, total = 0;
  daily.forEach(function(r){
    var src = r[1].split('|').pop();
    (src === 'itch' ? itch : web)[r[0]] = ((src === 'itch' ? itch : web)[r[0]] || 0) + r[2];
    total += r[2];
  });
  var max = 0;
  days.forEach(function(d){ max = Math.max(max, (web[d] || 0) + (itch[d] || 0)); });
  var sc = niceScale(max);
  var W = 480, H = 240, L = 44, R = 8, Tp = 10, B = 30, pw = W - L - R, ph = H - Tp - B, bw = pw / 30;
  var out = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Runs started per day, last 30 days">';
  for (var v = 0; v <= sc.top + 1e-9; v += sc.step){
    var y = Tp + ph - ph * v / sc.top;
    out += '<line x1="' + L + '" x2="' + (W - R) + '" y1="' + y.toFixed(1) + '" y2="' + y.toFixed(1) + '" class="grid"/>';
    out += '<text x="' + (L - 6) + '" y="' + (y + 4).toFixed(1) + '" text-anchor="end" class="ax">' + fmt(v) + '</text>';
  }
  days.forEach(function(d, i){
    var a = web[d] || 0, b = itch[d] || 0, x = L + i * bw + bw * 0.15, bwid = bw * 0.7;
    var ha = ph * a / sc.top, hb = ph * b / sc.top;
    if (a) out += '<rect x="' + x.toFixed(1) + '" y="' + (Tp + ph - ha).toFixed(1) + '" width="' + bwid.toFixed(1) + '" height="' + ha.toFixed(1) + '" class="bw"><title>' + d + ': ' + a + ' web</title></rect>';
    if (b) out += '<rect x="' + x.toFixed(1) + '" y="' + (Tp + ph - ha - hb).toFixed(1) + '" width="' + bwid.toFixed(1) + '" height="' + hb.toFixed(1) + '" class="bi"><title>' + d + ': ' + b + ' itch</title></rect>';
    if (i % 6 === 0) out += '<text x="' + (x + bwid / 2).toFixed(1) + '" y="' + (H - 10) + '" text-anchor="middle" class="ax">' + d.slice(5) + '</text>';
  });
  out += '<line x1="' + L + '" x2="' + (W - R) + '" y1="' + (Tp + ph) + '" y2="' + (Tp + ph) + '" class="base"/></svg>';
  return '<div class="legend"><i class="sw bw"></i>web <i class="sw bi"></i>itch <span class="dim">30 days, UTC, total ' + fmt(total) + '</span></div>' + out;
}

function meterRow(label, count, base, cls){
  return '<div class="row"><div class="lab"><span>' + esc(label) + '</span><span class="num">' + fmt(count) + ' <b>' + pct(count, base) + '</b></span></div>' +
    '<div class="bar"><div class="fill ' + (cls || '') + '" style="width:' + w(count, base) + '%"></div></div></div>';
}

function journeyIds(){
  var ids = [], seen = {};
  Object.keys(META).forEach(function(j){ seen[j] = 1; ids.push(j); });
  Object.keys(T).forEach(function(k){
    var p = k.split('|');
    if (p[0] !== 'click' && p[1] && !seen[p[1]]){ seen[p[1]] = 1; ids.push(p[1]); }
  });
  return ids;
}

function renderJourney(j){
  var m = META[j] || {title: j, chapters: [], endings: []};
  var starts = sum('start|' + j + '|'), resumes = sum('resume|' + j + '|'), ends = sum('ending|' + j + '|');
  var any = starts + resumes + ends + sum('choice|' + j + '|');
  if (!any) return '';
  var chapters = m.chapters.slice(), known = {};
  chapters.forEach(function(c){ known[c.id] = 1; });
  Object.keys(T).forEach(function(k){
    var p = k.split('|');
    if (p[0] === 'choice' && p[1] === j && !known[p[2]]){ known[p[2]] = 1; chapters.push({id: p[2], code: '', title: p[2], choices: []}); }
  });
  var h = '<section class="card"><h2>' + esc(m.title) + ' <span class="dim">' + esc(j) + '</span></h2>';
  h += '<div class="stats"><div><span class="num big">' + fmt(starts) + '</span>runs started</div><div><span class="num big">' + fmt(resumes) + '</span>resumed</div><div><span class="num big">' + fmt(ends) + '</span>endings reached</div><div><span class="num big">' + pct(ends, starts) + '</span>finished / started</div></div>';
  h += '<h3>Funnel: picks per chapter, % of runs started</h3>';
  chapters.forEach(function(c){
    var picks = sum('choice|' + j + '|' + c.id + '|');
    h += meterRow((c.code ? c.code + ' ' : '') + c.title, picks, starts, '');
  });
  h += '<h3>Choices per chapter</h3>';
  chapters.forEach(function(c){
    var picks = sum('choice|' + j + '|' + c.id + '|');
    if (!picks) return;
    var opts = c.choices.slice(), seen = {};
    opts.forEach(function(o){ seen[o.id] = 1; });
    Object.keys(T).forEach(function(k){
      var p = k.split('|');
      if (p[0] === 'choice' && p[1] === j && p[2] === c.id && !seen[p[3]]){ seen[p[3]] = 1; opts.push({id: p[3], label: p[3]}); }
    });
    h += '<details><summary>' + esc((c.code ? c.code + ' ' : '') + c.title) + ' <span class="num dim">' + fmt(picks) + ' picks</span></summary>';
    opts.forEach(function(o){ h += meterRow(o.label, sum('choice|' + j + '|' + c.id + '|' + o.id + '|'), picks, 'alt'); });
    h += '</details>';
  });
  h += '<h3>Endings, ranked</h3>';
  var list = [], eseen = {};
  m.endings.forEach(function(e){ eseen[e.id] = 1; list.push({id: e.id, name: e.name + (e.exit ? ' (early)' : ''), n: sum('ending|' + j + '|' + e.id + '|')}); });
  Object.keys(T).forEach(function(k){
    var p = k.split('|');
    if (p[0] === 'ending' && p[1] === j && !eseen[p[2]]){ eseen[p[2]] = 1; list.push({id: p[2], name: p[2], n: sum('ending|' + j + '|' + p[2] + '|')}); }
  });
  list = list.filter(function(e){ return e.n > 0; }).sort(function(a, b){ return b.n - a.n; });
  if (!list.length) h += '<p class="dim">No endings yet.</p>';
  list.forEach(function(e){ h += meterRow(e.name, e.n, ends, 'end'); });
  if (m.endings.length) h += '<p class="dim">' + list.length + ' of ' + m.endings.length + ' endings reached.</p>';
  return h + '</section>';
}

function render(data){
  T = {};
  data.rows.forEach(function(r){ T[r[0]] = r[1]; });
  var out = $('out');
  if (!data.rows.length){ out.innerHTML = '<p class="empty">No data yet.</p>'; return; }
  var h = '<section class="card"><h2>Runs started per day</h2>' + chartRuns(data.daily, data.today) + '</section>';
  h += '<section class="card"><h2>Clicks and sources</h2><div class="stats">';
  CLICK_NAMES.forEach(function(c){ h += '<div><span class="num big">' + fmt(sum('click|' + c + '|')) + '</span>' + c + '</div>'; });
  h += '</div><table><thead><tr><th></th><th>web</th><th>itch</th></tr></thead><tbody>';
  [['runs started', 'start|'], ['resumed', 'resume|'], ['choices', 'choice|'], ['endings', 'ending|'], ['clicks', 'click|']].forEach(function(r){
    var web = 0, itch = 0;
    for (var k in T){ if (k.indexOf(r[1]) === 0){ if (k.slice(-4) === '|web') web += T[k]; else if (k.slice(-5) === '|itch') itch += T[k]; } }
    h += '<tr><td>' + r[0] + '</td><td class="num">' + fmt(web) + '</td><td class="num">' + fmt(itch) + '</td></tr>';
  });
  h += '</tbody></table></section>';
  journeyIds().forEach(function(j){ h += renderJourney(j); });
  out.innerHTML = h;
}

function setStatus(t){ $('status').textContent = t; }
function load(){
  var key = $('key').value || recall('pfkey');
  if (!key){ setStatus('Enter the admin key.'); return; }
  setStatus('Loading...');
  fetch('/admin/data?days=' + RANGE, {headers: {'X-Key': key}, cache: 'no-store'}).then(function(r){
    if (r.status === 401){ store('pfkey', null); $('out').innerHTML = ''; setStatus('Wrong key.'); return null; }
    if (!r.ok){ setStatus('Error ' + r.status); return null; }
    return r.json();
  }).then(function(data){
    if (!data) return;
    store('pfkey', key); $('key').value = '';
    $('gate').hidden = true; $('signout').hidden = false;
    setStatus('Updated ' + new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC');
    render(data);
  }).catch(function(){ setStatus('Network error.'); });
}
document.querySelectorAll('[data-range]').forEach(function(b){
  b.addEventListener('click', function(){
    RANGE = b.getAttribute('data-range');
    document.querySelectorAll('[data-range]').forEach(function(x){ x.setAttribute('aria-pressed', String(x === b)); });
    if (recall('pfkey')) load();
  });
});
$('go').addEventListener('click', load);
$('key').addEventListener('keydown', function(e){ if (e.key === 'Enter') load(); });
$('signout').addEventListener('click', function(){ store('pfkey', null); $('out').innerHTML = ''; $('gate').hidden = false; $('signout').hidden = true; setStatus(''); });
if (recall('pfkey')) load();
})();
`;

const CSS = `
:root{--board:#22332D;--board-deep:#1A2823;--chalk:#EEF0E6;--dim:#A9B5A9;--faint:#5E7268;--crystal:#7FD3E8;--amber:#F2B45A;--line:rgba(238,240,230,.22)}
*{box-sizing:border-box}
html{background:var(--board)}
body{margin:0;background:var(--board);color:var(--chalk);font:16px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
.wrap{max-width:760px;margin:0 auto;padding:16px}
h1,h2,h3{font-family:"Cabin Sketch","Segoe Print","Comic Sans MS",cursive;margin:0}
h1{font-size:30px;line-height:1.1}
h2{font-size:24px;line-height:1.2;margin-bottom:10px}
h3{font-size:18px;margin:18px 0 8px;color:var(--amber)}
.dim{color:var(--dim);font-size:13px;font-weight:400}
.num{font-family:ui-monospace,"JetBrains Mono",Consolas,Menlo,monospace;font-variant-numeric:tabular-nums}
.top{display:flex;flex-wrap:wrap;gap:10px 16px;align-items:center;justify-content:space-between;margin-bottom:14px}
.ctl{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
button,input{font:inherit;color:var(--chalk)}
button{background:transparent;border:2px solid var(--line);border-radius:6px;padding:6px 12px;cursor:pointer;min-height:40px}
button[aria-pressed=true]{border-color:var(--crystal);color:var(--crystal)}
button.go{border-color:var(--amber);color:var(--amber);font-weight:700}
input{background:var(--board-deep);border:2px solid var(--line);border-radius:6px;padding:8px 10px;min-height:40px;width:100%;max-width:280px}
button:focus-visible,input:focus-visible,summary:focus-visible{outline:3px solid var(--amber);outline-offset:2px}
#gate{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px}
#status{color:var(--dim);font-size:14px;min-height:22px;margin:0 0 12px}
.card{border:2px solid var(--line);border-radius:8px;padding:14px;margin-bottom:16px;background:rgba(0,0,0,.12)}
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:10px;margin-bottom:8px;color:var(--dim);font-size:13px}
.big{display:block;font-size:24px;color:var(--chalk);font-weight:600}
.row{margin:0 0 9px}
.lab{display:flex;justify-content:space-between;gap:10px;font-size:14px;margin-bottom:3px}
.lab b{color:var(--crystal);font-weight:600;margin-left:6px}
.bar{height:9px;background:rgba(238,240,230,.12);border-radius:5px;overflow:hidden}
.fill{height:100%;background:var(--crystal)}
.fill.alt{background:var(--amber)}
.fill.end{background:var(--chalk)}
details{border-top:1px dashed var(--line);padding:8px 0}
summary{cursor:pointer;font-size:15px;margin-bottom:6px}
table{width:100%;border-collapse:collapse;font-size:14px}
th,td{text-align:right;padding:5px 4px;border-bottom:1px solid var(--line)}
th:first-child,td:first-child{text-align:left}
svg{width:100%;height:auto;display:block}
.grid{stroke:var(--line);stroke-dasharray:2 5}
.base{stroke:var(--dim)}
.ax{fill:var(--dim);font:11px ui-monospace,Consolas,monospace}
.bw{fill:var(--crystal)}
.bi{fill:var(--amber)}
.legend{font-size:13px;margin-bottom:6px}
.sw{display:inline-block;width:10px;height:10px;border-radius:2px;margin:0 4px 0 6px}
.sw.bw{background:var(--crystal)}
.sw.bi{background:var(--amber)}
.empty{font-size:18px;color:var(--dim);padding:24px 0}
`;

function adminPage() {
  const meta = JSON.stringify(META).replace(/</g, '\\u003c');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>plotforks counter</title>
<style>${CSS}</style>
</head>
<body>
<div class="wrap">
<div class="top">
  <h1>plotforks counter</h1>
  <div class="ctl" role="group" aria-label="Range">
    <button data-range="7" aria-pressed="false">7 days</button>
    <button data-range="30" aria-pressed="true">30 days</button>
    <button data-range="0" aria-pressed="false">All time</button>
    <button id="signout" hidden>Lock</button>
  </div>
</div>
<div id="gate">
  <input id="key" type="password" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Admin key" aria-label="Admin key">
  <button id="go" class="go">Show numbers</button>
</div>
<p id="status" role="status"></p>
<div id="out"></div>
</div>
<script>${CLIENT_JS.replace('__META__', () => meta)}</script>
</body>
</html>`;
}
