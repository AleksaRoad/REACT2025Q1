import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route } from 'react-router';
import { renderWithProviders } from 'tests';
import { vi } from 'vitest';

import { AppProvidersAndRoutes, CACHE_KEY } from '@/shared';
import { clearFavorites, store } from '@/store';

import { SelectionActions } from './SelectionActions';

describe('SelectionActions', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(store, 'dispatch');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should clear favorites and update local storage on button click', async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <AppProvidersAndRoutes withStore>
        <Route path="/" element={<SelectionActions />} />
      </AppProvidersAndRoutes>
    );

    expect(localStorage.getItem(CACHE_KEY.favorites)).toBeNull();

    const button = screen.getByText(/Unselect all/i);
    await user.click(button);

    expect(store.dispatch).toHaveBeenCalledWith(clearFavorites());
    expect(localStorage.getItem(CACHE_KEY.favorites)).toBe(
      JSON.stringify('[]')
    );
  });
});
