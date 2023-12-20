/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { getAllBlogs, BlogData } from '../../utils/getBlogs';
import formatDate from '../../utils/date';

interface BlogIndexProps {
  blogs: BlogData[];
}

const BlogIndex: React.FC<BlogIndexProps> = ({ blogs }) => (
  <div className="container mx-auto px-4 md:px-10 my-8">
    <h1 className="text-3xl font-bold mb-4">Blog</h1>
    <h3 className="text-2xl font-hand py-2">
      Explore a collection of insightful blog posts on various topics.
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {blogs.map((blog) => (
        <Link key={blog.slug} href={`/blogs/${blog.slug}`}>
          <a>
            <div className="bg-white p-4 rounded-lg shadow-md">
              {
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={blog.frontmatter.preview}
                  alt={blog.frontmatter.title}
                  className="w-full h-32 object-cover mb-4 rounded-md"
                />
              }

              <h2 className="text-xl font-semibold text-base">
                {blog.frontmatter.title}
              </h2>
              <p className="text-gray-600 text-sm">
                posted on: {formatDate(blog.frontmatter.date)}
              </p>
            </div>
          </a>
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
