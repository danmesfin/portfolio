import React from 'react';
import Image from 'next/image';
import { CaseStudy } from '../../utils/getCaseStudies';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  onClick: () => void;
  isActive?: boolean;
}

export default function CaseStudyCard({ caseStudy, onClick, isActive = false }: CaseStudyCardProps) {
  const mainImage = caseStudy.images[0] || '/images/placeholder-project.png';

  return (
    <div
      className={`relative group cursor-pointer transition-all duration-700 ease-out transform ${
        isActive ? 'scale-105' : 'scale-95 opacity-70'
      } hover:scale-110 hover:opacity-100`}
      onClick={onClick}
    >
      {/* Main Card Container */}
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-lg bg-paper-white border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={mainImage}
            alt={caseStudy.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Light Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-paper-text/80 via-paper-text/20 to-transparent" />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end text-paper-white">
          {/* Technology Tags */}
          <div className="mb-4 flex flex-wrap gap-2">
            {caseStudy.technologies.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs font-medium bg-paper-white/90 text-paper-text backdrop-blur-sm rounded-full border border-paper-border"
              >
                {tech}
              </span>
            ))}
            {caseStudy.technologies.length > 3 && (
              <span className="px-3 py-1 text-xs font-medium bg-paper-white/90 text-paper-text backdrop-blur-sm rounded-full border border-paper-border">
                +{caseStudy.technologies.length - 3} more
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
            {caseStudy.title}
          </h3>

          {/* Role */}
          <p className="text-accent-coral font-medium mb-2 uppercase tracking-wide text-sm">
            {caseStudy.role}
          </p>

          {/* Description */}
          <p className="text-paper-white/90 text-lg leading-relaxed mb-6 line-clamp-3">
            {caseStudy.excerpt}
          </p>

          {/* CTA Button */}
          <div className="flex items-center justify-between">
            <div className="btn-secondary group/btn">
              <div className="btn-secondary-shadow"></div>
              <button className="btn-secondary-content flex items-center space-x-2 font-semibold">
              <span>View Case Study</span>
              <svg
                className="w-4 h-4 transition-transform group-hover/btn:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              </button>
            </div>

            {/* Live Demo Link */}
            {caseStudy.liveUrl && (
              <a
                href={caseStudy.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-paper-white/80 hover:text-paper-white transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                <span className="text-sm">Live Demo</span>
              </a>
            )}
          </div>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-accent-coral/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
}
