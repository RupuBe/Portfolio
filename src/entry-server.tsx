// Build-time entry: renders the whole page to HTML so crawlers that don't run
// JavaScript (most AI answer engines) still see every word. Used only by
// scripts/prerender.mjs; the browser hydrates the result (see main.tsx).
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

export { jsonLd, llmsTxt, robotsTxt, sitemapXml } from './seo';

export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
