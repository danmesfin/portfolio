import { GetServerSideProps } from 'next';
import { getAllBlogs } from '../utils/getBlogs';
import { getCaseStudies } from '../utils/getCaseStudies';
import { siteConfig } from '../utils/siteConfig';

interface SitemapEntry {
  path: string;
  changefreq: string;
  priority: string;
  lastmod?: string;
}

const STATIC_ENTRIES: SitemapEntry[] = [
  { path: '/', changefreq: 'monthly', priority: '1.0' },
  { path: '/case-studies', changefreq: 'monthly', priority: '0.9' },
  { path: '/blogs', changefreq: 'weekly', priority: '0.8' },
  { path: '/about', changefreq: 'yearly', priority: '0.5' },
  { path: '/open-resume', changefreq: 'yearly', priority: '0.5' },
];

function toXml(entries: SitemapEntry[]): string {
  const urls = entries
    .map(({ path, changefreq, priority, lastmod }) =>
      [
        '  <url>',
        `    <loc>${siteConfig.url}${path}</loc>`,
        lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
        `    <changefreq>${changefreq}</changefreq>`,
        `    <priority>${priority}</priority>`,
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
    changefreq: 'yearly',
    priority: '0.7',
    lastmod: blog.frontmatter.date
      ? new Date(blog.frontmatter.date).toISOString().split('T')[0]
      : undefined,
  }));

  const caseStudyEntries: SitemapEntry[] = getCaseStudies().map((study) => ({
    path: `/case-studies/${study.slug}`,
    changefreq: 'monthly',
    priority: '0.8',
  }));

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=86400'
  );
  res.write(toXml([...STATIC_ENTRIES, ...caseStudyEntries, ...blogEntries]));
  res.end();

  return { props: {} };
};

// Never rendered — getServerSideProps writes the response directly.
export default function Sitemap() {
  return null;
}
