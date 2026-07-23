import React, { MouseEventHandler } from 'react';
import Link from 'next/link';

interface NavitemProps {
  active: boolean;
  link: string;
  menu: string;
  description: string;
  onClick: MouseEventHandler<HTMLAnchorElement>;
  /** Full-width, left-aligned — used inside the mobile panel. */
  block?: boolean;
}

function Navitem({
  active,
  link,
  menu,
  description,
  onClick,
  block = false,
}: NavitemProps) {
  return (
    <li
      className={`font-display rounded-xl transition-colors duration-200 ${
        block ? 'w-full text-left' : 'text-center'
      } ${
        active
          ? 'text-accent-coral bg-paper-light dark:bg-gray-800'
          : 'text-paper-text dark:text-gray-300 hover:text-accent-coral dark:hover:text-accent-coral hover:bg-paper-light dark:hover:bg-gray-800'
      }`}
    >
      <Link
        onClick={onClick}
        href={link}
        title={description}
        aria-current={active ? 'page' : undefined}
        className={`block w-full whitespace-nowrap ${
          block ? 'px-4 py-3 text-lg' : 'px-2 py-2 xl:px-3'
        }`}
      >
        {menu}
      </Link>
    </li>
  );
}

export default Navitem;
