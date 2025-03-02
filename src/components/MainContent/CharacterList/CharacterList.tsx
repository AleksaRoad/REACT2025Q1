import { type FC } from 'react';

import { ErrorDisplay } from '@/components';
import { ERROR_MESSAGES, type RickAndMortyCharacter } from '@/shared';

import { CharacterCard } from '../CharacterCard';

type CharacterListProps = {
  characters: RickAndMortyCharacter[];
  searchQuery: string;
};

export const CharacterList: FC<CharacterListProps> = ({
  characters,
  searchQuery,
}) => {
  return characters.length > 0 ? (
    <ul className="m-0 flex list-none flex-wrap items-center justify-center gap-5 px-0 py-10">
      {characters.map((character) => (
        <li key={character.id}>
          <CharacterCard character={character} />
        </li>
      ))}
    </ul>
  ) : (
    <ErrorDisplay
      errorMessage={ERROR_MESSAGES.NO_RESULTS_FOUND}
      searchQuery={searchQuery}
    />
  );
};
