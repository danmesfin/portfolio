import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

function About() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div className="bg-gray-300 pb-[5rem] md:pb-[10rem]" id="about">
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
      <div className="flex md:flex-row mx-auto py-[5rem]">
        <div className="relative w-1/2 flex justify-end">
          <img
            src="/images/mobile.png"
            alt="daniel"
            className="absolute w-1/2 mx-auto z-10"
          />
        </div>
        <article className="w-full md:w-1/2 flex flex-col text-left items-center align-middle">
          <h2 className="text-left self-start font-display text-base text-2xl md:text-5xl">
            How it started
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
    </div>
  );
}

export default About;
