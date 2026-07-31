import React from 'react';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import Seo from '../../components/Seo';
import { getAllBlogs, BlogData } from '../../utils/getBlogs';
import formatDate from '../../utils/date';

interface BlogIndexProps {
  blogs: BlogData[];
}

const BlogIndex: React.FC<BlogIndexProps> = ({ blogs }) => (
  <div className="min-h-screen bg-base dark:bg-black">
    <Seo
      title="Blog"
      description="Insights, tutorials, and thoughts on web development, design, and technology by Daniel Mesfin."
      path="/blogs"
    />
    <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-12 py-16 sm:py-24">
      <p className="eyebrow">Writing</p>
      <h1 className="font-display mt-4 text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-paper-text dark:text-paper-white">
        Notes on building.
      </h1>
      <p className="mt-6 max-w-2xl text-paper-muted dark:text-gray-400 leading-relaxed">
        Occasional writing on web development, tooling, and the craft of
        shipping software.
      </p>
      <hr className="rule mt-10" />

      <div className="divide-y divide-paper-border dark:divide-white/10">
        {blogs.map((blog) => (
          <article key={blog.slug} className="group relative py-8 lg:py-10">
            <Link
              href={`/blogs/${blog.slug}`}
              className="absolute inset-0 focus:outline-none"
            >
              <span className="sr-only">{blog.frontmatter.title}</span>
            </Link>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <time
                dateTime={blog.frontmatter.date}
                className="eyebrow not-italic"
              >
                {formatDate(blog.frontmatter.date)}
              </time>
              {blog.frontmatter.category && (
                <span className="eyebrow">· {blog.frontmatter.category}</span>
              )}
            </div>
            <h2 className="font-display mt-3 text-2xl sm:text-3xl leading-tight text-paper-text dark:text-paper-white group-hover:underline decoration-1 underline-offset-4">
              {blog.frontmatter.title}
            </h2>
            <p className="mt-3 max-w-2xl text-paper-muted dark:text-gray-400 leading-relaxed line-clamp-2">
              {blog.frontmatter.description}
            </p>
          </article>
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
