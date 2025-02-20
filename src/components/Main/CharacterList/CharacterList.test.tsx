import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { MOCK_CHARACTERS_DATA, MOCK_EMPTY_DATA } from 'tests';

import { store } from '@/store';

import { CharacterList } from './CharacterList';

describe('CharacterList', () => {
  it('should render the correct number of CharacterCard components based on the characters length', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CharacterList characters={MOCK_CHARACTERS_DATA} searchQuery={''} />
        </MemoryRouter>
      </Provider>
    );

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(MOCK_CHARACTERS_DATA.length);
  });

  it('should display a message when no cards are present', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CharacterList characters={MOCK_EMPTY_DATA} searchQuery={'rick'} />
        </MemoryRouter>
      </Provider>
    );

    const message = screen.getByText(/No results found for your search for/i);
    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent("'rick'");

    const items = screen.queryAllByRole('listitem');
    expect(items).toHaveLength(0);
  });
});
