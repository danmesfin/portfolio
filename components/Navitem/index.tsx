import React from 'react';
import Link from 'next/link';

function Navitem(Props: any) {
  return (
    <li
      className={`transform duration-200 delay-175 block font-hand text-2xl py-2 pr-4 pl-3 rounded-md  md:p-0 ${
        Props.active ? 'glow-red' : ''
      }`}
      aria-current="page"
    >
      <Link href={Props.link}>{Props.menu}</Link>
    </li>
  );
}

export default Navitem;
