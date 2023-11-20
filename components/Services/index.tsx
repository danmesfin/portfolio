//@ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { MdOutlineDesignServices } from 'react-icons/md';
import { FaMobileAlt, FaTools, FaHtml5 } from 'react-icons/fa';

const SkillCard = ({ skill }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex flex-col justify-center text-left w-full md:w-96 px-1 md:px-3 py-2 my-4 md:m-4 rounded-lg shadow-lg text-white`}
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
};

const Index = () => {
  const skills = [
    {
      name: 'UX/UI',
      icon: MdOutlineDesignServices,
      description:
        'I design modern and elegant websites for any kind of business using tools like Figma, AdobeXD.',
    },
    {
      name: 'Web Development',
      icon: FaHtml5,
      description:
        'I can transform your idea/design into a fully functional website using HTML, CSS, JavaScript, jQuery, and frameworks like React/Next.js, Vue.',
    },
    {
      name: 'Mobile Development',
      icon: FaMobileAlt,
      description:
        'I design and develop native mobile apps using React Native.',
    },
    {
      name: 'FULL STACK',
      icon: FaTools,
      description:
        'I have experience working with various tools and technologies such as Git, Firebase, Heroku, Tailwind CSS, and more.',
    },
  ];

  return (
    <section className="bg-sky py-10 md:py-20" id="services">
      <div className="flex flex-col mx-auto">
        <div className="mx-auto">
          <div className="flex flex-col text-center my-5 py-5 text-4xl md:text-5xl font-display item-center">
            <span>I have worked as</span>
            <span className="font-bold mt-5 px-5 text-sm md:text-md mx-auto">
              open to any digital services
            </span>
            <hr className="mx-auto rounded-lg w-48 bg-gray-400 border-2 shadow-allSide shadow-red-200" />
          </div>
        </div>
        <div className="flex flex-col justify-center mx-auto font-mono">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="grid grid-col-1 md:grid-cols-2 px-10 md:px-0"
          >
            {skills.map((skill, index) => (
              <SkillCard key={index} skill={skill} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Index;
