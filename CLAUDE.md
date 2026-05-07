# CLAUDE.md — daydragons-personal-website

Personal site for Laila Kassar. Static. Astro. No framework integrations.
This file is loaded automatically into every Claude Code session — read it
first.

The aesthetic anchor is `02-two-pointers-java.html` (the reference card the
project was scaffolded from). When in doubt, open it and look.

---

## Stack & deploy

- **Astro 5.x**, plain CSS with custom properties, Markdown via Content Collections
- **No** Tailwind, no CSS-in-JS, no React/Vue/Svelte — keep it static HTML out
- **GitHub Pages** via `.github/workflows/deploy.yml`
- Hosted at `https://kassarl.github.io/daydragons-personal-website` (base path
  `/daydragons-personal-website/` — set in `astro.config.mjs`)

Local Node: project expects **Node 18+**. The `.nvmrc` pins Node 20. The user's
default `node` may be older — use a Homebrew node@N install or `nvm use`.

```bash
npm install
npm run dev      # localhost dev server
npm run build    # type-check + static build → dist/
npm run preview  # serve dist/ locally
```

---

## File structure

```
src/
├─ layouts/
│  ├─ BaseLayout.astro      # shared chrome — fonts, nav, footer, dot-grid
│  └─ BlogPost.astro        # 640px reading column + markdown styling
├─ components/
│  ├─ Nav.astro             # primary text nav
│  ├─ Footer.astro          # colophon
│  ├─ Eyebrow.astro         # DM-mono small caps label primitive
│  └─ Tag.astro             # colored pill primitive
├─ pages/
│  ├─ index.astro           # home — name + nav, nothing else
│  └─ blog/
│     ├─ index.astro        # post list
│     └─ [...slug].astro    # individual posts (uses BlogPost layout)
├─ content/
│  ├─ config.ts             # blog collection schema
│  └─ blog/*.md             # posts live here
└─ styles/
   ├─ tokens.css            # all design tokens — single source of truth
   └─ global.css            # imports tokens, fonts, base typography
public/                      # static assets (favicon, images)
.github/workflows/deploy.yml
.claude/commands/new-post.md
```

Pages NOT yet built (intentionally — Sonnet sessions will add them):
`/experience`, `/projects`, `/contact`, `/daydragons`. The `Nav` already
links to them; the routes 404 until the page files exist.

---

## Design tokens (the contract)

Tokens live in `src/styles/tokens.css`. **Never hardcode hex values in
component CSS.** If a color isn't in tokens.css, add it there first.

### Surfaces & ink

| Token            | Use                                              |
|------------------|--------------------------------------------------|
| `--bg`           | warm cream page background                       |
| `--canvas`       | near-white panel fill                            |
| `--card`         | pure white card fill                             |
| `--border`       | hairline (`1px`) border                          |
| `--border-mid`   | stronger divider (`1.5px`)                       |
| `--ink`          | primary text, headings                           |
| `--ink-mid`      | body copy                                        |
| `--ink-soft`     | subdued, eyebrows, descriptions                  |
| `--ink-faint`    | tertiary, dividers, placeholders                 |

### Accent families

Each comes with `--{name}`, `--{name}-light`, `--{name}-mid`:
`rose`, `sage`, `mauve`, `amber`, `blush`. Conventions:

- **rose** — primary accent / hover / "active"
- **sage** — confirmation, secondary
- **mauve** — tertiary / experimental
- **amber** — highlight, drafts, warnings
- **blush** — soft alerts, "traps"

### Code

`--code-bg` and `--code-border` give the warm cream code surface.

### Type stacks

```
--font-serif: 'Cormorant Garamond', 'Georgia', serif;
--font-sans:  'Jost', system-ui, sans-serif;
--font-mono:  'DM Mono', ui-monospace, Menlo, monospace;
```

Type scale: `--fs-xs … --fs-4xl`. Letter-spacing: `--tracking-tight | -wide | -wider`.
Spacing: `--space-1 … --space-16` (4px base). Radius: `--radius-sm | -md | -lg | -pill`.
Shadows: `--shadow-soft | -card | -lift`. Widths: `--width-prose (640px)`,
`--width-content (1024px)`, `--width-wide (1140px)`.

---

## Typography rules

These are non-negotiable:

1. **Italics are always Cormorant Garamond.** Never Jost italic, never DM
   Mono italic. If you need an italic word, wrap it in `<em>` — global CSS
   restyles `em/i` to the serif. Inside an `.astro` component, the same applies.

2. **Eyebrows** (small mono labels) are uppercase, DM Mono, with
   `--tracking-wide` (≈2px) or `--tracking-wider` (≈3px) letter-spacing.
   Use `<Eyebrow>` for these — don't inline the styles.

3. **Headings** are Cormorant Garamond. The display style mixes weight 600
   for the regular word with weight 300 italic for the emphasized word and
   tints it `--rose`:

   ```astro
   <h1 class="display">Notes &amp; <em>writing</em></h1>
   ```

