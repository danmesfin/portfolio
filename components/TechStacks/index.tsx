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
    <div className="paper-pill inline-flex items-center gap-2 px-4 py-2 rounded-full">
      <Icon size={20} className="flex-shrink-0" aria-hidden="true" />
      <span className="font-medium text-sm whitespace-nowrap">{name}</span>
    </div>
  );
};

const TechStack: React.FC = () => (
  <div id="TechStack" className="py-16 w-full">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-paper-text dark:text-white font-display">
          Unlimited possibilities
        </h2>
        <p className="text-lg text-paper-muted dark:text-gray-300 max-w-2xl mx-auto">
          Discover the technologies and tools I use to create amazing digital
          experiences
        </p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center items-center">
        {techStacks.map((tech) => (
          <TechTag key={tech.name} tech={tech} />
        ))}
      </div>
    </div>
  </div>
);

export default TechStack;
