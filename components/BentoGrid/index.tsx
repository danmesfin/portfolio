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

const MAX_TECH_ICONS = 6;

const pillClass = 'paper-pill rounded-full';

interface BentoCardProps {
  project: BentoProject;
  /** Spans both columns and lays out side by side, to fill an odd trailing slot. */
  wide?: boolean;
}

const BentoCard: React.FC<BentoCardProps> = ({ project, wide = false }) => {
  const primaryUrl = project.liveUrl || project.githubUrl;

  return (
    <article
      className={`paper-card group relative ${
        wide ? 'md:col-span-2' : ''
      } min-h-[400px] md:min-h-[500px] rounded-2xl p-4 md:p-6 flex flex-col gap-4 transition-all duration-200 hover:border-accent-coral/60 hover:shadow-paper-hover focus-within:ring-2 focus-within:ring-accent-coral/50`}
    >
      {/* Overlay link makes the whole card clickable without nesting anchors.
          Kept out of the line-clamped title, whose overflow would clip it. */}
      {primaryUrl && (
        <a
          href={primaryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-[1] rounded-2xl focus:outline-none"
        >
          <span className="sr-only">Open {project.title}</span>
        </a>
      )}

      <div
        className={`flex flex-1 min-h-0 flex-col gap-4 ${
          wide ? 'md:flex-row md:items-center md:gap-8' : ''
        }`}
      >
        {/* Project Image Frame */}
        {project.image && (
          <div
            className={`paper-inset relative w-full aspect-video rounded-xl overflow-hidden flex-shrink-0 ${
              wide ? 'md:w-3/5' : ''
            }`}
          >
            <Image
              src={project.image}
              alt=""
              fill
              sizes={
                wide
                  ? '(max-width: 768px) 100vw, 55vw'
                  : '(max-width: 768px) 100vw, 45vw'
              }
              className="object-contain"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between min-h-0">
          <div className="flex-1 space-y-3">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-display line-clamp-2 text-paper-text dark:text-white">
              {project.title}
            </h3>
            <p className="sm:text-md md:text-lg line-clamp-3 leading-relaxed text-paper-muted dark:text-gray-400">
              {project.description}
            </p>
          </div>

          <div className="space-y-3 mt-auto pt-3">
            {/* Technologies */}
            <div className="flex flex-wrap gap-1.5">
              {project.technologies
                .slice(0, MAX_TECH_ICONS)
                .map((Tech, techIndex) => (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={`tech-${project.id}-${techIndex}`}
                    className={`${pillClass} p-1.5`}
                  >
                    <Tech size={16} />
                  </div>
                ))}
              {project.technologies.length > MAX_TECH_ICONS && (
                <div className={`${pillClass} px-2 py-1`}>
                  <span className="text-xs">
                    +{project.technologies.length - MAX_TECH_ICONS}
                  </span>
                </div>
              )}
            </div>

            {/* Links — sit above the overlay link */}
            <div className="relative z-10 flex gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${pillClass} p-1.5 hover:border-accent-coral hover:text-accent-coral transition-colors`}
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <FaGithub size={16} />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${pillClass} p-1.5 hover:border-accent-coral hover:text-accent-coral transition-colors`}
                  aria-label={`Visit ${project.title} live site`}
                >
                  <FaExternalLinkAlt size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

const BentoGrid: React.FC = () => (
  <section className="py-12 sm:py-16 lg:py-20" id="projects">
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="text-center mb-8 sm:mb-12 lg:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4 text-paper-text dark:text-white font-display leading-tight">
          Featured Projects
        </h2>
        <p className="font-hand text-2xl text-paper-text dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          A collection of projects I worked on showcasing different technologies
          and design approaches
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {projects.map((project, index) => (
          <BentoCard
            key={project.id}
            project={project}
            // An odd number of projects leaves a hole in the last row; let the
            // final card span it instead.
            wide={projects.length % 2 === 1 && index === projects.length - 1}
          />
        ))}
      </div>
    </div>
  </section>
);

export default BentoGrid;