4. **Body copy** is Jost 400, line-height 1.55. On long-form (BlogPost),
   bump to `--fs-md` and `--lh-relaxed`.

5. **Numerals** (years, IDs, big "01", rank badges) get the `card-num`
   treatment from the reference: Cormorant 300, very large, tinted
   `--rose-mid`, slight negative letter-spacing.

---

## Component conventions

- **Component CSS lives in scoped `<style>` blocks inside `.astro` files.**
  Astro scopes them automatically. Use `:global(...)` only inside the
  BlogPost layout (where markdown HTML is injected and can't be reached).
- Global utility classes live in `global.css` and are deliberately sparse:
  `.eyebrow`, `.prose`, `.container`, `.container-wide`, `.divider`,
  `.fade-in`, `.sr-only`. Don't add more without good reason.
- Every page extends `BaseLayout`. The home page passes `showNav={false}`
  because the nav is rendered inline as part of the hero.
- Use `import.meta.env.BASE_URL` for any absolute URL — the site lives
  under `/daydragons-personal-website/` on Pages.
- Cards / panels: `border-radius: var(--radius-lg)` (12px),
  `border: var(--border-card)`, `box-shadow: var(--shadow-card)`.
- The dot-grid is applied automatically by `body::before` in global.css.
  Don't re-implement it per page.

### `<Eyebrow>`

```astro
<Eyebrow>Algorithm · Pattern 02</Eyebrow>
<Eyebrow tone="rose">Now playing</Eyebrow>
<Eyebrow rule>Recent writing</Eyebrow>   {/* trailing hairline */}
<Eyebrow as="h2">Projects</Eyebrow>
```

Props: `tone` (ink/ink-soft/ink-faint/rose/sage/mauve/amber/blush),
`as` (span/p/div/h1-h4), `rule` (boolean), `tracking` (wide/wider).

### `<Tag>`

```astro
<Tag tone="rose">Opposite ends</Tag>
<Tag tone="sage" size="sm">Slow & fast</Tag>
<Tag tone="mauve" variant="outline">Partition</Tag>
<Tag tone="amber" href="/blog">view</Tag>   {/* renders as <a> */}
```

Tones: `rose | sage | mauve | amber | blush | ink`.
Variants: `filled | outline`. Sizes: `sm | md`.

---

## Adding a new blog post

**Easiest:** run `/new-post` inside Claude Code (defined in
`.claude/commands/new-post.md`). It prompts for title and writes the file.

**By hand:** drop a `.md` file in `src/content/blog/` with this frontmatter:

```yaml
---
title: "Post title"
description: "One-sentence hook for the index list."
date: 2026-05-06
tags:
  - example
draft: false
---
```

Schema (`src/content/config.ts`):

| Field         | Required | Type      | Notes                                         |
|---------------|----------|-----------|-----------------------------------------------|
| `title`       | yes      | string    |                                               |
| `description` | yes      | string    | Shown in index list and meta description.     |
| `date`        | yes      | date      | `YYYY-MM-DD`                                  |
| `updated`     | no       | date      | Shown at bottom of post if present.           |
| `tags`        | no       | string[]  | Defaults to `[]`.                             |
| `draft`       | no       | boolean   | If true, hidden from prod build only.         |

The slug comes from the filename. `hello-world.md` → `/blog/hello-world`.
Markdown renders inside `BlogPost.astro` which styles all the standard
elements (h2/h3, em, blockquote, code, etc.) using tokens.

---

## What's deliberately NOT here

The scaffolding session was scoped tightly. Don't add any of these without
asking the user:

- Tailwind, CSS-in-JS, or any other styling framework
- React / Vue / Svelte / Preact integrations
- A CMS (headless or otherwise)
- Analytics
- Dark mode (the warm palette IS the brand)
- Icon libraries — use inline SVG
- Animations beyond the basic `.fade-in` and reduced-motion-respecting transitions

---

## Pages on the roadmap

When building these, follow the patterns established in `BaseLayout`,
`BlogPost`, `Eyebrow`, `Tag`. Read `PROJECT_PLAN.md` for design intent.

- **`/experience`** — resume list. Big light Cormorant year-range numerals
  on the left (`card-num` treatment), company / role / description on the
  right. One Tag per entry.
- **`/projects`** — grid of two cards. Same panel styling (12px radius,
  hairline border, soft shadow). Title, thumbnail, italic Cormorant blurb.
- **`/contact`** — single line: email in large Cormorant italic. Eyebrow
  above. Possibly copy-on-click.
- **`/daydragons`** — League of Legends ranked stats. Card-num for current
  rank, small data-viz for Janna %, sparkline-or-grid for history. Build
  last; data strategy in `PROJECT_PLAN.md`.

---

## Useful files at a glance

- Aesthetic source-of-truth: `02-two-pointers-java.html` (in `~/Downloads`,
  not in repo)
- Design tokens: `src/styles/tokens.css`
- Type/spacing rules: `src/styles/global.css`
- Project intent / future work: `PROJECT_PLAN.md`
- Add-a-post command: `.claude/commands/new-post.md`
