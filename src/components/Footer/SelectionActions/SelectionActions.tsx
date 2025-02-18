import { useDispatch } from 'react-redux';

import { BUTTON_STYLES, CACHE_KEY, useStorage } from '@/shared';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { clearFavorites } from '@/store';

export const SelectionActions = () => {
  const favorites = useAppSelector((state) => state.favorites);
  const dispatch = useDispatch();
  const { save } = useStorage(CACHE_KEY.favorites);

  const handleDeselect = () => {
    dispatch(clearFavorites());
    save('[]');
  };

  return (
    <div className="dark:bg-blue-xs/80 flex items-center justify-between gap-5 rounded-3xl bg-amber-300/70 px-10 py-6">
      <button className={BUTTON_STYLES.favorites} onClick={handleDeselect}>
        Deselect
      </button>
      <span>{favorites.length} items in favorites</span>
      <button className={BUTTON_STYLES.favorites}>Download</button>
    </div>
  );
};
