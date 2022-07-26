import classNames from 'classnames';
import { useEffect, useState } from 'react';

import SearchSvg from '@/assets/search.svg';
import { usePrevious } from '@/hooks/use-previous';

import styles from './search-input.module.scss';

type SearchInputProps = {
  className?: string;
  onSearch?: (value: string) => void;
};

export const SearchInput = ({ className, onSearch }: SearchInputProps) => {
  const [value, setValue] = useState('');
  const prevValue: string | undefined = usePrevious(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const valueChanged = String(prevValue).trim() !== value.trim();

  useEffect(() => {
    if (valueChanged && onSearch) {
      onSearch(value);
    }
  }, [onSearch, value, valueChanged]);

  return (
    <div className={styles.container}>
      <input
        type="text"
        className={classNames(className, styles.input)}
        placeholder="Start typing to search..."
        onChange={handleInputChange}
      />
      <div className={styles.icon}>
        <SearchSvg />
      </div>
    </div>
  );
};
