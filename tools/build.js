#!/usr/bin/env node
/* plotforks static build (plain node, no npm dependencies).
 *
 *   node tools/build.js            build dist/ and dist-itch/ (social cards already on disk are reused)
 *   node tools/build.js --force    also re-render every social card
 *   node tools/build.js --no-images   skip the headless-Edge card rendering (pages and sitemap only)
 *
 * The Artifact fragment index.html in the project root is the single source of truth for the app; this script only
 * wraps a copy of it. Site settings (base URL, Cloudflare token) are read from the SITE object inside index.html so
 * there is one place to edit them.
 */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), os = require('os'), zlib = require('zlib');
const cp = require('child_process');

const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const ITCH = path.join(ROOT, 'dist-itch');
const FORCE = process.argv.includes('--force');
const NO_IMAGES = process.argv.includes('--no-images');

/* ---------- config ---------- */
const INDEX_SRC = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const SITE_BLOCK = /const SITE = \{([^}]*)\}/.exec(INDEX_SRC)[1];
const siteVal = k => { const m = new RegExp(k + ':\\s*"([^"]*)"').exec(SITE_BLOCK); return m ? m[1] : ''; };
const BASE_URL = siteVal('baseUrl').replace(/\/$/, '');           // the one place the public URL comes from (SITE.baseUrl in index.html)
const CF_TOKEN = siteVal('cfAnalyticsToken');                     // empty string = no analytics
const SITE_NAME = 'plotforks';
const COUNT_NOTE = 'We count anonymous plays, choices and endings, with no cookies and no personal data.';   // also in the footer of index.html
const EDGE_CANDIDATES = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
];

/* Per-journey site copy. Slugs must match JOURNEY_META in index.html. */
const JOURNEY_SITE = {
  'breaking-bad': {
    slug: 'breaking-bad', series: 'Breaking Bad', short: 'Breaking Bad what-if',
    description: 'Play the whole run of Breaking Bad and change the story at nineteen turning points. Every choice shifts Walt, Jesse, Hank and the family, and the ending is computed from how you played.',
    intro: 'An interactive what-if through the whole of Breaking Bad. At each turning point you pick one of three alternatives, watch a short cartoon scene, and carry the consequences into the next chapter. Where you land depends on how far you turned into Heisenberg, who still trusts you, what Hank suspects and what is left of the family.',
    legal: 'An unofficial Breaking Bad what-if, made as a fan parody. Not affiliated with Sony Pictures Television or AMC. All characters are drawn from scratch.',
    theme: '',
    chapterTitles: {
      ridealong: 'What if Walter White told Hank about Jesse in the Breaking Bad pilot?',
      basement: 'What if Walter White let Krazy-8 go?',
      graymatter: 'What if Walter White took Elliott\'s job offer?',
      lawyer: 'What if Walter White never hired Saul Goodman?',
      phoenix: 'What if Walter White saved Jane?',
      halfmeasures: 'What if Walter White let Mike handle Jesse in Half Measures?',
      boxcutter: 'What if Walter White spoke up for Victor in Box Cutter?',
      trustsaul: 'What if Walter White stopped telling Saul everything?',
      saymyname: 'What if Walter White let Mike walk away in Say My Name?',
      portfolio: 'What if Walter White invested the money instead of burying it?',
      bathroom: 'What if Hank never read the book in the bathroom?',
      standoff: "What if nobody fired a shot at To'hajiilee?",
      jacksprice: "What if Jack's crew let Hank live after the shootout?",
      gale: 'What if Walter White warned Gale instead of having him killed?',
      endtimes: 'What if Walter White told Jesse the truth about Gus?',
      buyout: 'What if Walter White took the five million dollar buyout?',
      cashpile: 'What if Walter White quit while he was ahead of the cash pile?',
      tohajiilee: 'What if Walter White surrendered to Hank in the desert?',
      felina: 'What if Walter White took Jack\'s deal in Felina?',
      sentencing: 'What would Walter White say at his sentencing?'
    }
  },
  'matrix': {
    slug: 'the-matrix', series: 'The Matrix', short: 'Matrix what-if',
    description: 'Play the whole Matrix trilogy and change the story at fifteen turning points. Every choice shifts Neo\'s belief, Trinity, the Agents and Zion, and the ending is computed from how you played.',
    intro: 'An interactive what-if through the whole Matrix trilogy. At each turning point you pick one of three alternatives, watch a short cartoon scene, and carry the consequences into the next chapter. Where you land depends on what Neo believes, how close Trinity is, how hard the Agents are looking, and whether Zion survives.',
    legal: 'An unofficial Matrix what-if, made as a fan parody. Not affiliated with Warner Bros. or the creators of the films. All characters are drawn from scratch and are not likenesses of any actor.',
    theme: 'matrix',
    chapterTitles: {
      pills: 'What if Neo took the blue pill?',
      cypher: 'What if Neo told Morpheus about Cypher?',
      oracle: 'What if Neo did not believe the Oracle?',
      morpheus: 'What if Neo let Tank pull Morpheus\'s plug?',
      subway: 'What if Neo ran from Agent Smith in the subway?',
      ledge: 'What if Neo never climbed out of the window at Metacortex?',
      interrogation: "What if Neo took Agent Smith's deal?",
      jump: 'What if Neo refused to jump in the training program?',
      merovingian: "What if Neo took apart the Merovingian's restaurant?",
      mobilave: 'What if Neo fought the Trainman at Mobil Ave?',
      terms: 'What if Neo asked the machines for Trinity?',
      architect: 'What if Neo chose the right door in The Matrix Reloaded?',
      revolutions: 'What if Neo stayed to defend Zion in The Matrix Revolutions?',
      lastfight: 'What if Neo kept fighting Agent Smith instead of letting him copy him?',
      park: 'How long would the peace last after The Matrix Revolutions?'
    }
  }
};

