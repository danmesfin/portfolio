import React from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import Banner from '../components/Banner';
import About from '../components/About';
import Contact from '../components/Contact';
import Services from '../components/Services';
import TechStacks from '../components/TechStacks';
import Experience from '../components/Experience';
import BentoGrid from '../components/BentoGrid';
import CaseStudyCarousel from '../components/CaseStudyGrid';
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
      {/* <About /> */}
      <BentoGrid />
      <CaseStudyCarousel />
      <Experience />
      <Services />
      <TechStacks />
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
