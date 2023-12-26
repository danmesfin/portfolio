import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navitem from '../Navitem';
import ThemeChanger from '../Button';

function Navbar() {
  const [mounted, setMounted] = useState(false);

  const [activeIdx, setActiveIdx] = useState(0);
  const [navActive, setNavActive] = useState(false);
  const Menu = [
    { title: 'Home', link: 'banner' },
    { title: 'About', link: 'about' },
    { title: 'Projects', link: 'projects' },
    { title: 'Contact', link: 'contact' },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemechanger = () => {
    if (!mounted) return null;
    return <ThemeChanger />;
  };

  return (
    <header className="sticky  top-0 z-[99] px-2 py-2 md:px-10">
      <div className="flex flex-wrap justify-between items-center mx-auto">
        <Link href="/">
          <div className="cursor-pointer flex justify-center text-xl font-display whitespace-nowrap text-primary">
            <p className="my-auto text-3xl">
              D<span className="text-primary">M</span>
            </p>
          </div>
        </Link>

        <div className="flex md:hidden">
          <button
            onClick={() => setNavActive(!navActive)}
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
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
          className={`w-full dark:bg-base bg-primary bg-opacity-50 rounded-lg md:block md:w-auto dark:bg-opacity-100 ${
            navActive ? '' : 'hidden'
          }`}
        >
          <ul
            className=" flex flex-col items-center py-2 px-4 mt-4 rounded-lg border border-primary md:flex-row md:space-x-8 
          md:mt-0 md:font-medium md:border-0"
          >
            {Menu.map((menu, idx) => (
              <Navitem
                onClick={() => {
                  setActiveIdx(idx);
                  setNavActive(false);
                }}
                menu={menu.title}
                link={menu.link}
                active={activeIdx === idx}
              />
            ))}

            <li
              className={`cursor-pointer transform duration-200 delay-175 
              block font-display  py-2 pr-4 pl-3 rounded-md text-center text-primary  md:p-0 `}
              aria-current="page"
            >
              {
                // eslint-disable-next-line @next/next/no-html-link-for-pages
                <a href="/blogs">Blogs</a>
              }
            </li>
            <div
              className="flex justify-center items-center w-7 h-7 mx-2 my-1 hover:bg-gray-200
             dark:hover:bg-gray-500 rounded-full"
            >
              {renderThemechanger()}
            </div>
            <a href="/downloads/Daniel_Mesfin.pdf" target="_blank">
              <div
                className="px-2 py-1 my-1 rounded-lg border border-primary hover:bg-gray-200
               dark:text-primary dark:hover:bg-gray-600"
              >
                See Resume
              </div>
            </a>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
