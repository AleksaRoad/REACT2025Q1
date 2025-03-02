import { type FC, type ReactNode } from 'react';

import { type RickAndMortyCharacter } from '@/shared';

import { CharacterList } from './CharacterList';

type MainProps = {
  characters: RickAndMortyCharacter[];
  searchQuery: string;
  children: ReactNode;
};

export const MainContent: FC<MainProps> = ({
  characters,
  children,
  searchQuery,
}) => {
  return (
    <main className="flex h-full w-full flex-grow items-center justify-center gap-5">
      <CharacterList characters={characters} searchQuery={searchQuery} />
      {children}
    </main>
  );
};
