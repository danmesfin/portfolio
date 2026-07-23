import React, { MouseEventHandler } from 'react';
import Link from 'next/link';

interface NavitemProps {
  active: boolean;
  link: string;
  menu: string;
  description: string;
  onClick: MouseEventHandler<HTMLAnchorElement>;
}

function Navitem({ active, link, menu, description, onClick }: NavitemProps) {
  return (
    <li
      className={`cursor-pointer transform duration-200 block font-display rounded-xl text-center transition-all ${
        active
          ? 'text-accent-coral bg-paper-light dark:bg-gray-800 shadow-paper'
          : 'text-paper-text dark:text-gray-300 hover:text-accent-coral dark:hover:text-accent-coral hover:bg-paper-light dark:hover:bg-gray-800'
      }`}
    >
      <Link
        onClick={onClick}
        href={link}
        title={description}
        aria-current={active ? 'page' : undefined}
        className="block w-full h-full py-2 px-3 md:p-2"
      >
        {menu}
      </Link>
    </li>
  );
}

export default Navitem;
