import React from 'react';
import { IconType } from 'react-icons';
import { SiNvidia, SiAmazonaws } from 'react-icons/si';
import { FaExternalLinkAlt } from 'react-icons/fa';
import SectionHeading from '../SectionHeading';

interface Certification {
  title: string;
  issuer: string;
  /** Omitted where the issue date isn't recorded. */
  date?: string;
  url: string;
  Icon: IconType;
}

export const certifications: Certification[] = [
  {
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    url: 'https://www.credly.com/badges/f32802e9-c4a4-4696-9691-27b2ef2b2b60/public_url',
    Icon: SiAmazonaws,
  },
  {
    title: 'Building Real-Time Video AI Applications',
    issuer: 'NVIDIA',
    date: 'Sep 2022',
    url: 'https://learn.nvidia.com/certificates?id=f44c2824a7664c09941a1d507871765d',
    Icon: SiNvidia,
  },
  {
    title: 'Getting Started with Deep Learning',
    issuer: 'NVIDIA',
    date: 'Aug 2022',
    url: 'https://learn.nvidia.com/certificates?id=35e66496eec64fb6a3163cceaf20a738',
    Icon: SiNvidia,
  },
];

const Certifications: React.FC = () => (
  <section className="px-5 sm:px-8 lg:px-12 py-16 sm:py-24" id="certifications">
    <div className="mx-auto max-w-6xl">
      <SectionHeading eyebrow="Credentials" title="Certifications." />

      <div className="divide-y divide-paper-border dark:divide-white/10">
        {certifications.map(({ title, issuer, date, url, Icon }) => (
          <article
            key={title}
            className="group relative grid grid-cols-1 md:grid-cols-[1fr_auto] gap-x-8 gap-y-2 py-6 md:items-center"
          >
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 focus:outline-none"
            >
              <span className="sr-only">View {title} credential</span>
            </a>

            <div className="min-w-0 flex items-start gap-4">
              <Icon
                size={22}
                aria-hidden="true"
                className="mt-1 flex-shrink-0 text-paper-muted dark:text-gray-400"
              />
              <div className="min-w-0">
                <h3 className="font-display text-xl lg:text-2xl leading-tight text-paper-text dark:text-paper-white group-hover:underline decoration-1 underline-offset-4">
                  {title}
                </h3>
                <p className="mt-1 font-mono text-sm text-paper-muted dark:text-gray-400">
                  {issuer}
                  {date && ` · ${date}`}
                </p>
              </div>
            </div>

            <span className="pl-10 md:pl-0 inline-flex items-center gap-2 font-mono text-xs text-paper-muted dark:text-gray-400 group-hover:text-paper-text dark:group-hover:text-paper-white transition-colors">
              View credential
              <FaExternalLinkAlt size={10} aria-hidden="true" />
            </span>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Certifications;
