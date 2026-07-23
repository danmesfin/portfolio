export const siteConfig = {
  name: 'Daniel Mesfin',
  title: 'Daniel Mesfin — Full-Stack Developer',
  description:
    'Daniel Mesfin is a full-stack web and mobile developer based in Addis Ababa, building SaaS platforms, AI-powered tools, and data pipelines with React, Next.js, Node.js and Laravel.',
  // Override per environment (e.g. preview deploys) with NEXT_PUBLIC_SITE_URL.
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://danielmesfin.com').replace(
    /\/$/,
    ''
  ),
  ogImage: '/og-image.jpg',
  twitterHandle: '@danmesfinn',
  author: 'Daniel Mesfin',
  locale: 'en_US',
} as const;

/** Resolves a site-relative path to an absolute URL for metadata. */
export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return `${siteConfig.url}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`;
}

export default siteConfig;
