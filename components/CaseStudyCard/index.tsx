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
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-zinc-900 to-black">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={mainImage}
            alt={caseStudy.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
          {/* Technology Tags */}
          <div className="mb-4 flex flex-wrap gap-2">
            {caseStudy.technologies.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm rounded-full border border-white/30"
              >
                {tech}
              </span>
            ))}
            {caseStudy.technologies.length > 3 && (
              <span className="px-3 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                +{caseStudy.technologies.length - 3} more
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
            {caseStudy.title}
          </h3>

          {/* Role */}
          <p className="text-orange-400 font-medium mb-2 uppercase tracking-wide text-sm">
            {caseStudy.role}
          </p>

          {/* Description */}
          <p className="text-zinc-200 text-lg leading-relaxed mb-6 line-clamp-3">
            {caseStudy.excerpt}
          </p>

          {/* CTA Button */}
          <div className="flex items-center justify-between">
            <button className="group/btn flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
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

            {/* Live Demo Link */}
            {caseStudy.liveUrl && (
              <a
                href={caseStudy.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-white/80 hover:text-white transition-colors"
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
        <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Movie-style Glow Effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10 ${
        isActive ? 'opacity-20' : ''
      }`} />
    </div>
  );
}
