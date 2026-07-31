// components/ExperienceItem.tsx
import React from 'react';

interface ExperienceItemProps {
  title: string;
  company: string;
  /** Optional link to the company site. */
  companyUrl?: string;
  location: string;
  duration: {
    start: string;
    end: string;
  };
  description: string[];
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({
  title,
  company,
  companyUrl,
  location,
  duration,
  description,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-[14rem_1fr] gap-x-8 gap-y-3 py-8 lg:py-10">
    <div>
      <p className="eyebrow">
        {duration.start} — {duration.end}
      </p>
      <p className="mt-2 font-mono text-sm text-paper-muted dark:text-gray-500">
        {location}
      </p>
    </div>

    <div>
      <h3 className="font-display text-xl lg:text-2xl text-paper-text dark:text-paper-white">
        {title}
        <span className="text-paper-muted dark:text-gray-500"> · </span>
        {companyUrl ? (
          <a
            href={companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-1 underline-offset-4 decoration-paper-muted hover:decoration-paper-text dark:hover:decoration-paper-white transition-colors"
          >
            {company}
          </a>
        ) : (
          company
        )}
      </h3>

      <ul className="mt-4 space-y-2">
        {description.map((item) => (
          <li
            key={item}
            className="relative pl-5 font-mono text-sm leading-relaxed text-paper-muted dark:text-gray-400 before:absolute before:left-0 before:content-['—'] before:text-paper-muted/60"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default ExperienceItem;
