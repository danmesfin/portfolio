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
} from 'react-icons/si';

const partnerIcons = [
  FaReact,
  SiNextdotjs,
  SiRedux,
  SiGraphql,
  SiTypescript,
  SiNodedotjs,
  SiJavascript,
  FaDatabase,
  FaFire,
  FaRobot,
  SiTensorflow,
  FaNodeJs,
  FaHtml5,
  FaCss3,
  FaAngular,
  FaJava,
  FaDocker,
  SiWebpack,
  SiJava,
];

const PartnersSection = () => (
  <div
    className="partners-section w-full md:w-2/3 mx-auto 
  px-4 py-3 border animate-pulse rounded-lg border-gradient-shiny"
  >
    <div className="partner-icons flex">
      {partnerIcons.map((Icon, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className="partner-icon"
        >
          <Icon size={60} />
        </div>
      ))}
    </div>
  </div>
);

export default PartnersSection;
