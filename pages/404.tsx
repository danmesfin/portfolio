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
      <div className="text-center max-w-xl">
        <p className="font-hand text-6xl text-accent-coral mb-4">404</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-paper-text dark:text-white mb-4">
          This page took a wrong turn
        </h1>
        <p className="text-lg text-paper-muted dark:text-gray-300 mb-8">
          The page you are looking for does not exist or has moved. Here are
          some places worth trying instead.
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="px-5 py-3 rounded-xl border border-paper-border dark:border-gray-700 text-paper-text dark:text-gray-200 hover:border-accent-coral hover:text-accent-coral transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="inline-block bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
