import React from 'react';
import Link from 'next/link';

interface NavitemProps {
  active: boolean;
  link: string;
  menu: string;
}

function Navitem({ active, link, menu }: NavitemProps) {
  return (
    <li
      className={`transform duration-200 delay-175 block font-hand text-3xl py-2 pr-4 pl-3 rounded-md text-center text-primary  md:p-0 ${
        active ? '' : ''
      }`}
      aria-current="page"
    >
      <Link href={link}>{menu}</Link>
    </li>
  );
}

export default Navitem;
