import React from 'react';
import Image from 'next/image';
import parse from 'html-react-parser';
import Link from 'next/link';
import Seo from './Seo';
import formatDate from '../utils/date';
import proseClasses from '../utils/proseClasses';

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

const BlogPost: React.FC<BlogPostProps> = ({
  frontmatter,
  markdownBody,
  slug,
}) => (
  <div className="min-h-screen bg-base dark:bg-black">
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

    <div className="mx-auto max-w-2xl px-5 sm:px-8 py-16 sm:py-24">
      <Link
        href="/blogs"
        className="font-mono text-sm text-paper-muted hover:text-paper-text dark:text-gray-400 dark:hover:text-paper-white transition-colors"
      >
        ← All writing
      </Link>

      <article className="mt-12">
        <p className="eyebrow">
          <time dateTime={frontmatter.date}>
            {formatDate(frontmatter.date)}
          </time>
        </p>

        <h1 className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl text-paper-text dark:text-paper-white leading-[1.1]">
          {frontmatter.title}
        </h1>

        <div className="paper-inset relative w-full aspect-video mt-10 mb-12 overflow-hidden">
          <Image
            src={frontmatter.preview}
            alt=""
            fill
            sizes="(max-width: 672px) 100vw, 672px"
            className="object-cover"
            priority
          />
        </div>

        <div className={proseClasses}>{parse(markdownBody)}</div>
      </article>

      <div className="mt-16 pt-8 border-t border-paper-border dark:border-white/10">
        <Link href="/blogs" className="btn-outline">
          See all posts
        </Link>
      </div>
    </div>
  </div>
);

export default BlogPost;
