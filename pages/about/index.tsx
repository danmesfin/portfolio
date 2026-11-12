import React from 'react';
import { GetStaticProps } from 'next';
import About, { faqs, AboutWork } from '../../components/About';
import Seo from '../../components/Seo';
import personSchema from '../../utils/personSchema';
import { faqPageSchema, profilePageSchema } from '../../utils/structuredData';
import { getCaseStudies } from '../../utils/getCaseStudies';

interface AboutPageProps {
  work: AboutWork[];
}

const Page = ({ work }: AboutPageProps) => (
  <div className="w-full flex">
    <Seo
      title="About"
      description="Daniel Mesfin is a full-stack software engineer in Addis Ababa. Background, current role, notable projects, and availability for freelance and contract work."
      path="/about"
      jsonLd={[profilePageSchema(personSchema), faqPageSchema(faqs)]}
    />
    <About work={work} />
  </div>
);

export const getStaticProps: GetStaticProps<AboutPageProps> = async () => ({
  props: {
    work: getCaseStudies().map(({ slug, name, subtitle }) => ({
      slug,
      name,
      subtitle,
    })),
  },
});

export default Page;
