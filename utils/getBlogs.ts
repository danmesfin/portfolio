import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogFrontMatter {
  title: string;
  description?: string;
  /** ISO string — gray-matter parses YAML dates into Date objects. */
  date: string;
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
  const { data, content } = matter(fileContents);

  // YAML dates come back as Date objects; normalise to a serialisable string
  // so they can cross the getStaticProps boundary.
  const date = data.date instanceof Date ? data.date.toISOString() : '';

  return {
    slug: realSlug,
    frontmatter: {
      title: data.title ?? realSlug,
      preview: data.preview ?? '',
      ...data,
      date,
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
