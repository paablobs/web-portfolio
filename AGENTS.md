# Portfolio — Agent Instructions

Minimal personal portfolio built with React 19, TypeScript, Vite, and SCSS Modules.

## Commands

```bash
npm run dev       # start dev server
npm run build     # tsc + vite build
npm run lint      # eslint
npm run preview   # preview production build
```

## Architecture

```
src/
  components/<Name>/<Name>.tsx          # component
  components/<Name>/<Name>.module.scss  # scoped styles
  styles/                               # design tokens (SCSS)
    _colors.module.scss
    _spacing.module.scss
    _radius.module.scss
    _typography.module.scss
    _index.module.scss                  # exports tokens + helper functions
```

Each component lives in its own folder with a co-located `.module.scss`. No global style files per component.

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

- Functional components only (React 19)
- No default exports from `index.ts` barrels — import directly from the component file
- Section titles and decorative lines are rendered by `MainView`, not by individual section components
- `MainView.module.scss` owns all `__sectionTitle` and `__sectionTitleLine` styles

## What NOT to do

- Do not add emojis or icons unless explicitly requested
- Do not use `rem`, `em`, or unitless values for spacing/sizes
- Do not hardcode colors — always use `color($key)`
- Do not create new token files; add new tokens to the existing maps
