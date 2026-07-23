import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Navbar from './Navbar';
import Footer from './Footer';

// eslint-disable-next-line react/prop-types
function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-base dark:bg-black text-paper-text dark:text-gray-200">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-xl focus:bg-paper-white focus:px-4 focus:py-2 focus:text-paper-text focus:shadow-paper"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <Analytics />
      <SpeedInsights />
    </div>
  );
}

export default Layout;
