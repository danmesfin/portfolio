import React from 'react';

function About() {
  return (
    <section className="px-5 sm:px-8 lg:px-12 py-16 sm:py-24" id="about">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">About</p>
        <h1 className="font-display mt-4 text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-paper-text dark:text-paper-white">
          How it started.
        </h1>

        <div className="mt-10 space-y-6 text-paper-muted dark:text-gray-400 leading-relaxed">
          <p>
            In 2017, I began coding using ES File Explorer — an Android file
            manager — to write HTML and CSS. My goal was to build a school
            website. At the time I only had an Android phone and a strong desire
            to learn.
          </p>
          <p>
            After joining university, I finally owned my first computer. Today
            I&apos;m a software developer constantly seeking knowledge and
            innovation. I invite you to explore my work and join me on the
            journey.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
