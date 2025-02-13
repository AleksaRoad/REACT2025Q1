import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { rickAndMortyApi } from '../services/api/rickAndMortyApi';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rickAndMortyApi.middleware),
  reducer: {
    [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
  },
});

setupListeners(store.dispatch);
