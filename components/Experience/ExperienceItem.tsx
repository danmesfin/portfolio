/* eslint-disable react/no-array-index-key */
// components/ExperienceItem.tsx
import React from 'react';

interface ExperienceItemProps {
  title: string;
  company: string;
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
        {company}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        {location}
      </p>
      <ul className="list-disc pl-5">
        {description.map((item, index) => (
          <li key={index} className="text-gray-700 dark:text-gray-300">
            {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default ExperienceItem;
