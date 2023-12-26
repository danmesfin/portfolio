// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { MdOutlineDesignServices } from 'react-icons/md';
import { FaMobileAlt, FaTools, FaHtml5 } from 'react-icons/fa';

interface Skill {
  name: string;
  icon: React.ElementType;
  description: string;
}

interface SkillCardProps {
  skill: Skill;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="flex flex-col justify-center text-left w-full md:w-96 px-1 md:px-3 py-2 my-4 md:m-4 rounded-lg shadow-lg text-base"
  >
    {React.createElement(skill.icon, {
      className: 'w-12 h-12 md:w-24 md:h-24 font-neon',
    })}
    <span className="text-xl md:text-3xl uppercase font-display">
      {skill.name}
    </span>
    <span className="text-md pt-2 md:text-xl font-hand">
      {skill.description}
    </span>
  </motion.div>
);

const Index: React.FC = () => {
  const skills: Skill[] = [
    {
      name: 'UX/UI',
      icon: MdOutlineDesignServices,
      description:
        'I love creating cool and stylish websites! Using tools like Figma and AdobeXD, I make sure your website not only looks great but also feels awesome for anyone who visits.',
    },
    {
      name: 'Web Development',
      icon: FaHtml5,
      description:
        'Got a cool idea? I can turn it into a fully working website! I use HTML, CSS, JavaScript, and fancy frameworks like React and Vue to bring your vision to life. Your website will not only be functional but also super user-friendly.',
    },
    {
      name: 'Mobile Development',
      icon: FaMobileAlt,
      description:
        'Need a mobile app? I got you covered! I design and build apps using React Native, so they look fantastic and work smoothly on any device. Your users will love it!',
    },
    {
      name: 'FULL STACK',
      icon: FaTools,
      description: `I bring a blend of coding expertise and tech wizardry to your project. Whether it's ensuring smooth version control, optimizing for the cloud, or adding a touch of style, I've got your full-stack needs covered!`,
    },
  ];

  return (
    <section
      className="py-10 md:py-20 "
      id="services"
      style={{ backgroundImage: `url('/images/nature-bg-img-01.jpg') ` }}
    >
      <div className="flex flex-col mx-auto">
        <div className="mx-auto">
          <div className="text-redish flex flex-col text-center my-5 py-5 text-6xl md:text-5xl font-display item-center">
            <span>Services</span>
            <span className="font-bold mt-5 px-5 text-sm md:text-md mx-auto">
              open to any digital services
            </span>
            <hr className="mx-auto rounded-lg w-48 bg-gray-400 border-2 shadow-allSide" />
          </div>
        </div>
        <div className="flex flex-col justify-center mx-auto font-mono">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="grid grid-col-1 md:grid-cols-2 px-10 md:px-0"
          >
            {skills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Index;
