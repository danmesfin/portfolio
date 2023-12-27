import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import BlogPost from '../../components/BlogPost';
import { getAllBlogs, getBlogBySlug } from '../../utils/getBlogs';

interface BlogProps {
  frontmatter: any;
  markdownBody: string;
}

const markdownToHtml = async (markdown: string): Promise<string> => {
  const result = await unified()
    .use(remarkParse) // Parse markdown content to a syntax tree
    .use(remarkRehype) // Turn markdown syntax tree to HTML syntax tree, ignoring embedded HTML
    .use(rehypeStringify) // Serialize HTML syntax tree
    .process(markdown);

  return String(result);
};

export const getStaticPaths: GetStaticPaths = async () => {
  const blogs = getAllBlogs();
  const paths = blogs.map((blog) => `/blogs/${blog.slug}`);

  return {
    paths,
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps<BlogProps> = async ({ params }) => {
  const slug: string | undefined = Array.isArray(params?.slug)
    ? params?.slug[0]
    : params?.slug;

  const blog = getBlogBySlug(slug);
  const markdownBody = await markdownToHtml(blog.markdownBody);

  return {
    props: {
      frontmatter: blog.frontmatter,
      markdownBody,
    },
  };
};

const Blog: React.FC<BlogProps> = ({ frontmatter, markdownBody }) => (
  <BlogPost frontmatter={frontmatter} markdownBody={markdownBody} />
);

export default Blog;
