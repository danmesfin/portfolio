export interface SocialLink {
  label: string;
  href: string;
  /** Hidden in the footer, which keeps a shorter set. */
  primary?: boolean;
}

/**
 * Canonical contact links. Consumed by the navbar, the footer, the JSON-LD
 * `sameAs` list and /llms.txt, so a URL only ever changes in one place.
 */
export const socials: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/danmesfin', primary: true },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/danielmesfin',
    primary: true,
  },
  {
    label: 'Upwork',
    href: 'https://www.upwork.com/freelancers/~01443f33bae62cb58e',
    primary: true,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/danmesfinn',
    primary: true,
  },
  { label: 'Email', href: 'mailto:danielmsfn@gmail.com', primary: true },
  { label: 'WhatsApp', href: 'https://wa.me/251945640369' },
];

export const siteConfig = {
  name: 'Daniel Mesfin',
  title: 'Daniel Mesfin — Full-Stack Developer',
  description:
    'Daniel Mesfin is a full-stack web and mobile developer based in Addis Ababa, building SaaS platforms, AI-powered tools, and data pipelines with React, Next.js, Node.js and Laravel.',
  /** Longer form, used on the homepage hero and in /llms.txt. */
  bio: 'I build data-heavy products end to end — large-scale crawling, AI pipelines, and the interfaces that make them useful. Currently Senior Data Engineer at Lexis Solutions, and recently shipped Ethiopia’s largest AI creative competition to 50,000+ users.',
  role: 'Full-Stack Engineer & Senior Data Engineer',
  location: 'Addis Ababa, Ethiopia',
  email: 'danielmsfn@gmail.com',
  availability: 'Open to freelance and contract work.',
  // Override per environment (e.g. preview deploys) with NEXT_PUBLIC_SITE_URL.
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://danielmesfin.com').replace(
    /\/$/,
    ''
  ),
  ogImage: '/og-image.jpg',
  twitterHandle: '@danmesfinn',
  author: 'Daniel Mesfin',
  locale: 'en_US',
  resume: '/downloads/Daniel_Mesfin_Resume.pdf',
} as const;

/** Resolves a site-relative path to an absolute URL for metadata. */
export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return `${siteConfig.url}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`;
}

/** Profile URLs only — `mailto:` and `wa.me` are not identity links. */
export const profileUrls = socials
  .filter((s) => /^https?:/.test(s.href) && !s.href.includes('wa.me'))
  .map((s) => s.href);

export default siteConfig;
