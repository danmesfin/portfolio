import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';
import Seo from '../../components/Seo';
import { getCaseStudies, CaseStudy } from '../../utils/getCaseStudies';

interface CaseStudiesPageProps {
  caseStudies: CaseStudy[];
}

export default function CaseStudiesPage({ caseStudies }: CaseStudiesPageProps) {
  return (
    <>
      <Seo
        title="Case Studies"
        description="Detailed case studies covering full-stack development, AI integration, multi-tenant SaaS, and payment platforms."
        path="/case-studies"
      />

      <div className="min-h-screen bg-base dark:bg-black">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12 py-16 sm:py-24">
          <p className="eyebrow">Case studies</p>
          <h1 className="font-display mt-4 text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-paper-text dark:text-paper-white max-w-3xl">
            Deep dives into the work.
          </h1>
          <p className="mt-6 max-w-2xl text-paper-muted dark:text-gray-400 leading-relaxed">
            The problem, the architecture, the decisions that mattered, and what
            actually shipped — for the projects worth the long read.
          </p>
          <hr className="rule mt-10" />

          {caseStudies.length > 0 ? (
            <div className="divide-y divide-paper-border dark:divide-white/10">
              {caseStudies.map((caseStudy, index) => (
                <article
                  key={caseStudy.slug}
                  className="group relative grid grid-cols-1 md:grid-cols-[3rem_1fr_20rem] gap-x-8 gap-y-6 py-10 lg:py-12 items-center"
                >
                  <Link
                    href={`/case-studies/${caseStudy.slug}`}
                    className="absolute inset-0 focus:outline-none"
                  >
                    <span className="sr-only">
                      Read the {caseStudy.name} case study
                    </span>
                  </Link>

                  <span className="eyebrow hidden md:block self-start pt-2">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="min-w-0 order-2 md:order-none">
                    <p className="eyebrow">
                      {caseStudy.role} · {caseStudy.timeline}
                    </p>
                    <h2 className="font-display mt-3 text-2xl sm:text-3xl lg:text-4xl leading-tight text-paper-text dark:text-paper-white group-hover:underline decoration-1 underline-offset-4">
                      {caseStudy.name}
                    </h2>
                    <p className="mt-4 max-w-xl text-paper-muted dark:text-gray-400 leading-relaxed line-clamp-3">
                      {caseStudy.excerpt}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-paper-text dark:text-paper-white">
                      Read case study
                      <FaArrowRight
                        size={12}
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </div>

                  {caseStudy.images[0] && (
                    <div className="paper-inset relative w-full aspect-video overflow-hidden order-1 md:order-none">
                      <Image
                        src={caseStudy.images[0]}
                        alt=""
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-300"
                        sizes="(max-width: 768px) 100vw, 20rem"
                      />
                    </div>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <p className="py-20 font-mono text-sm text-paper-muted dark:text-gray-400">
              Case studies are being prepared. Check back soon.
            </p>
          )}

          <div className="mt-16 pt-10 border-t border-paper-border dark:border-white/10 flex flex-wrap gap-3">
            <Link href="/#projects" className="btn-outline">
              All projects
            </Link>
            <Link href="/#contact" className="btn-ink">
              Get in touch
            </Link>
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
