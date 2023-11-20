import React from 'react';
import Banner from '../components/Banner';
import About from '../components/About';
import Contact from '../components/Contact';
import Projects from '../components/Projects';
import Services from '../components/Services';
import TeckStacks from '../components/TechStacks';
import Footer from '../components/Layout/Footer';

function Home() {
  return (
    <div className="flex flex-col mt-0">
      <Banner />
      <About />
      <Projects />
      <Services />
      <TeckStacks />
      <Contact />
      <Footer />
    </div>
  );
}

export default Home;
