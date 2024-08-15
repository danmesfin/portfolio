import React from 'react';
import Head from 'next/head';
import Banner from '../components/Banner';
import About from '../components/About';
import Contact from '../components/Contact';
import Projects from '../components/Projects';
import Services from '../components/Services';
import TeckStacks from '../components/TechStacks';
import Experience from '../components/Experience';

function Home() {
  return (
    <div className="flex flex-col mt-0">
      <Head>
        <title>Daniel Mesfin</title>
      </Head>
      <Banner />
      <About />
      <Experience />
      <Projects />
      <Services />
      <TeckStacks />
      <Contact />
    </div>
  );
}

export default Home;
