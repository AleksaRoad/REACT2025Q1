'use client';

import Image from 'next/image';
import Link from 'next/link';
import { type FC, memo } from 'react';
import { useDispatch } from 'react-redux';

import {
  BUTTON_STYLES,
  type RickAndMortyCharacter,
  useAppSelector,
  removeFavorite,
  addFavorite,
} from '@/shared';

import { FavoriteCheckbox } from './FavoriteCheckbox';

type CharacterCardProps = {
  character: RickAndMortyCharacter;
};

const CharacterCardComponent: FC<CharacterCardProps> = ({ character }) => {
  const dispatch = useDispatch();
  const favorites = useAppSelector((state) => state.favorites);

  const isFavorite =
    Array.isArray(favorites) &&
    favorites.some((fav: RickAndMortyCharacter) => fav.id === character.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(character.id));
    } else {
      dispatch(addFavorite(character));
    }
  };

  return (
    <Link href={`/${character.id}`} className={BUTTON_STYLES.card}>
      <header className="flex w-full items-center justify-between gap-3">
        <h1 className="overflow-hidden text-2xl font-bold text-ellipsis whitespace-nowrap">
          {character.name}
        </h1>
        <FavoriteCheckbox isFavorite={isFavorite} onClick={toggleFavorite} />
      </header>
      {character.image && (
        <Image
          className="rounded-full border-4 border-amber-100 dark:border-gray-200/70"
          src={character.image}
          alt={character.name}
          width={120}
          height={120}
          priority
        />
      )}
    </Link>
  );
};

CharacterCardComponent.displayName = 'CharacterCard';

export const CharacterCard = memo(CharacterCardComponent);
