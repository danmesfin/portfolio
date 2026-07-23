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
        <div className="w-full max-w-7xl mx-auto flex flex-wrap-reverse lg:flex-row lg:flex-nowrap lg:items-center gap-6 lg:gap-8">
          <div className="w-full lg:w-1/2 min-w-0 flex flex-col px-5 lg:pl-16 xl:pl-24 justify-start lg:justify-center py-5">
            <h1
              className="flex flex-col mt-4 p-1 font-display text-paper-text dark:text-white
               text-center lg:text-left text-4xl sm:text-5xl"
            >
              <span>HI, I&apos;M DANIEL.</span>
              <span>A FULLSTACK ENGINEER</span>
              <span>BASED IN ADDIS</span>
            </h1>
            <p className="text-paper-text dark:text-gray-300 text-center lg:text-start text-3xl font-hand font-bold sm:text-4xl mt-4 p-1">
              DESIGN - DEVELOP - DEPLOY
            </p>
            <p className="mt-5 p-1 max-w-prose mx-auto lg:mx-0 text-center lg:text-start text-base sm:text-lg leading-relaxed text-paper-muted dark:text-gray-400">
              I build data-heavy products end to end — large-scale crawling, AI
              pipelines, and the interfaces that make them useful. Currently
              Senior Data Engineer at{' '}
              <a
                href="https://www.lexis.solutions/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper-text dark:text-gray-200 underline decoration-accent-coral decoration-2 underline-offset-4 hover:text-accent-coral transition-colors"
              >
                Lexis Solutions
              </a>
              , and recently shipped Ethiopia&apos;s largest AI creative
              competition to 50,000+ users.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-6 p-1">
              <Link href="/#contact" className={ctaClass}>
                Got a project?
              </Link>
              <Link href="/#projects" className={ctaClass}>
                See my work
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-1/2 min-w-0 flex justify-center lg:justify-start items-start">
            <div
              className="relative flex h-72 w-52 sm:h-[24rem] sm:w-[16.5rem] lg:h-[26rem] lg:w-[18rem] xl:h-[30rem] xl:w-[20rem]
             overflow-hidden rounded-lg bg-opacity-20"
            >
              <Image
                src={portrait}
                style={{ objectFit: 'contain' }}
                fill
                sizes="(max-width: 640px) 13rem, (max-width: 1024px) 16.5rem, (max-width: 1280px) 18rem, 20rem"
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
