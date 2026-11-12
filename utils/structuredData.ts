import { siteConfig, absoluteUrl } from './siteConfig';

/**
 * schema.org builders for the JSON-LD passed to `<Seo jsonLd>`.
 *
 * The Person and WebSite nodes carry stable `@id`s so every other page can
 * point at them by reference instead of repeating the full objects. The Person
 * node itself lives in `personSchema.ts`, which pulls in component data and is
 * only imported by the pages that emit it.
 */
export const PERSON_ID = `${siteConfig.url}/#person`;
export const WEBSITE_ID = `${siteConfig.url}/#website`;

const CONTEXT = 'https://schema.org';

/** Drops undefined values and empty arrays so the output stays valid. */
function compact<T extends Record<string, unknown>>(node: T): T {
  return Object.fromEntries(
    Object.entries(node).filter(
      ([, value]) =>
        value !== undefined &&
        value !== null &&
        !(Array.isArray(value) && value.length === 0)
    )
  ) as T;
}

export const websiteSchema = {
  '@context': CONTEXT,
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: siteConfig.url,
  name: siteConfig.name,
  description: siteConfig.description,
  inLanguage: 'en',
  publisher: { '@id': PERSON_ID },
};

export function profilePageSchema(person: object) {
  return {
    '@context': CONTEXT,
    '@type': 'ProfilePage',
    url: absoluteUrl('/about'),
    name: `About ${siteConfig.name}`,
    isPartOf: { '@id': WEBSITE_ID },
    mainEntity: person,
  };
}

interface ArticleInput {
  type: 'Article' | 'BlogPosting';
  path: string;
  headline: string;
  description?: string;
  /** Site-relative path or absolute URL. */
  image?: string;
  datePublished?: string;
  /** Falls back to `datePublished`. */
  dateModified?: string;
  keywords?: string[];
  /** Name of the product or project the article is about. */
  about?: string;
}

export function articleSchema({
  type,
  path,
  headline,
  description,
  image,
  datePublished,
  dateModified,
  keywords,
  about,
}: ArticleInput) {
  const url = absoluteUrl(path);
  return compact({
    '@context': CONTEXT,
    '@type': type,
    headline,
    description,
    image: image ? absoluteUrl(image) : undefined,
    url,
    mainEntityOfPage: url,
    datePublished,
    dateModified: dateModified ?? datePublished,
    keywords: keywords ? Array.from(new Set(keywords)) : undefined,
    about: about ? { '@type': 'Thing', name: about } : undefined,
    inLanguage: 'en',
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
    isPartOf: { '@id': WEBSITE_ID },
  });
}

/** Breadcrumb trail; "Home" is prepended automatically. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': CONTEXT,
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...trail].map(
      ({ name, path }, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name,
        item: path === '/' ? siteConfig.url : absoluteUrl(path),
      })
    ),
  };
}
