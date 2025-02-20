import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route } from 'react-router';
import { renderWithProviders } from 'tests';

import { HomePage } from '@/components';

import { AppProvidersAndRoutes } from '../helpers';
import { ThemeProvider } from './themeContext';

describe('themeContext', () => {
  const mockLoad = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should set document attribute based on initial theme', () => {
    mockLoad.mockReturnValue('dark');

    render(<ThemeProvider>{null}</ThemeProvider>);

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('should toggle theme and set document attribute', async () => {
    mockLoad.mockReturnValue('light');
    const user = userEvent.setup();

    renderWithProviders(
      <AppProvidersAndRoutes>
        <Route path="/" element={<HomePage />}></Route>
      </AppProvidersAndRoutes>
    );

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    const button = screen.getByTestId('toggle-theme');

    expect(button).toBeInTheDocument();

    await user.click(button);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

    await user.click(button);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });
});
