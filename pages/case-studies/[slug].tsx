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

      <div className="min-h-screen bg-paper-cream dark:bg-zinc-800">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto relative py-16 sm:py-20 lg:py-24">
          {/* Back Button */}
          <div className="absolute top-6 left-6 z-20">
            <Link
              href="/#projects"
              className="flex items-center space-x-2 bg-white border border-black px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-gray-900 font-medium">Back to Projects</span>
            </Link>
          </div>

          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
              {/* Content - Left Side */}
              <div className="flex-1 text-center lg:text-left">
                {/* Technology Tags */}
                <div className="mb-6 flex flex-wrap justify-center lg:justify-start gap-3">
                  {caseStudy.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-900"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl xl:text-6xl mb-4 lg:mb-6 leading-tight text-paper-text dark:text-white font-display">
                  {caseStudy.title}
                </h1>

                {/* Role */}
                <p className="text-gray-600 font-semibold mb-4 uppercase tracking-wide text-lg">
                  {caseStudy.role}
                </p>

                {/* Description */}
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                  {caseStudy.description}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  {caseStudy.liveUrl && (
                    <a
                      href={caseStudy.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 bg-gray-900 text-white hover:bg-gray-800 px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
                    >
                      <span>View Live Project</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                  <button
                    onClick={() => document.getElementById('case-study-content')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center justify-center space-x-2 bg-white border border-black hover:bg-gray-50 px-8 py-4 rounded-xl font-semibold text-lg transition-colors text-gray-900"
                  >
                    <span>Read Case Study</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Hero Image - Right Side */}
              <div className="lg:w-1/2 xl:w-2/5 flex-shrink-0">
                {caseStudy.images[0] && (
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-black bg-white">
                    <Image
                      src={caseStudy.images[0]}
                      alt={caseStudy.title}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Case Study Content */}
        <div id="case-study-content" className="py-20 bg-paper-cream dark:bg-zinc-900">
          <div className="max-w-4xl mx-auto px-4">
            {/* Project Images Gallery */}
            {caseStudy.images.length > 1 && (
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                  Project Gallery
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {caseStudy.images.slice(1).map((image, index) => (
                    <div key={index} className="relative aspect-video rounded-2xl overflow-hidden border-2 border-black bg-white">
                      <Image
                        src={image}
                        alt={`${caseStudy.title} screenshot ${index + 2}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Markdown Content */}
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 mt-12 first:mt-0">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 mt-10">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-8">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside text-lg text-gray-700 dark:text-gray-300 mb-6 space-y-2">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside text-lg text-gray-700 dark:text-gray-300 mb-6 space-y-2">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="leading-relaxed">{children}</li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-gray-900 pl-6 py-4 my-6 bg-white border border-gray-300 rounded-r-xl">
                      <div className="text-lg text-gray-800 dark:text-gray-300 italic">
                        {children}
                      </div>
                    </blockquote>
                  ),
                  code: ({ children }) => (
                    <code className="bg-white border border-gray-300 px-2 py-1 rounded text-sm font-mono text-gray-900">
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto mb-6 border-2 border-black">
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
        <div className="py-20 border-t-2 border-black text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Ready to work together?</h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Let's create something amazing. I'm always excited to take on new challenges
              and bring innovative ideas to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
              >
                Get In Touch
              </Link>
              <Link
                href="/#projects"
                className="bg-white border border-black hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
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
