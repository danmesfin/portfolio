import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
// import background from '../../public/images/background.jpg';
import Navbar from '../Layout/Navbar';
export default function Index() {
  const mySkills = [
    'Design',
    'Development',
    'Branding',
    'Strategy',
    'Product Design',
    'Web Flow',
  ];

  return (
    <section className="dark:bg-base">
      <Navbar />

      <article
        className="h-screen flex flex-col justify-center px-2 items-center"
        id="banner"
      >
        <div className="h-4/5 mx-auto flex flex-wrap flex-col-reverse md:flex-row md:flex-nowrap">
          <div className="w-full md:w-1/2 flex flex-col px-5 md:pl-40 justify-center md:justify-center py-5">
            <div
              className="flex flex-col mt-4 p-1 font-display text-primary text-center md:text-left
           text-xl md:text-5xl"
            >
              <span className="text-primary">HI, I'M DANIEL.</span>
              <span>A FULLSTACK DEVELOPER</span>
              <span>BASED IN ADDIS</span>
            </div>
            <span className="text-lg font-hand md:text-4xl mt-4 p-1 text-blue-400">
              DESIGN - DEVELOP - DEPLOY
            </span>
            <div className="flex mt-4 p-1 ">
              <a href="#contact">
                <span
                  className="py-3 px-4 text-lg  border-2 rounded-lg border-primary text-white bg-black
               font-neon"
                >
                  Got a project?
                </span>
                <span className="py-3 ml-4 px-4 text-lg font-bold border-2 rounded-lg border-primary text-primary">
                  Let's talk
                </span>
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center md:justify-start items-start">
            <div
              className="relative flex h-48 w-48 md:w-96 md:h-full
             overflow-hidden rounded-lg bg-opacity-20"
            >
              <Image
                src="/images/danmesfin.png"
                layout="fill"
                objectFit="cover"
                alt="daniel"
                // color="black"
                // className="grayscale"
              />
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
