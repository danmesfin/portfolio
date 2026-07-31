import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import portrait from '../../public/images/danmesfin.webp';

const GLANCE = [
  { label: 'Focus', value: 'Extraction · Pipelines · AI agents' },
  { label: 'Now', value: 'Senior Data Engineer, Lexis Solutions' },
  { label: 'Stack', value: 'TypeScript · Next.js · Python · AWS' },
  { label: 'Based in', value: 'Addis Ababa, Ethiopia' },
];

export default function Banner() {
  const containerVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="px-5 sm:px-8 lg:px-12 pt-10 sm:pt-16" id="banner">
      <motion.div
        className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10 lg:gap-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {/* Left — headline + intro */}
        <div className="min-w-0">
          <p className="eyebrow">Daniel Mesfin</p>

          <h1 className="font-display mt-5 text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-paper-text dark:text-paper-white">
            I build data and AI systems on the public web.
          </h1>

          <div className="mt-8 space-y-5 max-w-xl text-paper-muted dark:text-gray-400 leading-relaxed">
            <p>
              Large-scale extraction from sites that fight back, pipelines that
              deliver clean records into the tools you already use, and the
              interfaces that make the whole thing useful.
            </p>
            <p>
              Currently Senior Data Engineer at{' '}
              <a
                href="https://www.lexis.solutions/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper-text dark:text-paper-white underline decoration-1 underline-offset-4 decoration-paper-muted hover:decoration-paper-text dark:hover:decoration-paper-white transition-colors"
              >
                Lexis Solutions
              </a>
              , and recently shipped Ethiopia&apos;s largest AI creative
              competition to 50,000+ users.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/#contact" className="btn-ink">
              Start a conversation
            </Link>
            <Link href="/#projects" className="btn-outline">
              See selected work
            </Link>
          </div>
        </div>

        {/* Right — portrait + at-a-glance */}
        <div className="min-w-0">
          <div className="relative w-full aspect-[4/5] max-w-xs mx-auto lg:mx-0 overflow-hidden grayscale">
            <Image
              src={portrait}
              fill
              sizes="(max-width: 1024px) 20rem, 22rem"
              className="object-cover object-top"
              placeholder="blur"
              priority
              alt="Portrait of Daniel Mesfin"
            />
          </div>

          <p className="eyebrow mt-8">At a glance</p>
          <dl className="mt-4">
            {GLANCE.map(({ label, value }) => (
              <div
                key={label}
                className="rule flex justify-between gap-6 py-3 first:border-t-0 first:pt-0"
              >
                <dt className="font-mono text-sm text-paper-muted dark:text-gray-500 flex-shrink-0">
                  {label}
                </dt>
                <dd className="font-mono text-sm text-right text-paper-text dark:text-gray-300">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </motion.div>
    </section>
  );
}
