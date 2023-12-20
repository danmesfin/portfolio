/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
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

const BlogPost: React.FC<BlogPostProps> = ({ frontmatter, markdownBody }) => (
  <div className="max-w-2xl mx-auto px-4 md:px-0 my-8">
    <Head>
      <title>{frontmatter.title}| Discover Amazing Contents</title>
      <meta
        name="description"
        content="Explore a collection of insightful blog posts on various topics. Discover engaging content that sparks curiosity and learning."
      />
      <link rel="canonical" href="https://danielmesfin.com/blogs" />
    </Head>
    <h1 className="text-4xl font-bold mb-4">{frontmatter.title}</h1>
    <p className="text-gray-600 mb-4">{formatDate(frontmatter.date)}</p>
    <img
      src={frontmatter.preview}
      alt={frontmatter.title}
      className="w-full h-64 object-cover mb-4 rounded-md"
    />
    <div className="pose">{parse(markdownBody)}</div>

    <button
      type="button"
      className="border border-primary text-white px-4 py-2 rounded-md mt-4"
    >
      <Link href="/blogs">
        <a>See All Posts</a>
      </Link>
    </button>
  </div>
);

export default BlogPost;
