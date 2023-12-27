import React, { MouseEventHandler } from 'react';
import Link from 'next/link';

interface NavitemProps {
  active: boolean;
  link: string;
  menu: string;
  onClick: MouseEventHandler<HTMLAnchorElement>;
}

function Navitem({ active, link, menu, onClick }: NavitemProps) {
  return (
    <li
      className={`cursor-pointer transform duration-200 delay-175 block font-display py-2 pr-4 pl-3 rounded-md text-center text-primary  md:p-0 ${
        active ? '' : ''
      }`}
      aria-current="page"
    >
      <Link onClick={onClick} href={link}>
        {menu}
      </Link>
    </li>
  );
}

export default Navitem;
