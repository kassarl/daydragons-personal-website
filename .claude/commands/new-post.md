---
description: Scaffold a new blog post in src/content/blog with valid frontmatter
argument-hint: <post title>
---

You are scaffolding a new blog post for the daydragons-personal-website
project. Read `CLAUDE.md` if you haven't already — it explains the
content collection schema and the typography conventions to use inside
the post body.

## Inputs

- Post title: `$ARGUMENTS` (the user's free-text title; if empty, ask).

## What to do

1. Derive a kebab-case slug from the title:
   - lowercase
   - replace whitespace and `_` with `-`
   - strip non-`[a-z0-9-]` characters
   - collapse consecutive `-`
   - trim leading/trailing `-`
2. The target file is `src/content/blog/<slug>.md`. If it already exists,
   stop and ask the user whether to overwrite or pick a new slug.
3. Use today's date in `YYYY-MM-DD` format (run `date +%Y-%m-%d` to get
   it — do not hardcode).
4. Write the file with this exact frontmatter shape, populated:

   ```yaml
   ---
   title: "<the user's title, with quotes escaped>"
   description: ""
   date: <today YYYY-MM-DD>
   tags: []
   draft: true
   ---
   ```

5. Below the frontmatter, add a single placeholder paragraph:

   ```
   <!-- Draft: replace this with your opening paragraph. -->
   ```

   Then a `## Section` heading and one more paragraph as a starting
   skeleton. Keep it minimal — the user is going to write the actual post.

6. Tell the user:
   - the path to the new file (as a clickable markdown link)
   - the slug, and the resulting URL when published
     (`/daydragons-personal-website/blog/<slug>`)
   - that `draft: true` is set, so it won't appear in the production
     build until they flip it to `false`
   - the next thing to fill in is `description:` since it's required
     by the schema and shown in the post list

Do not commit. Do not push. Do not run the dev server. Just create the
file and report back.
