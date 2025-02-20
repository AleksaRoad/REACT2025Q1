import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, Route, RouterProvider } from 'react-router';
import { renderWithProviders, MOCK_CHARACTERS_DATA } from 'tests';

import {
  CharacterInfoSidebar,
  CharacterPage,
  PaginationControl,
} from '@/components';
import { AppProvidersAndRoutes, ThemeProvider } from '@/shared';

import { HomePage } from './HomePage';

describe('HomePage', () => {
  describe('CharacterCard', () => {
    afterEach(() => {
      vi.clearAllMocks();
    });

    it('should trigger additional API call to fetch detailed information when user clicks on the Card', async () => {
      const user = userEvent.setup();

      renderWithProviders(
        <AppProvidersAndRoutes>
          <Route path="/" element={<HomePage />}>
            <Route path="/details/:id" element={<CharacterPage />} />
          </Route>
        </AppProvidersAndRoutes>
      );

      const firstCard = await screen.findByRole('link', {
        name: /Beth Smith/i,
      });

      expect(firstCard).toBeInTheDocument();

      await user.click(firstCard);

      await waitFor(() => {
        expect(screen.getByText(/Location/i)).toBeInTheDocument();
        const elements = screen.getAllByText(/Beth Smith/i);
        expect(elements).toHaveLength(2);
      });
    });

    describe('CharacterInfoSidebar', () => {
      afterEach(() => {
        vi.clearAllMocks();
      });

      it('should display a loading indicator while fetching data', async () => {
        renderWithProviders(
          <AppProvidersAndRoutes>
            <Route path="/" element={<HomePage />}></Route>
          </AppProvidersAndRoutes>
        );

        await waitFor(() => {
          expect(screen.getByTestId('spinner')).toBeInTheDocument();
        });
      });
    });

    it('should correctly display the detailed card data', async () => {
      renderWithProviders(
        <AppProvidersAndRoutes>
          <Route
            path="/"
            element={
              <CharacterInfoSidebar character={MOCK_CHARACTERS_DATA[3]} />
            }
          />
        </AppProvidersAndRoutes>
      );

      const expectedTexts = [/Beth Smith/i, /female/i, /alive/i];

      for (const text of expectedTexts) {
        const element = await screen.findByText(text);
        expect(element).toBeInTheDocument();
      }
    });

    it('should hide the component when clicking the close button', async () => {
      const fetchSpy = vi.spyOn(globalThis, 'fetch');
      const user = userEvent.setup();

      renderWithProviders(
        <AppProvidersAndRoutes>
          <Route
            path="/"
            element={
              <CharacterInfoSidebar character={MOCK_CHARACTERS_DATA[3]} />
            }
          />
        </AppProvidersAndRoutes>
      );

      const closeButton = await screen.findByRole('button', {
        name: /close/i,
      });

      expect(closeButton).toBeInTheDocument();

      await user.click(closeButton);

      await waitFor(() => {
        expect(fetchSpy).not.toHaveBeenCalled();
      });
    });

    describe('PaginationControl', () => {
      afterEach(() => {
        vi.clearAllMocks();
      });

      it('should display the correct number of pages', async () => {
        renderWithProviders(
          <PaginationControl
            currentPage={1}
            onNextPage={vi.fn()}
            onPreviousPage={vi.fn()}
            totalPages={5}
          />
        );
        const pagination = screen.getByText(/Page 1 of 5/i);

        expect(pagination).toBeInTheDocument();
      });

      it('should update the URL query parameter when the page changes', async () => {
        const user = userEvent.setup();

        const router = createMemoryRouter(
          [
            {
              element: <HomePage />,
              path: '/',
            },
          ],
          { initialEntries: ['/?page=2'] }
        );

        renderWithProviders(
          <ThemeProvider>
            <RouterProvider router={router} />
          </ThemeProvider>
        );

        const nextButton = await screen.findByRole('button', { name: /next/i });

        await user.click(nextButton);

        await waitFor(() => {
          expect(router.state.location.search).toBe('?page=3');
        });
      });
    });
  });
});