/* ---------- load story data exactly as the browser would ---------- */
const sandbox = { window: {}, console };
sandbox.window.window = sandbox.window;
vm.createContext(sandbox);
const STORY_FILES = [...INDEX_SRC.matchAll(/<script src="(stories\/[^"]+)"/g)].map(m => m[1]);
STORY_FILES.forEach(f => vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), sandbox, { filename: f }));
const JOURNEYS = sandbox.window.JOURNEYS || {};

/* ---------- helpers ---------- */
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const abs = p => BASE_URL + p;
const sortedChapters = j => (j.chapters || []).slice().sort((a, b) => a.n - b.n);
const rm = p => fs.rmSync(p, { recursive: true, force: true });
function write(rel, content, base){
  const file = path.join(base || DIST, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
  return file;
}
function copyDir(src, dst, filter){
  fs.mkdirSync(dst, { recursive: true });
  fs.readdirSync(src).forEach(f => {
    const s = path.join(src, f), d = path.join(dst, f);
    if (fs.statSync(s).isDirectory()) copyDir(s, d, filter);
    else if (!filter || filter(f)) fs.copyFileSync(s, d);
  });
}
const analyticsTag = () => CF_TOKEN
  ? `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='${JSON.stringify({ token: CF_TOKEN })}'></script>` : '';

const FONTS_LINK = '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cabin+Sketch:wght@400;700&family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=JetBrains+Mono:wght@400;600&family=Share+Tech+Mono&display=swap">';
const FAVICON = '<link rel="icon" type="image/svg+xml" href="/favicon.svg">';
const STYLE = INDEX_SRC.match(/<style>([\s\S]*?)<\/style>/)[1];
const EXTRA_CSS = `
/* static pages */
.crumbs{font:600 12px/1.4 var(--mono);color:var(--chalk-dim);display:flex;flex-wrap:wrap;gap:4px 8px;margin:0}
.crumbs a{color:var(--crystal);text-decoration:underline;text-underline-offset:3px}
.crumbs span[aria-hidden]{color:var(--chalk-faint)}
.page{display:grid;gap:22px;max-width:760px}
.page h1{margin:6px 0 4px}
.page h2{font:700 28px/1.15 var(--display);margin:0}
.page p{margin:0;max-width:64ch}
.playbig{display:inline-block;justify-self:start;padding:18px 28px;border-radius:8px;background:var(--amber);color:var(--board-deep);font:700 24px/1 var(--display);text-decoration:none;box-shadow:0 4px 0 rgba(0,0,0,.35)}
.playbig:hover{background:var(--crystal)}
.playbig:focus-visible,.crumbs a:focus-visible,.chaplist a:focus-visible,.staticchoices a:focus-visible{outline:3px solid var(--amber);outline-offset:2px}
.staticchoices{list-style:none;margin:0;padding:0;display:grid;gap:10px}
.staticchoices li{border:2px solid rgba(238,240,230,.28);border-radius:6px;padding:12px 14px;display:grid;gap:2px;background:rgba(238,240,230,.03)}
.staticchoices b{font:700 21px/1.15 var(--display)}
.staticchoices span{font-size:14px;color:var(--chalk-dim)}
.chaplist{list-style:none;margin:0;padding:0;display:grid;gap:8px}
.chaplist li{display:flex;gap:10px;flex-wrap:wrap;align-items:baseline}
.chaplist a{color:var(--chalk);text-decoration:underline;text-underline-offset:3px}
.chaplist code{font:600 12px var(--mono);color:var(--amber)}
.pillrow{display:flex;flex-wrap:wrap;gap:8px;list-style:none;margin:0;padding:0}
.pillrow a{display:inline-block;padding:6px 12px;border-radius:999px;border:2px solid rgba(238,240,230,.28);font:600 12.5px/1.2 var(--mono);color:var(--chalk-dim);text-decoration:none}
.pillrow a:hover{border-color:var(--crystal);color:var(--chalk)}
.pager{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;font-size:14px}
.pager a{color:var(--crystal)}
.staticnav{border-top:2px dashed var(--line);padding-top:16px;display:grid;gap:12px}
.staticnav h3{margin:0;font:700 24px/1 var(--display)}
`;

/* ---------- page shell ---------- */
function shell(o){
  const url = abs(o.path);
  const image = o.image ? abs(o.image) : abs('/og/plotforks.png');
  const desc = esc(o.description);
  const theme = o.theme ? ` data-theme="${o.theme}"` : '';
  const ld = (o.jsonld || []).map(j => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, '\\u003c')}</script>`).join('\n');
  return `<!doctype html>
<html lang="en"${theme}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(o.title)}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="${url}">
${o.noindex ? '<meta name="robots" content="noindex">\n' : ''}<meta property="og:site_name" content="${SITE_NAME}">
<meta property="og:type" content="${o.ogType || 'website'}">
<meta property="og:title" content="${esc(o.ogTitle || o.title)}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${image}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(o.ogTitle || o.title)}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="${image}">
<meta name="theme-color" content="${o.theme === 'matrix' ? '#050A06' : '#22332D'}">
${FAVICON}
${FONTS_LINK}
<link rel="stylesheet" href="/site.css">
${ld}
${analyticsTag()}
</head>
<body>
<div class="wrap">
<header class="page">
${o.crumbs ? crumbs(o.crumbs) : ''}
</header>
<main class="page">
${o.body}
</main>
<footer>${esc(o.legal || 'Unofficial fan parody. Not affiliated with the studios or networks behind the shows. All characters are drawn from scratch.')} ${esc(COUNT_NOTE)} <a href="/" style="color:inherit">${SITE_NAME}</a></footer>
</div>
</body>
</html>
`;
}
function crumbs(list){
  return '<nav aria-label="Breadcrumb"><p class="crumbs">' + list.map((c, i) =>
    (i ? '<span aria-hidden="true">/</span>' : '') + (c[1] ? `<a href="${c[1]}">${esc(c[0])}</a>` : `<span>${esc(c[0])}</span>`)).join(' ') + '</p></nav>';
}
function breadcrumbLd(list){
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: list.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c[0], item: abs(c[1] || list.path || '/') })) };
}
const playLink = (query, label) => `<a class="playbig" href="/?${query}">${esc(label || 'Play from here')}</a>`;

/* ---------- content model ---------- */
const pages = [];      // {path, title, priority} for the sitemap and stats
const cards = [];      // social cards to render: {out, kind, title, journeyId}
const pageCount = { home: 0, journey: 0, chapter: 0, ending: 0, meta: 0 };

function endingList(j){
  const list = [];
  Object.keys(j.exits || {}).forEach(k => list.push({ id: k, name: j.exits[k].name, exit: true, fallback: false }));
  (j.endings || []).forEach(e => list.push({ id: e.id, name: e.name, exit: false, fallback: !!e.fallback }));
  return list;
}

function buildJourney(j){
  const S = JOURNEY_SITE[j.id]; if (!S) throw new Error('No JOURNEY_SITE entry for ' + j.id);
  const base = '/' + S.slug + '/';
  const chapters = sortedChapters(j);
  const endings = endingList(j);
  const ns = [...new Set(chapters.map(c => c.n))];
  const journeyImg = `/og/${S.slug}.png`;
  cards.push({ out: `og/${S.slug}.png`, kind: 'journey', title: j.title, journeyId: j.id, sub: S.series });

  /* landing page */
  const chapterItems = chapters.map(c => `<li><code>${esc(c.code)}</code> <a href="${base}${c.id}/">${esc(S.chapterTitles[c.id] || c.title)}</a></li>`).join('\n');
  const endingItems = endings.filter(e => !e.fallback).map(e => `<li><a href="${base}ending/${e.id}/">${esc(e.name)}</a></li>`).join('\n');
  const list = [['Home', '/'], [S.series + ': ' + j.title, null]];
  const landing = `<div class="eyebrow">${esc(S.series)} · interactive what-if</div>
