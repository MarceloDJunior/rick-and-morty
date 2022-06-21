import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { Theme } from '@/models/theme';

const THEME_KEY = 'theme';

type ThemeContextType = {
  theme: Theme;
  changeTheme: (theme: Theme) => void;
};

type ThemeProviderProps = {
  children: React.ReactNode;
};

const initialState: ThemeContextType = {
  theme: Theme.DEFAULT,
  changeTheme: () => {},
};

const ThemeContext = createContext(initialState);

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(Theme.DEFAULT);

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      setTheme(savedTheme as Theme);
    }
  }, [theme]);

  const changeTheme = useCallback((theme: Theme) => {
    setTheme(theme);
    localStorage.setItem(THEME_KEY, theme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <div className={`theme theme--${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
};
