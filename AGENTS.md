# Portfolio agent instructions

Static personal portfolio built with Astro, React 19, TypeScript, and SCSS Modules. The Astro migration is implemented. Read `README.md` for routes, content editing, and deployment.

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

## Verification and deployment

After code changes, run lint, navigation tests, build, and `test:static`, in that order for the last two commands. Documentation-only edits need a diff check rather than a full build.

For navigation, language, layout, or styling changes, also check desktop and phone layouts. Verify the mobile menu, equivalent-page language links, project links, and content navigation without JavaScript.

The current build has eleven HTML pages and ten canonical sitemap entries. Static checks validate localized content, metadata, assets, links, fragments, and absence of hydrated React islands.

GitHub Actions builds pull requests and publishes `dist/` on pushes to `master`. Keep this output directory and the base path aligned with the workflow. Do not commit generated `dist/` or `.astro/` files.

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
