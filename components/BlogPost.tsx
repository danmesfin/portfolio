import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import parse from 'html-react-parser';
import Link from 'next/link';
import Head from 'next/head';
import formatDate from '../utils/date';

interface BlogPostProps {
  frontmatter: {
    title: string;
    date: string;
    preview: string;
  };
  markdownBody: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ frontmatter, markdownBody }) => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-paper-cream dark:bg-zinc-800">
      <Head>
        <title>{frontmatter.title} | Daniel Mesfin</title>
        <meta
          name="description"
          content="Explore a collection of insightful blog posts on various topics. Discover engaging content that sparks curiosity and learning."
        />
        <link rel="canonical" href="https://danielmesfin.com/blogs" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/blogs"
            className="flex items-center space-x-2 bg-white border border-black px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors w-fit"
          >
            <svg
              className="w-5 h-5 text-gray-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="text-gray-900 font-medium">Back to Blog</span>
          </Link>
        </div>

        {/* Article Header */}
        <article className="rounded-2xl p-8 lg:p-12">
          {/* Date */}
          <p className="text-gray-600 mb-4 text-sm">
            {formatDate(frontmatter.date)}
          </p>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-gray-900 font-display leading-tight">
            {frontmatter.title}
          </h1>

          {/* Featured Image */}
          <div className="relative w-full aspect-video mb-8 overflow-hidden rounded-xl border border-gray-300 bg-gray-50">
            <Image
              src={frontmatter.preview}
              alt={frontmatter.title}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:text-gray-900 [&>h1]:mb-6 [&>h1]:mt-12 [&>h1]:first:mt-0 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mb-4 [&>h2]:mt-10 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-gray-800 [&>h3]:mb-3 [&>h3]:mt-8 [&>p]:mb-6 [&>p]:text-lg [&>p]:leading-relaxed [&>ul]:mb-6 [&>ul]:space-y-2 [&>ol]:mb-6 [&>ol]:space-y-2 [&>li]:leading-relaxed [&>blockquote]:border-l-4 [&>blockquote]:border-gray-900 [&>blockquote]:pl-6 [&>blockquote]:py-4 [&>blockquote]:my-6 [&>blockquote]:bg-gray-50 [&>blockquote]:rounded-r-xl [&>blockquote]:italic [&>code]:bg-gray-100 [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-sm [&>code]:font-mono [&>pre]:bg-gray-900 [&>pre]:text-gray-100 [&>pre]:p-6 [&>pre]:rounded-xl [&>pre]:overflow-x-auto [&>pre]:mb-6 [&>pre]:border-2 [&>pre]:border-black">
              {parse(markdownBody)}
            </div>
          </div>
        </article>

        {/* Navigation Footer */}
        <div className="mt-12 text-center">
          <Link
            href="/blogs"
            className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-4 rounded-xl font-semibold text-lg transition-colors inline-flex items-center space-x-2"
          >
            <span>See All Posts</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
};

export default BlogPost;
