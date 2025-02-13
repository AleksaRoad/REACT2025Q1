import { type ReactNode, useEffect, useState } from 'react';

import { CACHE_KEY, useStorage } from '@/shared';

import { ThemeContext } from './useTheme';

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { load, save } = useStorage(CACHE_KEY.theme);
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newIsDark = !prev;
      const newTheme = newIsDark ? 'dark' : 'light';
      save(newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      return newIsDark;
    });
  };

  useEffect(() => {
    const storedTheme = load();
    if (storedTheme) {
      setIsDark(storedTheme === 'dark');
    }
  }, [load]);

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      isDark ? 'dark' : 'light'
    );
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
