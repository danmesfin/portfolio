import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { getCaseStudies, CaseStudy } from '../../utils/getCaseStudies';

interface CaseStudiesPageProps {
  caseStudies: CaseStudy[];
}

export default function CaseStudiesPage({ caseStudies }: CaseStudiesPageProps) {
  return (
    <>
      <Head>
        <title>Case Studies | Daniel Mesfin - Full-Stack Developer</title>
        <meta
          name="description"
          content="Explore detailed case studies showcasing my expertise in full-stack development, AI integration, and modern web technologies."
        />
        <meta property="og:title" content="Case Studies | Daniel Mesfin" />
        <meta
          property="og:description"
          content="Detailed project case studies and technical expertise showcase"
        />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-black">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-orange-50 to-pink-50 dark:from-zinc-900 dark:to-black py-20">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-zinc-800 dark:text-white mb-6">
              Case Studies
            </h1>
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 mb-8 max-w-3xl mx-auto">
              Deep dives into my most impactful projects, showcasing technical
              expertise, problem-solving approaches, and innovative solutions.
            </p>
            <Link
              href="/#projects"
              className="inline-flex items-center space-x-2 text-orange-500 hover:text-orange-600 font-semibold"
            >
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span>Back to Portfolio</span>
            </Link>
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            {caseStudies.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {caseStudies.map((caseStudy, index) => (
                  <Link
                    key={caseStudy.slug}
                    href={`/case-studies/${caseStudy.slug}`}
                    className="group block"
                  >
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                      {/* Image */}
                      <div className="relative w-full h-[250px] md:h-[280px] overflow-hidden">
                        <Image
                          src={
                            caseStudy.images[0] ||
                            '/images/placeholder-project.png'
                          }
                          alt={caseStudy.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                        {/* Technology Tags */}
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                          {caseStudy.technologies
                            .slice(0, 3)
                            .map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-3 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm rounded-full border border-white/30 text-white"
                              >
                                {tech}
                              </span>
                            ))}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-orange-500 font-semibold uppercase tracking-wide text-sm">
                            {caseStudy.role}
                          </span>
                          <span className="text-zinc-500 dark:text-zinc-400 text-sm">
                            Case Study #{index + 1}
                          </span>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-bold text-zinc-800 dark:text-white mb-4 group-hover:text-orange-500 transition-colors">
                          {caseStudy.title}
                        </h2>

                        <p className="text-zinc-600 dark:text-zinc-300 mb-6 leading-relaxed">
                          {caseStudy.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-orange-500 font-semibold">
                            <span>Read Case Study</span>
                            <svg
                              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>

                          {caseStudy.liveUrl && (
                            <a
                              href={caseStudy.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-1 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <svg
                                className="w-4 h-4"
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
                              <span className="text-sm">Live Demo</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 mx-auto mb-8 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-zinc-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-zinc-800 dark:text-white mb-4">
                    No Case Studies Yet
                  </h2>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-8">
                    Case studies are being prepared. Check back soon for
                    detailed project breakdowns and technical insights.
                  </p>
                  <Link
                    href="/#projects"
                    className="inline-flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold transition-colors"
                  >
                    <span>View Other Projects</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 py-16">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Want to see more of my work?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Explore my complete portfolio and get in touch to discuss your
              next project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#projects"
                className="bg-white text-orange-500 hover:bg-zinc-100 px-8 py-4 rounded-full font-semibold text-lg transition-colors"
              >
                View All Projects
              </Link>
              <Link
                href="/#contact"
                className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-8 py-4 rounded-full font-semibold text-lg transition-colors border border-white/30"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const caseStudies = getCaseStudies();

  return {
    props: {
      caseStudies,
    },
  };
};
