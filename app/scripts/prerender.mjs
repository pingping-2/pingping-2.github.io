import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { createServer, loadEnv } from 'vite'

const env = loadEnv('production', process.cwd(), '')
const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  mode: 'production',
})
try {
  const { default: App } = await server.ssrLoadModule('/src/App.tsx')
  const { createElement } = await import('react')
  const { renderToString } = await import('react-dom/server')
  const { profile } = await server.ssrLoadModule('/src/data/portfolio.ts')
  const file = resolve('dist/index.html')
  let html = await readFile(file, 'utf8')
  html = html.replace('<!--app-html-->', renderToString(createElement(App)))
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    alternateName: profile.englishName,
    description: profile.intro,
    email: `mailto:${profile.email}`,
    sameAs: [profile.github],
  }
  let site
  if (env.VITE_SITE_URL) {
    site = new URL(env.VITE_SITE_URL.endsWith('/') ? env.VITE_SITE_URL : `${env.VITE_SITE_URL}/`)
    if (!['https:', 'http:'].includes(site.protocol))
      throw new Error('VITE_SITE_URL must be an http(s) URL')
    person.url = site.href
    const imageUrl = new URL('og-image.png', site).href
    html = html.replace(
      /(<meta (?:property="og:image"|name="twitter:image") content=")[^"]+("\s*\/>)/g,
      `$1${imageUrl}$2`,
    )
    html = html.replace(
      '</head>',
      `    <link rel="canonical" href="${site.href}" />\n    <meta property="og:url" content="${site.href}" />\n  </head>`,
    )
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${site.href.replace(/&/g, '&amp;')}</loc></url></urlset>`
    await writeFile('dist/sitemap.xml', sitemap)
  }
  html = html.replace(
    '</head>',
    `    <script type="application/ld+json">${JSON.stringify(person).replace(/</g, '\\u003c')}</script>\n  </head>`,
  )
  await writeFile(file, html)
  await writeFile(
    'dist/robots.txt',
    `User-agent: *\nAllow: /\n${site ? `Sitemap: ${new URL('sitemap.xml', site).href}\n` : ''}`,
  )
  console.log('Prerendered portfolio HTML and generated search metadata.')
} finally {
  await server.close()
}
