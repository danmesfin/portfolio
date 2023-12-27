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
    <main
      lang="eng"
      className=" bg-base dark:bg-black snap-y h-screen overflow-y-scroll scroll-smooth"
    >
      <Head>
        <title>Daniel Mesfin</title>
        <meta name="description" content="Daniel Mesfin" />
        <meta name="description" content="danmesfin" />
        <meta name="description" content="Fullstack developer" />
        <link rel="icon" href="/Icon/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&amp;display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://use.typekit.net/vja6aok.css" />
      </Head>
      {/* <CustomCursor mousePosition={mousePosition} /> */}

      <Navbar />
      {children}
      <Footer />
    </main>
  );
}

export default Layout;
