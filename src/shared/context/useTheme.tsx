import { createContext, useContext } from 'react';

import { ERROR_MESSAGES } from '../constants';

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: VoidFunction;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(ERROR_MESSAGES.NO_THEME_PROVIDER);
  }
  return context;
};
