// components/Experience/index.tsx
import React from 'react';
import ExperienceItem from './ExperienceItem';

const experienceData = [
  {
    title: 'Software Engineer',
    company: 'Arez Armada',
    location: 'Remote, USA',
    duration: {
      start: 'October 2023',
      end: 'Present',
    },
    description: [
      'Collaborating with clients to define solution requirements',
      'Collaborated with cross-functional teams to create project guidelines and milestones',
      'Implemented Marketing and Messaging tools that automate outbounding emails, increasing efficiency 10x',
      'Providing guidance and mentoring less-experienced staff members',
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
