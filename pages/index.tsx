import React from 'react';
import { GetStaticProps } from 'next';
import Banner from '../components/Banner';
import Contact from '../components/Contact';
import Services from '../components/Services';
import TechStacks from '../components/TechStacks';
import Experience from '../components/Experience';
import BentoGrid from '../components/BentoGrid';
import CaseStudyCarousel from '../components/CaseStudyGrid';
import Seo from '../components/Seo';
import { getFeaturedCaseStudies, CaseStudy } from '../utils/getCaseStudies';
import { siteConfig, absoluteUrl } from '../utils/siteConfig';

interface HomeProps {
  caseStudies: CaseStudy[];
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.name,
  url: siteConfig.url,
  image: absoluteUrl(siteConfig.ogImage),
  jobTitle: 'Full-Stack Developer',
  description: siteConfig.description,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Addis Ababa',
    addressCountry: 'ET',
  },
  sameAs: [
    'https://github.com/danmesfin',
    'https://linkedin.com/in/danielmesfin',
    'https://www.upwork.com/freelancers/~01443f33bae62cb58e',
    'https://instagram.com/danmesfinn',
  ],
};

function Home({ caseStudies }: HomeProps) {
  return (
    <div className="flex flex-col mt-0">
      <Seo path="/">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </Seo>
      <Banner />
      <BentoGrid />
      <CaseStudyCarousel caseStudies={caseStudies} />
      <Experience />
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
