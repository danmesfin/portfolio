import React from 'react';
import Link from 'next/link';
import Seo from '../components/Seo';

const LINKS = [
  { label: 'Projects', href: '/#projects' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Blog', href: '/blogs' },
  { label: 'Contact', href: '/#contact' },
];

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
      <Seo title="Page not found" noIndex />
      <div className="max-w-xl">
        <p className="eyebrow">Error 404</p>
        <h1 className="font-display mt-4 text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-paper-text dark:text-paper-white">
          This page took a wrong turn.
        </h1>
        <p className="mt-6 text-paper-muted dark:text-gray-400 leading-relaxed">
          The page you are looking for does not exist or has moved. A few places
          worth trying instead:
        </p>

        <ul className="mt-8 space-y-2">
          {LINKS.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                className="font-mono text-sm text-paper-muted hover:text-paper-text dark:text-gray-400 dark:hover:text-paper-white transition-colors"
              >
                → {label}
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/" className="btn-ink mt-10">
          Back to home
        </Link>
      </div>
    </div>
  );
}
