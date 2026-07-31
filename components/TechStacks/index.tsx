import React from 'react';
import {
  FaReact,
  FaDatabase,
  FaFire,
  FaRobot,
  FaHtml5,
  FaCss3,
  FaAngular,
  FaJava,
  FaDocker,
} from 'react-icons/fa';
import {
  SiNextdotjs,
  SiRedux,
  SiGraphql,
  SiTypescript,
  SiNodedotjs,
  SiJavascript,
  SiTensorflow,
  SiWebpack,
  SiAmazonaws,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiTerraform,
  SiRedis,
  SiRabbitmq,
} from 'react-icons/si';
import SectionHeading from '../SectionHeading';

interface TechTag {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  name: string;
}

const techStacks: TechTag[] = [
  {
    icon: FaReact,
    name: 'React',
  },
  {
    icon: SiNextdotjs,
    name: 'Next.js',
  },
  {
    icon: SiTypescript,
    name: 'TypeScript',
  },
  {
    icon: SiJavascript,
    name: 'JavaScript',
  },
  {
    icon: SiNodedotjs,
    name: 'Node.js',
  },
  {
    icon: SiRedux,
    name: 'Redux',
  },
  {
    icon: SiGraphql,
    name: 'GraphQL',
  },
  {
    icon: SiTailwindcss,
    name: 'Tailwind',
  },
  {
    icon: SiMongodb,
    name: 'MongoDB',
  },
  {
    icon: SiPostgresql,
    name: 'PostgreSQL',
  },
  {
    icon: FaDatabase,
    name: 'Database',
  },
  {
    icon: FaFire,
    name: 'Firebase',
  },
  {
    icon: SiAmazonaws,
    name: 'AWS',
  },
  {
    icon: FaDocker,
    name: 'Docker',
  },
  {
    icon: SiTerraform,
    name: 'Terraform',
  },
  {
    icon: SiRedis,
    name: 'Redis',
  },
  {
    icon: SiRabbitmq,
    name: 'RabbitMQ',
  },
  {
    icon: SiTensorflow,
    name: 'TensorFlow',
  },
  {
    icon: FaRobot,
    name: 'AI/ML',
  },
  {
    icon: FaHtml5,
    name: 'HTML5',
  },
  {
    icon: FaCss3,
    name: 'CSS3',
  },
  {
    icon: FaAngular,
    name: 'Angular',
  },
  {
    icon: FaJava,
    name: 'Java',
  },
  {
    icon: SiWebpack,
    name: 'Webpack',
  },
];

const TechTag: React.FC<{ tech: TechTag }> = ({ tech }) => {
  const { icon: Icon, name } = tech;

  return (
    <div className="inline-flex items-center gap-2 text-paper-muted dark:text-gray-400">
      <Icon size={16} className="flex-shrink-0" aria-hidden="true" />
      <span className="font-mono text-sm whitespace-nowrap">{name}</span>
    </div>
  );
};

const TechStack: React.FC = () => (
  <section id="TechStack" className="px-5 sm:px-8 lg:px-12 py-16 sm:py-24">
    <div className="mx-auto max-w-6xl">
      <SectionHeading eyebrow="Toolkit" title="The stack I reach for." />

      <div className="flex flex-wrap gap-x-8 gap-y-4">
        {techStacks.map((tech) => (
          <TechTag key={tech.name} tech={tech} />
        ))}
      </div>
    </div>
  </section>
);

export default TechStack;
