import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navitem from '../Navitem';
import ThemeChanger from '../Button';

function Navbar() {
  const [mounted, setMounted] = useState(false);

  const [activeIdx, setActiveIdx] = useState(0);
  const [navActive, setNavActive] = useState(false);
  const Menu = [
    { title: 'Home', link: '/#banner' },
    { title: 'About', link: '#about' },
    { title: 'Projects', link: '#projects' },
    { title: 'Contact', link: '#contact' },
    { title: 'Blogs', link: '/blogs' },
    { title: 'Resume', link: '/resume' },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemechanger = () => {
    if (!mounted) return null;
    return <ThemeChanger />;
  };

  return (
    <header className="top-0 z-[99] px-2 py-2 md:px-10">
      <div className="flex flex-wrap justify-between items-center mx-auto">
        <Link href="/" className="cursor-pointer">
          <a>
            <div className="flex justify-center text-xl font-display whitespace-nowrap text-primary">
              <Image
                alt="logo"
                src="/Icon/favicon.ico"
                width={32}
                height={32}
              />
              <p className="my-auto">
                D<span className="text-primary">M</span>
              </p>
            </div>
          </a>
        </Link>

        <button
          data-collapse-toggle="#navbar-default"
          onClick={() => {
            setNavActive(!navActive);
          }}
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded="false"
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
        <div
          className={`w-full bg-primary bg-opacity-50  
          rounded-lg md:block md:w-auto dark:bg-opacity-0 ${
            navActive ? '' : 'hidden'
          }`}
          id="navbar-default"
        >
          <ul
            className="flex flex-col py-2 px-4 mt-4 rounded-lg border border-primary 
          md:flex-row md:space-x-8 md:mt-0  md:font-medium md:border-0"
          >
            {Menu.map((menu, idx) => (
              <div key={menu.title}>
                <Navitem
                  onClick={() => {
                    setActiveIdx(idx);
                    setNavActive(false);
                  }}
                  menu={menu.title}
                  link={menu.link}
                  active={activeIdx === idx}
                />
              </div>
            ))}
          </ul>
        </div>
        <div className="flex">
          <div className="flex justify-center items-center w-7 h-7 mx-2 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-full">
            {renderThemechanger()}
          </div>
          <a href="#contact">
            <div
              className="px-2 py-1 rounded-lg border border-primary
             hover:bg-gray-200 dark:text-primary dark:hover:bg-gray-600"
            >
              Let&apos;s talk
            </div>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
