import { renderHook } from '@testing-library/react';

import { ERROR_MESSAGES } from '../constants';
import { ThemeContext, useTheme } from './useTheme';

describe('useTheme', () => {
  it('should return theme context when used inside ThemeProvider', () => {
    const mockContextValue = { isDark: true, toggleTheme: vi.fn() };

    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => (
        <ThemeContext value={mockContextValue}>{children}</ThemeContext>
      ),
    });

    expect(result.current).toBe(mockContextValue);
  });

  it('should throw error when used outside ThemeProvider', () => {
    expect(() => renderHook(() => useTheme())).toThrow(
      new Error(ERROR_MESSAGES.NO_THEME_PROVIDER)
    );
  });
});
