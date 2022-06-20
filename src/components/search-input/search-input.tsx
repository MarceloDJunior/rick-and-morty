import classNames from 'classnames';
import { FormEvent, useState } from 'react';

import SearchSvg from '@/assets/search.svg';

import styles from './search-input.module.scss';

type SearchInputProps = {
  className?: string;
  onSearch?: (value: string) => void;
};

export const SearchInput = ({ className, onSearch }: SearchInputProps) => {
  const [value, setValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <input
        type="text"
        className={classNames(className, styles.input)}
        placeholder="Search for a character"
        onChange={handleInputChange}
      />
      <button className={styles.button}>
        <SearchSvg />
      </button>
    </form>
  );
};
