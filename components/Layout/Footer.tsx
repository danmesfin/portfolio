import React from 'react';
import Link from 'next/link';
import { socials, siteConfig } from '../../utils/siteConfig';
import { SOCIAL_ICONS } from './Navbar';

// The footer carries the shorter set — see `primary` in siteConfig.
const SOCIALS = socials.filter((social) => social.primary);

const LINKS = [
  { label: 'Projects', href: '/#projects' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Blog', href: '/blogs' },
  { label: 'Contact', href: '/#contact' },
];

function Footer() {
  return (
    <footer className="border-t border-paper-border dark:border-white/10 mt-8">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12 py-14">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div>
            <p className="font-display text-2xl text-paper-text dark:text-paper-white">
              Daniel Mesfin
            </p>
            <p className="mt-2 font-mono text-sm text-paper-muted dark:text-gray-400">
              {siteConfig.role}
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-4 inline-block font-mono text-sm text-paper-text dark:text-paper-white underline decoration-1 underline-offset-4 decoration-paper-muted hover:decoration-paper-text dark:hover:decoration-paper-white transition-colors"
            >
              {siteConfig.email}
            </a>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-col gap-2">
              {LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="font-mono text-sm text-paper-muted hover:text-paper-text dark:text-gray-400 dark:hover:text-paper-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 pt-6 border-t border-paper-border dark:border-white/10 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="font-mono text-xs text-paper-muted dark:text-gray-500">
            © {new Date().getFullYear()} Daniel Mesfin
          </p>
          <div className="flex gap-1">
            {SOCIALS.map(({ label, href }) => {
              const Icon = SOCIAL_ICONS[label];
              return (
                <a
                  key={label}
                  className="p-2 text-paper-muted hover:text-paper-text dark:text-gray-400 dark:hover:text-paper-white transition-colors"
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
