import { type FC, memo } from 'react';

import { type RickAndMortyCharacter } from '@/shared';

type CharacterCardProps = {
  character: RickAndMortyCharacter;
  onClick: (character: RickAndMortyCharacter) => void;
};

const CharacterCardComponent: FC<CharacterCardProps> = ({
  character,
  onClick,
}) => {
  return (
    <button
      className="dark:bg-blue-xs dark:focus:outline-blue-xs flex w-64 cursor-pointer flex-col items-center justify-center gap-5 rounded-3xl bg-amber-100/70 p-5 text-black transition-transform duration-200 ease-in-out focus:outline-lime-300 focus-visible:ring-2 active:scale-95 sm:hover:scale-105"
      onClick={() => onClick(character)}
    >
      <h1 className="m-0 max-w-full overflow-hidden text-2xl font-bold text-ellipsis whitespace-nowrap">
        {character.name}
      </h1>
      <img
        className="size-30 rounded-full border-4 border-amber-100 dark:border-gray-200/70"
        src={character.image}
        alt={character.name}
      />
    </button>
  );
};

CharacterCardComponent.displayName = 'CharacterCard';

export const CharacterCard = memo(CharacterCardComponent);
