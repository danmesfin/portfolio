import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaExternalLinkAlt,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import { CaseStudy } from '../../utils/getCaseStudies';
import { getTechIcons } from '../../utils/techIcons';

/**
 * The category label for each study. Everything else (title, copy, tech,
 * images, links) comes from the markdown in content/projects-case-study.
 * Cards deliberately share one neutral surface — see .paper-card.
 */
const CATEGORIES: Record<string, string> = {
  ehudai: 'AI & Machine Learning',
  miranapm: 'SaaS Platform',
  reveshare: 'E-commerce',
  bridgeofhope: 'Nonprofit Platform',
  aicreativeaward: 'Scale & Anti-Abuse',
};

const DEFAULT_CATEGORY = 'Full-Stack Development';

const MAX_TECH_ICONS = 5;

const INERT = { inert: '' };

const pillClass = 'paper-pill';

const CaseStudyCard: React.FC<{ project: CaseStudy }> = ({ project }) => {
  const category = CATEGORIES[project.slug] ?? DEFAULT_CATEGORY;
  const techIcons = getTechIcons(project.technologies);
  const hiddenTechCount = project.technologies.length - techIcons.length;

  return (
    <div className="paper-card w-full max-w-5xl mx-auto rounded-2xl p-6 sm:p-8 group hover:shadow-paper-hover transition-shadow duration-300">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 h-full">
        {/* Content - Left Side */}
        <div className="flex-1 flex flex-col justify-between text-paper-text dark:text-gray-100 min-h-0">
          <div className="flex-1 space-y-4 lg:space-y-6">
            {/* Category Badge */}
            <div className="inline-block">
              <span
                className={`text-sm ${pillClass} px-3 py-1 rounded-full font-medium`}
              >
                {category}
              </span>
            </div>

            {/* Title and Subtitle */}
            <div className="space-y-2 lg:space-y-3">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold font-display line-clamp-2 leading-tight">
                {project.name}
              </h3>
              {project.subtitle && (
                <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-paper-muted dark:text-gray-300 line-clamp-2">
                  {project.subtitle}
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-md sm:text-lg lg:text-xl line-clamp-4 lg:line-clamp-6 leading-relaxed text-paper-muted dark:text-gray-300">
              {project.description}
            </p>
          </div>

          <div className="space-y-5 lg:space-y-6 mt-auto pt-6">
            {/* Technologies */}
            <ul className="flex flex-wrap gap-3" aria-label="Technologies used">
              {techIcons.slice(0, MAX_TECH_ICONS).map(({ name, Icon }) => (
                <li
                  key={name}
                  className={`${pillClass} rounded-full p-2.5 lg:p-3`}
                  title={name}
                >
                  <Icon size={20} aria-hidden="true" />
                  <span className="sr-only">{name}</span>
                </li>
              ))}
              {techIcons.length + hiddenTechCount > MAX_TECH_ICONS && (
                <li className={`${pillClass} rounded-full px-3 py-2`}>
                  <span className="text-sm">
                    +
                    {project.technologies.length -
                      Math.min(techIcons.length, MAX_TECH_ICONS)}
                  </span>
                </li>
              )}
            </ul>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Link
                href={`/case-studies/${project.slug}`}
                className="flex-1 lg:flex-none lg:px-8 bg-paper-text dark:bg-paper-white text-paper-white dark:text-paper-text rounded-xl px-4 py-3 lg:py-4 font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <span className="text-sm lg:text-base">
                  View Case Study
                  <span className="sr-only"> — {project.name}</span>
                </span>
                <FaArrowRight size={16} aria-hidden="true" />
              </Link>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${pillClass} rounded-xl p-3 lg:p-4 hover:border-accent-coral hover:text-accent-coral transition-colors flex items-center justify-center`}
                  aria-label={`Visit ${project.name} live site`}
                >
                  <FaExternalLinkAlt size={18} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Project Image Frame - Right Side */}
        {project.images[0] && (
          <div className="lg:w-1/2 xl:w-2/5 flex-shrink-0">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden paper-inset">
              <Image
                src={project.images[0]}
                alt={`${project.name} interface`}
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface CaseStudyCarouselProps {
  caseStudies: CaseStudy[];
}

const CaseStudyCarousel: React.FC<CaseStudyCarouselProps> = ({
  caseStudies,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (caseStudies.length === 0) return null;

  const goTo = (index: number) => {
    const count = caseStudies.length;
    setCurrentIndex(((index % count) + count) % count);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(currentIndex - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(currentIndex + 1);
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20" id="case-studies">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 sm:mb-4 lg:mb-6 text-paper-text dark:text-white font-display leading-tight">
            Case Studies
          </h2>
          <p className="text-md sm:text-lg lg:text-xl text-paper-muted dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Deep dives into complex projects showcasing problem-solving,
            technical decisions, and real-world impact
          </p>
        </div>

        {/* Carousel Container */}
        {/* Arrow-key handling belongs on the carousel container itself; the
            rule below assumes a container listener is always a mistake. */}
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <div
          className="relative"
          role="group"
          aria-roledescription="carousel"
          aria-label="Case studies"
          onKeyDown={onKeyDown}
        >
          {/* Navigation Buttons */}
          <button
            type="button"
            onClick={() => goTo(currentIndex - 1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 paper-card rounded-full p-3 hover:border-accent-coral focus:outline-none focus:ring-2 focus:ring-accent-coral transition-colors shadow-paper"
            aria-label="Previous case study"
          >
            <FaChevronLeft size={20} className="" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => goTo(currentIndex + 1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 paper-card rounded-full p-3 hover:border-accent-coral focus:outline-none focus:ring-2 focus:ring-accent-coral transition-colors shadow-paper"
            aria-label="Next case study"
          >
            <FaChevronRight size={20} className="" aria-hidden="true" />
          </button>

          {/* Carousel Content */}
          <div className="overflow-hidden mx-12 sm:mx-16">
            <div
              className="flex transition-transform duration-500 ease-in-out motion-reduce:transition-none"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {caseStudies.map((project, index) => {
                const isCurrent = index === currentIndex;
                return (
                  <div
                    key={project.slug}
                    className="w-full flex-shrink-0 px-4 sm:px-6"
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${index + 1} of ${caseStudies.length}`}
                    // Off-screen slides must not be announced by screen readers
                    // or reachable by keyboard. `inert` is not in React 18's JSX
                    // types yet, so it is spread in as a plain attribute.
                    aria-hidden={!isCurrent}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...(isCurrent ? {} : (INERT as Record<string, string>))}
                  >
                    <CaseStudyCard project={project} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {caseStudies.map((project, index) => (
              <button
                key={project.slug}
                type="button"
                onClick={() => goTo(index)}
                aria-current={index === currentIndex}
                className={`w-3 h-3 rounded-full border border-paper-border dark:border-white/40 focus:outline-none focus:ring-2 focus:ring-accent-coral transition-colors ${
                  index === currentIndex
                    ? 'bg-paper-text dark:bg-paper-white'
                    : 'bg-paper-cream dark:bg-zinc-700 hover:bg-paper-light dark:hover:bg-zinc-600'
                }`}
                aria-label={`Show case study ${index + 1}: ${project.name}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyCarousel;
