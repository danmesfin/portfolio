import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Image from 'next/image';

const ProjectSlider = ({ projects }) => {
  const [current, setCurrent] = useState(0);

  const { length } = projects;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(projects) || projects.length <= 0) {
    return null;
  }

  return (
    <div className="flex flex-col justify-between rounded-lg my-10">
      <div className="flex">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          className="flex w-full justify-center md:justify-end md:w-1/2"
        >
          <div className="relative w-72 h-72 md:w-96 shadow-md shadow-gray-600 dark:shadow-gray-900">
            <Image
              src={projects[current]?.imgurl}
              alt="proj-img"
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        </motion.div>

        <motion.div
          key={current}
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 200 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col w-full md:w-1/2 mx-auto md:mx-4 justify-center p-2 text-bold"
        >
          <div className="bg-primary text-white flex mr-auto font-hand text-center text-lg rounded-lg px-2">
            {projects[current]?.role}
          </div>
          <div className="py-1 font-display text-2xl md:text-2xl dark:text-primary">
            {projects[current]?.title}
          </div>
          <div className="flex flex-wrap md:flex-nowrap w-full">
            {projects[current]?.stack.map((stack, index) => (
              <div
                key={index}
                className="flex mx-1  px-1 rounded-lg bg-green-500 shadow-sm font-hand text-xl"
              >
                {stack}
              </div>
            ))}
          </div>
          <div className="text-sm w-full md:pr-20 p-2 text-base font-display">
            {projects[current]?.description}
          </div>
          <div className="flex p-2 mt-4 md:pr-20">
            <a
              href={projects[current]?.projecturl}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className="text-black py-1 px-2 border rounded-md bg-gray-50
             hover:bg-blue-500 hover:shadow-allSide hover:shadow-blue-500 font-hand text-xl"
              >
                Project Link
              </div>
            </a>
          </div>
        </motion.div>
      </div>
      <div className="flex flex-row mt-16 mx-auto transform -translate-y-1/2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="px-1 m-2 h-12 border rounded-md hover:bg-blue-500
           hover:border-blue-400 hover:shadow-allSide hover:shadow-blue-500 font-hand text-xl"
          onClick={prevSlide}
        >
          <FiChevronLeft size={40} color="#555" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="px-1 m-2 h-12  border rounded-md hover:bg-blue-500
           hover:border-blue-400 hover:shadow-allSide hover:shadow-blue-500 font-hand text-xl"
          onClick={nextSlide}
        >
          <FiChevronRight size={40} color="#555" />
        </motion.button>
      </div>
    </div>
  );
};

export default ProjectSlider;
