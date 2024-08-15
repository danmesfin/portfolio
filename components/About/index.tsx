import React from 'react';
import Image from 'next/image';

function About() {
  return (
    <section
      className="relative bg-gradient-to-b from-gray-300 to-white dark:from-zinc-800 pb-[40rem] md:pb-[5rem]"
      id="about"
    >
      <svg
        className="w-full block-edge absolute top-[0rem] z-10 dark:text-black text-orangish"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="currentColor"
          fillOpacity="1"
          d="M0,224L26.7,208C53.3,192,107,160,160,149.3C213.3,139,267,149,320,138.7C373.3,128,427,96,480,106.7C533.3,117,587,171,640,165.3C693.3,160,747,96,800,74.7C853.3,53,907,75,960,90.7C1013.3,107,1067,117,1120,149.3C1173.3,181,1227,235,1280,224C1333.3,213,1387,139,1413,101.3L1440,64L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"
        />
      </svg>
      <div className="relative flex flex-col md:flex-row mx-auto md:py-[5rem] z-20">
        <div className="relative w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="absolute w-52 h-48 md:w-80 md:h-80 mx-auto z-10">
            <Image
              src="/images/mobile.png"
              alt="mobile app image"
              priority
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
        <article
          className="absolute top-[15rem] mx-auto md:top-[0rem] md:relative w-full md:w-1/2 
        flex flex-col text-left items-center align-middle"
        >
          <h2 className="text-left self-start font-display text-gray-800 dark:text-white text-3xl md:text-5xl  px-8 md:px-0">
            How it started
          </h2>
          <p
            className="w-full px-8 md:px-4 md:w-2/3 mt-5 flex text-wrap self-start font-hand 
          text-left text-gray-800 dark:text-white text-xl md:text-2xl"
          >
            In 2017, I began coding using ES File Explorer, an Android file
            explorer app, to write HTML and CSS. My goal was to build a school
            website. At that time, I only had an Android phone and a strong
            desire to learn. After joining university, I finally owned my first
            computer. Today, I&apos;m a software developer who is constantly
            seeking knowledge and innovation. I invite you to explore my
            portfolio and join me on this exciting journey.{' '}
          </p>
        </article>
      </div>
    </section>
  );
}

export default About;
