import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import Seo from '../../components/Seo';
import {
  getCaseStudies,
  getCaseStudy,
  CaseStudy,
} from '../../utils/getCaseStudies';

interface CaseStudyPageProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyPage({ caseStudy }: CaseStudyPageProps) {
  return (
    <>
      <Seo
        title={`${caseStudy.name} — Case Study`}
        description={caseStudy.excerpt}
        image={caseStudy.images[0]}
        type="article"
        path={`/case-studies/${caseStudy.slug}`}
      />

      <div className="min-h-screen bg-paper-cream dark:bg-zinc-800">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto relative pt-16 pb-12 sm:pt-20 sm:pb-14 lg:pt-24 lg:pb-16">
          {/* Back Button */}
          <div className="absolute top-6 left-6 z-20">
            <Link
              href="/case-studies"
              className="flex items-center space-x-2 bg-white dark:bg-zinc-700 border border-black/10 dark:border-gray-600 px-4 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-600 transition-colors shadow-paper"
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
                Back to Case Studies
              </span>
            </Link>
          </div>

          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
              {/* Content - Left Side */}
              <div className="flex-1 text-center lg:text-left">
                {/* Label */}
                <p className="text-sm font-semibold uppercase tracking-widest text-accent-coral mb-3">
                  Case Study
                </p>

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl xl:text-6xl mb-4 lg:mb-5 leading-tight text-paper-text dark:text-white font-display">
                  {caseStudy.title}
                </h1>

                {/* Role */}
                <p className="text-gray-500 dark:text-gray-400 font-medium mb-5 uppercase tracking-wide text-sm">
                  {caseStudy.role}
                </p>

                {/* Description */}
                <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                  {caseStudy.description}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  {caseStudy.liveUrl && (
                    <a
                      href={caseStudy.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
                    >
                      <span>View Live Project</span>
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
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  )}
                  <button
                    onClick={() =>
                      document
                        .getElementById('case-study-content')
                        ?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="flex items-center justify-center space-x-2 bg-white dark:bg-zinc-700 border border-black/10 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-zinc-600 px-8 py-4 rounded-xl font-semibold text-lg transition-colors text-gray-900 dark:text-white"
                  >
                    <span>Read Case Study</span>
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
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Hero Image - Right Side */}
              <div className="lg:w-1/2 xl:w-2/5 flex-shrink-0">
                {caseStudy.images[0] && (
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-black/10 dark:border-gray-700 bg-white dark:bg-zinc-700 shadow-paper">
                    <Image
                      src={caseStudy.images[0]}
                      alt={`${caseStudy.name} interface`}
                      fill
                      sizes="(max-width: 1024px) 90vw, 40vw"
                      className="object-contain"
                      priority
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Project Details Strip */}
        <div className="border-y border-black/10 dark:border-gray-700 bg-white dark:bg-zinc-900">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Role */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">
                  Role
                </p>
                <p className="text-gray-900 dark:text-white font-medium">
                  {caseStudy.role}
                </p>
              </div>

              {/* Timeline */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">
                  Timeline
                </p>
                <p className="text-gray-900 dark:text-white font-medium">
                  {caseStudy.timeline}
                </p>
              </div>

              {/* Tech Stack */}
              <div className="sm:col-span-2 lg:col-span-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-paper-cream dark:bg-zinc-800 border border-black/10 dark:border-gray-700 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Case Study Content */}
        <div
          id="case-study-content"
          className="py-16 sm:py-20 bg-paper-cream dark:bg-zinc-800"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            {/* Project Images Gallery */}
            {caseStudy.images.length > 1 && (
              <div className="mb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {caseStudy.images.slice(1).map((image, index) => (
                    <div
                      key={image}
                      className="relative aspect-video rounded-2xl overflow-hidden border border-black/10 dark:border-gray-700 bg-white dark:bg-zinc-700 shadow-paper"
                    >
                      <Image
                        src={image}
                        alt={`${caseStudy.name} screenshot ${index + 2}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
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
                    <blockquote className="border-l-4 border-accent-coral pl-6 py-4 my-6 bg-white dark:bg-zinc-900 border border-black/10 dark:border-gray-700 rounded-r-xl">
                      <div className="text-lg text-gray-800 dark:text-gray-300 italic">
                        {children}
                      </div>
                    </blockquote>
                  ),
                  code: ({ children }) => (
                    <code className="bg-white dark:bg-zinc-900 border border-black/10 dark:border-gray-700 px-2 py-1 rounded text-sm font-mono text-gray-900 dark:text-gray-200">
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto mb-6 border border-black/10">
                      {children}
                    </pre>
                  ),
                  hr: () => (
                    <hr className="my-10 border-black/10 dark:border-gray-700" />
                  ),
                }}
              >
                {caseStudy.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="py-16 sm:py-20 border-t border-black/10 dark:border-gray-700 text-center bg-white dark:bg-zinc-900">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-bold mb-5 text-gray-900 dark:text-white font-display">
              Ready to work together?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              I&apos;m always excited to take on new challenges and bring
              innovative ideas to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
              >
                Get In Touch
              </Link>
              <Link
                href="/#projects"
                className="bg-white dark:bg-zinc-800 border border-black/10 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-zinc-700 text-gray-900 dark:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
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
