import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { rickAndMortyApi } from '@/services';

import { favoritesSlice } from './favoriteSlice';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rickAndMortyApi.middleware),
  reducer: {
    favorites: favoritesSlice.reducer,
    [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
