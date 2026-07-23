import React from 'react';
import Image from 'next/image';
import parse from 'html-react-parser';
import Link from 'next/link';
import Seo from './Seo';
import formatDate from '../utils/date';

interface BlogPostProps {
  frontmatter: {
    title: string;
    date: string;
    preview: string;
    description?: string;
  };
  markdownBody: string;
  slug: string;
}

// Applied to the parsed markdown so headings, lists and code blocks pick up
// the right colours in both themes.
const proseClasses = [
  'text-gray-700 dark:text-gray-300 leading-relaxed',
  '[&>h1]:text-3xl [&>h1]:font-bold [&>h1]:text-gray-900 dark:[&>h1]:text-white [&>h1]:mb-6 [&>h1]:mt-12 [&>h1]:first:mt-0',
  '[&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-gray-900 dark:[&>h2]:text-white [&>h2]:mb-4 [&>h2]:mt-10',
  '[&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-gray-800 dark:[&>h3]:text-gray-100 [&>h3]:mb-3 [&>h3]:mt-8',
  '[&>p]:mb-6 [&>p]:text-lg [&>p]:leading-relaxed',
  '[&>ul]:mb-6 [&>ul]:space-y-2 [&>ul]:list-disc [&>ul]:pl-6',
  '[&>ol]:mb-6 [&>ol]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-6',
  '[&_li]:leading-relaxed',
  '[&_a]:text-accent-coral [&_a]:underline hover:[&_a]:no-underline',
  '[&>blockquote]:border-l-4 [&>blockquote]:border-accent-coral [&>blockquote]:pl-6 [&>blockquote]:py-4 [&>blockquote]:my-6 [&>blockquote]:bg-white dark:[&>blockquote]:bg-zinc-900 [&>blockquote]:rounded-r-xl [&>blockquote]:italic',
  '[&_code]:bg-white dark:[&_code]:bg-zinc-900 [&_code]:border [&_code]:border-black/10 dark:[&_code]:border-white/15 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono',
  '[&>pre]:bg-gray-900 [&>pre]:text-gray-100 [&>pre]:p-6 [&>pre]:rounded-xl [&>pre]:overflow-x-auto [&>pre]:mb-6 [&>pre]:border [&>pre]:border-black/20',
].join(' ');

const BlogPost: React.FC<BlogPostProps> = ({
  frontmatter,
  markdownBody,
  slug,
}) => (
  <div className="min-h-screen bg-paper-cream dark:bg-zinc-800">
    <Seo
      title={frontmatter.title}
      description={frontmatter.description}
      image={frontmatter.preview}
      type="article"
      path={`/blogs/${slug}`}
      publishedTime={
        frontmatter.date ? new Date(frontmatter.date).toISOString() : undefined
      }
    />

    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
      {/* Back Button */}
      <div className="mb-8">
        <Link
          href="/blogs"
          className="flex items-center space-x-2 bg-white dark:bg-zinc-900 border border-black dark:border-white/20 px-4 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors w-fit"
        >
          <svg
            className="w-5 h-5 text-gray-900 dark:text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="text-gray-900 dark:text-white font-medium">
            Back to Blog
          </span>
        </Link>
      </div>

      <article className="rounded-2xl p-8 lg:p-12">
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
          <time dateTime={frontmatter.date}>
            {formatDate(frontmatter.date)}
          </time>
        </p>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-gray-900 dark:text-white font-display leading-tight">
          {frontmatter.title}
        </h1>

        <div className="relative w-full aspect-video mb-8 overflow-hidden rounded-xl border border-gray-300 dark:border-white/20 bg-gray-50 dark:bg-zinc-900">
          <Image
            src={frontmatter.preview}
            alt=""
            fill
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-contain"
            priority
          />
        </div>

        <div className="prose prose-lg max-w-none">
          <div className={proseClasses}>{parse(markdownBody)}</div>
        </div>
      </article>

      <div className="mt-12 text-center">
        <Link
          href="/blogs"
          className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-colors inline-flex items-center space-x-2"
        >
          <span>See All Posts</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  </div>
);

export default BlogPost;
