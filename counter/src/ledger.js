/* Donations ledger for plotforks-counter: entered by hand from the private /admin page, shown publicly as totals.
 *
 *   GET  /funds                PUBLIC: totals, gift count, the list of spending. Donations are never listed one by one.
 *   GET  /admin/ledger         every row, needs header X-Key = secret ADMIN_KEY
 *   POST /admin/ledger         add {kind: "in" | "out", amount: "12.50", note, day}, needs X-Key
 *   POST /admin/ledger/delete  remove {id}, needs X-Key
 *
 * Amounts are integer cents (EUR). A "received" row carries no note, so nothing about a donor is ever stored.
 * A "spent" row must say what it was spent on, and that note is public.
 */

const MAX_LEDGER = 5000;             // abuse cap on rows
const MAX_CENTS = 100000000;         // 1,000,000.00 EUR in one row
const MAX_NOTE = 80;
const DAY = /^\d{4}-\d{2}-\d{2}$/;
const CONTROL = new RegExp('[\\u0000-\\u001f\\u007f<>]', 'g');
const JSON_HEADERS = { 'Content-Type': 'application/json; charset=utf-8', 'X-Robots-Tag': 'noindex' };

const utcDay = () => new Date().toISOString().slice(0, 10);
const json = (obj, status) => new Response(JSON.stringify(obj), { status: status || 200, headers: Object.assign({ 'Cache-Control': 'no-store' }, JSON_HEADERS) });

/* "12", "12.5", "12,50" -> 1200, 1250, 1250. Anything else (negative, 3 decimals, letters, empty) -> 0. */
export function toCents(v) {
  const t = String(v == null ? '' : v).trim().replace(',', '.');
  const m = /^(\d{1,7})(?:\.(\d{1,2}))?$/.exec(t);
  if (!m) return 0;
  const c = Number(m[1]) * 100 + Number((m[2] || '').padEnd(2, '0') || 0);
  return c > 0 && c <= MAX_CENTS ? c : 0;
}

export function cleanNote(v) {
  return String(v == null ? '' : v).replace(CONTROL, ' ').replace(/\s+/g, ' ').trim().slice(0, MAX_NOTE);
}

export function validDay(v) {
  if (!DAY.test(v)) return false;
  const d = new Date(v + 'T00:00:00Z');
  return !isNaN(d) && d.toISOString().slice(0, 10) === v && v <= utcDay();
}

export async function publicFunds(env) {
  const t = await env.DB.prepare('SELECT kind, SUM(cents) AS cents, COUNT(*) AS n, MIN(day) AS first, MAX(day) AS last FROM ledger GROUP BY kind').all();
  const by = { in: { cents: 0, n: 0 }, out: { cents: 0, n: 0 } };
  let first = '', last = '';
  (t.results || []).forEach((r) => {
    by[r.kind] = { cents: r.cents || 0, n: r.n || 0 };
    if (!first || r.first < first) first = r.first;
    if (r.last > last) last = r.last;
  });
  const spent = await env.DB.prepare("SELECT day, cents, note FROM ledger WHERE kind = 'out' ORDER BY day DESC, id DESC LIMIT 30").all();
  const body = {
    currency: 'EUR',
    since: first,
    updated: last,
    received: by.in.cents,
    gifts: by.in.n,
    spent: by.out.cents,
    left: by.in.cents - by.out.cents,
    spending: (spent.results || []).map((r) => ({ day: r.day, cents: r.cents, note: r.note })),
  };
  return new Response(JSON.stringify(body), {
    headers: Object.assign({ 'Cache-Control': 'public, max-age=60', 'Access-Control-Allow-Origin': '*' }, JSON_HEADERS),
  });
}

export async function ledgerList(env) {
  const r = await env.DB.prepare('SELECT id, day, kind, cents, note FROM ledger ORDER BY day DESC, id DESC').all();
  return json({ rows: r.results || [] });
}

export async function ledgerAdd(request, env) {
  if (Number(request.headers.get('Content-Length')) > 1000) return json({ error: 'too big' }, 413);
  let b;
  try { b = JSON.parse(await request.text()); } catch (e) { return json({ error: 'bad json' }, 400); }
  if (!b || typeof b !== 'object') return json({ error: 'bad json' }, 400);
  const kind = b.kind === 'in' || b.kind === 'out' ? b.kind : '';
  if (!kind) return json({ error: 'kind must be in or out' }, 400);
  const cents = toCents(b.amount);
  if (!cents) return json({ error: 'amount must be a positive number with at most 2 decimals' }, 400);
  const day = b.day ? String(b.day) : utcDay();
  if (!validDay(day)) return json({ error: 'day must be a real date, YYYY-MM-DD, not in the future' }, 400);
  const note = kind === 'out' ? cleanNote(b.note) : '';
  if (kind === 'out' && !note) return json({ error: 'say what the money was spent on' }, 400);
  const c = await env.DB.prepare('SELECT COUNT(*) AS c FROM ledger').first();
  if (c && c.c >= MAX_LEDGER) return json({ error: 'ledger is full' }, 507);
  const ins = await env.DB.prepare('INSERT INTO ledger(day,kind,cents,note) VALUES(?1,?2,?3,?4)').bind(day, kind, cents, note).run();
  return json({ ok: true, id: ins.meta && ins.meta.last_row_id });
}

export async function ledgerDelete(request, env) {
  let b;
  try { b = JSON.parse(await request.text()); } catch (e) { return json({ error: 'bad json' }, 400); }
  const id = Number(b && b.id);
  if (!Number.isInteger(id) || id <= 0) return json({ error: 'bad id' }, 400);
  await env.DB.prepare('DELETE FROM ledger WHERE id = ?1').bind(id).run();
  return json({ ok: true });
}
