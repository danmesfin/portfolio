import { GetServerSideProps } from 'next';
import { experienceData } from '../components/Experience';
import { certifications } from '../components/Certifications';
import { projects } from '../components/BentoGrid';
import { getAllBlogs } from '../utils/getBlogs';
import { getCaseStudies } from '../utils/getCaseStudies';
import { siteConfig, socials, absoluteUrl } from '../utils/siteConfig';

/**
 * /llms.txt — a markdown summary of the site for language models and agents,
 * following the convention at https://llmstxt.org.
 *
 * Everything here is derived from the same data the pages render, so the two
 * cannot drift apart. Rendered per request rather than written by hand for
 * exactly that reason.
 */
function buildDocument(): string {
  const caseStudies = getCaseStudies();
  const blogs = getAllBlogs();

  const lines: string[] = [
    `# ${siteConfig.name}`,
    '',
    `> ${siteConfig.role} based in ${siteConfig.location}. ${siteConfig.availability}`,
    '',
    siteConfig.bio,
    '',
    `Portfolio: ${siteConfig.url}`,
    `Résumé (PDF): ${absoluteUrl(siteConfig.resume)}`,
    '',
    '## Contact',
    '',
    // `mailto:` / `tel:` schemes are noise in a plain-text list.
    ...socials.map(
      ({ label, href }) => `- ${label}: ${href.replace(/^mailto:/, '')}`
    ),
    '',
    '## Experience',
    '',
    ...experienceData.flatMap((role) => [
      `### ${role.title} — ${role.company}${
        'companyUrl' in role && role.companyUrl ? ` (${role.companyUrl})` : ''
      }`,
      `${role.duration.start} – ${role.duration.end} · ${role.location}`,
      '',
      ...role.description.map((point) => `- ${point}`),
      '',
    ]),
    '## Certifications',
    '',
    ...certifications.map(
      ({ title, issuer, date, url }) =>
        `- [${title}](${url}) — ${issuer}${date ? `, ${date}` : ''}`
    ),
    '',
    '## Case studies',
    '',
    'In-depth write-ups. Each page covers the problem, architecture and outcome.',
    '',
    ...caseStudies.map(
      (study) =>
        `- [${study.name}](${absoluteUrl(`/case-studies/${study.slug}`)}): ${
          study.excerpt
        }`
    ),
    '',
    '## Selected projects',
    '',
    ...projects.map(
      (project) =>
        `- ${project.title}${project.liveUrl ? ` (${project.liveUrl})` : ''}: ${
          project.description
        }`
    ),
    '',
  ];

  if (blogs.length > 0) {
    lines.push(
      '## Writing',
      '',
      ...blogs.map(
        (blog) =>
          `- [${blog.frontmatter.title}](${absoluteUrl(
            `/blogs/${blog.slug}`
          )})${
            blog.frontmatter.description
              ? `: ${blog.frontmatter.description}`
              : ''
          }`
      ),
      ''
    );
  }

  lines.push(
    '## Pages',
    '',
    `- [Home](${siteConfig.url}): overview, featured projects and contact form`,
    `- [Case studies](${absoluteUrl('/case-studies')}): all project write-ups`,
    `- [Blog](${absoluteUrl('/blogs')}): articles on web development`,
    `- [Open source](${absoluteUrl('/projects')}): public GitHub repositories`,
    `- [Résumé](${absoluteUrl('/open-resume')}): viewable and downloadable CV`,
    ''
  );

  return lines.join('\n');
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=86400'
  );
  res.write(buildDocument());
  res.end();

  return { props: {} };
};

// Never rendered — getServerSideProps writes the response directly.
export default function LlmsTxt() {
  return null;
}
