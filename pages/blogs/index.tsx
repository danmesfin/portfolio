import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import Seo from '../../components/Seo';
import { getAllBlogs, BlogData } from '../../utils/getBlogs';
import formatDate from '../../utils/date';

interface BlogIndexProps {
  blogs: BlogData[];
}

const BlogIndex: React.FC<BlogIndexProps> = ({ blogs }) => (
  <div className="min-h-screen bg-paper-cream dark:bg-zinc-800">
    <Seo
      title="Blog"
      description="Insights, tutorials, and thoughts on web development, design, and technology by Daniel Mesfin."
      path="/blogs"
    />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
      {/* Header Section */}
      <div className="text-center mb-12 lg:mb-16">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 lg:mb-6 text-gray-900 dark:text-white font-display">
          Blogs
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Insights, tutorials, and thoughts on web development, design, and
          technology
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {blogs.map((blog) => (
          <Link key={blog.slug} href={`/blogs/${blog.slug}`} className="group">
            <article className="paper-card h-full rounded-2xl overflow-hidden transition-all duration-200 hover:border-accent-coral/60 hover:shadow-paper-hover hover:-translate-y-1">
              <div className="paper-inset relative aspect-[16/9] border-0 border-b">
                <Image
                  src={blog.frontmatter.preview}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                {blog.frontmatter.category && (
                  <span className="paper-pill inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4">
                    {blog.frontmatter.category}
                  </span>
                )}

                <h2 className="text-xl font-bold text-paper-text dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-accent-coral transition-colors">
                  {blog.frontmatter.title}
                </h2>

                <p className="text-paper-muted dark:text-gray-400 text-sm line-clamp-2 leading-relaxed mb-4">
                  {blog.frontmatter.description}
                </p>

                <p className="text-sm text-paper-muted dark:text-gray-500">
                  <time dateTime={blog.frontmatter.date}>
                    {formatDate(blog.frontmatter.date)}
                  </time>
                </p>
              </div>
            </article>
          </Link>
        ))}
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
