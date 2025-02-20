import { screen } from '@testing-library/react';
import { Route } from 'react-router';
import { renderWithProviders } from 'tests';
import { vi } from 'vitest';

import { AppProvidersAndRoutes, ERROR_MESSAGES } from '@/shared';

import { Header } from './Header';

describe('Header component', () => {
  const mockOnSearch = vi.fn();

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render the Header component', () => {
    renderWithProviders(
      <AppProvidersAndRoutes>
        <Route
          path="/"
          element={<Header apiErrorMessage={null} onSearch={mockOnSearch} />}
        />
      </AppProvidersAndRoutes>
    );

    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByTestId('toggle-theme')).toBeInTheDocument();
  });

  it('should display ErrorDisplay when apiErrorMessage is provided', async () => {
    renderWithProviders(
      <AppProvidersAndRoutes>
        <Route
          path="/"
          element={
            <Header
              apiErrorMessage={ERROR_MESSAGES.OOOPS}
              onSearch={mockOnSearch}
            />
          }
        />
      </AppProvidersAndRoutes>
    );

    const errorDisplays = await screen.findAllByText(ERROR_MESSAGES.OOOPS);

    expect(errorDisplays.length).toBeGreaterThan(0);
  });
});
