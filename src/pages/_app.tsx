import type { AppProps } from 'next/app';
import Head from 'next/head';

import { AlertProvider } from '@/contexts/alert-context';
import { ModalProvider } from '@/contexts/modal-context';
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
        <AlertProvider>
          <ModalProvider>
            <Component {...pageProps} />
          </ModalProvider>
        </AlertProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