<h1>${esc(j.title)}</h1>
<p class="lede">${esc(j.subtitle || '')}</p>
<p>${esc(S.intro)}</p>
${playLink('journey=' + encodeURIComponent(j.id), 'Play the journey')}
<h2>The ${ns.length} turning points</h2>
<p>Each chapter has its own page. Read the setup, see the three choices, or jump straight in.</p>
<ul class="chaplist">
${chapterItems}
</ul>
<h2>${endings.filter(e => !e.fallback).length} endings to find</h2>
<p>Every run ends somewhere different. Here is the full list of ending names, with no spoilers beyond that.</p>
<ul class="pillrow">
${endingItems}
</ul>`;
  const crumbList = [['Home', '/'], [S.series + ': ' + j.title, base]];
  write(base.slice(1) + 'index.html', shell({
    path: base, title: `${S.series}: ${j.title} | Interactive what-if | ${SITE_NAME}`,
    description: S.description, crumbs: list, body: landing, image: journeyImg, theme: S.theme, legal: S.legal,
    jsonld: [{
      '@context': 'https://schema.org', '@type': ['CreativeWork', 'Game'], name: `${S.series}: ${j.title}`, url: abs(base),
      description: S.description, genre: 'Interactive fiction', inLanguage: 'en', isAccessibleForFree: true,
      image: abs(journeyImg), publisher: { '@type': 'Organization', name: SITE_NAME, url: BASE_URL },
      about: { '@type': 'CreativeWork', name: S.series }
    }, breadcrumbLd(crumbList)]
  }));
  pages.push({ path: base, priority: '0.9' }); pageCount.journey++;

  /* chapter pages */
  chapters.forEach((c, i) => {
    const q = S.chapterTitles[c.id] || `What if ${c.title}?`;
    const cpath = `${base}${c.id}/`;
    const prev = chapters[i - 1], next = chapters[i + 1];
    const setupText = c.setup && c.setup.text ? c.setup.text : '';
    const choices = c.choices.map(ch => `<li><b>${esc(ch.label)}</b><span>${esc(ch.tag)}</span></li>`).join('\n');
    const body = `<div class="eyebrow">${esc(c.code)} · Chapter ${c.n} of ${ns.length} · ${esc(c.episode)}</div>
