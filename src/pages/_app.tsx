import type { AppProps } from 'next/app';

import { ThemeProvider } from '@/contexts/theme-context';
import '@/styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
