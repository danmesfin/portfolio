/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
// eslint-disable-next-line camelcase -- next/font exports Google's exact family names
import { Nanum_Pen_Script, Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import Layout from '../components/Layout';

// Self-hosted by next/font at build time: no render-blocking request to
// Google, and no layout shift while the face loads.
const handwriting = Nanum_Pen_Script({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  // No font metrics are published for this face, so next/font cannot build a
  // size-adjusted fallback. Opting out keeps the build free of warnings.
  adjustFontFallback: false,
});

const body = Inter({
  subsets: ['latin'],
  display: 'swap',
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider enableSystem attribute="class">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <style jsx global>{`
        :root {
          --font-sans: ${body.style.fontFamily};
          --font-hand: ${handwriting.style.fontFamily};
        }
      `}</style>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Toaster position="bottom-right" />
    </ThemeProvider>
  );
}

export default MyApp;
