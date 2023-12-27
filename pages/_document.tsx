import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="description" content="Daniel Mesfin" />
        <meta
          name="description"
          content="Daniel is a fullstack web and mobile developer. github.com/danmesfin"
        />
        <meta name="description" content="Fullstack developer" />
        <link rel="icon" href="/Icon/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&amp;display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://use.typekit.net/vja6aok.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
