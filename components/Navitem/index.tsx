import React from 'react';
import { Link as ScrollLink } from 'react-scroll';

interface NavitemProps {
  active: boolean;
  link: string;
  menu: string;
  onClick: Function;
}

function Navitem({ active, link, menu, onClick }: NavitemProps) {
  return (
    <li
      className={`cursor-pointer transform duration-200 delay-175 block font-hand text-3xl py-2 pr-4 pl-3 rounded-md text-center text-primary  md:p-0 ${
        active ? '' : ''
      }`}
      aria-current="page"
    >
      <a href={`/#${link}`}>
        {/* <ScrollLink to={link} smooth duration={800} onClick={() => onClick()}> */}
        {menu}
        {/* </ScrollLink> */}
      </a>
    </li>
  );
}

export default Navitem;
