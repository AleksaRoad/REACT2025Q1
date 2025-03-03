import { type FC, type ReactNode } from 'react';

import { type RickAndMortyCharacter } from '@/shared';

import { CharacterList } from './CharacterList';

type MainProps = {
  characters: RickAndMortyCharacter[];
  children?: ReactNode;
};

export const MainContent: FC<MainProps> = ({
  characters,
  children,
}: MainProps) => {
  return (
    <main className="flex h-full w-full flex-grow items-center justify-center gap-5">
      <CharacterList characters={characters} />
      {children}
    </main>
  );
};
