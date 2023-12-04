import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

function About() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div className="bg-sky pb-8 md:pb-20" id="about">
      <svg
        className="w-full block-edge relative z-10 dark:text-base text-white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="currentColor"
          fillOpacity="1"
          d="M0,224L26.7,208C53.3,192,107,160,160,149.3C213.3,139,267,149,320,138.7C373.3,128,427,96,480,106.7C533.3,117,587,171,640,165.3C693.3,160,747,96,800,74.7C853.3,53,907,75,960,90.7C1013.3,107,1067,117,1120,149.3C1173.3,181,1227,235,1280,224C1333.3,213,1387,139,1413,101.3L1440,64L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"
        />
      </svg>
      <div className="flex md:flex-row mx-auto">
        <div className="relative w-1/2 flex justify-end">
          <img
            src="/images/mobile.png"
            alt="daniel"
            className="absolute w-1/2 mx-auto z-10"
          />
        </div>
        <article className="w-full md:w-1/2 flex flex-col text-left items-center align-middle">
          <h2 className="text-left self-start font-display text-base text-2xl md:text-5xl">
            How it started ...
          </h2>
          <p className="w-full md:w-2/3 mt-5 flex text-wrap self-start font-hand text-left text-base text-2xl">
            In 2017, armed with just an Android phone and sheer determination, I
            started coding using ES File Explorer to write HTML and CSS. My
            dream? To build a school website. University brought me my first
            laptop, expanding my horizons. Today, I&apos;m a software developer
            in constant pursuit of knowledge and innovation. Explore my
            portfolio and join me on this exciting journey.
          </p>
        </article>
      </div>
      {/* <div className="flex md:flex-row mt-20 mx-auto">
        <div className="relative w-1/2 flex justify-end">
          <img
            src="/images/mobile.png"
            alt="daniel"
            className="absolute w-1/2 mx-auto z-10"
          />
        </div>
        <article
          id="Education"
          className="w-full  md:w-1/2 flex flex-col text-left items-center align-middle"
        >
          <h2 className="text-left self-start font-display text-base text-2xl md:text-4xl">
            5 years{' '}
            <span className="line-through font-normal text-2xl">Wasted</span> at
            university
          </h2>
          <p className="w-full md:w-2/3 mt-5 flex flex-col text-wrap self-start font-hand text-left text-base text-2xl">
            <span className="text-2xl">Addis Institute of Technology</span>
            <span className="text-3xl">ECE, Computer Engineering</span>
          </p>
        </article>
      </div> */}

      {/* <div className=" m-36 mx-auto">
        <motion.div
          initial={{ x: 0, opacity: 0 }}
          transition={{
            duration: 1,
          }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: false }}
          className="flex flex-col font-display text-center my-5 py-5 text-xl 
              md:text-5xl"
        >
          <span className="">Highlights from 3+ years</span>
          <span>of development.</span>
          <span className="font-bold mt-5 px-5 text-sm md:text-md">
            I Have been delivering problem solving software solutions to the
            standard
          </span>
        </motion.div>
      </div>
      <div className="flex flex-wrap md:flex-nowrap justify-center uppercase font-mono pt-10">
        <div
          className="flex flex-col justify-center text-center w-60 px-5 
        py-10 font-bold border-2 border-black"
        >
          <span className="text-4xl">3+</span>
          <span>Years of experiance</span>
        </div>
        <div
          className="flex flex-col justify-center text-center w-60 px-5 py-10 
        border-2 border-black bg-black font-bold text-white"
        >
          <span className="text-4xl">7+</span>
          <span>Projects</span>
        </div>
        <div
          className="flex flex-col justify-center text-center w-60 px-5 
        py-10 border-2 border-black font-bold"
        >
          <span className="text-4xl">4+</span>
          <span>Happy Clients</span>
        </div>
      </div> */}
    </div>
  );
}

export default About;
