import { type ReactNode, useLayoutEffect, useState } from 'react';

import { CACHE_KEY, useStorage } from '@/shared';

import { ThemeContext } from './useTheme';

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { load, save } = useStorage(CACHE_KEY.theme);
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark((previous) => {
      const newIsDark = !previous;
      const newTheme = newIsDark ? 'dark' : 'light';
      save(newTheme);
      return newIsDark;
    });
  };

  useLayoutEffect(() => {
    const storedTheme = load();
    if (storedTheme) {
      setIsDark(storedTheme === 'dark');
    }
  }, [load]);

  useLayoutEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
    }
  }, [isDark]);

  return (
    <ThemeContext value={{ isDark, toggleTheme }}>{children}</ThemeContext>
  );
};
