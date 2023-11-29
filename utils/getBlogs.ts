// utils/getBlogs.ts
import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

export interface Blog {
  slug: string;
  title: string;
  content: string;
}

const blogsDirectory = path.join(process.cwd(), 'content', 'blogs');

export const getBlogs = async (): Promise<Blog[]> => {
  const fileNames = fs.readdirSync(blogsDirectory);

  const blogs = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(blogsDirectory, fileName);
      const fileContent = fs.readFileSync(fullPath, 'utf8');

      // Use remark to convert Markdown to HTML
      const processedContent = await remark().use(html).process(fileContent);
      const content = processedContent.toString();

      return {
        slug,
        title: `Blog ${slug}`, // You can customize the title based on your needs
        content,
      };
    })
  );

  return blogs;
};
