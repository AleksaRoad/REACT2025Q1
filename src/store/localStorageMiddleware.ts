import type { Middleware } from '@reduxjs/toolkit';

import { CACHE_KEY, ERROR_MESSAGES } from '@/shared';

import type { RootState } from './store';

export const localStorageMiddleware: Middleware =
  (store) => (next) => (action) => {
    if (typeof action === 'object' && action !== null && 'type' in action) {
      if (action.type !== 'favorites/setFavorites') {
        const storedFavorites = localStorage.getItem(CACHE_KEY.favorites);

        if (storedFavorites) {
          try {
            const parsedFavorites = JSON.parse(storedFavorites);

            if (Array.isArray(parsedFavorites)) {
              store.dispatch({
                payload: parsedFavorites,
                type: 'favorites/setFavorites',
              });
            }
          } catch (error) {
            console.error(ERROR_MESSAGES.STORAGE_FAVORITES_ERROR, error);
          }
        }
      }
    }

    const result = next(action);

    const state: RootState = store.getState();
    if (Array.isArray(state.favorites)) {
      localStorage.setItem(
        CACHE_KEY.favorites,
        JSON.stringify(state.favorites)
      );
    }

    return result;
  };
