import React from 'react';
import {
  FaReact,
  FaDatabase,
  FaFire,
  FaRobot,
  FaNodeJs,
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
} from 'react-icons/si';

const partnerIcons = [
  { Icon: FaReact, name: 'React' },
  { Icon: SiNextdotjs, name: 'Next.js' },
  { Icon: SiRedux, name: 'Redux' },
  { Icon: SiGraphql, name: 'GraphQL' },
  { Icon: SiTypescript, name: 'TypeScript' },
  { Icon: SiNodedotjs, name: 'Node.js' },
  { Icon: SiJavascript, name: 'JavaScript' },
  { Icon: FaDatabase, name: 'Database' },
  { Icon: FaFire, name: 'Firebase' },
  { Icon: FaRobot, name: 'AI/ML' },
  { Icon: SiTensorflow, name: 'TensorFlow' },
  { Icon: FaNodeJs, name: 'Node.js' },
  { Icon: FaHtml5, name: 'HTML5' },
  { Icon: FaCss3, name: 'CSS3' },
  { Icon: FaAngular, name: 'Angular' },
  { Icon: FaJava, name: 'Java' },
  { Icon: FaDocker, name: 'Docker' },
  { Icon: SiAmazonaws, name: 'AWS' },
  { Icon: SiWebpack, name: 'Webpack' },
  { Icon: SiJava, name: 'Java' },
];

const PartnersSection = () => (
  <div
    className="partners-section w-full md:w-2/3 mx-auto 
  px-4 py-3 border rounded-lg border-gradient-shiny"
  >
    <div className="partner-icons flex">
      {partnerIcons.map(({ Icon, name }, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className="partner-icon"
        >
          <Icon size={60} />
          <span className="mt-2 text-sm">{name}</span>
        </div>
      ))}
    </div>
  </div>
);

export default PartnersSection;
