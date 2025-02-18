import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import { MOCK_CHARACTERS_DATA } from '@/__mocks__';
import { ThemeProvider } from '@/shared';
import { store } from '@/store';

import { CharacterCard } from './CharacterCard';

describe('CharacterCard', () => {
  it('should render relevant card data', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <ThemeProvider>
            <CharacterCard character={MOCK_CHARACTERS_DATA[0]} />
          </ThemeProvider>
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(MOCK_CHARACTERS_DATA[0].name)).toBeInTheDocument();
    const imageElement = screen.getByRole('img', { name: /Rick Sanchez/i });
    expect(imageElement).toHaveAttribute(
      'src',
      'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
    );
  });

  it('should open a detailed card component when clicked', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Provider store={store}>
          <ThemeProvider>
            <CharacterCard character={MOCK_CHARACTERS_DATA[0]} />
          </ThemeProvider>
        </Provider>
      </MemoryRouter>
    );

    const linkElement = screen.getByRole('link', { name: /Rick Sanchez/i });

    expect(linkElement).toHaveAttribute(
      'href',
      `/details/${MOCK_CHARACTERS_DATA[0].id}`
    );

    await user.click(linkElement);
  });
});
