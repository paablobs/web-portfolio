import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { JSDOM } from 'jsdom'

const dist = new URL('../dist/', import.meta.url)
const site = 'https://paablobs.github.io'
const base = '/web-portfolio/'
const files = readdirSync(dist, { recursive: true }).filter(file => file.endsWith('.html'))
const slugs = ['web-portfolio', 'nout', 'sabotetris', 'what-day-is-next']
const expected = ['index.html', ...['en', 'es'].flatMap(locale => [
  `${locale}/index.html`, ...slugs.map(slug => `${locale}/projects/${slug}/index.html`),
])]
assert.deepEqual([...files].sort(), [...expected].sort())

for (const file of files) {
  const path = file.replace(/index\.html$/, '')
  const { document } = new JSDOM(readFileSync(new URL(file, dist), 'utf8'), { url: `${site}${base}${path}` }).window
  const locale = file.startsWith('es/') ? 'es' : 'en'
  const canonicalPath = file === 'index.html' ? 'en/' : path
  const canonical = `${site}${base}${canonicalPath}`
  assert.equal(document.documentElement.lang, locale, file)
  assert.equal(document.querySelector('link[rel="canonical"]')?.href, canonical, file)
  assert.equal(document.querySelector('meta[property="og:url"]')?.content, canonical, file)
  assert.ok(document.title.includes('Pablo Bessone'), file)
  assert.ok(document.querySelector('meta[name="description"]')?.content.length > 30, file)
  assert.equal(document.querySelectorAll('h1').length, 1, file)
  assert.equal(document.querySelector('astro-island'), null, `Unexpected client hydration: ${file}`)

  const alternateLanguage = locale === 'es' ? 'en' : 'es'
  const alternatePath = canonicalPath.replace(/^(en|es)\//, `${alternateLanguage}/`)
  assert.equal(document.querySelector('[data-language-link]')?.getAttribute('href'), `${base}${alternatePath}`, file)
  for (const language of ['en', 'es']) {
    assert.equal(document.querySelector(`link[hreflang="${language}"]`)?.href,
      `${site}${base}${canonicalPath.replace(/^(en|es)\//, `${language}/`)}`, file)
  }
  if (!file.includes('/projects/')) {
    assert.ok(document.body.textContent.includes(locale === 'es' ? 'Sobre mí' : 'About'), file)
    assert.ok(document.body.textContent.includes(locale === 'es' ? 'Desarrollo productos web' : 'I build reliable web products'), file)
    for (const slug of slugs) {
      assert.ok(document.querySelector(`a[href="${base}${locale}/projects/${slug}/"]`), file)
    }
  } else {
    assert.ok(document.querySelector('a[href$="#work"]'), file)
  }

  for (const element of document.querySelectorAll('[href], [src], meta[property="og:image"]')) {
    const raw = element.getAttribute('href') ?? element.getAttribute('src') ?? element.getAttribute('content')
    if (!raw || /^(mailto:|tel:|data:)/.test(raw)) continue
    if (element.getAttribute('target') === '_blank') {
      assert.match(raw, /^https:\/\//, file)
      assert.ok(element.getAttribute('rel')?.includes('noopener'), file)
      assert.ok(element.getAttribute('rel')?.includes('noreferrer'), file)
      continue
    }
    const url = new URL(raw, `${site}${base}${path}`)
    if (url.origin !== site) continue
    assert.ok(url.pathname.startsWith(base), `Missing base path in ${file}: ${url}`)
    const target = url.pathname.slice(base.length)
    const targetFile = target.endsWith('/') ? `${target}index.html` : target
    assert.ok(existsSync(join(dist.pathname, decodeURIComponent(targetFile))), `Broken local URL in ${file}: ${url}`)
    if (url.hash && targetFile.endsWith('.html')) {
      const targetDocument = new JSDOM(readFileSync(new URL(targetFile, dist), 'utf8')).window.document
      assert.ok(targetDocument.getElementById(decodeURIComponent(url.hash.slice(1))), `Broken fragment in ${file}: ${url}`)
    }
  }
}

const sitemap = new JSDOM(readFileSync(new URL('sitemap.xml', dist), 'utf8'), { contentType: 'application/xml' }).window.document
assert.equal(sitemap.querySelectorAll('loc').length, 10)
console.log(`Checked ${files.length} static pages: localized content, metadata, assets, navigation, project links and sitemap.`)
