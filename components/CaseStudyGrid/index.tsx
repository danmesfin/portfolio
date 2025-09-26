import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaExternalLinkAlt,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import {
  SiLaravel,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiAmazonaws,
  SiFlask,
  SiPython,
  SiPostgresql,
  SiMysql,
  SiVite,
  SiSupabase,
  SiRedis,
} from 'react-icons/si';
import { TbBrandReactNative } from 'react-icons/tb';

interface CaseStudyProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  technologies: React.ComponentType<{ size?: number; className?: string }>[];
  liveUrl?: string;
  caseStudyUrl: string;
  category: string;
  size: 'small' | 'medium' | 'large';
  color: string;
  textColor: string;
}

const caseStudies: CaseStudyProject[] = [
  {
    id: '1',
    title: 'EhudAI',
    subtitle: 'AI Content Studio',
    description:
      'Comprehensive AI-powered content creation platform integrating 15+ AI services for story generation, character development, and video production.',
    image: '/images/projects/ehudai/1_ehudai-cover.png',
    technologies: [
      SiNextdotjs,
      SiTypescript,
      SiNodedotjs,
      SiAmazonaws,
      SiFlask,
      SiPython,
    ],
    liveUrl: 'https://ehudai.com',
    caseStudyUrl: '/case-studies/ehudai',
    category: 'AI & Machine Learning',
    size: 'medium',
    color: 'bg-purple-50',
    textColor: 'text-gray-900',
  },
  {
    id: '2',
    title: 'MiranAPM',
    subtitle: 'Property Management',
    description:
      'Multi-tenant property management platform streamlining rental operations with automated billing, maintenance tracking, and comprehensive financial reporting.',
    image: '/images/projects/miranapm/1_miranapm-cover.png',
    technologies: [
      SiLaravel,
      TbBrandReactNative,
      SiReact,
      SiNodedotjs,
      SiMysql,
      SiAmazonaws,
    ],
    liveUrl: 'https://miranapm.com',
    caseStudyUrl: '/case-studies/miranapm',
    category: 'SaaS Platform',
    size: 'medium',
    color: 'bg-green-50',
    textColor: 'text-gray-900',
  },
  {
    id: '3',
    title: 'ReveShare',
    subtitle: 'Affiliate Platform',
    description:
      'Mobile-first affiliate management platform with commission tracking, listed on Shopify App Store, serving brands and affiliates through dedicated dashboards.',
    image: '/images/projects/reveshare/1_reveshare-cover.png',
    technologies: [
      SiVite,
      SiReact,
      SiTailwindcss,
      SiRedis,
      SiNodedotjs,
      SiPostgresql,
      SiSupabase,
    ],
    liveUrl: 'https://reveshare.com',
    caseStudyUrl: '/case-studies/reveshare',
    category: 'E-commerce',
    size: 'small',
    color: 'bg-orange-50',
    textColor: 'text-gray-900',
  },
  {
    id: '4',
    title: 'Bridge of Hope Ethiopia',
    subtitle: 'Nonprofit Platform',
    description:
      'Nonprofit platform with dual-payment integration (PayPal & Chapa) enabling both international and Ethiopian donors to support vulnerable children.',
    image: '/images/projects/bridgeofhope/1_bohet-cover.png',
    technologies: [
      SiLaravel,
      SiVite,
      SiReact,
      SiTailwindcss,
      SiNodedotjs,
      SiPostgresql,
      SiAmazonaws,
    ],
    liveUrl: 'https://boh-et.org',
    caseStudyUrl: '/case-studies/bridgeofhope',
    category: 'Full-Stack Development',
    size: 'large',
    color: 'bg-blue-50',
    textColor: 'text-gray-900',
  },
];

const CaseStudyCard: React.FC<{ project: CaseStudyProject }> = ({
  project,
}) => (
  <div
    className={`w-full max-w-5xl mx-auto ${project.color} rounded-2xl p-6 sm:p-8 border border-black group hover:shadow-lg transition-shadow duration-300`}
  >
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 h-full">
      {/* Content - Left Side */}
      <div
        className={`flex-1 flex flex-col justify-between ${project.textColor} min-h-0`}
      >
        <div className="flex-1 space-y-4 lg:space-y-6">
          {/* Category Badge */}
          <div className="inline-block">
            <span className="text-sm bg-white/80 px-3 py-1 rounded-full border border-gray-300 font-medium">
              {project.category}
            </span>
          </div>

          {/* Title and Subtitle */}
          <div className="space-y-2 lg:space-y-3">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold font-display line-clamp-2 leading-tight">
              {project.title}
            </h3>
            <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-600 line-clamp-1">
              {project.subtitle}
            </p>
          </div>

          {/* Description */}
          <p className="text-md sm:text-lg lg:text-xl line-clamp-4 lg:line-clamp-6 leading-relaxed text-gray-700">
            {project.description}
          </p>
        </div>

        <div className="space-y-5 lg:space-y-6 mt-auto pt-6">
          {/* Technologies */}
          <div className="flex flex-wrap gap-3">
            {project.technologies.slice(0, 5).map((Tech, techIndex) => (
              <div
                key={`tech-${project.id}-${techIndex}`}
                className="bg-white/80 rounded-full p-2.5 lg:p-3 border border-gray-300"
              >
                <Tech size={20} className="text-gray-700" />
              </div>
            ))}
            {project.technologies.length > 5 && (
              <div className="bg-white/80 rounded-full px-3 py-2 border border-gray-300">
                <span className="text-sm text-gray-700">
                  +{project.technologies.length - 5}
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Link
              href={project.caseStudyUrl}
              className="flex-1 lg:flex-none lg:px-8 bg-gray-900 text-white rounded-xl px-4 py-3 lg:py-4 font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              <span className="text-sm lg:text-base">View Case Study</span>
              <FaArrowRight size={16} />
            </Link>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/80 rounded-xl p-3 lg:p-4 border border-gray-300 hover:bg-white transition-colors flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <FaExternalLinkAlt size={18} className="text-gray-700" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Project Image Frame - Right Side */}
      <div className="lg:w-1/2 xl:w-2/5 flex-shrink-0">
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border-2 border-gray-300 bg-white">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  </div>
);

const CaseStudyCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === caseStudies.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? caseStudies.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
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
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-black rounded-full p-3 hover:bg-gray-50 transition-colors shadow-lg"
            aria-label="Previous case study"
          >
            <FaChevronLeft size={20} className="text-gray-900" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-black rounded-full p-3 hover:bg-gray-50 transition-colors shadow-lg"
            aria-label="Next case study"
          >
            <FaChevronRight size={20} className="text-gray-900" />
          </button>

          {/* Carousel Content */}
          <div className="overflow-hidden mx-12 sm:mx-16">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {caseStudies.map((project) => (
                <div
                  key={project.id}
                  className="w-full flex-shrink-0 px-4 sm:px-6"
                >
                  <CaseStudyCard project={project} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {caseStudies.map((_, index) => (
              <button
                key={`dot-${index}`}
                type="button"
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full border border-black transition-colors ${
                  index === currentIndex
                    ? 'bg-gray-900'
                    : 'bg-white hover:bg-gray-200'
                }`}
                aria-label={`Go to case study ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyCarousel;
