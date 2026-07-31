import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FaExternalLinkAlt } from 'react-icons/fa';
import Seo from '../../components/Seo';
import proseClasses from '../../utils/proseClasses';
import {
  getCaseStudies,
  getCaseStudy,
  CaseStudy,
} from '../../utils/getCaseStudies';

interface CaseStudyPageProps {
  caseStudy: CaseStudy;
}

/**
 * The markdown preamble (title, summary blockquote, Role/Timeline/Stack) is
 * already shown in the page header and meta strip, so drop everything up to
 * and including the first thematic break — the body starts at the first
 * narrative section. Falls back to the full content if there is no break.
 */
function caseStudyBody(content: string): string {
  const match = content.match(/(?:^|\n)-{3,}[ \t]*(?:\n|$)/);
  if (!match || match.index === undefined) return content;
  return content.slice(match.index + match[0].length).trim();
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

      <div className="min-h-screen bg-base dark:bg-black">
        <article className="mx-auto max-w-3xl px-5 sm:px-8 py-16 sm:py-24">
          <Link
            href="/case-studies"
            className="font-mono text-sm text-paper-muted hover:text-paper-text dark:text-gray-400 dark:hover:text-paper-white transition-colors"
          >
            ← All case studies
          </Link>

          {/* Header */}
          <header className="mt-12">
            <p className="eyebrow">Case study</p>
            <h1 className="font-display mt-4 text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-paper-text dark:text-paper-white">
              {caseStudy.name}
            </h1>
            {caseStudy.subtitle && (
              <p className="mt-3 font-mono text-paper-muted dark:text-gray-400">
                {caseStudy.subtitle}
              </p>
            )}
            <p className="mt-8 text-lg text-paper-muted dark:text-gray-300 leading-relaxed">
              {caseStudy.description}
            </p>
            {caseStudy.liveUrl && (
              <a
                href={caseStudy.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ink mt-8"
              >
                View live project
                <FaExternalLinkAlt size={11} aria-hidden="true" />
              </a>
            )}
          </header>

          {/* Meta strip */}
          <dl className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 border-y border-paper-border dark:border-white/10 py-8">
            <div>
              <dt className="eyebrow">Role</dt>
              <dd className="mt-2 font-mono text-sm text-paper-text dark:text-paper-white">
                {caseStudy.role}
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Timeline</dt>
              <dd className="mt-2 font-mono text-sm text-paper-text dark:text-paper-white">
                {caseStudy.timeline}
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Stack</dt>
              <dd className="mt-2 font-mono text-sm text-paper-text dark:text-paper-white">
                {caseStudy.technologies.slice(0, 6).join(', ')}
              </dd>
            </div>
          </dl>

          {/* Lead image */}
          {caseStudy.images[0] && (
            <div className="paper-inset relative w-full aspect-video mt-12 overflow-hidden">
              <Image
                src={caseStudy.images[0]}
                alt={`${caseStudy.name} interface`}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Body */}
          <div className={`mt-12 ${proseClasses}`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {caseStudyBody(caseStudy.content)}
            </ReactMarkdown>
          </div>

          {/* Gallery */}
          {caseStudy.images.length > 1 && (
            <div className="mt-16 space-y-6">
              {caseStudy.images.slice(1).map((image, index) => (
                <div
                  key={image}
                  className="paper-inset relative aspect-video overflow-hidden"
                >
                  <Image
                    src={image}
                    alt={`${caseStudy.name} screenshot ${index + 2}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Footer CTA */}
          <div className="mt-16 pt-10 border-t border-paper-border dark:border-white/10 flex flex-wrap gap-3">
            <Link href="/#contact" className="btn-ink">
              Get in touch
            </Link>
            <Link href="/case-studies" className="btn-outline">
              More case studies
            </Link>
          </div>
        </article>
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
