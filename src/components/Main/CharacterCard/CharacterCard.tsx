import { type FC, memo } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useSearchParams } from 'react-router';

import {
  BUTTON_STYLES,
  CACHE_KEY,
  useStorage,
  useAppSelector,
  type RickAndMortyCharacter,
} from '@/shared';
import { removeFavorite, addFavorite, store } from '@/store';

import { FavoriteButton } from './FavoriteButton';

type CharacterCardProps = {
  character: RickAndMortyCharacter;
};

const CharacterCardComponent: FC<CharacterCardProps> = ({ character }) => {
  const dispatch = useDispatch();
  const favorites = useAppSelector((state) => state.favorites);
  const { save } = useStorage(CACHE_KEY.favorites);
  const [searchParams] = useSearchParams();

  const isFavorite = favorites.some(
    (fav: RickAndMortyCharacter) => fav.id === character.id
  );

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite({ id: character.id }));
    } else {
      dispatch(addFavorite(character));
    }
    const updatedFavorites = store.getState().favorites;
    save(JSON.stringify(updatedFavorites));
  };

  return (
    <Link
      to={`/details/${character.id}?${searchParams.toString()}`}
      className={BUTTON_STYLES.card}
    >
      <header className="flex w-full items-center justify-between gap-3">
        <h1 className="m-0 overflow-hidden text-2xl font-bold text-ellipsis whitespace-nowrap">
          {character.name}
        </h1>
        <FavoriteButton isFavorite={isFavorite} onClick={toggleFavorite} />
      </header>
      <img
        className="size-30 rounded-full border-4 border-amber-100 dark:border-gray-200/70"
        src={character.image}
        alt={character.name}
      />
    </Link>
  );
};

CharacterCardComponent.displayName = 'CharacterCard';

export const CharacterCard = memo(CharacterCardComponent);
