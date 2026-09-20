#!/usr/bin/env node
/* Publishes a copy of docs/ to the public repo plotforks/plotforks.github.io, served free at https://plotforks.github.io/
   (no CNAME on purpose, so it keeps working even if the plotforks.com domain lapses).
   Run after the normal deploy:  node tools/mirror.js
   Uses the git credentials already on this machine; needs no keys or secrets. */
'use strict';
const fs = require('fs'), path = require('path'), cp = require('child_process');
const SRC = path.join(__dirname, '..', 'docs');
const TMP = 'C:\pf-mirror';   // short path on purpose (Windows MAX_PATH)
const REMOTE = 'https://github.com/plotforks/plotforks.github.io.git';
const run = (cmd, args, cwd) => { const r = cp.spawnSync(cmd, args, { cwd, encoding: 'utf8' }); if (r.status) { console.error(r.stderr || r.stdout); process.exit(1); } return r.stdout; };
fs.rmSync(TMP, { recursive: true, force: true });
fs.cpSync(SRC, TMP, { recursive: true, filter: s => path.basename(s) !== 'CNAME' });
fs.writeFileSync(path.join(TMP, '.nojekyll'), '');
fs.writeFileSync(path.join(TMP, 'README.md'), '# plotforks.github.io\n\nFree permanent copy of **plotforks.com**, synced from https://github.com/plotforks/plotforks.com.\nLive at <https://plotforks.github.io/>. Do not edit by hand: it is overwritten on every deploy.\n');
run('git', ['init', '-q'], TMP);
run('git', ['add', '-A'], TMP);
run('git', ['-c', 'user.name=plotforks-mirror', '-c', 'user.email=noreply@users.noreply.github.com', 'commit', '-qm', 'mirror: sync from plotforks.com'], TMP);
run('git', ['branch', '-M', 'main'], TMP);
run('git', ['push', '-f', REMOTE, 'main'], TMP);
fs.rmSync(TMP, { recursive: true, force: true });
console.log('mirror pushed to https://plotforks.github.io/');
