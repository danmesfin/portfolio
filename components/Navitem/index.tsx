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
      className={`cursor-pointer transform duration-200 block font-display py-2 px-3 rounded-xl text-center text-paper-text hover:text-accent-coral hover:bg-paper-light transition-all md:p-2 ${
        active ? 'text-accent-coral bg-paper-light shadow-paper' : ''
      }`}
      aria-current="page"
    >
      <Link onClick={onClick} href={link} title={description} className="block w-full h-full">
        {menu}
      </Link>
    </li>
  );
}

export default Navitem;
