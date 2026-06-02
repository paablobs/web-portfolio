# Web Portfolio

A minimal, content-driven personal portfolio built with **React 19**, **TypeScript**, **Vite**, and **SCSS Modules**.

The codebase is intentionally generic: there is no hardcoded copy in components and no hardcoded visual values in styles. To make it your own, you only need to edit JSON files and design tokens — no component changes required.

## Quick Start

```bash
npm install
npm run dev        # start dev server
npm run build      # type-check + production build
npm run lint       # eslint
npm run preview    # preview production build
```

## Project Structure

```
src/
  components/<Name>/<Name>.tsx          # component
  components/<Name>/<Name>.module.scss  # co-located scoped styles
  hooks/useLanguage.ts                  # i18n hook (t / ta)
  locales/                              # translation JSON files
    en.json
    es.json
  styles/                               # design tokens (SCSS)
    _colors.module.scss
    _spacing.module.scss
    _radius.module.scss
    _typography.module.scss
    _index.module.scss                  # forwards tokens + helper functions
  App.tsx
  main.tsx
```

Each component lives in its own folder with a co-located `.module.scss`. There are no global style files per component.

## How It Works

### 1. Internationalization (i18n)

All visible text is sourced from JSON files in `src/locales/`. Components consume text through the `useLanguage` hook:

```tsx
import { useLanguage } from '../../hooks/useLanguage'

const MyComponent = () => {
    const { t, ta, language } = useLanguage('ENGLISH')
    return (
        <>
            <h1>{t('summary.title')}</h1>
            <ul>{ta('summary.techStack').map(item => <li key={item}>{item}</li>)}</ul>
        </>
    )
}
```

- `t(key)` resolves a dot-notation key (e.g. `summary.title`) to a **string**.
- `ta(key)` resolves a key to a **string array** (e.g. lists of responsibilities, tech stack).
- The current language is held in `MainView` state and passed down as a prop, so toggling re-renders the whole tree.

The document `<title>` is set at boot from `en.json#index.htmlTitle` in `src/main.tsx`.

### 2. Customizing the Text (EN / ES)

To change what the portfolio says, just edit the JSON files. Keys must stay identical across files so the same component works for both languages.

`src/locales/en.json` and `src/locales/es.json` share this shape:

```json
{
  "index":      { "htmlTitle": "..." },
  "header":     { "brand": "...", "navAbout": "...", "navExperience": "...", "navProjects": "...", "navContact": "..." },
  "summary":    { "eyebrow": "...", "title": "...", "description": "...", "techStack": ["..."], "avatarAlt": "..." },
  "about":      { "text1": "...", "text2": "...", "text3": "...", "text4": "...", "stackTitle": "..." },
  "experience": { "highlightsLabel": "...", "pshTitle": "...", "pshResponsibilities": ["..."], "pshHighlights": ["..."], "futitTitle": "...", "futitResponsibilities": ["..."], "futitHighlights": ["..."] },
  "work":       { "code": "...", "live": "...", "noutDescription": "...", "noutImageAlt": "...", "whatDayIsNextDescription": "...", "whatDayIsNextImageAlt": "..." },
  "contact":    { "tagline": "...", "linkedin": "...", "github": "...", "location": "..." },
  "mainView":   { "sectionAbout": "...", "sectionExperience": "...", "sectionProjects": "...", "sectionContact": "...", "scrollToTop": "..." }
}
```

Just replace the strings. Arrays (tech stack, responsibilities, highlights) accept any number of items.

### 3. Adding a New Language

To add, for example, Portuguese:

1. **Create the JSON file** mirroring the structure of `en.json`:
   ```
   src/locales/pt.json
   ```

2. **Register the language** in `src/hooks/useLanguage.ts`:
   ```ts
   import pt from '../locales/pt.json'

   export type Language = 'ENGLISH' | 'SPANISH' | 'PORTUGUESE'

   const translations: Record<Language, Record<string, unknown>> = {
       ENGLISH: en,
       SPANISH: es,
       PORTUGUESE: pt,
   }
   ```

3. **Add the toggle label** in `src/components/Header/Header.tsx`:
   ```ts
   const LANG_LABEL: Record<Language, string> = {
       ENGLISH: 'EN',
       SPANISH: 'ES',
       PORTUGUESE: 'PT',
   }
   ```

4. **Update the toggle logic** in `src/components/MainView/MainView.tsx` to cycle through the new set:
   ```ts
   const LANGS: Language[] = ['ENGLISH', 'SPANISH', 'PORTUGUESE']
   const handleLanguageToggle = () => {
       setLanguage(prev => LANGS[(LANGS.indexOf(prev) + 1) % LANGS.length])
   }
   ```

That's it — no component code needs to change. The whole UI will render in the new language as long as every key in the JSON is present.

### 4. Design Tokens

All visual values come from SCSS token maps in `src/styles/`. Components consume them through helper functions:

| Token type    | Function           | File                       |
|---------------|--------------------|----------------------------|
| Colors        | `color($key)`      | `_colors.module.scss`      |
| Spacing       | `space($key)`      | `_spacing.module.scss`     |
| Border radius | `radius($key)`     | `_radius.module.scss`      |
| Font size     | `font-size($key)`  | `_typography.module.scss`  |
| Font weight   | `font-weight($key)`| `_typography.module.scss`  |
| Font family   | `$base-font`       | `_typography.module.scss`  |

Every component SCSS file starts with:

```scss
@use '../../styles/index.module' as *;
```

Then uses the functions instead of hardcoded values:

```scss
color: color(text);
padding: space(md);
border-radius: radius(md);
font-size: font-size(lg);
```

To re-skin the portfolio, just edit the maps. For example, to switch to a light palette, change `_colors.module.scss`:

```scss
$colors: (
    primary: #00282b,
    background: #ffffff,
    surface: #f5f5f5,
    text: #111618,
    // ...
);
```

Or to make the spacing tighter, edit `_spacing.module.scss` — every component picks up the change.

### 5. Units and Conventions

- Use `px` for all fixed sizes; `%` only for `width` and `height`. Never use `rem` or `em`.
- Avoid decimals in measurements (`1px`, not `0.5px`).
- Components use BEM naming with SCSS nesting (`&__element`, `&--modifier`).
- Section titles and decorative lines are rendered by `MainView`, not by individual section components.

## How to Make It Yours — Checklist

1. Replace all text in `src/locales/en.json` (and `es.json`) with your own copy.
2. Adjust the design tokens in `src/styles/_*.module.scss` to your color palette, spacing, and type scale.
3. Swap the avatar / project images in `src/assets/` (or wherever your components reference them).
4. Update links (LinkedIn, GitHub, email) inside the components that render the contact / summary section.
5. (Optional) Add a new language following the steps above.
6. Run `npm run lint` and `npm run build` to make sure everything still type-checks.

## License

Personal portfolio template — adapt freely.
