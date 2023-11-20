import { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Image from 'next/image';

const MobileCaseStudy = ({ projects }) => {
  const [current, setCurrent] = useState(0);

  const length = projects.length;

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
    <div className="flex flex-wrap justify-between rounded-lg md:flex-nowrap my-10 transform duration-200 delay-50">
      <motion.div
        initial={{ x: -100, opacity: 0.5 }}
        transition={{ duration: 1 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="flex mt-8 mb-4 md:mt-0 w-full justify-center md:justify-end md:w-1/2"
      >
        <div className="glow relative md:absolute  md:left-60 h-60 md:h-80 w-36 md:w-48 shadow-md">
          <Image
            src={projects[current]?.imgurl[0]}
            alt="proj-img"
            layout="fill"
            objectFit="fill"
            className="rounded-md"
          />
        </div>
        <div className="relative md:absolute top-5 md:top-10 h-60 md:h-80 w-36 md:w-48 shadow-md">
          <Image
            src={projects[current]?.imgurl[1]}
            alt="proj-img"
            layout="fill"
            objectFit="fill"
            className="rounded-md"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ x: -200, opacity: 0.5 }}
        transition={{ duration: 1 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        className=" md:flex flex-col w-full md:w-1/2 mx-auto md:mx-4 justify-center p-2 text-bold"
      >
        <div className="bg-red-500 text-white w-36 text-center">
          {projects[current]?.role}
        </div>
        <div className="py-1 font-bold text-2xl md:text-2xl dark:text-blue-500">
          {projects[current]?.title}
        </div>
        <div className="flex w-full">
          {projects[current]?.stack.map((stack, index) => (
            <div
              key={index}
              className="flex mx-1  px-1 rounded bg-green-500 shadow-sm shadow-green-500"
            >
              {stack}
            </div>
          ))}
        </div>
        <div className="text-sm md:text-md w-full md:pr-20 p-2 dark:text-blue-200">
          {projects[current]?.description}
        </div>
        <div className="flex p-2 mt-4 md:pr-20">
          <a href={projects[current]?.projecturl} target="_blank">
            <div
              className="text-black py-1 px-2 border rounded-md bg-gray-50
             hover:bg-blue-500 hover:shadow-allSide hover:shadow-blue-500"
            >
              Project Link
            </div>
          </a>
        </div>
      </motion.div>

      <div className="absolute top-0 transform -translate-y-1/2">
        <button
          className="px-1 m-2 border rounded-md hover:bg-blue-500
           hover:border-blue-400 hover:shadow-allSide hover:shadow-blue-500"
          onClick={prevSlide}
        >
          <FiChevronLeft size={40} color="#555" />
        </button>
        <button
          className="px-1 m-2 border rounded-md hover:bg-blue-500
           hover:border-blue-400 hover:shadow-allSide hover:shadow-blue-500"
          onClick={nextSlide}
        >
          <FiChevronRight size={40} color="#555" />
        </button>
      </div>
    </div>
  );
};

export default MobileCaseStudy;
