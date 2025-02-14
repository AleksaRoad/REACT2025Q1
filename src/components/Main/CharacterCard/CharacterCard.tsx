import { type FC, memo } from 'react';

import { BUTTON_STYLES, type RickAndMortyCharacter } from '@/shared';

type CharacterCardProps = {
  character: RickAndMortyCharacter;
  onClick: (character: RickAndMortyCharacter) => void;
};

const CharacterCardComponent: FC<CharacterCardProps> = ({
  character,
  onClick,
}) => {
  return (
    <button className={BUTTON_STYLES.card} onClick={() => onClick(character)}>
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
