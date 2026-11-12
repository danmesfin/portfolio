import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogFrontMatter {
  title: string;
  description?: string;
  /** ISO string — gray-matter parses YAML dates into Date objects. */
  date: string;
  /** Optional ISO string for the last substantive edit. */
  updated?: string;
  preview: string;
  draft?: boolean;
  category?: string;
  tags?: string[];
  categories?: string[];
  keywords?: string[];
}

export interface BlogData {
  slug: string;
  frontmatter: BlogFrontMatter;
  markdownBody: string;
}

const blogsDirectory = path.join(process.cwd(), './content/blogs');

export function getBlogSlugs(): string[] {
  return fs
    .readdirSync(blogsDirectory)
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.replace(/\.md$/, ''));
}

export function getBlogBySlug(slug: string | undefined): BlogData {
  const realSlug = (slug ?? '').replace(/\.md$/, '');
  const fullPath = path.join(blogsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data: rawData, content } = matter(fileContents);
  // `updated` is re-added below only when it parses, so a raw Date (or an
  // `undefined`) never reaches getStaticProps.
  const { updated: rawUpdated, ...data } = rawData;

  // YAML dates come back as Date objects; normalise to a serialisable string
  // so they can cross the getStaticProps boundary.
  const toIso = (value: unknown): string | undefined => {
    if (value instanceof Date) return value.toISOString();
    if (typeof value === 'string' && !Number.isNaN(Date.parse(value))) {
      return new Date(value).toISOString();
    }
    return undefined;
  };
  const date = toIso(data.date) ?? '';
  const updated = toIso(rawUpdated);

  return {
    slug: realSlug,
    frontmatter: {
      title: data.title ?? realSlug,
      preview: data.preview ?? '',
      ...data,
      date,
      ...(updated ? { updated } : {}),
    },
    markdownBody: content,
  };
}

/** All posts, newest first, with drafts excluded. */
export function getAllBlogs(): BlogData[] {
  return getBlogSlugs()
    .map((slug) => getBlogBySlug(slug))
    .filter((blog) => !blog.frontmatter.draft)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}
