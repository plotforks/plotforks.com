// Offline test of the donations ledger: runs the real Worker fetch() against a real SQLite (node:sqlite) that
// mimics the D1 API. No network, no credentials. Usage: node counter/test-ledger.mjs
import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const db = new DatabaseSync(':memory:');
db.exec(fs.readFileSync(path.join(here, 'schema.sql'), 'utf8'));

/* Minimal D1 look-alike: prepare(sql).bind(...).run() / all() / first(). */
const env = {
  ADMIN_KEY: 'test-key',
  DB: {
    prepare(sql) {
      let args = [];
      const st = {
        bind(...a) { args = a; return st; },
        async run() { const r = db.prepare(sql).run(...args); return { meta: { changes: Number(r.changes), last_row_id: Number(r.lastInsertRowid) } }; },
        async all() { return { results: db.prepare(sql).all(...args) }; },
        async first() { return db.prepare(sql).get(...args) || null; },
      };
      return st;
    },
    async batch() {},
  },
};

const { default: worker } = await import('./src/worker.js');
let fails = 0;
const ok = (cond, msg) => { if (!cond) { fails++; console.log('FAIL  ' + msg); } else console.log('ok    ' + msg); };
const call = (method, p, body, key) => worker.fetch(new Request('https://x.test' + p, {
  method, headers: Object.assign({ 'Content-Type': 'application/json' }, key === undefined ? { 'X-Key': 'test-key' } : key ? { 'X-Key': key } : {}),
  body: body === undefined ? undefined : JSON.stringify(body),
}), env);
const json = async (r) => JSON.parse(await r.text());

// --- security
ok((await call('POST', '/admin/ledger', { kind: 'in', amount: '5' }, '')).status === 401, 'add without key is 401');
ok((await call('POST', '/admin/ledger', { kind: 'in', amount: '5' }, 'wrong')).status === 401, 'add with wrong key is 401');
ok((await call('GET', '/admin/ledger', undefined, 'wrong')).status === 401, 'list with wrong key is 401');
ok((await call('POST', '/admin/ledger/delete', { id: 1 }, '')).status === 401, 'delete without key is 401');

// --- public view starts empty
let f = await json(await call('GET', '/funds', undefined, ''));
ok(f.received === 0 && f.spent === 0 && f.left === 0 && f.gifts === 0 && f.spending.length === 0, 'empty ledger: all zero');
const pub = await call('GET', '/funds', undefined, '');
ok(pub.headers.get('Access-Control-Allow-Origin') === '*', '/funds allows cross-origin reads');
ok(/max-age=60/.test(pub.headers.get('Cache-Control')), '/funds is cached for a minute');

// --- amount parsing
for (const [v, want] of [['12', 1200], ['12.5', 1250], ['12,50', 1250], ['0.01', 1], [' 7 ', 700], ['999999', 99999900]]) {
  const r = await call('POST', '/admin/ledger', { kind: 'in', amount: v });
  ok(r.status === 200, 'accepts amount "' + v + '"');
  const rows = (await json(await call('GET', '/admin/ledger'))).rows;
  ok(rows[0].cents === want, '  stored as ' + want + ' cents');
}
for (const v of ['', '0', '-5', '1.234', 'abc', '12 eur', '1e3', '99999999', '1000001', null, 5.005]) {
  const r = await call('POST', '/admin/ledger', { kind: 'in', amount: v });
  ok(r.status === 400, 'rejects amount ' + JSON.stringify(v));
}

// --- kind, note, day rules
ok((await call('POST', '/admin/ledger', { kind: 'gift', amount: '5' })).status === 400, 'rejects unknown kind');
ok((await call('POST', '/admin/ledger', { kind: 'out', amount: '5' })).status === 400, 'spent needs a note');
ok((await call('POST', '/admin/ledger', { kind: 'in', amount: '5', day: '2999-01-01' })).status === 400, 'rejects a future day');
ok((await call('POST', '/admin/ledger', { kind: 'in', amount: '5', day: '2026-02-30' })).status === 400, 'rejects an impossible date');
ok((await call('POST', '/admin/ledger', { kind: 'in', amount: '5', day: 'yesterday' })).status === 400, 'rejects a non-date');
ok((await call('POST', '/admin/ledger', { kind: 'in', amount: '5', day: '2026-09-01' })).status === 200, 'accepts a past day');

// --- a donation never keeps a note, a spent note is cleaned
await call('POST', '/admin/ledger', { kind: 'in', amount: '3', note: 'John Smith john@example.com' });
let rows = (await json(await call('GET', '/admin/ledger'))).rows;
ok(rows.find((r) => r.cents === 300).note === '', 'a donation row stores no note (no donor detail)');
await call('POST', '/admin/ledger', { kind: 'out', amount: '11.99', note: '  plotforks.com <b>domain</b>\n\tone year  ' });
rows = (await json(await call('GET', '/admin/ledger'))).rows;
const out = rows.find((r) => r.kind === 'out');
ok(out.note === 'plotforks.com b domain /b one year', 'spent note: markup and control characters stripped, spaces collapsed ("' + out.note + '")');
await call('POST', '/admin/ledger', { kind: 'out', amount: '1', note: 'x'.repeat(300) });
rows = (await json(await call('GET', '/admin/ledger'))).rows;
ok(rows.some((r) => r.kind === 'out' && r.note.length === 80), 'long note is cut to 80 characters');

// --- totals on the public endpoint
f = await json(await call('GET', '/funds', undefined, ''));
const inCents = 1200 + 1250 + 1250 + 1 + 700 + 99999900 + 500 + 300;
ok(f.received === inCents, 'received total is the sum of donations (' + f.received + ')');
ok(f.gifts === 8, 'gift count is 8 (' + f.gifts + ')');
ok(f.spent === 1199 + 100, 'spent total is the sum of spending (' + f.spent + ')');
ok(f.left === f.received - f.spent, 'left = received - spent');
ok(f.since === '2026-09-01', 'since is the oldest day (' + f.since + ')');
ok(f.spending.length === 2 && f.spending.every((s) => !('id' in s)), 'spending list is public, rows carry no id');
ok(!JSON.stringify(f).includes('John') && !JSON.stringify(f).includes('@'), 'no donor detail ever reaches /funds');
ok(!JSON.stringify(f).includes('<'), 'no markup reaches /funds');

// --- delete
const id = (await json(await call('GET', '/admin/ledger'))).rows.find((r) => r.cents === 99999900).id;
ok((await call('POST', '/admin/ledger/delete', { id })).status === 200, 'delete succeeds');
f = await json(await call('GET', '/funds', undefined, ''));
ok(f.received === inCents - 99999900, 'public total drops after delete');
ok((await call('POST', '/admin/ledger/delete', { id: 'x' })).status === 400, 'delete rejects a bad id');
ok((await call('POST', '/admin/ledger', 'not json')).status === 400, 'garbage body is refused, not a crash');

// --- admin page carries the ledger UI, and the old routes still work
const page = await (await worker.fetch(new Request('https://x.test/admin'), env)).text();
ok(page.includes('id="ledger"') && page.includes('Donations ledger'), '/admin page has the ledger card');
ok((await worker.fetch(new Request('https://x.test/'), env)).status === 200, 'GET / still ok');
ok((await worker.fetch(new Request('https://x.test/admin/data'), env)).status === 401, '/admin/data still needs the key');
ok((await worker.fetch(new Request('https://x.test/e', { method: 'POST', body: '{}' }), env)).status === 204, 'POST /e still 204');

console.log(fails ? '\n' + fails + ' FAILED' : '\nall passed');
process.exit(fails ? 1 : 0);
