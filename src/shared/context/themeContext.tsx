'use client';

import { type ReactNode, useLayoutEffect, useState } from 'react';

import { CACHE_KEY, useStorage } from '@/shared';

import { ThemeContext } from './useTheme';

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { load, save } = useStorage(CACHE_KEY.theme);
  const [isDark, setIsDark] = useState(false);
  const [isThemeReady, setIsThemeReady] = useState(false);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newIsDark = !prev;
      const newTheme = newIsDark ? 'dark' : 'light';
      save(newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      return newIsDark;
    });
  };

  useLayoutEffect(() => {
    const storedTheme = load();
    if (storedTheme) {
      setIsDark(storedTheme === 'dark');
    } else {
      setIsDark(false);
    }
    setIsThemeReady(true);
  }, [load]);

  useLayoutEffect(() => {
    if (isThemeReady) {
      document.documentElement.setAttribute(
        'data-theme',
        isDark ? 'dark' : 'light'
      );
    }
  }, [isDark, isThemeReady]);

  if (!isThemeReady) {
    return null;
  }

  return (
    <ThemeContext value={{ isDark, toggleTheme }}>{children}</ThemeContext>
  );
};