<h1>${esc(q)}</h1>
<p>${esc(setupText)}</p>
<h2>${esc(c.question)}</h2>
<ul class="staticchoices">
${choices}
</ul>
<p>You will not know the consequences until you play. Every choice moves the hidden scores that decide how the story ends.</p>
${playLink('journey=' + encodeURIComponent(j.id) + '&chapter=' + encodeURIComponent(c.id))}
<nav class="pager" aria-label="Chapters">
<span>${prev ? `<a href="${base}${prev.id}/">Previous: ${esc(prev.title)}</a>` : ''}</span>
<a href="${base}">All chapters</a>
<span>${next ? `<a href="${base}${next.id}/">Next: ${esc(next.title)}</a>` : ''}</span>
</nav>`;
    const cl = [['Home', '/'], [S.series + ': ' + j.title, base], [c.title, cpath]];
    const desc = `${c.code} ${c.episode}: ${setupText}`.slice(0, 200).replace(/\s+\S*$/, '') + ' Pick one of three alternatives and play it out.';
    write(cpath.slice(1) + 'index.html', shell({
      path: cpath, title: `${q} | ${S.short}`, ogTitle: q, description: desc,
      crumbs: [['Home', '/'], [S.series + ': ' + j.title, base], [c.title, null]], body, image: journeyImg, theme: S.theme, legal: S.legal, ogType: 'article',
      jsonld: [{
        '@context': 'https://schema.org', '@type': 'CreativeWork', name: q, url: abs(cpath), description: desc, inLanguage: 'en',
        isPartOf: { '@type': 'CreativeWork', name: `${S.series}: ${j.title}`, url: abs(base) }, image: abs(journeyImg)
      }, breadcrumbLd(cl)]
    }));
    pages.push({ path: cpath, priority: '0.7' }); pageCount.chapter++;
  });

  /* ending pages */
  endings.forEach(e => {
    const epath = `${base}ending/${e.id}/`;
    const img = e.fallback ? journeyImg : `/og/${S.slug}/${e.id}.png`;
    if (!e.fallback) cards.push({ out: `og/${S.slug}/${e.id}.png`, kind: 'ending', title: e.name, journeyId: j.id, sub: S.series + ': ' + j.title, exit: e.exit });
    const total = endings.filter(x => !x.fallback).length;
    const teaser = e.exit
      ? `Somewhere in ${j.title} there is a very short way out, and it ends with "${e.name}". Can you reach this ending?`
      : `One of ${total} endings hidden in ${j.title}. "${e.name}" is waiting at the end of the right run of choices. Can you reach this ending?`;
    const body = `<div class="eyebrow">${esc(S.series)} · ${e.exit ? 'An early ending' : 'An ending'}</div>
