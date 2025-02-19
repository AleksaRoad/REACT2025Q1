import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { rickAndMortyApi } from '@/services';

import { favoritesSlice } from './favoriteSlice';
import { localStorageMiddleware } from './localStorageMiddleware';

export const rootReducer = combineReducers({
  favorites: favoritesSlice.reducer,
  [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
});

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      rickAndMortyApi.middleware,
      localStorageMiddleware
    ),
  reducer: rootReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        rickAndMortyApi.middleware,
        localStorageMiddleware
      ),
    preloadedState,
    reducer: rootReducer,
  });
};

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;

export type AppStore = typeof store;

export type AppDispatch = typeof store.dispatch;
