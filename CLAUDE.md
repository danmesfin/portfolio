# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Daniel Mesfin built with Next.js 16 (Pages Router), React 18, TypeScript, and Tailwind CSS. Features case studies, blog posts, project showcases, and a contact form. Deployed on Vercel.

## Commands

```bash
npm run dev              # Start dev server on localhost:3000
npm run build            # Production build
npm run lint             # Lint and auto-fix (eslint --fix)
npm run format           # Format all files with Prettier
npm run check-types      # TypeScript type checking (tsc --noEmit)
npm run check-lint       # ESLint check without auto-fix
npm run check-format     # Prettier format check
npm run test-all         # Full validation: format + lint + types + build
```

No test framework is configured; `test-all` is the only verification gate. Run it before committing — the Husky hook file is named `.husky/pre-comit` (typo) and `.husky` is gitignored, so nothing runs automatically on commit.

## Architecture

### Routing and rendering

- **Static (SSG)**: `/`, `/about`, `/open-resume`, `/blogs`, `/case-studies`, plus `/blogs/[slug]` and `/case-studies/[slug]` generated from markdown via `getStaticPaths`/`getStaticProps`. New or edited markdown only appears after a rebuild.
- **ISR**: `/projects` fetches GitHub repos (`revalidate: 3600`); on API failure it renders a "view on GitHub" fallback and retries after 600s.
- **Per-request text endpoints**: `pages/sitemap.xml.ts`, `pages/robots.txt.ts` and `pages/llms.txt.ts` write the response directly from `getServerSideProps` (CDN-cached for an hour) and export a component that returns `null`.
- **Shell**: `pages/_app.tsx` provides ThemeProvider, fonts, and Toaster; `components/Layout/index.js` wraps every page with Navbar, Footer, skip link, and Vercel Analytics/Speed Insights.

### Single sources of truth

Site data is defined once and consumed in several places — change it at the source, not in the consumer:

- `utils/siteConfig.ts` — name, bio, canonical URL, résumé path, and the `socials` list. Feeds `<Seo>`, navbar, footer, JSON-LD `sameAs`, sitemap, and `/llms.txt`. Set `NEXT_PUBLIC_SITE_URL` to override the canonical origin on preview deploys.
- Component-exported data — `experienceData` (`components/Experience`), `certifications` (`components/Certifications`), `projects` (`components/BentoGrid`), `faqs` (`components/About`, also emitted as FAQPage JSON-LD on `/about`). These are rendered by their components **and** imported by `pages/llms.txt.ts`, so changing their shape means updating `llms.txt.ts` too.
- A new static page must be added to `STATIC_PATHS` in `pages/sitemap.xml.ts` and the "Pages" list in `pages/llms.txt.ts`.

### Content system

Markdown in `content/`, with two different parsing models:

- **Blogs** (`content/blogs/`, `utils/getBlogs.ts`) — conventional YAML frontmatter (`title`, `description`, `date`, `preview`, `draft`, `tags`, …). The body is converted to HTML with unified/remark/rehype in `pages/blogs/[slug].tsx` and rendered through `html-react-parser` in `components/BlogPost.tsx`. `draft: true` hides a post; posts sort newest-first by `date`.
- **Case studies** (`content/projects-case-study/`, `utils/getCaseStudies.ts`) — metadata is extracted from the **markdown body by regex**, not frontmatter:
  - Title = first `# h1`; it is split into `name` / `subtitle` on the first colon or spaced em/en dash.
  - Description = first paragraph under `## Project Overview`, else the first prose block after the h1. A study with no description is silently excluded from the site.
  - `**Role**:`, `**Timeline**:` / `**Development Timeline**:`, `**Technology Stack**:` / `**Tech Stack**:` / `**Technologies Used**:` lines (colon inside or outside the bold) populate the corresponding fields.
  - Live URL = frontmatter `liveUrl`, else a `**Visit…/Live/Website**` labelled link, else the first link in the body.
  - Optional frontmatter overrides any parsed field; `draft: true` hides the study. `date` / `updated` (YYYY-MM-DD) feed the sitemap `lastmod` and JSON-LD dates — bump `updated` after a substantive edit. Blogs accept `updated` too.
  - Images are auto-discovered from `public/images/projects/{slug}/` and ordered by numeric filename prefix (`1_…-cover.webp` is the cover).
  - The body is rendered with `react-markdown` + `remark-gfm`.
  - The homepage carousel shows only the slugs in `FEATURED_CASE_STUDIES`; `/case-studies` lists everything.
- Both renderers share `utils/proseClasses.ts` for long-form styling. It uses `[&>…]` child selectors so it works with either renderer's output.

### Styling

- Tailwind with class-based dark mode (`next-themes`). Tokens in `tailwind.config.js`: `base`, the `paper-*` neutrals, and `paper` shadows. Every light-mode colour class needs its `dark:` counterpart.
- Fonts are self-hosted via `next/font` in `_app.tsx` and exposed as CSS variables: `font-sans` / `font-mono` = IBM Plex Mono (body and UI), `font-display` = Fraunces (headings). `font-hand` is retired and aliased to the mono.
- Tailwind's `content` globs include `utils/` because class strings live there (`proseClasses.ts`); class strings placed in any other directory will be purged.
- `styles/globals.css` holds `.btn-primary` / `.btn-secondary` and the page-wide paper grain on `body::before`.

### Key patterns

- Every page renders `<Seo>` (`components/Seo`), which builds title, canonical, Open Graph, and Twitter tags from `siteConfig`. Pass schema.org objects through its `jsonLd` prop; builders live in `utils/structuredData.ts`, and the Person entity (derived from `experienceData` and `certifications`) in `utils/personSchema.ts`.
- Contact form uses EmailJS (`@emailjs/browser`) with `NEXT_PUBLIC_EMAIL_SERVICE_ID`, `NEXT_PUBLIC_EMAIL_TEMPLATE_ID`, `NEXT_PUBLIC_EMAIL_PUBLIC_KEY`.
- Animations use framer-motion (`initial` / `animate` / `whileInView`).
- `next/image` with `fill` needs an explicit `sizes`, otherwise the largest source is served at every viewport. Screenshots belong in `public/images` as WebP.
- Anything returned from `getStaticProps` must be JSON-serialisable — gray-matter parses YAML dates into `Date` objects, which `getBlogs.ts` converts to ISO strings.

## Code Style

- ESLint: Airbnb + Next.js + Prettier config (see `.eslintrc.json`); imports are written without file extensions (`import/extensions: never`).
- Prettier: single quotes, 2-space indent, 80 cols, trailing commas (es5), LF line endings.
