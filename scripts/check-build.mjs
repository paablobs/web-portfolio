import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { JSDOM } from 'jsdom'

const dist = new URL('../dist/', import.meta.url)
const site = 'https://paablobs.github.io'
const base = '/web-portfolio/'
const files = readdirSync(dist, { recursive: true }).filter(file => file.endsWith('.html'))
const slugs = ['nout', 'nimvo', 'sabotetris', 'web-portfolio', 'what-day-is-next']
const featuredSlugs = ['nout', 'nimvo', 'sabotetris', 'web-portfolio']
const caseStudySections = ['problem', 'architecture', 'decisions', 'quality', 'limitations']
const cvFilename = 'Pablo_Bessone_CV.pdf'
const sourceCv = readFileSync(new URL(`../public/${cvFilename}`, import.meta.url))
const builtCv = readFileSync(new URL(cvFilename, dist))
assert.equal(sourceCv.subarray(0, 5).toString('ascii'), '%PDF-', 'CV must be a real PDF')
assert.ok(sourceCv.subarray(-1024).toString('ascii').includes('%%EOF'), 'CV must have a PDF end marker')
assert.deepEqual(builtCv, sourceCv, 'Built CV must match the public PDF byte for byte')
const catalogs = Object.fromEntries(['en', 'es'].map(locale => [locale,
  JSON.parse(readFileSync(new URL(`../src/locales/${locale}.json`, import.meta.url), 'utf8')),
]))
const shape = value => Array.isArray(value) ? 'string[]'
  : typeof value === 'object' ? Object.fromEntries(Object.entries(value).map(([key, child]) => [key, shape(child)]))
    : typeof value
assert.deepEqual(shape(catalogs.en), shape(catalogs.es), 'Translation catalogs must have aligned keys and value types')
for (const [locale, catalog] of Object.entries(catalogs)) {
  for (const slug of slugs) {
    for (const section of caseStudySections) {
      const paragraphs = catalog.caseStudies[slug]?.[section]
      assert.ok(Array.isArray(paragraphs) && paragraphs.length > 0 && paragraphs.every(text => typeof text === 'string' && text.length > 20),
        `Missing case-study paragraphs: ${locale}/${slug}/${section}`)
    }
  }
}
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
    assert.equal(document.querySelector('h1')?.textContent, 'Pablo Bessone', file)
    assert.ok(document.body.textContent.includes(catalogs[locale].summary.eyebrow), file)
    assert.ok(document.body.textContent.includes(catalogs[locale].experience.pshPeriod), file)
    const cv = document.querySelector('a[download]')
    assert.equal(cv?.getAttribute('href'), `${base}${cvFilename}`, file)
    assert.equal(cv?.getAttribute('download'), cvFilename, file)
    assert.equal(cv?.getAttribute('type'), 'application/pdf', file)
    assert.equal(cv?.textContent, catalogs[locale].summary.cv, file)
    const cards = [...document.querySelectorAll('#work article')]
    assert.equal(cards.length, featuredSlugs.length, file)
    for (const [index, slug] of featuredSlugs.entries()) {
      assert.ok(cards[index].querySelector(`h3 a[href="${base}${locale}/projects/${slug}/"]`), `Featured order: ${file}/${slug}`)
      assert.ok(cards[index].querySelector('a').textContent.length > 0, file)
      const caseStudyLink = [...cards[index].querySelectorAll('a')].find(link => link.textContent === catalogs[locale].work.caseStudy)
      assert.equal(caseStudyLink?.getAttribute('href'), `${base}${locale}/projects/${slug}/`, file)
    }
    assert.ok(!document.querySelector(`a[href="${base}${locale}/projects/what-day-is-next/"]`), file)
  } else {
    assert.ok(document.querySelector('a[href$="#work"]'), file)
    const slug = file.split('/')[2]
    for (const section of caseStudySections) {
      const heading = document.getElementById(`case-${section}`)
      assert.equal(heading?.tagName, 'H2', file)
      assert.equal(heading?.textContent, catalogs[locale].work[`${section}Title`], file)
      for (const paragraph of catalogs[locale].caseStudies[slug][section]) {
        assert.ok(heading.parentElement.textContent.includes(paragraph), `${file}: ${section}`)
      }
    }
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
const expectedUrls = ['en', 'es'].flatMap(locale => [
  `${site}${base}${locale}/`, ...slugs.map(slug => `${site}${base}${locale}/projects/${slug}/`),
])
assert.deepEqual([...sitemap.querySelectorAll('loc')].map(loc => loc.textContent).sort(), expectedUrls.sort())
console.log(`Checked ${files.length} static pages: aligned catalogs, localized content, metadata, assets, navigation, CV download, featured order, case studies and sitemap.`)
