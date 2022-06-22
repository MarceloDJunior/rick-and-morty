import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';

import Logo from '@/assets/logo.svg';
import { SearchInput } from '@/components/search-input';
import { useThemeContext } from '@/contexts/theme-context';
import { Theme } from '@/models/theme';
import { ThemeSwitcher } from '@/components/theme-switcher';

import styles from './header.module.scss';

type HeaderProps = {
  onSearch: (value: string) => void;
};

const MAX_MENU_HEIGHT = 380;
const MIN_MENU_HEIGHT = 100;

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

export const Header = ({ onSearch }: HeaderProps) => {
  const [height, setHeight] = useState(MAX_MENU_HEIGHT);
  const { theme } = useThemeContext();

  const backgroundOpacity = useMemo(() => {
    if (height === MAX_MENU_HEIGHT) {
      return 0;
    } else if (height === MIN_MENU_HEIGHT) {
      return 1;
    } else {
      return 0.5;
    }
  }, [height]);

  const backgroundColor = useMemo(() => {
    const rgbColors = theme === Theme.DARK ? '17, 17, 17' : '12, 132, 152';
    return `rgba(${rgbColors}, ${backgroundOpacity})`;
  }, [backgroundOpacity, theme]);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 100) {
        setHeight(MIN_MENU_HEIGHT);
      } else if (window.scrollY < 80) {
        setHeight(MAX_MENU_HEIGHT);
      } else {
        const scrollSize = MAX_MENU_HEIGHT - window.scrollY;
        const newHeight = clamp(scrollSize, MIN_MENU_HEIGHT, MAX_MENU_HEIGHT);
        setHeight(newHeight);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <div className={styles.space} style={{ height }}></div>
      <div className={styles.background} style={{ height }}></div>
      <header className={styles.header} style={{ height, backgroundColor }}>
        <div
          className={classNames(styles.content, { [styles.scrolling]: height < MAX_MENU_HEIGHT })}
        >
          <div className={styles.logo}>
            <Logo />
          </div>
          <div className={styles.search}>
            <SearchInput onSearch={onSearch} />
          </div>
          <div className={styles.theme}>
            <ThemeSwitcher />
          </div>
        </div>
      </header>
    </>
  );
};
