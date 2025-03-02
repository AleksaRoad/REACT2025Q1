import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { favoritesSlice } from './favoriteSlice';

export const rootReducer = combineReducers({
  favorites: favoritesSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    preloadedState,
    reducer: rootReducer,
  });
};

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;

export type AppStore = typeof store;

export type AppDispatch = typeof store.dispatch;
