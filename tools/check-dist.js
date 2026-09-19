// Verifies dist/: internal links and images resolve, every page has title/description/canonical/OG, PNG sizes, no em dashes.
const fs = require('fs'), path = require('path');
const DIST = path.join(__dirname, '..', 'dist'), ITCH = path.join(__dirname, '..', 'dist-itch');
const walk = d => fs.readdirSync(d).flatMap(f => { const p = path.join(d, f); return fs.statSync(p).isDirectory() ? walk(p) : [p]; });
const files = walk(DIST), htmls = files.filter(f => f.endsWith('.html') && !f.includes(path.sep + 'assets' + path.sep));
const problems = [], titles = new Map(); let links = 0;
const exists = u => { const rel = decodeURIComponent(u.split('#')[0].split('?')[0]); if (!rel) return true; const p = path.join(DIST, rel); return fs.existsSync(p) && (fs.statSync(p).isFile() || fs.existsSync(path.join(p, 'index.html'))); };
htmls.forEach(f => {
  const h = fs.readFileSync(f, 'utf8'), rel = path.relative(DIST, f);
  if (/\u2014/.test(h)) problems.push(rel + ': contains em dash');
  const t = /<title>([^<]*)<\/title>/.exec(h); if (!t) problems.push(rel + ': no title'); else { if (titles.has(t[1])) problems.push(`${rel}: duplicate title with ${titles.get(t[1])}`); titles.set(t[1], rel); }
  ['name="description"', 'rel="canonical"', 'property="og:title"', 'property="og:image"', 'name="twitter:card"'].forEach(k => { if (!h.includes(k)) problems.push(`${rel}: missing ${k}`); });
  const og = /property="og:image" content="([^"]+)"/.exec(h); if (og){ const u = og[1].replace('https://plotforks.com', ''); if (!exists(u)) problems.push(`${rel}: og:image missing ${u}`); }
  [...h.matchAll(/(?:href|src)="(\/[^"]*)"/g)].forEach(m => { links++; if (!exists(m[1])) problems.push(`${rel}: broken ${m[1]}`); });
  if (rel !== 'index.html'){ [...h.matchAll(/(?:href|src)="((?!https?:|\/|#|mailto:)[^"]+)"/g)].forEach(m => problems.push(`${rel}: relative ref ${m[1]}`)); }
});
const png = f => { const b = fs.readFileSync(f); return [b.readUInt32BE(16), b.readUInt32BE(20)]; };
files.filter(f => f.includes(path.sep + 'og' + path.sep) && f.endsWith('.png')).forEach(f => { const [w, h] = png(f); if (w !== 1200 || h !== 630) problems.push(`${path.relative(DIST, f)}: ${w}x${h}`); });
const cover = png(path.join(ITCH, 'cover.png')); if (cover[0] !== 630 || cover[1] !== 500) problems.push('cover.png ' + cover.join('x'));
const sm = fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8');
[...sm.matchAll(/<loc>https:\/\/plotforks\.com([^<]*)<\/loc>/g)].forEach(m => { if (!exists(m[1])) problems.push('sitemap dead url ' + m[1]); });
console.log(`html pages: ${htmls.length}, internal refs checked: ${links}, problems: ${problems.length}`);
problems.slice(0, 30).forEach(p => console.log('  ' + p));
process.exitCode = problems.length ? 1 : 0;
