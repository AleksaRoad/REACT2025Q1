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
    expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Toggle theme/i })
    ).toBeInTheDocument();
  });

  it('should display ErrorDisplay when apiErrorMessage is provided', async () => {
    const apiErrorMessage = 'API Error message';

    renderWithProviders(
      <AppProvidersAndRoutes>
        <Route
          path="/"
          element={
            <Header apiErrorMessage={apiErrorMessage} onSearch={mockOnSearch} />
          }
        />
      </AppProvidersAndRoutes>
    );

    const errorDisplay = await screen.findByText(ERROR_MESSAGES.OOOPS);

    expect(errorDisplay).toBeInTheDocument();
    expect(screen.getByText(apiErrorMessage)).toBeInTheDocument();
  });
});
