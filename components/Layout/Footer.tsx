import React from 'react';
import { SiGithub, SiLinkedin, SiFacebook, SiInstagram } from 'react-icons/si';
import Link from 'next/link';

function Footer() {
  return (
    <footer className="py-20 flex flex-col justify-center">
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
      <div className="mt-4 text-center text-gray-500 dark:text-gray-300 text-sm">
        &copy; {new Date().getFullYear()} Daniel Mesfin. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
