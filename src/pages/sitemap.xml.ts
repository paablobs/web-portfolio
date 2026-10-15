import type { APIRoute } from 'astro'
import { locales, localizedPath } from '../i18n'
import { projects } from '../data/projects'

export const GET: APIRoute = ({ site }) => {
  const paths = ['', ...projects.map(project => `projects/${project.slug}`)]
  const urls = locales.flatMap(locale => paths.map(path => new URL(localizedPath(import.meta.env.BASE_URL, locale, path), site)))
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(url => `<url><loc>${url}</loc></url>`).join('')}</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}
