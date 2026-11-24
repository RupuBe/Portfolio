# Ruprekha Behera — Portfolio

Personal portfolio built with React, TypeScript, Vite, Tailwind CSS and Framer Motion.

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build
npm run lint
```

## Editing content

Almost everything on the page comes from **`src/data/portfolio.ts`**:

| What | Field |
|---|---|
| Name, roles, tagline, intro, About text | `profile` |
| Email, phone, location | `profile.email` / `phone` / `location` |
| LinkedIn, GitHub, Behance, Instagram | `socials` — set `href: null` to hide an icon |
| Year shown as '26 and in the footer | `site.year` |
| Résumé file name (in `public/`) | `site.resumeFile` |
| "Numbers that speak" | `achievements` |
| Work experience | `experience` |
| Article cards | `articles` — `url: null` shows "Link coming soon" |
| Technical projects | `technicalProjects` — add an object to add a project |
| Skills, education, certifications | `skills`, `education`, `certifications` |

## Theme

Colours are defined once as CSS variables in `src/index.css` (`:root`) and exposed
to Tailwind as `cream`, `ink`, `warm` (gold) and `proj-*` in `tailwind.config.js`.
Fonts (Bebas Neue, Archivo Black, Space Grotesk) are set in `tailwind.config.js`
as `font-display`, `font-poster` and `font-sans`.

## Updating the résumé

Replace `public/Ruprekha_Behera_Resume.pdf` with the new PDF (same name), or change
`site.resumeFile` to match the new file name.

## Deploying

Set `VITE_SITE_URL` in `.env` to the live URL (e.g. `https://ruprekha.vercel.app`, no
trailing slash) and run `npm run build`. The build then:

- pre-renders the whole page into `dist/index.html`, so Google and AI crawlers that don't
  run JavaScript (ChatGPT, Perplexity, Claude) see the full content;
- adds the canonical link and absolute Open Graph URLs (link previews on LinkedIn, WhatsApp, X);
- generates JSON-LD structured data (Person, ProfilePage, WebSite, Articles, FAQPage),
  `robots.txt`, `sitemap.xml` and `llms.txt`, all from `src/data/portfolio.ts`.

Without `VITE_SITE_URL` the build still works but prints a warning and skips `sitemap.xml`.

## Getting indexed (SEO / AEO / GEO)

1. Deploy with `VITE_SITE_URL` set.
2. Google Search Console (search.google.com/search-console) → **Add property** → **URL prefix**
   → your URL → **HTML tag**. Copy the `content="…"` value into `VITE_GOOGLE_SITE_VERIFICATION`
   in `.env`, rebuild, redeploy, then click **Verify**.
3. In Search Console: **Sitemaps** → submit `sitemap.xml`; then **URL inspection** → your URL →
   **Request indexing**.
4. Bing Webmaster Tools (bing.com/webmasters) → **Import from Google Search Console**. Bing's
   index feeds ChatGPT search and Copilot.
5. Put the portfolio URL on LinkedIn (Contact info + Featured), the GitHub profile (website field
   and a profile README) and every Freelysta author bio. Those links are how Google and AI
   assistants connect "Ruprekha Behera" to this site.
6. Check with Google's Rich Results Test (search.google.com/test/rich-results) and
   PageSpeed Insights.

Keep the FAQ answers in `portfolio.ts` (`faqs`) factual and current. Answer engines quote them.
