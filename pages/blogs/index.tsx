import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import { getAllBlogs, BlogData } from '../../utils/getBlogs';
import formatDate from '../../utils/date';

interface BlogIndexProps {
  blogs: BlogData[];
}
const BlogIndex: React.FC<BlogIndexProps> = ({ blogs }) => (
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-8 ">
    <h1 className="text-4xl font-bold mb-6 text-center dark:text-white text-primary">
      Welcome to My Blog
    </h1>
    <p className="text-lg text-center mb-8 dark:text-gray-300 text-gray-200">
      Explore a collection of insightful blog posts on various topics.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map((blog) => (
        <Link key={blog.slug} href={`/blogs/${blog.slug}`}>
          <div className="bg-gray-100 dark:bg-black bg-opacity-60 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border dark:border-gray-700">
            <div className="relative w-full h-40 mb-4 overflow-hidden rounded-md">
              <Image
                src={blog.frontmatter.preview}
                alt={blog.frontmatter.title}
                layout="fill"
                objectFit="contain"
                blurDataURL="data:..."
                placeholder="blur"
                className="rounded-md"
              />
            </div>
            <h2 className="text-2xl font-semibold mb-2 dark:text-white text-black">
              {blog.frontmatter.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {blog.frontmatter.description}
            </p>
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Posted on {formatDate(blog.frontmatter.date)}
              </p>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {blog.frontmatter.category}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export const getStaticProps: GetStaticProps<BlogIndexProps> = async () => {
  const blogs = getAllBlogs();

  return {
    props: {
      blogs,
    },
  };
};

export default BlogIndex;
