import { useCallback, useMemo } from 'react';

import { ERROR_MESSAGES } from '../constants';

const isClient = typeof window !== 'undefined';

export const useStorage = (key: string) => {
  const load = useCallback(() => {
    if (!isClient) return null;

    const storageValue = localStorage.getItem(key);
    if (storageValue !== null) {
      try {
        return JSON.parse(storageValue);
      } catch (error) {
        console.error(ERROR_MESSAGES.PARSING_ERROR, error);
      }
    }
    return null;
  }, [key]);

  const save = useCallback(
    (value: string) => {
      if (isClient) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    },
    [key]
  );

  return useMemo(() => ({ load, save }), [load, save]);
};
