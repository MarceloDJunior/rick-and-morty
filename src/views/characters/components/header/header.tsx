import Logo from '@/assets/logo.svg';
import { SearchInput } from '@/components/search-input';

import styles from './header.module.scss';

type HeaderProps = {
  onSearch: (value: string) => void;
};

export const Header = ({ onSearch }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <SearchInput onSearch={onSearch} />
      </div>
    </header>
  );
};
