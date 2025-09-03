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
  <div className="min-h-screen bg-paper-cream dark:bg-zinc-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
      {/* Header Section */}
      <div className="text-center mb-12 lg:mb-16">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 lg:mb-6 text-gray-900 dark:text-white font-display">
          Blogs
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Insights, tutorials, and thoughts on web development, design, and technology
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {blogs.map((blog, index) => {
          // Define color variations for the top section
          const colors = [
            'bg-blue-300',
            'bg-purple-300', 
            'bg-green-300',
            'bg-yellow-300',
            'bg-pink-300',
            'bg-orange-300'
          ];
          const cardColor = colors[index % colors.length];
          
          return (
            <Link key={blog.slug} href={`/blogs/${blog.slug}`}>
              <div className="rounded-lg border border-black overflow-hidden hover:shadow-lg transition-all duration-300 group hover:-translate-y-1">
                {/* Colored Top Section */}
                <div className={`${cardColor} p-6 relative overflow-hidden`}>
                  {/* Blog Image - positioned in top right */}
                  <div className="absolute top-4 right-4 w-20 h-20 rounded-full overflow-hidden border-2 border-black bg-white">
                    <Image
                      src={blog.frontmatter.preview}
                      alt={blog.frontmatter.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Category Badge */}
                  {blog.frontmatter.category && (
                    <span className="inline-block px-3 py-1 bg-white/90 border border-black rounded-full text-xs font-bold text-gray-900 mb-4">
                      {blog.frontmatter.category}
                    </span>
                  )}

                  {/* Title in colored section */}
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 line-clamp-3 leading-tight pr-24">
                    {blog.frontmatter.title}
                  </h2>

                  {/* Author-like text */}
                  <p className="text-gray-800 font-medium mt-4">
                    By Daniel Mesfin
                  </p>
                </div>

                {/* White Bottom Section */}
                <div className="bg-white p-6">
                  {/* Full title repeat */}
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                    {blog.frontmatter.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed mb-4">
                    {blog.frontmatter.description}
                  </p>

                  {/* Date */}
                  <p className="text-sm text-gray-500">
                    {formatDate(blog.frontmatter.date)}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
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
