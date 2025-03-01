import Image from 'next/image';
import Link from 'next/link';
import { type FC, memo } from 'react';

import { BUTTON_STYLES, type RickAndMortyCharacter } from '@/shared';

type CharacterCardProps = {
  character: RickAndMortyCharacter;
};

const CharacterCardComponent: FC<CharacterCardProps> = ({ character }) => {
  return (
    <Link href={`/details/${[[character.id]]}`} className={BUTTON_STYLES.card}>
      <header className="flex w-full items-center justify-between gap-3">
        <h1 className="overflow-hidden text-2xl font-bold text-ellipsis whitespace-nowrap">
          {character.name}
        </h1>
      </header>
      {character.image && (
        <Image
          className="rounded-full border-4 border-amber-100 dark:border-gray-200/70"
          src={character.image}
          alt={character.name}
          width={120}
          height={120}
        />
      )}
    </Link>
  );
};

CharacterCardComponent.displayName = 'CharacterCard';

export const CharacterCard = memo(CharacterCardComponent);
