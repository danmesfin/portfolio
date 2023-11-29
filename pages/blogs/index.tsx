// pages/blogs/index.tsx
import Link from 'next/link';
import { getBlogs, Blog } from '../../utils/getBlogs';
import { GetStaticProps } from 'next';
import React from 'react';

interface BlogListProps {
  blogs: Blog[];
}

const BlogList: React.FC<BlogListProps> = ({ blogs }) => {
  return (
    <div className="max-w-2xl mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>
      <ul className="list-disc pl-4">
        {blogs.map((blog) => (
          <li key={blog.slug} className="mb-2">
            <Link href={`/blogs/${blog.slug}`}>
              <a className="text-blue-500 hover:underline">{blog.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps<BlogListProps> = async () => {
  const blogs = await getBlogs(); // Await the result of the asynchronous function
  return { props: { blogs } };
};

export default BlogList;
