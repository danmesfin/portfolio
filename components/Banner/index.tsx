import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import portrait from '../../public/images/danmesfin.webp';

const ctaClass =
  'inline-block py-3 px-4 text-lg rounded-lg border border-black dark:border-gray-600 text-paper-text dark:text-gray-300 hover:text-black hover:border-black dark:hover:text-white dark:hover:border-accent-coral dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-accent-coral/40 transition-all duration-150';

export default function Banner() {
  const containerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="md:pt-16" id="banner">
      <motion.div
        className="flex flex-col justify-center px-2 items-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        transition={{ duration: 1 }}
      >
        <div className="h-4/5 mx-auto flex flex-wrap-reverse md:flex-row md:flex-nowrap">
          <div className="w-full md:w-1/2 flex flex-col px-5 md:pl-40 justify-start md:justify-center py-5">
            <h1
              className="flex flex-col mt-4 p-1 font-display text-paper-text dark:text-white
               text-center md:text-left text-4xl md:text-5xl"
            >
              <span>HI, I&apos;M DANIEL.</span>
              <span>A FULLSTACK ENGINEER</span>
              <span>BASED IN ADDIS</span>
            </h1>
            <p className="text-paper-text dark:text-gray-300 text-center md:text-start text-3xl font-hand font-bold md:text-4xl mt-4 p-1">
              DESIGN - DEVELOP - DEPLOY
            </p>
            <div className="flex gap-4 mt-4 p-1 mx-auto md:ml-0">
              <Link href="/#contact" className={ctaClass}>
                Got a project?
              </Link>
              <Link href="/#projects" className={ctaClass}>
                See my work
              </Link>
            </div>
          </div>
          <div
            className="w-full md:w-1/2 flex justify-center md:justify-start
           items-start "
          >
            <div
              className="relative flex h-72 w-52 md:w-[20rem] md:h-[30rem]
             overflow-hidden rounded-lg bg-opacity-20"
            >
              <Image
                src={portrait}
                style={{ objectFit: 'contain' }}
                fill
                sizes="(max-width: 768px) 13rem, 20rem"
                placeholder="blur"
                priority
                alt="Portrait of Daniel Mesfin"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
