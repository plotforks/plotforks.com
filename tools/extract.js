// Extracts the inline app script from index.html so it can be syntax-checked or loaded in node.
const fs = require('fs'), path = require('path');
function extract(file){
  const html = fs.readFileSync(file || path.join(__dirname, '..', 'index.html'), 'utf8');
  const out = []; const re = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g; let m;
  while ((m = re.exec(html))) out.push(m[1]);
  return out;
}
module.exports = extract;
if (require.main === module){
  const scripts = extract();
  scripts.forEach((s, i) => fs.writeFileSync(path.join(process.env.TEMP || '.', `up-inline-${i}.js`), s));
  console.log(scripts.length + ' inline script(s) extracted');
}
