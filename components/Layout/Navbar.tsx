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
  'mx-1 sm:mx-2 p-2 text-paper-text dark:text-gray-300 hover:text-accent-coral dark:hover:text-accent-coral hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200';

function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [navActive, setNavActive] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close the mobile menu on Escape for keyboard users.
  useEffect(() => {
    if (!navActive) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setNavActive(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [navActive]);

  const isActive = (link: string) => {
    const path = router.asPath;
    if (link.startsWith('/#')) {
      return path === link || (link === '/#banner' && path === '/');
    }
    return path === link || path.startsWith(`${link}/`);
  };

  const closeNav = () => setNavActive(false);

  return (
    <header className="sticky top-0 z-[99] px-2 py-3 md:px-10">
      <div className="bg-paper-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-2xl mx-2 md:mx-4 px-4 py-3 border border-paper-border dark:border-gray-700">
        <div className="flex flex-wrap justify-between items-center mx-auto">
          <Link href="/" aria-label="Daniel Mesfin — home">
            <div className="cursor-pointer flex justify-center text-xl font-display whitespace-nowrap text-paper-text dark:text-white hover:text-accent-coral dark:hover:text-accent-coral transition-colors duration-200">
              <p className="my-auto text-3xl font-bold">DM</p>
            </div>
          </Link>

          <div className="flex mx-auto">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                className={socialLinkClass}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
              >
                <Icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>

          <div className="flex md:hidden">
            <button
              onClick={() => setNavActive(!navActive)}
              type="button"
              aria-expanded={navActive}
              aria-controls="primary-navigation"
              className="inline-flex items-center p-2 ml-3 text-sm text-paper-muted dark:text-gray-300 rounded-xl hover:bg-paper-light dark:hover:bg-gray-800 hover:shadow-paper-hover focus:outline-none focus:ring-2 focus:ring-accent-coral/40 transition-all duration-200"
            >
              <span className="sr-only">
                {navActive ? 'Close main menu' : 'Open main menu'}
              </span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <nav
            id="primary-navigation"
            aria-label="Main"
            className={`w-full bg-paper-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-paper dark:shadow-gray-800/20 rounded-2xl border border-paper-border dark:border-gray-700 md:block md:w-auto md:bg-transparent md:dark:bg-transparent md:shadow-none md:border-0 ${
              navActive ? 'mt-4' : 'hidden'
            }`}
          >
            <ul className="flex flex-col items-center py-3 px-4 md:flex-row md:space-x-4 lg:space-x-8 md:py-0 md:px-0 md:font-medium">
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

              <li className="flex justify-center items-center mx-2 my-1">
                {mounted && <ThemeChanger />}
              </li>
              <li>
                <a
                  href="/downloads/Daniel_Mesfin.pdf"
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={closeNav}
                  className="block"
                >
                  <div className="btn-primary">
                    <div className="btn-primary-bg" />
                    <div className="btn-primary-shadow" />
                    <div className="btn-primary-content">See Resume</div>
                  </div>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
