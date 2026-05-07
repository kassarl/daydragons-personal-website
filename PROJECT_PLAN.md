# Personal Website — Project Plan

A living planning document. Update it as decisions change. Future Claude sessions can read this for context.

## What this is

A personal website for Laila Kassar. Hosted on GitHub Pages. Markdown-driven blog. Aesthetic is feminine, editorial, Figma-case-study minimalism — anchored to the design language of `02-two-pointers-java.html` (the reference card).

## Pages

- **Home** — minimalist text-only landing. Name in large Cormorant italic. Small text nav. White/cream background. Resists adding anything.
- **Contact** — single line: email in Cormorant italic, large. Eyebrow above. Possibly a copy-on-click micro-interaction.
- **Experience** — resume-style list. Big light Cormorant year-range numerals on the left (the `card-num` treatment from the reference card). Company, role, description on the right. One color tag per entry.
- **Blog** — index page lists posts with date (DM Mono), title (Cormorant italic), one-line description (`--ink-soft`), tags. Hairline dividers. Individual posts render markdown into a ~640px reading column.
- **Projects** — grid of two cards. Title, thumbnail image, short Cormorant-italic description. Same panel styling as the reference card (12px radius, hairline border, soft shadow).
- **Daydragons** — playful page pulling League of Legends stats. Current rank as the centerpiece (`card-num` treatment), Janna percentage as small data-viz, ranked history as sparkline or grid. The most experimental page — build it last.

## Stack

- **Astro** (latest stable) — static HTML output, first-class markdown via Content Collections, component-based.
- **Plain CSS with custom properties** — no Tailwind, no CSS-in-JS. Tokens lifted from the reference card's `:root` block.
- **GitHub Pages** via GitHub Actions deploy workflow.
- **No JS framework integrations** unless a specific need emerges.

## Repo structure

```
daydragons-personal-website/
├── src/
│   ├── layouts/
│   │   ├── BaseLayout.astro      # nav, footer, fonts, dot-grid
│   │   └── BlogPost.astro        # markdown post wrapper
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   ├── Tag.astro             # colored pills
│   │   ├── Eyebrow.astro         # DM Mono small caps
│   │   └── PageHeader.astro      # big-numeral + italic title pattern
│   ├── pages/
│   │   ├── index.astro           # home
│   │   ├── contact.astro
│   │   ├── experience.astro
│   │   ├── projects.astro
│   │   ├── daydragons.astro
│   │   └── blog/
│   │       ├── index.astro       # post list
│   │       └── [...slug].astro   # renders any .md
│   ├── content/
│   │   ├── config.ts             # collection schema
│   │   └── blog/
│   │       └── *.md              # drop new posts here
│   └── styles/
│       ├── tokens.css            # design tokens from reference card
│       └── global.css            # imports tokens, base typography
├── public/                       # images, favicon, project thumbnails
├── .github/workflows/deploy.yml
├── .claude/commands/new-post.md  # slash command to scaffold a post
└── CLAUDE.md                     # auto-loaded context for sessions
```

## Design language (anchor)

Lift these from the reference card's `:root` block exactly. Never hardcode hex values in component CSS.

**Palette:** warm cream backgrounds (`--bg: #f7f4ef`, `--canvas: #fdfbf8`), ink scale (`--ink`, `--ink-mid`, `--ink-soft`, `--ink-faint`), accent families (rose, sage, mauve, amber, blush) each with `-light` and `-mid` variants.

**Typography:**
- Cormorant Garamond — serif, italics for emphasis. Headings, large numerals, decorative pull-quotes.
- Jost — sans-serif. Body copy, labels.
- DM Mono — monospaced. Eyebrows, small caps, tags. Letter-spacing 2–3px, uppercase.

**Surfaces:** cards use `12px` radius, `1.5px solid var(--border)`, soft shadow (`0 2px 12px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)`).

**Background:** fixed dot-grid (`radial-gradient(circle, var(--border) 1px, transparent 1px)` at `24px 24px`, opacity `0.5`).

**Rules:**
- Italics are always Cormorant Garamond, never Jost italic.
- Eyebrows: DM Mono, uppercase, 2–3px letter-spacing.
- Component CSS lives in scoped `<style>` blocks inside `.astro` files.

## Daydragons data strategy

OP.GG has no public API. Three options, in order of effort:

1. **Manual JSON file** (`src/data/daydragons.json`) updated occasionally. Honest, simple. Start here.
2. **Riot Games API** (free, official). Requires registering. Personal-use key expires every 24h — would need a GitHub Action refreshing a JSON file on a schedule.
3. **Scraping OP.GG** — don't. Violates ToS, breaks every redesign.

## Build order

1. Scaffolding session (Opus): Astro project, tokens, BaseLayout, Nav, Footer, primitives, home page, blog system with one example post, GitHub Actions deploy, CLAUDE.md, `/new-post` slash command. See `SCAFFOLDING_PROMPT.md`.
2. Sonnet session: Experience page.
3. Sonnet session: Contact page.
4. Sonnet session: Projects page (with placeholder thumbnails).
5. Sonnet session: First real blog post.
6. Opus session: Daydragons page.
7. Polish pass: accessibility, performance, RSS, view transitions.

## Model strategy

- **Sonnet 4.6** as daily driver for page-building work.
- **Opus 4.6** for scaffolding session and Daydragons page (architectural / experimental).
- Model is locked per-session — pick deliberately when launching, don't expect to switch mid-session.
- Two terminals (one Opus, one Sonnet) is fine if work can be parallelized.
- Git worktrees for design experiments on Daydragons / Projects.

## Things to add (small touches)

- **Reading time + word count** on blog posts (auto-calculated).
- **`/now` page** — Derek-Sivers-style "what I'm working on right now" page. One paragraph, low stakes.
- **RSS feed** — Astro generates with one config line.
- **Colophon page or footer link** — typefaces, palette, build credits.
- **View transitions** between pages (Astro one-attribute support).
- **Tag pages** for the blog (`/blog/tag/...`).
- **Keyboard nav shortcuts** (`g h`, `g b` etc.).
- **No dark mode** — the warm palette is the brand.

## Open questions / decisions to revisit

- Custom domain or default `username.github.io/repo` URL?
- Project thumbnails — what are the two projects? Need title, image, description for each.
- Daydragons: which OP.GG/Riot data points matter most? (Rank, ranked history, Janna %, anything else?)
- Blog post tag taxonomy — start loose, formalize later.
