import React from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import Banner from '../components/Banner';
import About from '../components/About';
import Contact from '../components/Contact';
import Projects from '../components/Projects';
import Services from '../components/Services';
import TeckStacks from '../components/TechStacks';
import Experience from '../components/Experience';
import { getCaseStudies, CaseStudy } from '../utils/getCaseStudies';

interface HomeProps {
  caseStudies: CaseStudy[];
}

function Home({ caseStudies }: HomeProps) {
  return (
    <div className="flex flex-col mt-0">
      <Head>
        <title>Daniel Mesfin</title>
      </Head>
      <Banner />
      <About />
      <Experience />
      <Projects caseStudies={caseStudies} />
      <Services />
      <TeckStacks />
      <Contact />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const caseStudies = getCaseStudies();

  return {
    props: {
      caseStudies,
    },
  };
};

export default Home;
