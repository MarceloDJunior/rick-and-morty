import type { NextPage } from 'next';
import Head from 'next/head';

import { ThemePrimaryColor } from '@/models/theme';
import { useThemeContext } from '@/contexts/theme-context';
import { Characters } from '@/views/characters';

const HomePage: NextPage = () => {
  const { theme } = useThemeContext();

  return (
    <>
      <Head>
        <meta name="theme-color" content={ThemePrimaryColor[theme]} />
      </Head>
      <Characters />
    </>
  );
};

export default HomePage;
