import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Index() {
  const containerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="dark:bg-black md:pt-16" id="banner">
      <motion.div
        className="flex flex-col justify-center px-2 items-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        transition={{ duration: 1 }}
      >
        <div className="h-4/5 mx-auto flex flex-wrap-reverse md:flex-row md:flex-nowrap">
          <div className="w-full md:w-1/2 flex flex-col px-5 md:pl-40 justify-start md:justify-center py-5">
            <div
              className="flex flex-col mt-4 p-1 font-display dark:text-primary
               text-center md:text-left text-4xl md:text-5xl"
            >
              <span>HI, I&apos;M DANIEL.</span>
              <span>A FULLSTACK DEVELOPER</span>
              <span>BASED IN ADDIS</span>
            </div>
            <span className="text-center md:text-start text-3xl font-hand font-bold md:text-4xl mt-4 p-1 dark:text-primary">
              DESIGN - DEVELOP - DEPLOY
            </span>
            <div className="flex mt-4 p-1 mx-auto md:ml-0">
              <a href="#contact">
                <span
                  className="py-3 px-4 text-lg rounded-lg transform delay-75 duration-100 border border-black dark:border-primary hover:border-black
                dark:text-primary dark:hover:text-black dark:hover:border-orange-300 hover:border-black hover:text-black"
                >
                  Got a project?
                </span>
                <span
                  className="py-3 ml-4 px-4 text-lg rounded-lg transform delay-75
                   duration-100 border border-black dark:border-primary hover:border-black dark:hover:text-black dark:hover:border-orange-300 hover:border-black hover:text-black"
                >
                  Let&apos;s talk
                </span>
              </a>
              <style jsx>{`
                a:hover .btn-primary-bg,
                a:hover .btn-secondary-shadow {
                  border: 1px solid;
                }
              `}</style>
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
                src="/images/danmesfin.webp"
                style={{ objectFit: 'contain' }}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                blurDataURL="data:..."
                placeholder="blur"
                alt="daniel"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