<h1>${esc(e.name)}</h1>
<p>${esc(teaser)}</p>
<p>The ending is computed from the choices you make and the hidden scores they move, so there is no single path to it. Play the journey and see where you land.</p>
${playLink('journey=' + encodeURIComponent(j.id), 'Play the journey')}
<p><a href="${base}">See all chapters of ${esc(j.title)}</a></p>`;
    const el = [['Home', '/'], [S.series + ': ' + j.title, base], [e.name, epath]];
    const desc = `Can you reach the ending "${e.name}" in ${S.series}: ${j.title}? An interactive what-if on ${SITE_NAME}.`;
    write(epath.slice(1) + 'index.html', shell({
      path: epath, title: `${e.name}: can you reach this ending? | ${S.short}`, ogTitle: `${e.name}: can you reach this ending?`, description: desc,
      crumbs: [['Home', '/'], [S.series + ': ' + j.title, base], [e.name, null]], body, image: img, theme: S.theme, legal: S.legal, noindex: e.fallback,
      jsonld: [breadcrumbLd(el)]
    }));
    if (!e.fallback) pages.push({ path: epath, priority: '0.6' });
    pageCount.ending++;
  });
}

/* ---------- the app page: wrap the fragment as a full document ---------- */
function buildHome(){
  let frag = INDEX_SRC;
  const title = /<title>[\s\S]*?<\/title>\s*/.exec(frag)[0]; frag = frag.replace(title, '');
  const links = [...frag.matchAll(/<link [^>]*>\s*/g)].map(m => m[0]); links.forEach(l => { frag = frag.replace(l, ''); });
  const style = /<style>[\s\S]*?<\/style>\s*/.exec(frag)[0]; frag = frag.replace(style, '');
  const desc = 'Interactive what-if stories from your favorite series and movies. Play the whole of Breaking Bad or The Matrix, change the story at every turning point, and find every ending.';
  const staticNav = `<section class="staticnav">
  <h3>Browse every story</h3>
  <ul class="chaplist">
${Object.keys(JOURNEYS).map(id => { const S = JOURNEY_SITE[id]; return `    <li><a href="/${S.slug}/">${esc(S.series)}: ${esc(JOURNEYS[id].title)}</a></li>`; }).join('\n')}
  </ul>
</section>
`;
  frag = frag.replace('<footer>', staticNav + '<footer>');
  const ld = { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE_NAME, url: BASE_URL + '/', description: desc, inLanguage: 'en' };
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${SITE_NAME}: interactive what-if stories from your favorite series and movies</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${BASE_URL}/">
<meta property="og:site_name" content="${SITE_NAME}">
<meta property="og:type" content="website">
<meta property="og:title" content="${SITE_NAME}: interactive what-if stories">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${BASE_URL}/">
<meta property="og:image" content="${abs('/og/plotforks.png')}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${SITE_NAME}: interactive what-if stories">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${abs('/og/plotforks.png')}">
<meta name="theme-color" content="#22332D">
${FAVICON}
${links.join('')}${style}<script type="application/ld+json">${JSON.stringify(ld)}</script>
${analyticsTag()}
</head>
<body>
${frag}
</body>
</html>
`;
  write('index.html', html);
  pages.push({ path: '/', priority: '1.0' }); pageCount.home++;
}

