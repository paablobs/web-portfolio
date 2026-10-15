# Web Portfolio

Personal portfolio built with Astro, React, TypeScript, and SCSS Modules. Astro renders the React sections to static HTML during the build. The browser receives a small navigation script for the menu and scroll controls; it does not hydrate the React tree.

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
- `/web-portfolio/{en,es}/projects/{slug}/`: localized pages for each featured project.
- `/web-portfolio/sitemap.xml`: the ten canonical portfolio and project URLs.

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
src/data/projects.ts                  featured project definitions
src/i18n.ts                           translation lookup and localized URLs
src/locales/{en,es}.json              visible text
src/styles/                          shared SCSS tokens
scripts/check-build.mjs               generated-page checks
```

The existing React content components render only during compilation. Header and MainView are Astro components. There are no API endpoints that require a running server.

`AGENTS.md` contains the implementation rules for this structure. Global document styles belong to `Page.astro`; component styles remain in their co-located SCSS Modules. Browser-only behavior belongs to `src/components/MainView/navigation.ts`, rather than React effects or build-time page code.

## Editing content

Edit `src/locales/en.json` and `src/locales/es.json`, keeping their keys aligned. `translate(language)` provides `t(key)` for strings and `ta(key)` for arrays.

Featured projects live in `src/data/projects.ts`: slug, title, translation keys, stack, image, repository URL, and live URL. Adding a project there and its text to both catalogs creates its card, both detail pages, and sitemap entries. The build checks list the expected project slugs explicitly; update that list when adding one.

Contact destinations live in `src/constants.ts`. Profile and project images live in `src/assets/`; Astro image imports expose `src`, `width`, and `height`.

To add a language, extend `locales`, `languages`, and `translations` in `src/i18n.ts`, add its catalog, and update the alternate-language navigation, metadata, and static checks, which currently target English and Spanish.

## Styling

Components retain their co-located SCSS Modules and existing design tokens. Import the token helpers before writing component styles:

```scss
@use '../../styles/index.module' as *;
```

Use `color()`, `space()`, `radius()`, `font-size()`, `font-weight()`, and `line-height()` for values covered by the existing maps. Keep fixed sizes in pixels and BEM selectors. MainView owns section labels and separators.

## Verification and deployment

Vitest covers cumulative scroll movement, direction changes, the back-to-top threshold, reduced motion, menu navigation, Escape handling, and language-link fragments. The static checks verify all eleven HTML pages, localized content, metadata, local assets and fragments, project destinations, external-link attributes, absence of hydrated React islands, and the sitemap.

The existing GitHub Actions workflow runs tests, build, and generated-page checks, then publishes `dist/` on pushes to `master`. Pull requests build and check without publishing. No server adapter or deployment service is required. If the hosting address changes, update `site` and `base` in `astro.config.mjs`, the portfolio live URL, and the expected URLs in the static checks.
