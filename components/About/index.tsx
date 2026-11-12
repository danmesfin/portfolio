import React from 'react';
import Link from 'next/link';
import { experienceData } from '../Experience';
import { siteConfig, socials } from '../../utils/siteConfig';

const currentRole = experienceData.find(
  (role) => role.duration.end === 'Present'
);
const currentRoleText = currentRole
  ? `${currentRole.title} at ${currentRole.company}`
  : siteConfig.role;

/**
 * Plain-text questions and answers about Daniel, written in the third person
 * so they can be quoted as-is. Rendered on /about and reused for the FAQPage
 * JSON-LD and /llms.txt — keep the answers free of markup.
 */
export const faqs: { question: string; answer: string }[] = [
  {
    question: 'Who is Daniel Mesfin?',
    answer: `Daniel Mesfin is a full-stack software engineer based in ${siteConfig.location}. He is currently ${currentRoleText} and has been building production software professionally since 2022.`,
  },
  {
    question: 'What does Daniel Mesfin build?',
    answer:
      'AI and data-heavy products, built full-stack and end to end: web applications and SaaS platforms, including multi-tenant products and payment integrations; AI-powered tools such as LLM integrations, agents and content-generation pipelines; and the data pipelines and automation those products depend on.',
  },
  {
    question: 'What technologies does he work with?',
    answer:
      'Mainly TypeScript with React, Next.js and Node.js (including NestJS), and PHP with Laravel. On the data side he works with PostgreSQL, MySQL and Redis, and deploys on AWS and Vercel.',
  },
  {
    question: 'What is his most notable project?',
    answer:
      'AI Creative Award, a monthly competition for AI-generated art with a 1M ETB prize pool. He designed, built and launched the whole platform as the sole engineer in about four weeks, and it has handled more than 50,000 users.',
  },
  {
    question: 'Is Daniel Mesfin available for freelance or contract work?',
    answer: `Yes. He is open to freelance and contract work and can be reached through the contact form on this site, LinkedIn or Upwork, where he holds the ${siteConfig.upworkBadge} badge.`,
  },
  {
    question: 'Where is he based, and does he work remotely?',
    answer:
      'He lives in Addis Ababa, Ethiopia (East Africa Time, UTC+3) and works remotely, including with teams and clients in the United States.',
  },
];

const upworkUrl = socials.find(({ label }) => label === 'Upwork')?.href;

const profileLinks = socials.filter(({ label }) =>
  ['GitHub', 'LinkedIn', 'Upwork'].includes(label)
);

export interface AboutWork {
  slug: string;
  name: string;
  subtitle: string;
}

interface AboutProps {
  /** Case studies to link to under "Notable work". */
  work: AboutWork[];
}

const headingClasses =
  'font-display text-2xl sm:text-3xl text-paper-text dark:text-paper-white';
const bodyClasses = 'text-paper-muted dark:text-gray-400 leading-relaxed';
const linkClasses =
  'text-paper-text dark:text-paper-white underline decoration-1 underline-offset-2 hover:decoration-transparent';

function About({ work }: AboutProps) {
  const facts: { label: string; value: React.ReactNode }[] = [
    { label: 'Role', value: siteConfig.role },
    { label: 'Currently', value: currentRoleText },
    { label: 'Based in', value: siteConfig.location },
    { label: 'Availability', value: siteConfig.availability },
    {
      label: 'Upwork',
      value: upworkUrl ? (
        <a
          href={upworkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClasses}
        >
          {siteConfig.upworkBadge}
        </a>
      ) : (
        siteConfig.upworkBadge
      ),
    },
    {
      label: 'Profiles',
      value: profileLinks.map(({ label, href }, index) => (
        <React.Fragment key={label}>
          {index > 0 && ', '}
          <a
            href={href}
            target="_blank"
            // `me` marks these as the same person's profiles (microformats).
            // eslint-disable-next-line react/no-invalid-html-attribute
            rel="noopener noreferrer me"
            className={linkClasses}
          >
            {label}
          </a>
        </React.Fragment>
      )),
    },
  ];

  return (
    <section className="w-full px-5 sm:px-8 lg:px-12 py-16 sm:py-24" id="about">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">About</p>
        <h1 className="font-display mt-4 text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-paper-text dark:text-paper-white">
          {siteConfig.name}.
        </h1>

        <p className="mt-8 text-lg text-paper-muted dark:text-gray-300 leading-relaxed">
          {siteConfig.name} is a full-stack software engineer based in{' '}
          {siteConfig.location}. He builds AI and data-heavy products end to
          end, from the interface to the infrastructure, and is currently{' '}
          {currentRoleText}.
        </p>

        {/* At a glance */}
        <dl className="mt-12 grid grid-cols-1 sm:grid-cols-[10rem_1fr] gap-x-6 gap-y-4 border-y border-paper-border dark:border-white/10 py-8">
          {facts.map(({ label, value }) => (
            <React.Fragment key={label}>
              <dt className="eyebrow sm:pt-0.5">{label}</dt>
              <dd className="font-mono text-sm text-paper-text dark:text-paper-white">
                {value}
              </dd>
            </React.Fragment>
          ))}
        </dl>

        {/* Origin story */}
        <h2 className={`mt-16 ${headingClasses}`}>How it started.</h2>
        <div className={`mt-6 space-y-6 ${bodyClasses}`}>
          <p>
            In 2017, I began coding using ES File Explorer — an Android file
            manager — to write HTML and CSS. My goal was to build a school
            website. At the time I only had an Android phone and a strong desire
            to learn.
          </p>
          <p>
            After joining university, I finally owned my first computer. Today
            I&apos;m a software developer constantly seeking knowledge and
            innovation. I invite you to explore my work and join me on the
            journey.
          </p>
        </div>

        {/* Notable work */}
        {work.length > 0 && (
          <>
            <h2 className={`mt-16 ${headingClasses}`}>Notable work.</h2>
            <ul className="mt-6 divide-y divide-paper-border dark:divide-white/10 border-y border-paper-border dark:border-white/10">
              {work.map(({ slug, name, subtitle }) => (
                <li key={slug} className="py-4">
                  <Link
                    href={`/case-studies/${slug}`}
                    className={`font-display text-lg ${linkClasses}`}
                  >
                    {name}
                  </Link>
                  {subtitle && (
                    <p className="mt-1 font-mono text-sm text-paper-muted dark:text-gray-400">
                      {subtitle}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}

        {/* FAQ */}
        <h2 className={`mt-16 ${headingClasses}`}>Questions, answered.</h2>
        <div className="mt-6 divide-y divide-paper-border dark:divide-white/10 border-y border-paper-border dark:border-white/10">
          {faqs.map(({ question, answer }) => (
            <div key={question} className="py-6">
              <h3 className="font-display text-xl text-paper-text dark:text-paper-white">
                {question}
              </h3>
              <p className={`mt-3 ${bodyClasses}`}>{answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/#contact" className="btn-ink">
            Get in touch
          </Link>
          <Link href="/case-studies" className="btn-outline">
            All case studies
          </Link>
        </div>
      </div>
    </section>
  );
}

export default About;
