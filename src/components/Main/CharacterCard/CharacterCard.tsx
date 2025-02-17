import { type FC, memo, useState, type MouseEvent } from 'react';

import { BUTTON_STYLES, type RickAndMortyCharacter } from '@/shared';

import { StarIcon } from './StarIcon/StarIcon';

type CharacterCardProps = {
  character: RickAndMortyCharacter;
  onClick: (character: RickAndMortyCharacter) => void;
};

const CharacterCardComponent: FC<CharacterCardProps> = ({
  character,
  onClick,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleCardClick = (e: MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    onClick(character);
  };

  return (
    <button className={BUTTON_STYLES.card} onClick={() => onClick(character)}>
      <header className="flex w-full items-center justify-between gap-3">
        <h1 className="m-0 overflow-hidden text-2xl font-bold text-ellipsis whitespace-nowrap">
          {character.name}
        </h1>
        <button
          className="flex size-10 cursor-pointer items-center justify-center"
          onClick={handleCardClick}
        >
          <StarIcon isFavorite={isFavorite} />
        </button>
      </header>
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
