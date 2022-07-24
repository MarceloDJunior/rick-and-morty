import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { useThemeContext } from '@/contexts/theme-context';
import { Theme, ThemePrimaryColor } from '@/models/theme';
import { useOnClickOutside } from '@/hooks/use-on-click-outside';

import styles from './theme-switcher.module.scss';

export const ThemeSwitcher = () => {
  const { theme: selectedTheme, changeTheme } = useThemeContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isChangingTheme, setIsChangingTheme] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  useOnClickOutside(popupRef, close);

  const updateTheme = useCallback(
    (theme: Theme) => {
      document.body.classList.add('changing-theme');
      setTimeout(() => {
        setIsChangingTheme(true);
        changeTheme(theme);
        close();
      }, 400);
    },
    [close, changeTheme]
  );

  useEffect(() => {
    if (isChangingTheme) {
      setIsChangingTheme(false);
      document.body.classList.remove('changing-theme');
    }
  }, [isChangingTheme]);

  return (
    <div className={classNames(styles.container, isOpen ? styles.open : styles.closed)}>
      {isOpen ? (
        <div className={styles['theme-list']} ref={popupRef} onBlur={close}>
          <h4 className={styles.title}>Select a theme</h4>
          {Object.values(Theme).map(theme => (
            <button
              type="button"
              className={classNames(styles.item, { [styles.active]: theme === selectedTheme })}
              key={theme}
              onClick={() => updateTheme(theme)}
            >
              <div className={styles.theme}>{theme}</div>
              <div className={styles.color} style={{ backgroundColor: ThemePrimaryColor[theme] }} />
            </button>
          ))}
        </div>
      ) : (
        <button type="button" className={styles.switcher} onClick={() => setIsOpen(true)}>
          <div className={styles.theme}>{selectedTheme}</div>
          <div
            className={styles.color}
            style={{ backgroundColor: ThemePrimaryColor[selectedTheme] }}
          />
        </button>
      )}
    </div>
  );
};
