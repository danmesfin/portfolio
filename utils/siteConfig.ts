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
];

export const siteConfig = {
  name: 'Daniel Mesfin',
  title: 'Daniel Mesfin — Full-Stack Software Engineer',
  description:
    'Daniel Mesfin is a full-stack software engineer in Addis Ababa who builds AI and data-heavy products end to end with React, Next.js, Node.js and Laravel. Certified by AWS, Anthropic and NVIDIA.',
  /** Longer form, used on the homepage hero and in /llms.txt. */
  bio: 'I build AI and data-heavy products end to end — the interface, the backend, the infrastructure and the AI features in between. Recently shipped Ethiopia’s largest AI creative competition to 50,000+ users.',
  role: 'Full-Stack Software Engineer',
  location: 'Addis Ababa, Ethiopia',
  availability: 'Open to freelance and contract work.',
  /** Upwork talent badge, shown on /about and in the FAQ. */
  upworkBadge: 'Top Rated Plus',
  /** Topics for the JSON-LD `knowsAbout` list. */
  expertise: [
    'Full-stack web development',
    'SaaS platforms',
    'AI-powered applications',
    'Cloud infrastructure',
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Laravel',
    'Data engineering',
  ],
  // Override per environment (e.g. preview deploys) with NEXT_PUBLIC_SITE_URL.
  url: (
    process.env.NEXT_PUBLIC_SITE_URL || 'https://www.danmesfin.com'
  ).replace(/\/$/, ''),
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

/** Profile URLs for the JSON-LD `sameAs` list. */
export const profileUrls = socials.map((s) => s.href);

export default siteConfig;
