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
    <div className="max-w-2xl mx-auto px-4 md:px-0 my-8">
      <Head>
        <title>{frontmatter.title}| Discover Amazing Contents</title>
        <meta
          name="description"
          content="Explore a collection of insightful blog posts on various topics. Discover engaging content that sparks curiosity and learning."
        />
        <link rel="canonical" href="https://danielmesfin.com/blogs" />
      </Head>
      <div className="flex items-center mb-4">
        <button type="button" className="text-primary" onClick={goBack}>
          Back
        </button>
      </div>
      <h1 className="text-4xl mb-4 font-display text-gray-300 dark:text-gray-200">
        {frontmatter.title}
      </h1>
      <p className="text-gray-300 dark:text-gray-600 mb-4">
        {formatDate(frontmatter.date)}
      </p>
      <div className="relative w-full h-64 overflow-hidden rounded-md">
        <Image
          src={frontmatter.preview}
          alt={frontmatter.title}
          layout="fill"
          style={{ objectFit: 'contain' }}
          blurDataURL="data:..."
          placeholder="blur"
          className="rounded-md"
        />
      </div>
      <div className="pose mt-8 text-gray-300 dark:text-gray-200">
        {parse(markdownBody)}
      </div>

      <button
        type="button"
        className="border border-primary text-white px-4 py-2 rounded-md mt-4"
      >
        <Link href="/blogs">See All Posts</Link>
      </button>
    </div>
  );
};

export default BlogPost;
