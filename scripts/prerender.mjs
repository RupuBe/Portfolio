// Runs after `vite build` + the SSR build (see package.json "build").
// 1. Injects the fully rendered page into dist/index.html (crawlers see real content).
// 2. Injects JSON-LD structured data generated from src/data/portfolio.ts.
// 3. Writes robots.txt, sitemap.xml and llms.txt into dist/.
import { readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import { loadEnv } from 'vite';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const env = loadEnv('production', root);
const base = (env.VITE_SITE_URL ?? '').trim().replace(/\/+$/, '');
const today = new Date().toISOString().slice(0, 10);

const ssr = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

const htmlPath = path.join(dist, 'index.html');
let html = await readFile(htmlPath, 'utf8');

const appHtml = ssr.render();
if (!html.includes('<div id="root"></div>')) throw new Error('prerender: <div id="root"></div> not found in dist/index.html');
html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

// `<` escaped so the JSON can never close the script tag early.
const ld = JSON.stringify(ssr.jsonLd(base, today)).replace(/</g, '\\u003c');
html = html.replace('</head>', `    <script type="application/ld+json">${ld}</script>\n  </head>`);

await writeFile(htmlPath, html);
await writeFile(path.join(dist, 'robots.txt'), ssr.robotsTxt(base));
await writeFile(path.join(dist, 'llms.txt'), ssr.llmsTxt(base));
if (base) await writeFile(path.join(dist, 'sitemap.xml'), ssr.sitemapXml(base, today));

await rm(ssrDir, { recursive: true, force: true });

console.log(`prerender: ${(appHtml.length / 1024).toFixed(0)} KB of HTML, JSON-LD, robots.txt, llms.txt${base ? ', sitemap.xml' : ''}`);
if (!base) {
  console.warn(
    '\n⚠  VITE_SITE_URL is empty in .env — no sitemap.xml, canonical link or absolute URLs were generated.\n' +
      '   Set it to the live address (e.g. https://ruprekha.vercel.app) and build again before deploying.\n',
  );
}
