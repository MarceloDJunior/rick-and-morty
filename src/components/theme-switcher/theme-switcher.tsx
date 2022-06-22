import { useCallback, useRef, useState } from 'react';
import classNames from 'classnames';

import { useThemeContext } from '@/contexts/theme-context';
import { Theme, ThemePrimaryColor } from '@/models/theme';
import { useOnClickOutside } from '@/hooks/use-on-click-outside';

import styles from './theme-switcher.module.scss';

export const ThemeSwitcher = () => {
  const { theme, changeTheme } = useThemeContext();
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  useOnClickOutside(popupRef, close);

  const updateTheme = useCallback(
    (theme: Theme) => {
      changeTheme(theme);
      close();
    },
    [close, changeTheme]
  );

  return (
    <div className={styles.container}>
      <button type="button" className={styles.switcher} onClick={() => setIsOpen(true)}>
        <div className={styles.theme}>{theme}</div>
        <div className={styles.color} style={{ backgroundColor: ThemePrimaryColor[theme] }}></div>
      </button>
      {isOpen && (
        <div className={styles['theme-popup']} ref={popupRef} onBlur={close}>
          <h3>Select a theme</h3>
          {Object.values(Theme).map(t => (
            <button
              type="button"
              className={classNames(styles.item, { [styles.active]: t === theme })}
              key="color"
              onClick={() => updateTheme(t)}
            >
              <div className={styles.theme}>{t}</div>
              <div className={styles.color} style={{ backgroundColor: ThemePrimaryColor[t] }}></div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
