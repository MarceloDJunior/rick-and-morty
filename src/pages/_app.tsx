import type { AppProps } from 'next/app';
import Head from 'next/head';

import { ThemeProvider } from '@/contexts/theme-context';

import '@/styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Rick and Morty app</title>
        <meta name="description" content="App that consumes the Rick and Morty API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
