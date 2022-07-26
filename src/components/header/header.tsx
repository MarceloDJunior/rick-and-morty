import { useEffect, useState } from 'react';
import classNames from 'classnames';

import Logo from '@/assets/logo.svg';
import { SearchInput } from '@/components/search-input';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { debounce, throttle } from '@/helpers/common';

import styles from './header.module.scss';

type HeaderProps = {
  onSearch: (value: string) => void;
};

const SCROLL_BREAKPOINT = 240;

export const Header = ({ onSearch }: HeaderProps) => {
  const [isFixed, setIsFixed] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setIsFixed(window.scrollY > SCROLL_BREAKPOINT);
    };

    const throttledScroll = throttle(onScroll);

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, []);

  const debounceSearch = debounce(onSearch);

  return (
    <header className={classNames(styles.container, { [styles.fixed]: isFixed })}>
      <div className={styles.background}></div>
      <div className={styles.header}>
        <div className={styles.content}>
          <div className={styles.logo}>
            <Logo />
          </div>
          <div className={styles.search}>
            <SearchInput onSearch={debounceSearch} />
          </div>
          <div className={styles.theme}>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};
