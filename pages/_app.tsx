/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
// eslint-disable-next-line camelcase -- next/font exports Google's exact family names
import { Fraunces, IBM_Plex_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import Layout from '../components/Layout';

// Editorial serif for display headings. Self-hosted by next/font at build
// time, so no render-blocking request and no layout shift.
const display = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  axes: ['opsz', 'SOFT', 'WONK'],
});

// Monospace for body copy, labels and UI — the workhorse face.
const mono = IBM_Plex_Mono({
  weight: ['400', '500', '600'],
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
          --font-sans: ${mono.style.fontFamily};
          --font-display: ${display.style.fontFamily};
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
