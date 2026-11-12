import React from 'react';
import { GetStaticProps } from 'next';
import Banner from '../components/Banner';
import Contact from '../components/Contact';
import Services from '../components/Services';
import TechStacks from '../components/TechStacks';
import Experience from '../components/Experience';
import Certifications from '../components/Certifications';
import BentoGrid from '../components/BentoGrid';
import CaseStudyCarousel from '../components/CaseStudyGrid';
import Seo from '../components/Seo';
import { getFeaturedCaseStudies, CaseStudy } from '../utils/getCaseStudies';
import personSchema from '../utils/personSchema';
import { websiteSchema } from '../utils/structuredData';

interface HomeProps {
  caseStudies: CaseStudy[];
}

function Home({ caseStudies }: HomeProps) {
  return (
    <div className="flex flex-col mt-0">
      <Seo path="/" jsonLd={[websiteSchema, personSchema]} />
      <Banner />
      <BentoGrid />
      <CaseStudyCarousel caseStudies={caseStudies} />
      <Experience />
      <Certifications />
      <Services />
      <TechStacks />
      <Contact />
    </div>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => ({
  props: {
    caseStudies: getFeaturedCaseStudies(),
  },
});

export default Home;
