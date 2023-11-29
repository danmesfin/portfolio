import BlogPost from '../../components/BlogPost';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getAllBlogs, getBlogBySlug, BlogData } from '../../utils/getBlogs';
import React from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

interface BlogProps {
  frontmatter: {
    [key: string]: any; // Adjust this according to your actual frontmatter structure
  };
  markdownBody: string;
}

const markdownToHtml = async (markdown: string): Promise<string> => {
  // Your markdown-to-HTML conversion logic here
  try {
    const result = await unified()
      .use(remarkParse) // Parse markdown content to a syntax tree
      .use(remarkRehype) // Turn markdown syntax tree to HTML syntax tree, ignoring embedded HTML
      .use(rehypeStringify) // Serialize HTML syntax tree
      .process(markdown);

    return String(result);
  } catch (error) {
    throw error;
  }
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
  const blog = getBlogBySlug(params.slug);
  const markdownBody = await markdownToHtml(blog.markdownBody);

  return {
    props: {
      frontmatter: blog.frontmatter,
      markdownBody,
    },
  };
};

const Blog: React.FC<BlogProps> = ({ frontmatter, markdownBody }) => {
  return <BlogPost frontmatter={frontmatter} markdownBody={markdownBody} />;
};

export default Blog;
