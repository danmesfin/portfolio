import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import { CaseStudy } from '../../utils/getCaseStudies';
import SectionHeading from '../SectionHeading';

/**
 * Category label per study. Everything else (title, copy, images, links) comes
 * from the markdown in content/projects-case-study.
 */
const CATEGORIES: Record<string, string> = {
  ehudai: 'AI & Machine Learning',
  miranapm: 'SaaS Platform',
  reveshare: 'E-commerce',
  bridgeofhope: 'Nonprofit Platform',
  aicreativeaward: 'Scale & Anti-Abuse',
};

const DEFAULT_CATEGORY = 'Full-Stack Development';

const CaseStudyRow: React.FC<{ project: CaseStudy }> = ({ project }) => {
  const category = CATEGORIES[project.slug] ?? DEFAULT_CATEGORY;

  return (
    <article className="group relative grid grid-cols-1 md:grid-cols-[1fr_20rem] gap-x-10 gap-y-6 py-10 lg:py-12 items-center">
      <Link
        href={`/case-studies/${project.slug}`}
        className="absolute inset-0 focus:outline-none"
      >
        <span className="sr-only">Read the {project.name} case study</span>
      </Link>

      <div className="min-w-0 order-2 md:order-none">
        <p className="eyebrow">{category}</p>
        <h3 className="font-display mt-3 text-2xl sm:text-3xl lg:text-4xl leading-tight text-paper-text dark:text-paper-white group-hover:underline decoration-1 underline-offset-4">
          {project.name}
        </h3>
        {project.subtitle && (
          <p className="mt-2 font-mono text-sm text-paper-muted dark:text-gray-500">
            {project.subtitle}
          </p>
        )}
        <p className="mt-4 max-w-xl text-paper-muted dark:text-gray-400 leading-relaxed line-clamp-3">
          {project.description}
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

      {project.images[0] && (
        <div className="paper-inset relative w-full aspect-video overflow-hidden order-1 md:order-none">
          <Image
            src={project.images[0]}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 20rem"
            className="object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-300"
          />
        </div>
      )}
    </article>
  );
};

interface CaseStudyListProps {
  caseStudies: CaseStudy[];
}

const CaseStudyList: React.FC<CaseStudyListProps> = ({ caseStudies }) => {
  if (caseStudies.length === 0) return null;

  return (
    <section className="px-5 sm:px-8 lg:px-12 py-16 sm:py-24" id="case-studies">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Case studies"
          title="The reasoning behind the build."
          intro="Longer write-ups — the problem, the architecture, the decisions, and what shipped."
        />

        <div className="divide-y divide-paper-border dark:divide-white/10">
          {caseStudies.map((project) => (
            <CaseStudyRow key={project.slug} project={project} />
          ))}
        </div>

        <div className="mt-12">
          <Link href="/case-studies" className="btn-outline">
            All case studies
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyList;
