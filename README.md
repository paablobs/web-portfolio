# Web Portfolio

Bilingual portfolio for Pablo Bessone, a full stack developer with a frontend focus and professional experience in React, TypeScript, Node.js/NestJS, APIs and ERP integrations. The homepage separates professional experience from technologies explored in personal projects; case studies document implementation, tradeoffs, testing and limitations.

Built with Astro, React, TypeScript, and SCSS Modules. Astro renders the React sections to static HTML during the build. The browser receives a small navigation script for the menu and scroll controls; it does not hydrate the React tree.

The migration from the Vite SPA is implemented. Astro now owns the HTML document, page routes, and build. React remains in the content sections, and the existing design tokens and SCSS Modules are preserved. Vite is still used by the tooling, but there is no standalone `vite.config.ts` or browser-side React entry point.

## Development

Use Node.js 24, as specified in `.nvmrc`, and npm.

```sh
npm ci
npm run dev
npm run lint
npm test
npm run build
npm run test:static
npm run preview
```

`build` runs Astro's TypeScript diagnostics before generating `dist/`. `test:static` checks the generated HTML, so run it after building. `dev` and `preview` serve the site under `/web-portfolio/`.

## Routes and metadata

- `/web-portfolio/`: English portfolio at the existing address, with a canonical link to `/web-portfolio/en/`.
- `/web-portfolio/en/` and `/web-portfolio/es/`: complete, static language versions.
- `/web-portfolio/{en,es}/projects/{slug}/`: localized case studies for each project, including existing projects no longer featured on the homepage.
- `/web-portfolio/sitemap.xml`: the twelve canonical portfolio and project URLs.

The language selector links to the equivalent page in the other language. Titles, descriptions, canonical URLs, language alternates, and Open Graph images are written into each page's HTML at build time. Portfolio content, language links, and project links work without JavaScript. The mobile menu, scroll-aware header, and back-to-top enhancement use `navigation.ts`.

## Code map

```text
astro.config.mjs                      site URL, base path, static output, React integration
src/pages/index.astro                 existing entry address
src/pages/[locale]/index.astro        English and Spanish portfolio pages
src/pages/[locale]/projects/[slug].astro
src/pages/sitemap.xml.ts
src/layouts/Page.astro                document and localized metadata
src/components/MainView/             page composition, scroll/menu script, shared styles
src/components/Header/               static navigation and language links
src/components/{Summary,About,Experience,Work,Contact}/
src/data/projects.ts                  project catalog, featured selection and case-study sections
src/i18n.ts                           translation lookup and localized URLs
src/locales/{en,es}.json              visible text
src/styles/                          shared SCSS tokens
scripts/check-build.mjs               generated-page checks
```

The existing React content components render only during compilation. Header and MainView are Astro components. There are no API endpoints that require a running server.

`AGENTS.md` contains the implementation rules for this structure. Global document styles belong to `Page.astro`; component styles remain in their co-located SCSS Modules. Browser-only behavior belongs to `src/components/MainView/navigation.ts`, rather than React effects or build-time page code.

## Editing content

Edit `src/locales/en.json` and `src/locales/es.json`, keeping their keys aligned. `translate(language)` provides `t(key)` for strings and `ta(key)` for arrays.

Projects live in `src/data/projects.ts`: slug, title, translation keys, stack, image, repository URL, live URL and a `featured` flag. The homepage features **Nout, Nimvo, Sabotetris and Web Portfolio**, in that order. What Day Is Next remains available at its existing detail URLs without appearing in the featured cards.

Each project needs `caseStudies.<slug>` paragraphs in both catalogs for `problem`, `architecture`, `decisions`, `quality` and `limitations`. Adding a catalog entry and its translations creates both detail pages and sitemap entries; `featured: true` also displays its card. The build checks list all expected slugs and the featured order explicitly; update both lists when changing the selection.

The CV is available only on request through email or LinkedIn, not as a public download. Do not add CV files to `public/` or links to those files. Static checks reject the previous PDF/TXT assets in both `public/` and `dist/`, reject download links, and verify the contact options. Removing files from the deployed site does not erase previous Git revisions, caches or copies already downloaded. No metrics, language proficiency or test execution results should be claimed without evidence.

Contact destinations live in `src/constants.ts`. Profile and project images live in `src/assets/`; Astro image imports expose `src`, `width`, and `height`.

To add a language, extend `locales`, `languages`, and `translations` in `src/i18n.ts`, add its catalog, and update the alternate-language navigation, metadata, and static checks, which currently target English and Spanish.

## Styling

Components retain their co-located SCSS Modules and existing design tokens. Import the token helpers before writing component styles:

```scss
@use '../../styles/index.module' as *;
```

Use `color()`, `space()`, `radius()`, `font-size()`, `font-weight()`, and `line-height()` for values covered by the existing maps. Keep fixed sizes in pixels and BEM selectors. MainView owns section labels and separators.

## Verification and deployment

Vitest covers cumulative scroll movement, direction changes, the back-to-top threshold, reduced motion, menu navigation, Escape handling, and language-link fragments. The static checks verify all thirteen HTML pages, aligned translation keys, localized content, metadata, local assets and fragments, absence of public CV files and download links, contact options, featured-project order, all five case-study sections, project destinations, external-link attributes, absence of hydrated React islands, and the twelve-entry sitemap.

The existing GitHub Actions workflow runs tests, build, and generated-page checks, then publishes `dist/` on pushes to `master`. Pull requests build and check without publishing. No server adapter or deployment service is required. If the hosting address changes, update `site` and `base` in `astro.config.mjs`, the portfolio live URL, and the expected URLs in the static checks.
