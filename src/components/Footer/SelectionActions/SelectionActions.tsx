import clsx from 'clsx';
import { useState, useEffect, type FC } from 'react';
import { useDispatch } from 'react-redux';

import { BUTTON_STYLES, CACHE_KEY, useStorage, useAppSelector } from '@/shared';
import { clearFavorites } from '@/store';

export const SelectionActions: FC = () => {
  const favorites = useAppSelector((state) => state.favorites);
  const dispatch = useDispatch();
  const { save } = useStorage(CACHE_KEY.favorites);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(favorites.length > 0);
  }, [favorites]);

  const handleDeselect = () => {
    dispatch(clearFavorites());
    save('[]');
  };

  return (
    <div
      className={clsx(
        'dark:bg-blue-xs relative mx-auto flex w-full max-w-3xl items-center gap-3 rounded-2xl bg-amber-300/80 p-4 transition-opacity duration-500',
        {
          'opacity-0': !isVisible,
          'opacity-100': isVisible,
        }
      )}
      style={{ zIndex: 10 }}
    >
      <button className={BUTTON_STYLES.favorites} onClick={handleDeselect}>
        Unselect all
      </button>
      <span>{favorites.length} items in favorites</span>
      <button className={BUTTON_STYLES.favorites}>Download</button>
    </div>
  );
};
