import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface FrontMatter {
  title: string;
  description: string;
  date: Date;
  preview: string;
  draft: boolean;
  tags: string[];
  categories: string[];
  keywords: string[];
}

export interface BlogData {
  slug: string | undefined;
  frontmatter: {
    date: string;
    [key: string]: any;
  };
  markdownBody: string;
}

const blogsDirectory = path.join(process.cwd(), './content/blogs');

export function getBlogSlugs(): string[] {
  return fs.readdirSync(blogsDirectory);
}

export function getBlogBySlug(slug: string | undefined): BlogData {
  const realSlug = slug?.replace(/\.md$/, '');
  const fullPath = path.join(blogsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Check if data.date exists before converting to a string
  const formattedDate = data.date ? data.date.toISOString() : '';

  return {
    slug: realSlug,
    frontmatter: {
      ...data,
      date: formattedDate,
    },
    markdownBody: content,
  };
}

export function getAllBlogs(): BlogData[] {
  const slugs = getBlogSlugs();
  const blogs = slugs.map((slug) => getBlogBySlug(slug));
  return blogs;
}
