import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface CaseStudy {
  slug: string;
  /** Full heading, e.g. "EhudAI: AI-Powered Content Creation Studio" */
  title: string;
  /** Heading before the colon, e.g. "EhudAI" */
  name: string;
  /** Heading after the colon, e.g. "AI-Powered Content Creation Studio" */
  subtitle: string;
  description: string;
  technologies: string[];
  role: string;
  timeline: string;
  liveUrl?: string;
  images: string[];
  content: string;
  excerpt: string;
  /** Set `draft: true` in frontmatter to keep a study out of the site. */
  draft?: boolean;
}

const CASE_STUDIES_DIR = path.join(
  process.cwd(),
  'content/projects-case-study'
);
const IMAGE_EXTENSIONS = /\.(jpg|jpeg|png|webp|gif)$/i;

/** Strips markdown emphasis so parsed prose reads as plain text. */
function stripEmphasis(value: string): string {
  return value.replace(/\*\*/g, '').replace(/(^|\W)\*(\S[^*]*)\*/g, '$1$2');
}

function truncate(value: string, max: number): string {
  if (value.length <= max) return value;
  // Cut on a word boundary so the excerpt does not end mid-word.
  const clipped = value.slice(0, max);
  const lastSpace = clipped.lastIndexOf(' ');
  return `${clipped.slice(0, lastSpace > 0 ? lastSpace : max).trimEnd()}...`;
}

/**
 * First real paragraph after the h1 — used as the summary when a study has no
 * "## Project Overview" section. Headings, rules, tables, lists and the
 * `**Role:** / **Timeline:**` metadata block are all skipped, so the summary
 * never bleeds into the fields rendered separately.
 */
function firstProseBlock(content: string): string {
  const body = content.replace(/^#\s+.+$/m, '');
  const block = body.split(/\n\s*\n/).find((candidate) => {
    const text = candidate.trim();
    if (!text) return false;
    if (/^(#{1,6}\s|[-*_]{3,}|\||```)/.test(text)) return false;
    if (/^[->\s]*\*\*[^*]+\*\*:|^[->\s]*\*\*[^*]+:\*\*/.test(text)) {
      return false;
    }
    return true;
  });
  return block ?? '';
}

function parseCaseStudy(name: string): CaseStudy {
  const fullPath = path.join(CASE_STUDIES_DIR, name);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const slug = name.replace(/\.md$/, '');

  // Title comes from the first h1. The project name is split off the tagline
  // on the first colon or spaced em/en dash ("EhudAI: AI-Powered Studio",
  // "AI Creative Award — Building a Vote-at-Scale Platform").
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : slug;
  const titleParts = title.match(/^(.*?)(?::|\s+[—–]\s+)\s*(.+)$/);
  const projectName = (titleParts?.[1] ?? title).trim();
  const subtitle = (titleParts?.[2] ?? '').trim();

  // Summary paragraph. Preferred source is "## Project Overview"; studies that
  // open with a blockquote or plain paragraph under the h1 fall back to that.
  // The bolded project name is kept so the sentence reads as a whole ("EhudAI
  // is an end-to-end..." rather than "is an end-to-end...").
  const overviewMatch = content.match(
    /## Project Overview\s*\n+([\s\S]+?)(?=\n\s*\n|\n###)/
  );
  const summary = overviewMatch?.[1] ?? firstProseBlock(content);
  const description = stripEmphasis(summary)
    .replace(/^\s*>\s?/gm, '') // drop blockquote markers
    .replace(/\s+/g, ' ')
    .trim();

  // Labels are written both as `**Role**: x` and `**Role:** x` across studies,
  // so match either placement of the colon.
  const field = (...labels: string[]): string | undefined => {
    const pattern = new RegExp(
      `\\*\\*(?:${labels.join('|')})\\*\\*:\\s*(.+)|\\*\\*(?:${labels.join(
        '|'
      )}):\\*\\*\\s*(.+)`,
      'i'
    );
    const match = content.match(pattern);
    return (match?.[1] ?? match?.[2])?.trim();
  };

  const technologies = Array.from(
    new Set(
      [field('Technology Stack', 'Tech Stack'), field('Technologies Used')]
        .filter((line): line is string => Boolean(line))
        .flatMap((line) => stripEmphasis(line).split(/[,·]/))
        .map((tech) => tech.trim())
        .filter(Boolean)
    )
  );

  const role = field('Role') ?? 'Full-Stack Developer';
  const timeline =
    field('Development Timeline', 'Timeline') ?? 'Multi-phase development';

  // Prefer an explicitly labelled link ("**Visit the platform**: [x](url)")
  // over the first link that happens to appear in the body. The label may also
  // carry a bare domain rather than a markdown link.
  const labelledUrlMatch = content.match(
    /\*\*(?:Visit|Live|Website)[^*]*\*\*:?\s*\[[^\]]*\]\((https?:\/\/[^)]+)\)/i
  );
  const bareDomain = field('Live', 'Website')?.match(
    /^(?:https?:\/\/)?((?:[\w-]+\.)+[a-z]{2,}(?:\/\S*)?)$/i
  );
  const firstUrlMatch = content.match(/\[[^\]]*\]\((https?:\/\/[^)]+)\)/);
  const liveUrl =
    data.liveUrl ||
    labelledUrlMatch?.[1] ||
    (bareDomain ? `https://${bareDomain[1]}` : undefined) ||
    firstUrlMatch?.[1] ||
    undefined;

  // Images are auto-discovered and sorted by their numeric filename prefix.
  const projectImagesPath = path.join(
    process.cwd(),
    'public/images/projects',
    slug
  );
  let images: string[] = [];

  if (fs.existsSync(projectImagesPath)) {
    images = fs
      .readdirSync(projectImagesPath)
      .filter((file) => IMAGE_EXTENSIONS.test(file))
      .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))
      .map((file) => `/images/projects/${slug}/${file}`);
  }

  return {
    slug,
    title,
    name: projectName,
    subtitle,
    description,
    technologies,
    role,
    timeline,
    liveUrl,
    images,
    content,
    excerpt: truncate(description, 200),
    ...data,
  };
}

/**
 * A study needs a summary paragraph — the text the cards and metadata are
 * built from — before it can render. This keeps work-in-progress files, an
 * empty markdown stub say, from shipping as blank cards and blank pages.
 * `draft: true` in frontmatter hides a study that is written but not ready.
 */
function isPublishable(study: CaseStudy): boolean {
  return !study.draft && Boolean(study.description);
}

export function getCaseStudies(): CaseStudy[] {
  if (!fs.existsSync(CASE_STUDIES_DIR)) {
    return [];
  }

  return fs
    .readdirSync(CASE_STUDIES_DIR)
    .filter((name) => name.endsWith('.md'))
    .map(parseCaseStudy)
    .filter(isPublishable);
}

export function getCaseStudy(slug: string): CaseStudy | null {
  return getCaseStudies().find((study) => study.slug === slug) || null;
}

/**
 * The studies shown in the homepage carousel, in display order. The
 * /case-studies page still lists everything; this is the curated shortlist.
 * A slug that is missing or still a draft is skipped rather than erroring.
 */
export const FEATURED_CASE_STUDIES = ['ehudai', 'aicreativeaward', 'reveshare'];

export function getFeaturedCaseStudies(): CaseStudy[] {
  const studies = getCaseStudies();
  return FEATURED_CASE_STUDIES.map((slug) =>
    studies.find((study) => study.slug === slug)
  ).filter((study): study is CaseStudy => Boolean(study));
}
