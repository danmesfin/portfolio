import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { siteConfig, absoluteUrl } from '../../utils/siteConfig';

interface SeoProps {
  /** Page title. Appended with the site name unless `titleTemplate` is false. */
  title?: string;
  description?: string;
  /** Site-relative path or absolute URL of the social preview image. */
  image?: string;
  type?: 'website' | 'article';
  /** Canonical path. Defaults to the current route without its query string. */
  path?: string;
  publishedTime?: string;
  noIndex?: boolean;
  children?: React.ReactNode;
}

const Seo: React.FC<SeoProps> = ({
  title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  type = 'website',
  path,
  publishedTime,
  noIndex = false,
  children,
}) => {
  const router = useRouter();
  const resolvedPath = path ?? router.asPath.split(/[?#]/)[0];
  const canonical = absoluteUrl(resolvedPath === '/' ? '' : resolvedPath);
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const imageUrl = absoluteUrl(image);

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={siteConfig.locale} />
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && (
        <meta property="article:author" content={siteConfig.author} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:creator" content={siteConfig.twitterHandle} />

      {children}
    </Head>
  );
};

export default Seo;
