import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navitem from '../Navitem';
import ThemeChanger from '../Button';
import { SiFacebook, SiGithub, SiInstagram, SiLinkedin } from 'react-icons/si';

function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [activeIdx] = useState(0);
  const [navActive, setNavActive] = useState(false);

  const Menu = [
    { title: 'Home', link: '/#banner', description: 'Go to the Home section' },
    { title: 'About', link: '/#about', description: 'Learn about me' },
    {
      title: 'Projects',
      link: '/#projects',
      description: 'Explore my projects',
    },
    {
      title: 'Contact',
      link: '/#contact',
      description: 'Get in touch with me',
    },
    { title: 'Blogs', link: '/blogs', description: 'Read my blog posts' },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemechanger = () => {
    if (!mounted) return null;
    return <ThemeChanger />;
  };

  const closeNav = () => {
    setNavActive(false);
  };

  return (
    <header className="top-0 z-[99] px-2 py-3 md:px-10">
      <div className="bg-paper-white/95 backdrop-blur-sm rounded-2xl mx-2 md:mx-4 px-4 py-3">
        <div className="flex flex-wrap justify-between items-center mx-auto">
        <Link href="/">
          <div className="cursor-pointer flex justify-center text-xl font-display whitespace-nowrap text-paper-text hover:text-accent-coral transition-colors duration-200">
            <p className="my-auto text-3xl font-bold">
              D<span className="">M</span>
            </p>
          </div>
        </Link>
              <div className="flex mx-auto">
        <Link
          className="mx-3 hover:bg-gray-400 dark:hover:bg-gray-500 rounded-full"
          href="http://github.com/danmesfin"
          target="_blank"
          rel="noreferrer"
        >
          <SiGithub className="h-6 w-6" />
        </Link>
        <Link
          className="mx-3 hover:bg-gray-400 dark:hover:bg-gray-500 rounded-full"
          href="http://linkedin.com/in/danielmesfin"
          target="_blank"
          rel="noreferrer"
        >
          <SiLinkedin className="h-6 w-6" />
        </Link>
        <Link
          className="mx-3 hover:bg-gray-400 dark:hover:bg-gray-500 rounded-full"
          href="http://instagram.com/danmesfinn"
          target="_blank"
          rel="noreferrer"
        >
          <SiInstagram className="h-6 w-6" />
        </Link>
        <Link
          className="mx-3 hover:bg-gray-400 dark:hover:bg-gray-500 rounded-full"
          href="http://facebook.com/"
          target="_blank"
          rel="noreferrer"
        >
          <SiFacebook className="h-6 w-6" />
        </Link>
      </div>

        <div className="flex md:hidden">
          <button
            onClick={() => setNavActive(!navActive)}
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-paper-muted rounded-xl hover:bg-paper-light hover:shadow-paper-hover focus:outline-none focus:ring-2 focus:ring-accent-coral/20 transition-all duration-200"
          >
            <span className="sr-only">Open main menu</span>
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

        <div
          className={`w-full bg-paper-white/95 backdrop-blur-sm shadow-paper rounded-2xl border border-paper-border md:block md:w-auto md:bg-transparent md:shadow-none md:border-0 ${
            navActive ? 'mt-4' : 'hidden'
          }`}
        >
          <ul className="flex flex-col items-center py-3 px-4 md:flex-row md:space-x-8 md:py-0 md:px-0 md:font-medium">
            {Menu.map((menu, idx) => (
              <Navitem
                key={menu.title}
                menu={menu.title}
                link={menu.link}
                description={menu.description}
                active={activeIdx === idx}
                onClick={closeNav}
              />
            ))}

            <div
              className="flex justify-center items-center w-8 h-8 mx-2 my-1 hover:bg-paper-light hover:shadow-paper rounded-full transition-all duration-200"
            >
              {renderThemechanger()}
            </div>
            <a
              href="/downloads/Daniel_Mesfin.pdf"
              target="_blank"
              onClick={closeNav}
            >
              <div className="btn-primary">
                <div className="btn-primary-bg"></div>
                <div className="btn-primary-shadow"></div>
                <div className="btn-primary-content">
                  See Resume
                </div>
              </div>
            </a>
          </ul>
        </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
