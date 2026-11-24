import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Crawlers need absolute URLs. When VITE_SITE_URL is set (see .env), add
 * canonical + og:url and make the og/twitter image URLs absolute.
 * When VITE_GOOGLE_SITE_VERIFICATION is set, add the Search Console tag.
 * (Structured data, robots.txt, sitemap.xml and llms.txt: scripts/prerender.mjs.)
 */
function siteMeta(url: string, googleVerification: string): Plugin {
  const base = url.trim().replace(/\/+$/, '')
  const verification = googleVerification.trim()
  return {
    name: 'site-meta',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        if (verification) {
          html = html.replace(
            '<meta name="robots"',
            `<meta name="google-site-verification" content="${verification}" />\n    <meta name="robots"`,
          )
        }
        if (!base) return html
        return html
          .replace(/(property="og:image"|name="twitter:image") content="\//g, `$1 content="${base}/`)
          .replace(
            '<meta property="og:type"',
            `<link rel="canonical" href="${base}/" />\n    <meta property="og:url" content="${base}/" />\n    <meta property="og:type"`,
          )
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [react(), siteMeta(env.VITE_SITE_URL ?? '', env.VITE_GOOGLE_SITE_VERIFICATION ?? '')],
  }
})