/* ---------- static extras ---------- */
const FORK_SVG = (w) => `<svg width="${w}" height="${w}" viewBox="220 180 360 420" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="26"><path d="M400 560 V420" stroke="#EEF0E6"/><path d="M400 420 C400 350 290 330 270 250" stroke="#7FD3E8"/><path d="M400 420 V240" stroke="#EEF0E6"/><path d="M400 420 C400 350 510 330 530 250" stroke="#F2B45A"/></g><circle cx="270" cy="228" r="30" fill="#7FD3E8"/><circle cx="400" cy="218" r="30" fill="#EEF0E6"/><circle cx="530" cy="228" r="30" fill="#F2B45A"/><circle cx="400" cy="420" r="22" fill="#1A2823" stroke="#EEF0E6" stroke-width="10"/></svg>`;
const FORK_GREEN = (w) => FORK_SVG(w).replace(/#7FD3E8/g, '#3CFF6B').replace(/#F2B45A/g, '#B8F5C4').replace(/#EEF0E6/g, '#B8F5C4').replace('#1A2823', '#050A06');

function buildStatics(){
  write('site.css', STYLE + EXTRA_CSS);
  write('favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="200 170 400 460"><rect x="200" y="170" width="400" height="460" rx="60" fill="#22332D"/>${FORK_SVG(1).replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '')}</svg>`);
  write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n`);
  write('CNAME', BASE_URL.replace(/^https?:\/\//, '') + '\n');
  write('.nojekyll', '');
  const notFound = shell({
    path: '/404.html', title: `Page not found | ${SITE_NAME}`, description: 'This page does not exist. Head back to the what-if stories.', noindex: true,
    crumbs: [['Home', '/']],
    body: `<h1>This timeline does not exist</h1>\n<p>The page you wanted is not here. Maybe you took the wrong fork.</p>\n<a class="playbig" href="/">Back to plotforks</a>`
  });
  write('404.html', notFound);
  pageCount.meta++;
}

function buildSitemap(){
  const now = new Date().toISOString().slice(0, 10);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    pages.map(p => `  <url><loc>${abs(p.path)}</loc><lastmod>${now}</lastmod><priority>${p.priority}</priority></url>`).join('\n') + '\n</urlset>\n';
  write('sitemap.xml', xml);
  return pages.length;
}

/* ---------- headless Edge: social cards, cover ---------- */
const EDGE = EDGE_CANDIDATES.find(p => fs.existsSync(p));
function cardHtml(c, w, h){
  const S = JOURNEY_SITE[c.journeyId] || {};
  const matrix = S.theme === 'matrix';
  const bg = matrix ? '#050A06' : '#22332D', fg = matrix ? '#B8F5C4' : '#EEF0E6', accent = matrix ? '#3CFF6B' : '#F2B45A', dim = matrix ? '#7FBF8E' : '#A8B7AD';
  const fontD = matrix ? "'Share Tech Mono', monospace" : "'Cabin Sketch', 'Chalkboard SE', cursive";
  const fontM = matrix ? "'Share Tech Mono', monospace" : "'JetBrains Mono', monospace";
  const name = c.title, len = name.length;
  const size = len <= 16 ? 112 : len <= 26 ? 92 : len <= 36 ? 74 : 60;
  const kicker = c.kind === 'ending' ? (c.exit ? 'AN EARLY ENDING' : 'CAN YOU REACH THIS ENDING?') : 'INTERACTIVE WHAT-IF';
  let rain = '';
  if (matrix){
    const g = '01ｱｲｳｴｵｶｷｸｹｺﾅﾆﾇﾈﾊﾋﾌ';
    for (let i = 0; i < 40; i++){ const x = 12 + i * 30; let col = ''; for (let k = 0; k < 12; k++) col += `<div style="opacity:${(0.08 + ((i * 7 + k * 5) % 10) / 60).toFixed(2)}">${g[(i * 3 + k * 5) % g.length]}</div>`; rain += `<div style="position:absolute;left:${x}px;top:${-((i * 53) % 200)}px;font:22px ${fontM};line-height:26px;color:#3CFF6B;text-align:center">${col}</div>`; }
  } else {
    rain = `<div style="position:absolute;inset:0;background:radial-gradient(900px 400px at 15% -10%,rgba(238,240,230,.08),transparent 60%),radial-gradient(700px 500px at 105% 55%,rgba(127,211,232,.07),transparent 60%)"></div>
    <svg style="position:absolute;right:-30px;bottom:-40px;opacity:.13" width="560" height="560" viewBox="0 0 800 800"><g fill="none" stroke="#EEF0E6" stroke-width="18" stroke-linecap="round"><path d="M0 700 C200 650 300 500 420 420 S640 300 800 120"/><path d="M0 760 C220 700 340 600 460 520 S680 440 800 360"/></g></svg>`;
  }
  if (c.kind === 'cover'){
    return `<!doctype html><meta charset="utf-8">${FONTS_LINK}<body style="margin:0;width:${w}px;height:${h}px;overflow:hidden;background:#22332D;position:relative;font-family:${fontD}">
    <div style="position:absolute;inset:0;background:radial-gradient(500px 300px at 30% 0%,rgba(238,240,230,.09),transparent 60%),#22332D"></div>
    <div style="position:absolute;left:0;right:0;top:44px;text-align:center">${FORK_SVG(210)}</div>
    <div style="position:absolute;left:0;right:0;top:268px;text-align:center;font:700 92px/1 'Cabin Sketch',cursive;color:#EEF0E6">plotforks</div>
    <div style="position:absolute;left:0;right:0;top:372px;text-align:center;font:600 22px/1.4 'JetBrains Mono',monospace;color:#A8B7AD">Change the story. Find every ending.</div>
    <div style="position:absolute;left:0;right:0;top:420px;text-align:center;font:700 26px/1.3 'Cabin Sketch',cursive;color:#F2B45A">Breaking Bad · The Matrix</div></body>`;
  }
  if (c.kind === 'site'){
    return `<!doctype html><meta charset="utf-8">${FONTS_LINK}<body style="margin:0;width:${w}px;height:${h}px;overflow:hidden;background:#22332D;position:relative">
    <div style="position:absolute;inset:0;background:radial-gradient(900px 400px at 15% -10%,rgba(238,240,230,.08),transparent 60%)"></div>
    <div style="position:absolute;left:90px;top:120px">${FORK_SVG(340)}</div>
    <div style="position:absolute;left:520px;top:170px;font:700 128px/1 'Cabin Sketch',cursive;color:#EEF0E6">plotforks</div>
    <div style="position:absolute;left:526px;top:330px;width:600px;font:600 30px/1.4 'JetBrains Mono',monospace;color:#A8B7AD">Interactive what-if stories. Change the story at every turning point and find every ending.</div>
    <div style="position:absolute;left:526px;top:520px;font:700 34px/1 'Cabin Sketch',cursive;color:#F2B45A">plotforks.com</div></body>`;
  }
  return `<!doctype html><meta charset="utf-8">${FONTS_LINK}<body style="margin:0;width:${w}px;height:${h}px;overflow:hidden;background:${bg};position:relative;color:${fg}">
    ${rain}
    <div style="position:absolute;left:70px;top:64px;font:600 26px/1 ${fontM};letter-spacing:.14em;color:${accent}">${esc(kicker)}</div>
    <div style="position:absolute;left:70px;right:70px;top:120px;height:330px;display:flex;align-items:center;font:${matrix ? 400 : 700} ${size}px/1.05 ${fontD};text-wrap:balance">${esc(name)}</div>
    <div style="position:absolute;left:70px;right:70px;top:462px;font:600 30px/1.2 ${fontM};color:${dim}">${esc(c.sub || '')}</div>
    <div style="position:absolute;left:70px;bottom:44px;display:flex;align-items:center;gap:16px">${matrix ? FORK_GREEN(64) : FORK_SVG(64)}<span style="font:700 40px/1 ${fontD};color:${fg}">plotforks.com</span></div>
    </body>`;
}
function runEdge(htmlFile, outFile, w, h){
  return new Promise(resolve => {
    const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'pf-edge-'));
    const args = ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', `--user-data-dir=${profile}`,
      `--screenshot=${outFile}`, `--window-size=${w},${h}`, '--virtual-time-budget=4000', 'file:///' + htmlFile.replace(/\\/g, '/')];
    const child = cp.spawn(EDGE, args, { stdio: 'ignore' });
    const timer = setTimeout(() => child.kill(), 60000);
    child.on('exit', () => { clearTimeout(timer); rm(profile); resolve(fs.existsSync(outFile)); });
  });
}
async function renderCards(list, dirBase){
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'pf-cards-'));
  let done = 0, failed = 0, skipped = 0, i = 0;
  const queue = list.slice();
  async function worker(){
    while (queue.length){
      const c = queue.shift(); const n = i++;
      const out = path.join(dirBase, c.out);
      if (!FORCE && fs.existsSync(out) && fs.statSync(out).size > 2000){ skipped++; continue; }
      fs.mkdirSync(path.dirname(out), { recursive: true });
      const w = c.w || 1200, h = c.h || 630;
      const f = path.join(tmp, `c${n}.html`); fs.writeFileSync(f, cardHtml(c, w, h));
      const ok = await runEdge(f, out, w, h);
      ok ? done++ : failed++;
    }
  }
  await Promise.all([worker(), worker(), worker(), worker()]);
  rm(tmp);
  return { done, failed, skipped };
}

/* ---------- itch.io bundle ---------- */
function crcTable(){ const t = []; for (let n = 0; n < 256; n++){ let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; }
const CRC = crcTable();
const crc32 = buf => { let c = 0xFFFFFFFF; for (let i = 0; i < buf.length; i++) c = CRC[(c ^ buf[i]) & 255] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; };
function makeZip(entries){ // entries: [{name, data:Buffer}]
  const locals = [], centrals = []; let offset = 0;
  entries.forEach(e => {
    const name = Buffer.from(e.name, 'utf8'), raw = e.data, def = zlib.deflateRawSync(raw, { level: 9 });
    const useDef = def.length < raw.length, data = useDef ? def : raw, crc = crc32(raw);
    const lh = Buffer.alloc(30); lh.writeUInt32LE(0x04034b50, 0); lh.writeUInt16LE(20, 4); lh.writeUInt16LE(0x0800, 6);
    lh.writeUInt16LE(useDef ? 8 : 0, 8); lh.writeUInt16LE(0, 10); lh.writeUInt16LE(0x21, 12); lh.writeUInt32LE(crc, 14);
    lh.writeUInt32LE(data.length, 18); lh.writeUInt32LE(raw.length, 22); lh.writeUInt16LE(name.length, 26); lh.writeUInt16LE(0, 28);
    locals.push(lh, name, data);
    const ch = Buffer.alloc(46); ch.writeUInt32LE(0x02014b50, 0); ch.writeUInt16LE(20, 4); ch.writeUInt16LE(20, 6); ch.writeUInt16LE(0x0800, 8);
    ch.writeUInt16LE(useDef ? 8 : 0, 10); ch.writeUInt16LE(0, 12); ch.writeUInt16LE(0x21, 14); ch.writeUInt32LE(crc, 16);
    ch.writeUInt32LE(data.length, 20); ch.writeUInt32LE(raw.length, 24); ch.writeUInt16LE(name.length, 28); ch.writeUInt32LE(offset, 42);
    centrals.push(ch, name);
    offset += 30 + name.length + data.length;
  });
  const cd = Buffer.concat(centrals), end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(entries.length, 8); end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(cd.length, 12); end.writeUInt32LE(offset, 16);
  return Buffer.concat([...locals, cd, end]);
}
function buildItchHtml(){
  let frag = INDEX_SRC;
  frag = frag.replace(/<link [^>]*>\s*/g, '');                       // no network: fonts fall back to the system stack
  frag = frag.replace(/<title>[\s\S]*?<\/title>\s*/, '');
  frag = frag.replace(/<script src="(stories\/[^"]+)"><\/script>/g, (m, f) => {
    const code = fs.readFileSync(path.join(ROOT, f), 'utf8');
    if (/<\/script/i.test(code)) throw new Error('story file contains </script>: ' + f);
    return `<script>${code}</script>`;
  });
  return `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>plotforks: The Uncertainty Principle and There Is No Spoiler</title>\n</head>\n<body>\n${frag}\n</body>\n</html>\n`;
}

/* ---------- main ---------- */
(async function main(){
  rm(DIST); rm(ITCH);
  fs.mkdirSync(DIST, { recursive: true }); fs.mkdirSync(ITCH, { recursive: true });
  // rendered cards are cached in tools/.cache so rebuilds are fast (delete it or pass --force to re-render)
  const CACHE = path.join(__dirname, '.cache', 'og');
  Object.keys(JOURNEYS).forEach(id => buildJourney(JOURNEYS[id]));
  buildHome();
  buildStatics();
  copyDir(path.join(ROOT, 'stories'), path.join(DIST, 'stories'));
  copyDir(path.join(ROOT, 'assets'), path.join(DIST, 'assets'), f => !f.endsWith('.html'));
  const sitemapCount = buildSitemap();

  /* social cards (rendered into tools/.cache, then copied to dist/og) */
  const all = cards.concat([{ out: 'og/plotforks.png', kind: 'site', title: SITE_NAME, journeyId: 'breaking-bad' }]);
  let imgStats = { done: 0, failed: 0, skipped: 0 };
  if (NO_IMAGES) console.log('Skipping card rendering (--no-images).');
  else if (!EDGE) console.warn('Microsoft Edge not found; skipping card rendering.');
  else { imgStats = await renderCards(all, CACHE); }
  if (fs.existsSync(path.join(CACHE, 'og'))) copyDir(path.join(CACHE, 'og'), path.join(DIST, 'og'));
  const ogCount = (function count(d){ return fs.existsSync(d) ? fs.readdirSync(d).reduce((n, f) => { const p = path.join(d, f); return n + (fs.statSync(p).isDirectory() ? count(p) : (f.endsWith('.png') ? 1 : 0)); }, 0) : 0; })(path.join(DIST, 'og'));

  /* itch.io */
  const itchHtml = buildItchHtml();
  const qr = fs.readFileSync(path.join(ROOT, 'assets', 'paypal-qr.png'));
  fs.writeFileSync(path.join(ITCH, 'plotforks-itch.zip'), makeZip([{ name: 'index.html', data: Buffer.from(itchHtml, 'utf8') }, { name: 'assets/paypal-qr.png', data: qr }]));
  let coverOk = false;
  if (!NO_IMAGES && EDGE){
    const r = await renderCards([{ out: 'cover.png', kind: 'cover', title: SITE_NAME, journeyId: 'breaking-bad', w: 630, h: 500 }], path.join(__dirname, '.cache', 'itch'));
    if (fs.existsSync(path.join(__dirname, '.cache', 'itch', 'cover.png'))){ fs.copyFileSync(path.join(__dirname, '.cache', 'itch', 'cover.png'), path.join(ITCH, 'cover.png')); coverOk = true; }
  }

  const htmlCount = (function count(d){ return fs.readdirSync(d).reduce((n, f) => { const p = path.join(d, f); return n + (fs.statSync(p).isDirectory() ? count(p) : (f.endsWith('.html') && !p.includes(path.sep + 'assets' + path.sep) ? 1 : 0)); }, 0); })(DIST);
  const size = d => fs.readdirSync(d).reduce((n, f) => { const p = path.join(d, f); return n + (fs.statSync(p).isDirectory() ? size(p) : fs.statSync(p).size); }, 0);
  console.log('---- build summary ----');
  console.log('base URL:            ' + BASE_URL);
  console.log('HTML pages in dist/: ' + htmlCount + ` (home ${pageCount.home}, journey ${pageCount.journey}, chapter ${pageCount.chapter}, ending ${pageCount.ending}, 404 ${pageCount.meta})`);
  console.log('OG images in dist/:  ' + ogCount + ` (rendered ${imgStats.done}, reused ${imgStats.skipped}, failed ${imgStats.failed})`);
  console.log('sitemap URLs:        ' + sitemapCount);
  console.log('dist size:           ' + (size(DIST) / 1024 / 1024).toFixed(2) + ' MB');
  console.log('itch bundle:         ' + (fs.statSync(path.join(ITCH, 'plotforks-itch.zip')).size / 1024).toFixed(0) + ' KB zip, cover.png ' + (coverOk ? 'ok' : 'MISSING'));
  console.log('analytics token:     ' + (CF_TOKEN ? 'set' : 'empty (no beacon injected)'));
  if (imgStats.failed) process.exitCode = 1;
})().catch(e => { console.error(e); process.exit(1); });
