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
  SiJava,
  SiAmazonaws,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
} from 'react-icons/si';

interface TechTag {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  name: string;
  color: string;
}

const techStacks: TechTag[] = [
  { icon: FaReact, name: 'React', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { icon: SiNextdotjs, name: 'Next.js', color: 'bg-gray-100 text-gray-800 border-gray-200' },
  { icon: SiTypescript, name: 'TypeScript', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { icon: SiJavascript, name: 'JavaScript', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  { icon: SiNodedotjs, name: 'Node.js', color: 'bg-green-100 text-green-800 border-green-200' },
  { icon: SiRedux, name: 'Redux', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  { icon: SiGraphql, name: 'GraphQL', color: 'bg-pink-100 text-pink-800 border-pink-200' },
  { icon: SiTailwindcss, name: 'Tailwind', color: 'bg-cyan-100 text-cyan-800 border-cyan-200' },
  { icon: SiMongodb, name: 'MongoDB', color: 'bg-green-100 text-green-800 border-green-200' },
  { icon: SiPostgresql, name: 'PostgreSQL', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { icon: FaDatabase, name: 'Database', color: 'bg-gray-100 text-gray-800 border-gray-200' },
  { icon: FaFire, name: 'Firebase', color: 'bg-orange-100 text-orange-800 border-orange-200' },
  { icon: SiAmazonaws, name: 'AWS', color: 'bg-orange-100 text-orange-800 border-orange-200' },
  { icon: FaDocker, name: 'Docker', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { icon: SiTensorflow, name: 'TensorFlow', color: 'bg-orange-100 text-orange-800 border-orange-200' },
  { icon: FaRobot, name: 'AI/ML', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  { icon: FaHtml5, name: 'HTML5', color: 'bg-red-100 text-red-800 border-red-200' },
  { icon: FaCss3, name: 'CSS3', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { icon: FaAngular, name: 'Angular', color: 'bg-red-100 text-red-800 border-red-200' },
  { icon: FaJava, name: 'Java', color: 'bg-red-100 text-red-800 border-red-200' },
  { icon: SiWebpack, name: 'Webpack', color: 'bg-blue-100 text-blue-800 border-blue-200' },
];

const TechTag: React.FC<{ tech: TechTag }> = ({ tech }) => {
  const { icon: Icon, name, color } = tech;
  
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border`}>
      <Icon size={20} className="flex-shrink-0" />
      <span className="font-medium text-sm whitespace-nowrap">{name}</span>
    </div>
  );
};

const TechStack: React.FC = () => (
  <div
    id="TechStack"
    className="py-16 w-full"
  >
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-paper-text dark:text-white font-display">
          Unlimited possibilities
        </h2>
        <p className="text-lg text-paper-muted dark:text-gray-300 max-w-2xl mx-auto">
          Discover the technologies and tools I use to create amazing digital experiences
        </p>
      </div>
      
      <div className="flex flex-wrap gap-3 justify-center items-center">
        {techStacks.map((tech, index) => (
          <TechTag key={index} tech={tech} />
        ))}
      </div>
    </div>
  </div>
);

export default TechStack;
