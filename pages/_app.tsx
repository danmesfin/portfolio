/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import React from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { ParallaxProvider } from 'react-scroll-parallax';
import { Toaster } from 'react-hot-toast';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ParallaxProvider>
      <ThemeProvider enableSystem attribute="class">
        <Layout>
          <Component {...pageProps} />
          <Toaster position="bottom-right" />
          {/* Hidden SVG definitions for global CSS filters */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
            width="0"
            height="0"
            style={{
              position: 'absolute',
              width: 0,
              height: 0,
              overflow: 'hidden',
            }}
          >
            <defs>
              <filter id="grain">
                <feTurbulence
                  type="turbulence"
                  baseFrequency="0.69"
                  numOctaves="2"
                />
              </filter>
            </defs>
          </svg>
        </Layout>
      </ThemeProvider>
    </ParallaxProvider>
  );
}

export default MyApp;
