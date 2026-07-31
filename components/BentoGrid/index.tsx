import React from 'react';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs } from 'react-icons/fa';
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiLaravel,
  SiMysql,
  SiAmazonaws,
  SiSolidity,
  SiReact,
  SiPostgresql,
  SiFlask,
  SiPython,
  SiRedis,
  SiNestjs,
  SiSupabase,
  SiVercel,
} from 'react-icons/si';
import SectionHeading from '../SectionHeading';

export interface BentoProject {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: React.ComponentType<{ size?: number; className?: string }>[];
  githubUrl?: string;
  liveUrl?: string;
}

// Ordered by impact — the first card is the strongest piece of work.
export const projects: BentoProject[] = [
  {
    id: 'creativeaward',
    title: 'AI Creative Award',
    description:
      "Ethiopia's largest AI creative competition, by Ehudai and the Ethiopian Artificial Intelligence Institute. Designed, built, and deployed single-handedly; 50,000+ users voting at burst scale.",
    image: '/images/projects/aicreativeaward/1_creativeaward-cover.webp',
    technologies: [
      SiNextdotjs,
      SiReact,
      SiTypescript,
      SiPostgresql,
      SiRedis,
      SiSupabase,
      SiVercel,
      SiTailwindcss,
    ],
    liveUrl: 'https://creativeaward.ai',
  },
  {
    id: 'ehudai',
    title: 'Ehudai',
    description:
      'AI-powered content creation platform integrating 15+ AI services for story generation, character development, and video production',
    image: '/images/projects/ehudai/1_ehudai-cover.webp',
    technologies: [
      FaReact,
      FaNodeJs,
      SiPostgresql,
      SiAmazonaws,
      SiFlask,
      SiPython,
      SiRedis,
    ],
    liveUrl: 'https://ehudai.com',
  },
  {
    id: 'reveshare',
    title: 'Reveshare',
    description:
      'Mobile-first affiliate management platform listed on Shopify App Store with commission tracking',
    image: '/images/projects/reveshare/1_reveshare-cover.webp',
    technologies: [
      FaReact,
      SiTypescript,
      SiTailwindcss,
      SiNestjs,
      SiPostgresql,
      SiAmazonaws,
      SiRedis,
    ],
    liveUrl: 'https://reveshare.com',
  },
  {
    id: 'miranapm',
    title: 'MiranaPM',
    description:
      'Multi-tenant property management platform streamlining rental operations with automated billing, maintenance tracking, and comprehensive financial reporting',
    image: '/images/projects/miranapm/1_miranapm-cover.webp',
    technologies: [
      SiLaravel,
      FaReact,
      SiTypescript,
      SiTailwindcss,
      SiMysql,
      SiAmazonaws,
    ],
    liveUrl: 'https://miranapm.com',
  },
  {
    id: 'thecarbongames',
    title: 'The carbon games',
    description:
      'Ride sharing app on blockchain maintaining sustainability. Meetups for Carpooling.',
    image: '/images/thecarbongames-eventcarpooling.webp',
    technologies: [
      SiNextdotjs,
      SiSolidity,
      SiReact,
      SiTypescript,
      SiTailwindcss,
    ],
    liveUrl: 'https://thecarbongames.com',
  },
  {
    id: 'hire-armada',
    title: 'Hire Armada',
    description: 'Talent outsourcing and recruitment platform',
    image: '/images/arez-armada.webp',
    technologies: [
      SiNextdotjs,
      SiTypescript,
      SiTailwindcss,
      SiPostgresql,
      SiAmazonaws,
    ],
    liveUrl: 'https://arezarmada.com',
  },
];

const MAX_TECH_ICONS = 8;

const ProjectRow: React.FC<{ project: BentoProject; index: number }> = ({
  project,
  index,
}) => {
  const primaryUrl = project.liveUrl || project.githubUrl;

  return (
    <article className="group relative grid grid-cols-1 md:grid-cols-[3rem_1fr_18rem] gap-x-6 gap-y-5 py-8 lg:py-10">
      {primaryUrl && (
        <a
          href={primaryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 focus:outline-none"
        >
          <span className="sr-only">Open {project.title}</span>
        </a>
      )}

      {/* Index */}
      <span className="eyebrow hidden md:block pt-2">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Title, description, tech */}
      <div className="min-w-0 order-2 md:order-none">
        <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl leading-tight text-paper-text dark:text-paper-white group-hover:underline decoration-1 underline-offset-4">
          {project.title}
        </h3>
        <p className="mt-3 max-w-xl text-paper-muted dark:text-gray-400 leading-relaxed">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
          <ul
            className="flex flex-wrap items-center gap-3 text-paper-muted dark:text-gray-500"
            aria-label="Technologies"
          >
            {project.technologies
              .slice(0, MAX_TECH_ICONS)
              .map((Tech, techIndex) => (
                <li
                  // eslint-disable-next-line react/no-array-index-key
                  key={`tech-${project.id}-${techIndex}`}
                >
                  <Tech size={18} />
                </li>
              ))}
          </ul>

          <div className="relative z-10 flex items-center gap-4 font-mono text-xs">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-paper-muted hover:text-paper-text dark:text-gray-400 dark:hover:text-paper-white transition-colors"
              >
                <FaGithub size={13} aria-hidden="true" /> Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-paper-muted hover:text-paper-text dark:text-gray-400 dark:hover:text-paper-white transition-colors"
              >
                <FaExternalLinkAlt size={11} aria-hidden="true" /> Live
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Thumbnail */}
      {project.image && (
        <div className="paper-inset relative w-full aspect-video overflow-hidden order-1 md:order-none self-start">
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 18rem"
            className="object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-300"
          />
        </div>
      )}
    </article>
  );
};

const BentoGrid: React.FC = () => (
  <section className="px-5 sm:px-8 lg:px-12 py-16 sm:py-24" id="projects">
    <div className="mx-auto max-w-6xl">
      <SectionHeading
        eyebrow="Selected work"
        title="Products shipped end to end."
        intro="A few of the systems I have designed, built and put in front of real users."
      />

      <div className="divide-y divide-paper-border dark:divide-white/10">
        {projects.map((project, index) => (
          <ProjectRow key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  </section>
);

export default BentoGrid;
