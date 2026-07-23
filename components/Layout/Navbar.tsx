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

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/danmesfin', Icon: SiGithub },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/danielmesfin',
    Icon: SiLinkedin,
  },
  {
    label: 'Upwork',
    href: 'https://www.upwork.com/freelancers/~01443f33bae62cb58e',
    Icon: SiUpwork,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/danmesfinn',
    Icon: SiInstagram,
  },
  { label: 'Email', href: 'mailto:danielmsfn@gmail.com', Icon: SiGmail },
  { label: 'WhatsApp', href: 'https://wa.me/251945640369', Icon: SiWhatsapp },
];

const socialLinkClass =
  'p-2 text-paper-text dark:text-gray-300 hover:text-accent-coral dark:hover:text-accent-coral hover:bg-paper-light dark:hover:bg-gray-800 rounded-full transition-all duration-200';

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

  const socialLinks = SOCIALS.map(({ label, href, Icon }) => (
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
  ));

  const resumeButton = (
    <a
      href="/downloads/Daniel_Mesfin_Resume.pdf"
      target="_blank"
      rel="noreferrer noopener"
      onClick={closeNav}
      className="block"
    >
      <div className="btn-primary">
        <div className="btn-primary-bg" />
        <div className="btn-primary-shadow" />
        <div className="btn-primary-content whitespace-nowrap text-sm xl:text-base">
          See Resume
        </div>
      </div>
    </a>
  );

  return (
    <header className="sticky top-0 z-[99] px-2 py-3 sm:px-4 lg:px-8">
      <div className="paper-card mx-auto max-w-[1600px] rounded-2xl bg-paper-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-3 py-2.5 sm:px-4 sm:py-3">
        {/* Single row: never wraps. Everything that cannot fit moves into the
            panel below at the breakpoint where it stops fitting. */}
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <Link
            href="/"
            aria-label="Daniel Mesfin — home"
            className="flex-shrink-0"
          >
            <p className="my-auto text-2xl sm:text-3xl font-bold font-display text-paper-text dark:text-white hover:text-accent-coral dark:hover:text-accent-coral transition-colors duration-200">
              DM
            </p>
          </Link>

          {/* Primary nav — inline from lg, in the panel below that. */}
          <nav aria-label="Main" className="hidden lg:block min-w-0">
            <ul className="flex items-center gap-0.5 xl:gap-3">
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
              className="lg:hidden inline-flex items-center p-2 text-paper-text dark:text-gray-300 rounded-xl hover:bg-paper-light dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-accent-coral/40 transition-all duration-200"
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
