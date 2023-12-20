import React from 'react';
import { SiGithub, SiLinkedin, SiFacebook, SiInstagram } from 'react-icons/si';

function Footer() {
  return (
    <footer className="p-10 flex flex-col justify-center mt-2 border-t bg-base">
      <div className="flex mx-auto">
        <a
          className="mx-3 hover:bg-gray-400 dark:hover:bg-gray-500 rounded-full"
          href="http://github.com/danmesfin"
          target="_blank"
          rel="noreferrer"
        >
          <SiGithub className="h-6 w-6" />
        </a>
        <a
          className="mx-3 hover:bg-gray-400 dark:hover:bg-gray-500 rounded-full"
          href="http://linkedin.com/in/danielmesfin"
          target="_blank"
          rel="noreferrer"
        >
          <SiLinkedin className="h-6 w-6" />
        </a>
        <a
          className="mx-3 hover:bg-gray-400 dark:hover:bg-gray-500 rounded-full"
          href="http://instagram.com/danmesfinn"
          target="_blank"
          rel="noreferrer"
        >
          <SiInstagram className="h-6 w-6" />
        </a>
        <a
          className="mx-3 hover:bg-gray-400 dark:hover:bg-gray-500 rounded-full"
          href="http://facebook.com/"
          target="_blank"
          rel="noreferrer"
        >
          <SiFacebook className="h-6 w-6" />
        </a>
      </div>
      <div className="mt-4 text-center text-gray-500 dark:text-gray-300 text-sm">
        &copy; {new Date().getFullYear()} Daniel Mesfin. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
