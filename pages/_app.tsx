/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import React from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { ParallaxProvider } from 'react-scroll-parallax';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ParallaxProvider>
      <ThemeProvider enableSystem attribute="class">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </ParallaxProvider>
  );
}

export default MyApp;
