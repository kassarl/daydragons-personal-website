# Scaffolding Prompt — Opus Session

For the first Claude Code session on this project. Run with Opus 4.6.

## Before you start

- Reference HTML (`02-two-pointers-java.html`) accessible — attach or reference it.
- GitHub repo created (e.g. `daydragons-personal-website`), even just initialized with a README. Have the repo URL handy.
- GitHub username handy.
- Decide on custom domain vs. default `username.github.io/repo` URL.
- `cd` into the workspace folder (`/Users/lailakassar/Documents/Claude/Projects/daydragons-personal-website/`) before launching Claude Code.

## The prompt — paste this into Opus

```
I'm building a personal website. This session is for scaffolding only —
I want a solid foundation that I can extend in later Sonnet sessions
without architectural rework.

## Stack
- Astro (latest stable)
- Plain CSS with custom properties (no Tailwind, no CSS-in-JS)
- Markdown blog posts via Astro Content Collections
- Deployed to GitHub Pages via GitHub Actions
- No JS framework integrations (React, etc.) unless I ask later

## Design language
The aesthetic is feminine, editorial, Figma-case-study minimalism.
I'm attaching a reference HTML file (02-two-pointers-java.html) —
extract the design tokens from its :root block exactly. The palette
is warm cream backgrounds with rose, sage, mauve, amber, blush
accents. Typography is Cormorant Garamond (serif, italics for
emphasis), Jost (sans, body), DM Mono (eyebrows, labels). Cards
have 12px radius, hairline borders, soft shadows. There's a fixed
dot-grid background.

## What to build in this session

1. Initialize the Astro project in the current directory
2. Configure astro.config.mjs for GitHub Pages deployment
   (site URL, base path)
3. Create src/styles/tokens.css with all design tokens lifted
   from the reference HTML — colors, typography stack, spacing
   scale, shadow values
4. Create src/styles/global.css that imports tokens.css and sets
   up the dot-grid background, font imports from Google Fonts,
   and base typography (body in Jost, headings in Cormorant)
5. Create src/layouts/BaseLayout.astro — slot for page content,
   includes Nav and Footer components, applies global styles
6. Create src/components/Nav.astro — minimalist text-only nav
   with links to Home, Experience, Projects, Blog, Daydragons,
   Contact. DM Mono, small caps, generous letter-spacing.
7. Create src/components/Footer.astro — minimal, just a small
   colophon line
8. Create src/components/Eyebrow.astro and src/components/Tag.astro
   as reusable primitives (these are the patterns I'll use most)
9. Create src/pages/index.astro — the home page. Should be radically
   minimal: just my name in large Cormorant italic and the nav.
   Use placeholder name "Laila Kassar" for now.
10. Set up Content Collections for blog: src/content/config.ts with
    a blog schema (title, date, description, tags, draft).
11. Create one example post src/content/blog/hello-world.md with
    valid frontmatter and a few paragraphs of placeholder content
12. Create src/pages/blog/index.astro that lists posts (just title,
    date, description for now)
13. Create src/pages/blog/[...slug].astro that renders individual
    posts using a BlogPost layout
14. Create src/layouts/BlogPost.astro — reading-width column
    (~640px), generous leading, styled markdown elements
    (h1-h3 in Cormorant, body in Jost, code blocks in the warm
    code-bg cream from the reference)
15. Create .github/workflows/deploy.yml for GitHub Pages deployment
16. Create CLAUDE.md at the repo root documenting: the design
    tokens, the typography rules, component conventions, how to
    add a new blog post, the file structure. This is for future
    sessions to read.
17. Create a .claude/commands/new-post.md slash command that
    scaffolds a new markdown post with valid frontmatter

## Conventions I want enforced

- All colors come from CSS custom properties in tokens.css. Never
  hardcode hex values in component CSS.
- Italics are always Cormorant Garamond, never Jost italic
- Eyebrows (small DM Mono labels) use letter-spacing 2-3px and
  uppercase
- Component CSS lives in <style> blocks inside .astro files, scoped
- Global utility classes go in global.css and are sparing
- Every page extends BaseLayout

## What I do NOT want this session

- Don't build the Experience, Projects, Contact, or Daydragons
  pages — Sonnet can do those next session
- Don't add a CMS, headless or otherwise
- Don't add analytics
- Don't add dark mode
- Don't add icons libraries — if I need an icon, inline SVG
- Don't add animations beyond a basic fade

## When you're done

Show me:
1. `tree -L 3` of the repo
2. The contents of tokens.css and CLAUDE.md
3. Confirm the dev server runs (`npm run dev`) and the home page
   renders
4. Tell me what to do to push to GitHub and enable Pages

Ask me questions before scaffolding only if something is genuinely
ambiguous. Otherwise make reasonable choices and tell me what you
chose.
```

## Verify before ending the session

- Home page loads at `npm run dev` — Cormorant should render distinctly italic-serif (not a system fallback).
- Blog post route works — visit `/blog/hello-world` and see the post.
- `tokens.css` matches the reference card's `:root` values exactly. Spot-check side by side.
- `CLAUDE.md` is substantive. If it's three sentences, ask Opus to expand it.
- `npm run build` produces a `dist/` folder without errors.

## After the session

1. Commit and push to GitHub.
2. Repo Settings → Pages → Source: GitHub Actions.
3. Confirm the deploy workflow runs green.
4. Visit the deployed URL and verify it renders.

Then start a Sonnet session for the next page. Opening prompt for that one is roughly:

> *Read CLAUDE.md. Build the Experience page following the patterns in the existing components. Use the big-numeral year-range treatment from the reference card (the `card-num` style). Here are the entries: [paste your jobs list].*
