import { GetServerSideProps } from 'next';
import { getAllBlogs } from '../utils/getBlogs';
import { getCaseStudies } from '../utils/getCaseStudies';
import { siteConfig } from '../utils/siteConfig';

interface SitemapEntry {
  path: string;
  /** YYYY-MM-DD. Omitted where no reliable date exists. */
  lastmod?: string;
}

// `changefreq` and `priority` are left out: Google ignores both.
const STATIC_PATHS = [
  '/',
  '/case-studies',
  '/blogs',
  '/projects',
  '/about',
  '/open-resume',
];

function toXml(entries: SitemapEntry[]): string {
  const urls = entries
    .map(({ path, lastmod }) =>
      [
        '  <url>',
        `    <loc>${siteConfig.url}${path}</loc>`,
        lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
        '  </url>',
      ]
        .filter(Boolean)
        .join('\n')
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

// Rendered on request so newly added markdown shows up without a redeploy.
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const blogEntries: SitemapEntry[] = getAllBlogs().map((blog) => ({
    path: `/blogs/${blog.slug}`,
    lastmod:
      (blog.frontmatter.updated || blog.frontmatter.date).split('T')[0] ||
      undefined,
  }));

  const caseStudyEntries: SitemapEntry[] = getCaseStudies().map((study) => ({
    path: `/case-studies/${study.slug}`,
    lastmod: study.updated ?? study.date,
  }));

  const staticEntries: SitemapEntry[] = STATIC_PATHS.map((path) => ({ path }));

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=86400'
  );
  res.write(toXml([...staticEntries, ...caseStudyEntries, ...blogEntries]));
  res.end();

  return { props: {} };
};

// Never rendered — getServerSideProps writes the response directly.
export default function Sitemap() {
  return null;
}
