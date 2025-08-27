'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import CaseStudyCard from '../CaseStudyCard';
import { CaseStudy } from '../../utils/getCaseStudies';

interface CaseStudyCarouselProps {
  caseStudies: CaseStudy[];
}

export default function CaseStudyCarousel({ caseStudies }: CaseStudyCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && !isPaused && caseStudies.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === caseStudies.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000); // Change slide every 3 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, isPaused, caseStudies.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false); // Pause auto-play when user manually navigates
    setTimeout(() => setIsAutoPlaying(true), 5000); // Resume after 5 seconds
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? caseStudies.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex === caseStudies.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  };

  const handleCaseStudyClick = (slug: string) => {
    router.push(`/case-studies/${slug}`);
  };

  if (caseStudies.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-zinc-600 dark:text-zinc-400">
          No case studies available yet.
        </p>
      </div>
    );
  }

  return (
    <div 
      className="relative w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Carousel Container */}
      <div className="relative overflow-hidden">
        {/* Carousel Track */}
        <div 
          className="flex transition-transform duration-700 ease-out"
          style={{ 
            transform: `translateX(-${currentIndex * 100}%)`
          }}
        >
          {caseStudies.map((caseStudy, index) => (
            <div 
              key={caseStudy.slug}
              className="w-full flex-shrink-0 px-4"
            >
              <div className="max-w-4xl mx-auto">
                <CaseStudyCard
                  caseStudy={caseStudy}
                  onClick={() => handleCaseStudyClick(caseStudy.slug)}
                  isActive={index === currentIndex}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      {caseStudies.length > 1 && (
        <>
          {/* Previous/Next Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
            aria-label="Previous case study"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
            aria-label="Next case study"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dot Indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {caseStudies.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-orange-500 scale-125'
                    : 'bg-zinc-400 hover:bg-zinc-300 dark:bg-zinc-600 dark:hover:bg-zinc-500'
                }`}
                aria-label={`Go to case study ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-play Control */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center space-x-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
            >
              {isAutoPlaying ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                  </svg>
                  <span className="text-sm">Pause</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span className="text-sm">Play</span>
                </>
              )}
            </button>
          </div>
        </>
      )}

      {/* Progress Bar */}
      {isAutoPlaying && !isPaused && caseStudies.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-200 dark:bg-zinc-700">
          <div 
            className="h-full bg-orange-500 transition-all duration-100 ease-linear"
            style={{
              width: '100%',
              animation: 'progress 3s linear infinite'
            }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
