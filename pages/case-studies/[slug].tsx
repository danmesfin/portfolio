import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { getCaseStudies, getCaseStudy, CaseStudy } from '../../utils/getCaseStudies';

interface CaseStudyPageProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyPage({ caseStudy }: CaseStudyPageProps) {
  return (
    <>
      <Head>
        <title>{caseStudy.title} - Case Study | Daniel Mesfin</title>
        <meta name="description" content={caseStudy.excerpt} />
        <meta property="og:title" content={`${caseStudy.title} - Case Study`} />
        <meta property="og:description" content={caseStudy.excerpt} />
        <meta property="og:image" content={caseStudy.images[0]} />
        <meta property="og:type" content="article" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-black">
        {/* Hero Section */}
        <div className="relative h-screen overflow-hidden">
          {/* Background Image */}
          {caseStudy.images[0] && (
            <div className="absolute inset-0">
              <Image
                src={caseStudy.images[0]}
                alt={caseStudy.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80" />
            </div>
          )}

          {/* Hero Content */}
          <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <div className="absolute top-8 left-8">
                <Link
                  href="/#projects"
                  className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Back to Projects</span>
                </Link>
              </div>

              {/* Technology Tags */}
              <div className="mb-6 flex flex-wrap justify-center gap-3">
                {caseStudy.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                {caseStudy.title}
              </h1>

              {/* Role */}
              <p className="text-orange-400 font-semibold mb-4 uppercase tracking-wide text-lg">
                {caseStudy.role}
              </p>

              {/* Description */}
              <p className="text-xl md:text-2xl text-zinc-200 mb-8 leading-relaxed max-w-3xl mx-auto">
                {caseStudy.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {caseStudy.liveUrl && (
                  <a
                    href={caseStudy.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <span>View Live Project</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
                <button
                  onClick={() => document.getElementById('case-study-content')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 border border-white/30"
                >
                  <span>Read Case Study</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>

        {/* Case Study Content */}
        <div id="case-study-content" className="py-20 bg-white dark:bg-zinc-900">
          <div className="max-w-4xl mx-auto px-4">
            {/* Project Images Gallery */}
            {caseStudy.images.length > 1 && (
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-zinc-800 dark:text-white mb-8 text-center">
                  Project Gallery
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {caseStudy.images.slice(1).map((image, index) => (
                    <div key={index} className="relative w-full h-[250px] md:h-[300px] rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src={image}
                        alt={`${caseStudy.title} screenshot ${index + 2}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Markdown Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-4xl md:text-5xl font-bold text-zinc-800 dark:text-white mb-8 mt-12">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-3xl md:text-4xl font-bold text-zinc-800 dark:text-white mb-6 mt-10">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-2xl md:text-3xl font-bold text-zinc-800 dark:text-white mb-4 mt-8">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="text-lg text-zinc-700 dark:text-zinc-300 mb-6 space-y-2">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="text-lg text-zinc-700 dark:text-zinc-300 mb-6 space-y-2">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="flex items-start space-x-2">
                      <span className="text-orange-500 mt-2">•</span>
                      <span>{children}</span>
                    </li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-orange-500 pl-6 py-4 bg-orange-50 dark:bg-orange-900/20 rounded-r-lg mb-6">
                      {children}
                    </blockquote>
                  ),
                  code: ({ children }) => (
                    <code className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-sm font-mono">
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-zinc-900 text-zinc-100 p-6 rounded-lg overflow-x-auto mb-6">
                      {children}
                    </pre>
                  ),
                }}
              >
                {caseStudy.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 py-16">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Interested in working together?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Let's discuss how I can help bring your project to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="bg-white text-orange-500 hover:bg-zinc-100 px-8 py-4 rounded-full font-semibold text-lg transition-colors"
              >
                Get In Touch
              </Link>
              <Link
                href="/#projects"
                className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-8 py-4 rounded-full font-semibold text-lg transition-colors border border-white/30"
              >
                View More Projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const caseStudies = getCaseStudies();
  const paths = caseStudies.map((study) => ({
    params: { slug: study.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      caseStudy,
    },
  };
};
