// components/Experience/index.tsx
import React from 'react';
import ExperienceItem from './ExperienceItem';

export const experienceData = [
  {
    title: 'Senior Data Engineer',
    company: 'Lexis Solutions',
    companyUrl: 'https://www.lexis.solutions/',
    location: 'Remote',
    duration: {
      start: 'September 2025',
      end: 'Present',
    },
    description: [
      'Building large-scale data extraction and intelligence tools, with 100+ production web crawlers built and maintained to date',
      'Devising anti-bot bypass techniques — browser fingerprint randomisation, session and proxy rotation, and CAPTCHA-solving pipelines — to sustain collection against heavily protected sources',
      'Designing resilient crawl infrastructure with scheduling, retries, and rate limiting so collection degrades gracefully rather than failing outright',
      'Instrumenting crawler health and data-quality monitoring that surfaces layout changes and silent failures before they reach downstream consumers',
      'Normalising extracted data into clean, queryable schemas for analytics and downstream services',
      'Managing the data team — running weekly sprint planning, grooming and assigning tickets, reviewing code, and unblocking teammates',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'Arez Armada',
    location: 'Remote, USA',
    duration: {
      start: 'October 2023',
      end: 'October 2025',
    },
    description: [
      'Collaborated with clients to define solution requirements',
      'Collaborated with cross-functional teams to create project guidelines and milestones',
      'Implemented Marketing and Messaging tools that automate outbounding emails, increasing efficiency 10x',
      'Provided guidance and mentored less-experienced staff members',
    ],
  },
  {
    title: 'Full Stack Web / Blockchain Developer',
    company: 'The Carbon Games (Upwork)',
    location: 'Remote, Addis Ababa',
    duration: {
      start: 'January 2023',
      end: 'March 2023',
    },
    description: [
      'Built Web3 applications based on Ethereum, NEAR Protocol, Cairo BC and Particle Network independently',
      'Collaborated on application development cycle i.e. Identifying Requirements, Designing and Deployment',
      'Implemented Complex Matching algorithms that are core to carbon games ride sharing contracts',
    ],
  },
  {
    title: 'Full Stack Developer',
    company: 'UniteCodeX',
    location: 'Remote, Addis Ababa',
    duration: {
      start: 'January 2023',
      end: 'March 2023',
    },
    description: [
      'Worked as a MERN full stack developer, specifically on a SaaS project',
      'Converted designs from Figma to functional Next.js code',
      'Played a crucial role in testing and maintaining backend services, resulting in a 25% reduction in system bugs',
    ],
  },
  {
    title: 'Front End Developer',
    company: 'EagleLion',
    location: 'On Site, Addis Ababa',
    duration: {
      start: 'March 2022',
      end: 'January 2023',
    },
    description: [
      'Worked as a frontend developer in the design and development of user-friendly financial software for banks and other businesses',
      'Successfully migrated React apps into a serverless framework, reducing operational costs by 15%',
    ],
  },
];

export default function Experience() {
  return (
    <section className="py-20" id="experience">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-display text-center text-gray-800 dark:text-white mb-16">
          Experience
        </h2>
        <div className="max-w-3xl mx-auto">
          {experienceData.map((exp) => (
            <ExperienceItem
              key={`${exp.company}-${exp.title}`}
              title={exp.title}
              company={exp.company}
              companyUrl={exp.companyUrl}
              duration={exp.duration}
              location={exp.location}
              description={exp.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
