# Portfolio agent instructions

Static personal portfolio built with Astro, React 19, TypeScript, and SCSS Modules. Astro owns the HTML document, page routes, and build. React remains in the content sections, rendered to static HTML during the build; the browser receives only a small navigation script for the menu and scroll controls and does not hydrate the React tree. Vite is used by the tooling, but there is no standalone `vite.config.ts` or browser-side React entry point. The migration from the Vite SPA is complete. `README.md` only describes what the project is; everything technical lives here.

## Commands

Use Node.js 24 from `.nvmrc` and npm. Keep `package-lock.json`.

```bash
npm ci                # install locked dependencies
npm run dev           # Astro dev server under /web-portfolio/
npm run lint          # ESLint
npm test              # Vitest navigation tests
npm run build         # Astro type checks, then static build into dist/
npm run test:static   # inspect generated HTML; requires build first
npm run preview       # serve the production build under /web-portfolio/
```

`build` runs Astro's TypeScript diagnostics before generating `dist/`. `test:static` checks the generated HTML, so run it after building. `dev` and `preview` serve the site under `/web-portfolio/`.

## Routes and metadata

- `/web-portfolio/`: English portfolio at the existing address, with a canonical link to `/web-portfolio/en/`.
- `/web-portfolio/en/` and `/web-portfolio/es/`: complete, static language versions.
- `/web-portfolio/{en,es}/projects/{slug}/`: localized case studies for each project, including existing projects no longer featured on the homepage.
- `/web-portfolio/sitemap.xml`: the twelve canonical portfolio and project URLs.

The language selector links to the equivalent page in the other language. Titles, descriptions, canonical URLs, language alternates, and Open Graph images are written into each page's HTML at build time. Portfolio content, language links, and project links work without JavaScript. The mobile menu, scroll-aware header, and back-to-top enhancement use `navigation.ts`. There are no API endpoints that require a running server.

## Architecture

```
astro.config.mjs                       # site, base path, static output, React integration
src/
  pages/index.astro                    # existing English entry address
  pages/[locale]/index.astro           # /en/ and /es/ portfolios
  pages/[locale]/projects/[slug].astro  # localized project pages
  pages/sitemap.xml.ts                 # sitemap generated at build time
  layouts/Page.astro                   # document, metadata, global document styles
  components/MainView/MainView.astro   # portfolio sections and labels
  components/MainView/navigation.ts    # browser menu and scroll behavior
  components/Header/Header.astro       # navigation and language links
  components/<Name>/<Name>.tsx         # React sections rendered at build time
  components/<Name>/<Name>.module.scss # scoped component styles
  data/projects.ts                     # project cards, detail pages, sitemap data
  i18n.ts                              # translations, locale mapping, URL helper
  locales/{en,es}.json                  # visible text
  styles/                              # existing SCSS token maps and helpers
scripts/check-build.mjs                # generated-page checks
vitest.config.ts                      # navigation test environment
```

Each component lives in its own folder with a co-located `.module.scss`. No global style files per component.

## Static rendering and navigation

- Render content into HTML at build time. React sections currently have no `client:*` hydration directives.
- Keep browser APIs in `navigation.ts` or Astro browser scripts. Do not access `window`, `document`, or `localStorage` from build-time code.
- Keep language selection as a link to the equivalent localized page. Content and project navigation must work without JavaScript.
- `navigation.ts` owns the mobile menu, Escape handling, scroll-aware header, back-to-top control, and language-link fragments. Preserve reduced-motion behavior and the existing `data-*` hooks shared with Astro markup.
- Do not restore the removed SPA entry files (`index.html`, `src/main.tsx`, `src/App.tsx`) or standalone `vite.config.ts`.

## Content, URLs, and metadata

- Use `translate(language)` from `src/i18n.ts`, with aligned keys in `src/locales/en.json` and `src/locales/es.json`. The old `useLanguage` hook has been removed.
- Define featured projects in `src/data/projects.ts`. Adding a project also requires translation keys and updating the expected slugs in `scripts/check-build.mjs`.
- Use `localizedPath()` and `import.meta.env.BASE_URL` for local links. Preserve the `/web-portfolio/` deployment base and trailing slashes.
- `Page.astro` owns titles, descriptions, canonical links, language alternates, and social metadata. Each project page must use its own description and preview image.
- The existing root address renders English with a canonical link to `/en/`. Include only canonical localized routes in the sitemap.
- Astro image imports expose metadata; use `.src`, `.width`, and `.height` when rendering them in React sections.

