import { experienceData } from '../components/Experience';
import { certifications } from '../components/Certifications';
import { siteConfig, absoluteUrl, profileUrls } from './siteConfig';
import { PERSON_ID } from './structuredData';

const currentRole = experienceData.find(
  (role) => role.duration.end === 'Present'
);

/**
 * The site's Person entity. Emitted in full on the homepage and /about; other
 * pages reference it by `@id`. Employer and credentials come from the same
 * data the Experience and Certifications sections render.
 */
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': PERSON_ID,
  name: siteConfig.name,
  url: siteConfig.url,
  image: absoluteUrl(siteConfig.ogImage),
  jobTitle: siteConfig.role,
  description: siteConfig.description,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Addis Ababa',
    addressCountry: 'ET',
  },
  sameAs: profileUrls,
  knowsAbout: siteConfig.expertise,
  ...(currentRole && {
    worksFor: {
      '@type': 'Organization',
      name: currentRole.company,
      ...('companyUrl' in currentRole &&
        currentRole.companyUrl && { url: currentRole.companyUrl }),
    },
  }),
  hasCredential: certifications.map(({ title, issuer, url }) => ({
    '@type': 'EducationalOccupationalCredential',
    name: title,
    url,
    recognizedBy: { '@type': 'Organization', name: issuer },
  })),
};

export default personSchema;
