import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  SiGithub,
  SiGmail,
  SiInstagram,
  SiLinkedin,
  SiUpwork,
  SiWhatsapp,
} from 'react-icons/si';
import Navitem from '../Navitem';
import ThemeChanger from '../Button';
import { socials } from '../../utils/siteConfig';

const MENU = [
  { title: 'Home', link: '/#banner', description: 'Go to the Home section' },
  { title: 'Projects', link: '/#projects', description: 'Explore my projects' },
  {
    title: 'Case Studies',
    link: '/case-studies',
    description: 'Read in-depth project breakdowns',
  },
  { title: 'Blogs', link: '/blogs', description: 'Read my blog posts' },
  { title: 'Contact', link: '/#contact', description: 'Get in touch with me' },
];

/** URLs live in siteConfig; the icon is the only presentational bit here. */
export const SOCIAL_ICONS: Record<string, typeof SiGithub> = {
  GitHub: SiGithub,
  LinkedIn: SiLinkedin,
  Upwork: SiUpwork,
  Instagram: SiInstagram,
  Email: SiGmail,
  WhatsApp: SiWhatsapp,
};

/** `inert` is not in React 18's JSX types yet, so it is spread in. */
const INERT = { inert: '' };

const socialLinkClass =
  'p-2 text-paper-muted dark:text-gray-400 hover:text-paper-text dark:hover:text-paper-white transition-colors duration-200';

function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [navActive, setNavActive] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close the panel on Escape, and whenever navigation happens — otherwise it
  // stays open behind the new page after tapping a link.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setNavActive(false);
    };
    const close = () => setNavActive(false);
    window.addEventListener('keydown', onKeyDown);
    router.events.on('routeChangeComplete', close);
    router.events.on('hashChangeComplete', close);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      router.events.off('routeChangeComplete', close);
      router.events.off('hashChangeComplete', close);
    };
  }, [router.events]);

  const isActive = (link: string) => {
    const path = router.asPath;
    if (link.startsWith('/#')) {
      return path === link || (link === '/#banner' && path === '/');
    }
    return path === link || path.startsWith(`${link}/`);
  };

  const closeNav = () => setNavActive(false);

  const socialLinks = socials.map(({ label, href }) => {
    const Icon = SOCIAL_ICONS[label];
    return (
      <a
        key={label}
        className={socialLinkClass}
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={label}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </a>
    );
  });

  const resumeButton = (
    <a
      href="/downloads/Daniel_Mesfin_Resume.pdf"
      target="_blank"
      rel="noreferrer noopener"
      onClick={closeNav}
      className="block"
    >
      <span className="btn-ink whitespace-nowrap px-4 py-2.5">See résumé</span>
    </a>
  );

  return (
    <header className="sticky top-0 z-[99] bg-base/85 dark:bg-black/85 backdrop-blur-md border-b border-paper-border dark:border-white/10">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        {/* Single row: never wraps. Everything that cannot fit moves into the
            panel below at the breakpoint where it stops fitting. */}
        <div className="flex items-center justify-between gap-2 sm:gap-4 py-4">
          <Link
            href="/"
            aria-label="Daniel Mesfin — home"
            className="flex-shrink-0 group"
          >
            <span className="font-display text-xl sm:text-2xl text-paper-text dark:text-paper-white">
              Daniel Mesfin
            </span>
            <span className="ml-2 eyebrow hidden sm:inline align-middle">
              Engineer
            </span>
          </Link>

          {/* Primary nav — inline from lg, in the panel below that. */}
          <nav aria-label="Main" className="hidden lg:block min-w-0">
            <ul className="flex items-center gap-1 xl:gap-2">
              {MENU.map((menu) => (
                <Navitem
                  key={menu.title}
                  menu={menu.title}
                  link={menu.link}
                  description={menu.description}
                  active={isActive(menu.link)}
                  onClick={closeNav}
                />
              ))}
            </ul>
          </nav>

          <div className="flex flex-shrink-0 items-center gap-1 sm:gap-2">
            {/* Socials need the most room, so they appear last — at xl. */}
            <div className="hidden xl:flex items-center">{socialLinks}</div>

            {mounted && <ThemeChanger />}

            <div className="hidden lg:block">{resumeButton}</div>

            <button
              onClick={() => setNavActive(!navActive)}
              type="button"
              aria-expanded={navActive}
              aria-controls="primary-navigation"
              className="lg:hidden inline-flex items-center p-2 text-paper-text dark:text-paper-white focus:outline-none focus-visible:ring-2 focus-visible:ring-paper-text/40 transition-all duration-200"
            >
              <span className="sr-only">
                {navActive ? 'Close main menu' : 'Open main menu'}
              </span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                {navActive ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Panel: holds whatever the row could not. Scrolls if the viewport is
            too short (landscape phones). */}
        <div
          id="primary-navigation"
          className={`lg:hidden transition-[max-height] duration-300 ${
            navActive
              ? 'max-h-[70vh] overflow-y-auto'
              : 'max-h-0 overflow-hidden'
          }`}
          // max-height:0 only clips the panel — its links stay focusable and
          // in the accessibility tree without this.
          aria-hidden={!navActive}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...(navActive ? {} : (INERT as Record<string, string>))}
        >
          <nav
            aria-label="Mobile"
            className="mt-3 border-t border-paper-border dark:border-white/10 pt-3"
          >
            <ul className="flex flex-col gap-0.5">
              {MENU.map((menu) => (
                <Navitem
                  key={menu.title}
                  menu={menu.title}
                  link={menu.link}
                  description={menu.description}
                  active={isActive(menu.link)}
                  onClick={closeNav}
                  block
                />
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center xl:hidden">
                {socialLinks}
              </div>
              <div className="lg:hidden">{resumeButton}</div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
