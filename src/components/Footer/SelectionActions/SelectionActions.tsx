import clsx from 'clsx';
import { useState, useEffect, type FC, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { BUTTON_STYLES, useAppSelector, clearFavorites } from '@/shared';

import { convertToCsv } from './convertToCsv';

export const SelectionActions: FC = () => {
  const favorites = useAppSelector((state) => state.favorites);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    setIsVisible(favorites.length > 0);
  }, [favorites]);

  const handleDeselect = () => {
    dispatch(clearFavorites());
  };

  const handleDownload = () => {
    const csvData = convertToCsv(favorites);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });

    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = URL.createObjectURL(blob);
      downloadLinkRef.current.download = `${favorites.length}_characters.csv`;
      downloadLinkRef.current.click();
    }
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
      <button className={BUTTON_STYLES.favorites} onClick={handleDownload}>
        Download
      </button>
      <a
        ref={downloadLinkRef}
        href="#"
        download
        className="hidden"
        aria-hidden="true"
      />
    </div>
  );
};
