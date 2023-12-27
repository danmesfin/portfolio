import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import CustomCursor from '../CustomCursor/index';

// eslint-disable-next-line react/prop-types
function Layout({ children }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  return (
    <main className=" bg-base dark:bg-black snap-y h-screen overflow-y-scroll scroll-smooth">
      {/* <CustomCursor mousePosition={mousePosition} /> */}

      <Navbar />
      {children}
      <Footer />
    </main>
  );
}

export default Layout;