## Editing content

- Edit `src/locales/en.json` and `src/locales/es.json`, keeping their keys aligned. `translate(language)` provides `t(key)` for strings and `ta(key)` for arrays.
- Projects live in `src/data/projects.ts`: slug, title, translation keys, stack, image, repository URL, live URL and a `featured` flag. The homepage features **Nout, Nimvo, Sabotetris and Web Portfolio**, in that order. What Day Is Next remains available at its existing detail URLs without appearing in the featured cards.
- Each project needs `caseStudies.<slug>` paragraphs in both catalogs for `problem`, `architecture`, `decisions`, `quality` and `limitations`. Adding a catalog entry and its translations creates both detail pages and sitemap entries; `featured: true` also displays its card. The build checks list all expected slugs and the featured order explicitly; update both lists when changing the selection.
- Contact destinations live in `src/constants.ts`. Profile and project images live in `src/assets/`.
- To add a language, extend `locales`, `languages`, and `translations` in `src/i18n.ts`, add its catalog, and update the alternate-language navigation, metadata, and static checks, which currently target English and Spanish.

### CV privacy

The CV is available only on request through email or LinkedIn, not as a public download. Do not add CV files to `public/` or links to those files. Static checks reject the previous PDF/TXT assets in both `public/` and `dist/`, reject download links, and verify the contact options. Removing files from the deployed site does not erase previous Git revisions, caches or copies already downloaded. Do not claim metrics, language proficiency or test execution results without evidence.

## Verification and deployment

After code changes, run lint, navigation tests, build, and `test:static`, in that order for the last two commands. Documentation-only edits need a diff check rather than a full build.

For navigation, language, layout, or styling changes, also check desktop and phone layouts. Verify the mobile menu, equivalent-page language links, project links, and content navigation without JavaScript.

Vitest covers cumulative scroll movement, direction changes, the back-to-top threshold, reduced motion, menu navigation, Escape handling, and language-link fragments.

The current build has thirteen HTML pages and twelve canonical sitemap entries. Static checks validate all pages, aligned translation keys, localized content, metadata, local assets and fragments, absence of public CV files and download links, contact options, featured-project order, all five case-study sections, project destinations, external-link attributes, absence of hydrated React islands, and the sitemap.

GitHub Actions (`.github/workflows/deploy.yml`) runs tests, build, and generated-page checks, then publishes `dist/` on pushes to `master`. Pull requests build and check without publishing. No server adapter or deployment service is required. Keep the output directory and the base path aligned with the workflow. If the hosting address changes, update `site` and `base` in `astro.config.mjs`, the portfolio live URL, and the expected URLs in the static checks. Do not commit generated `dist/` or `.astro/` files.

## SCSS / Styling Rules

Always import the token file at the top of every `.module.scss`:

```scss
@use '../../styles/index.module' as *;
```

**Use token functions for all values — never hardcode:**

| Token type  | Function          | File                       |
|-------------|-------------------|----------------------------|
| Colors      | `color($key)`     | `_colors.module.scss`      |
| Spacing     | `space($key)`     | `_spacing.module.scss`     |
| Border radius | `radius($key)` | `_radius.module.scss`      |
| Font size   | `font-size($key)` | `_typography.module.scss`  |
| Font weight | `font-weight($key)` | `_typography.module.scss`|
| Font family | `$base-font`      | `_typography.module.scss`  |

**Exceptions:** large layout values with no token equivalent (e.g. `400px`, `1100px`, `clamp(...)`) may be written as-is.

**Units:**
- Use `px` for all fixed sizes
- Use `%` only for `width` and `height`
- Never use `rem`
- Avoid decimals in measurements (e.g. use `1px`, not `0.5px`)

**BEM naming:** components use BEM with SCSS nesting (`&__element`, `&--modifier`).

## Component Conventions

- React sections use functional components (React 19); Astro owns page composition and document markup
- No default exports from `index.ts` barrels — import directly from the component file
- Section titles and decorative lines are rendered by `MainView`, not by individual section components
- `MainView.module.scss` owns all `__sectionTitle` and `__sectionTitleLine` styles

## What NOT to do

- Do not add emojis or icons unless explicitly requested
- Do not use `rem`, `em`, or unitless values for spacing/sizes
- Do not hardcode colors — always use `color($key)`
- Do not create new token files; add new tokens to the existing maps
