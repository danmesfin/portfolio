import React from 'react';
import Link from 'next/link';
import { socials } from '../../utils/siteConfig';
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
    <footer className="border-t border-paper-border dark:border-gray-800 py-14 px-4">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-8">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="text-paper-text dark:text-gray-300 hover:text-accent-coral dark:hover:text-accent-coral transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex">
          {SOCIALS.map(({ label, href }) => {
            const Icon = SOCIAL_ICONS[label];
            return (
              <a
                key={label}
                className="mx-3 p-2 text-paper-text dark:text-gray-300 hover:text-accent-coral dark:hover:text-accent-coral hover:bg-paper-light dark:hover:bg-gray-800 rounded-full transition-all duration-200"
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
              >
                <Icon className="h-6 w-6" aria-hidden="true" />
              </a>
            );
          })}
        </div>

        <p className="text-center text-paper-muted dark:text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Daniel Mesfin. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
