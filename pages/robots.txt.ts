import { GetServerSideProps } from 'next';
import { absoluteUrl } from '../utils/siteConfig';

/**
 * /robots.txt — generated so the sitemap URL always follows `siteConfig.url`
 * (and `NEXT_PUBLIC_SITE_URL` on preview deploys) instead of being hardcoded.
 */
function buildRobots(): string {
  return [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${absoluteUrl('/sitemap.xml')}`,
    '',
    '# Markdown summary of this site for language models and agents',
    `# (https://llmstxt.org): ${absoluteUrl('/llms.txt')}`,
    '',
  ].join('\n');
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=86400'
  );
  res.write(buildRobots());
  res.end();

  return { props: {} };
};

// Never rendered — getServerSideProps writes the response directly.
export default function Robots() {
  return null;
}
