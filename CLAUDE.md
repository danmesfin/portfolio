# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Daniel Mesfin built with Next.js 14, React 18, and TypeScript. Features case studies, blog posts, project showcases, and a contact form. Deployed on Vercel.

## Commands

```bash
npm run dev              # Start dev server on localhost:3000
npm run build            # Production build
npm run lint             # Lint and auto-fix (next lint --fix)
npm run format           # Format all files with Prettier
npm run check-types      # TypeScript type checking (tsc --noEmit)
npm run check-lint       # ESLint check without auto-fix
npm run check-format     # Prettier format check
npm run test-all         # Full validation: format + lint + types + build
```

No test framework is configured. `test-all` runs format, lint, type checks, and build.

## Architecture

### Routing (Pages Router)

Uses Next.js Pages Router (`pages/` directory), not App Router.

- **Static pages**: `/`, `/about`, `/open-resume`, `/404`
- **Dynamic routes**: `/blogs/[slug]`, `/case-studies/[slug]` — generated from markdown via `getStaticPaths`/`getStaticProps`
- **`/projects`**: GitHub repos via ISR (`revalidate: 3600`); falls back to a "view on GitHub" link if the API call fails
- **`/sitemap.xml`**: server-rendered from the markdown content on each request
- **Layout**: `components/Layout/index.js` wraps all pages with Navbar, Footer, and a skip link; `pages/_app.tsx` provides ThemeProvider, fonts, and Toaster

### Content System

Markdown files with YAML frontmatter in `content/`:

- `content/blogs/` — Blog posts parsed by `utils/getBlogs.ts` using gray-matter + unified/remark/rehype
- `content/projects-case-study/` — Case studies parsed by `utils/getCaseStudies.ts` with regex-based metadata extraction
- Case study images live in `public/images/projects/{slug}/` and are auto-discovered

### Styling

- **Tailwind CSS** with class-based dark mode (`darkMode: 'class'` via next-themes)
- Custom design tokens in `tailwind.config.js`: paper colors (`paper-white`, `paper-cream`, etc.), accent colors, paper shadows
- Fonts: `font-sans` (Inter) and `font-hand` (Nanum Pen Script) are self-hosted via `next/font` in `_app.tsx` and exposed as the `--font-sans` / `--font-hand` CSS variables; `font-display` (peachy-keen-jf) comes from Adobe Fonts in `_document.tsx`
- Global custom utilities in `styles/globals.css` (`.btn-primary`, `.btn-secondary`) plus the page-wide paper grain on `body::before`

### Key Patterns

- Components use either `ComponentName/index.tsx` (directory) or `ComponentName.tsx` (flat file) structure
- Animations use framer-motion (`motion.div` with `initial`/`animate`/`whileInView`)
- Contact form uses EmailJS (`@emailjs/browser`) with env vars: `NEXT_PUBLIC_EMAIL_SERVICE_ID`, `NEXT_PUBLIC_EMAIL_TEMPLATE_ID`, `NEXT_PUBLIC_EMAIL_PUBLIC_KEY`
- Analytics via `@vercel/analytics` and `@vercel/speed-insights`
- **Page metadata**: every page renders `<Seo>` (`components/Seo`), which builds the title, canonical, Open Graph, and Twitter tags from `utils/siteConfig.ts`. Set `NEXT_PUBLIC_SITE_URL` to override the canonical origin on preview deploys.
- **Images**: `next/image` calls need an explicit `sizes` when using `fill`, otherwise the largest source is served at every viewport. Screenshots belong in `public/images` as WebP.

## Code Style

- ESLint: Airbnb + Next.js + Prettier config (see `.eslintrc.json`)
- Prettier: single quotes, 2-space indent, 80 cols, trailing commas (es5), LF line endings
- Husky pre-commit hooks configured
