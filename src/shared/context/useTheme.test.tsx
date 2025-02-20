import { renderHook } from '@testing-library/react';

import { ERROR_MESSAGES } from '../constants';
import { ThemeContext, useTheme } from './useTheme';

describe('useTheme', () => {
  it('should return theme context when used inside ThemeProvider', () => {
    const mockContextValue = { isDark: true, toggleTheme: vi.fn() };

    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => (
        <ThemeContext.Provider value={mockContextValue}>
          {children}
        </ThemeContext.Provider>
      ),
    });

    expect(result.current).toBe(mockContextValue);
    expect(result.current.isDark).toBe(true);
    expect(typeof result.current.toggleTheme).toBe('function');
  });

  it('should throw error when used outside ThemeProvider', () => {
    expect(() => renderHook(() => useTheme())).toThrow(
      new Error(ERROR_MESSAGES.NO_THEME_PROVIDER)
    );
  });
});
