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
  <div className="mb-8 flex">
    <div className="flex-shrink-0 w-32 text-right pr-4">
      <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
        {duration.start} - {duration.end}
      </span>
    </div>
    <div className="border-l-2 border-gray-300 dark:border-gray-700 pl-4">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white">
        {title}
      </h3>
      <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
        {companyUrl ? (
          <a
            href={companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-coral dark:hover:text-accent-coral underline decoration-transparent hover:decoration-inherit transition-colors"
          >
            {company}
          </a>
        ) : (
          company
        )}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        {location}
      </p>
      <ul className="list-disc pl-5">
        {description.map((item) => (
          <li key={item} className="text-gray-700 dark:text-gray-300">
            {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default ExperienceItem;
