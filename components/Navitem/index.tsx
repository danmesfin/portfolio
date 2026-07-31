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
    <li className={block ? 'w-full' : ''}>
      <Link
        onClick={onClick}
        href={link}
        title={description}
        aria-current={active ? 'page' : undefined}
        className={`block font-mono text-sm whitespace-nowrap transition-colors duration-150 ${
          block ? 'w-full px-1 py-3 text-base' : 'px-2 py-1.5'
        } ${
          active
            ? 'text-paper-text dark:text-paper-white underline decoration-1 underline-offset-[6px]'
            : 'text-paper-muted hover:text-paper-text dark:text-gray-400 dark:hover:text-paper-white'
        }`}
      >
        {menu}
      </Link>
    </li>
  );
}

export default Navitem;
