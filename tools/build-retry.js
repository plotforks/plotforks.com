// Runs tools/build.js repeatedly until every social card exists. Headless Edge on this machine fails to write a
// screenshot now and then, and build.js only re-renders the cards that are missing, so repeating it fills the gaps.
// Usage: node tools/build-retry.js [maxRounds]
'use strict';
const cp = require('child_process'), path = require('path');
const ROOT = path.join(__dirname, '..');
const MAX = Number(process.argv[2]) || 8;

function build() {
  const r = cp.spawnSync(process.execPath, [path.join(__dirname, 'build.js')], { encoding: 'utf8', cwd: ROOT, timeout: 900000 });
  const out = (r.stdout || '') + (r.stderr || '');
  const m = /OG images in dist\/:\s+(\d+) \(rendered (\d+), reused (\d+), failed (\d+)\)/.exec(out);
  return { failed: m ? Number(m[4]) : -1, rendered: m ? Number(m[2]) : -1, out: out };
}

(async () => {
  for (let i = 1; i <= MAX; i++) {
    const r = build();
    console.log('round ' + i + ': rendered ' + r.rendered + ', still failing ' + r.failed);
    if (r.failed === 0) { console.log(r.out.split('---- build summary ----')[1] || ''); return; }
    if (r.failed < 0) { console.log(r.out.slice(-800)); return; }
    await new Promise(res => setTimeout(res, 15000));   // let Edge settle between rounds
  }
  console.log('gave up after ' + MAX + ' rounds; run node tools/check-dist.js to see what is still missing');
})();
