import { createSlice } from '@reduxjs/toolkit';

import { type RickAndMortyCharacter } from '@/shared';

const initialState: Array<RickAndMortyCharacter> = [];

export const favoritesSlice = createSlice({
  initialState,
  name: 'favorites',
  reducers: {
    addFavorite: (state, action) => {
      if (!state.some((item) => item.id === action.payload.id)) {
        state.push(action.payload);
      }
    },
    clearFavorites: () => {
      return [];
    },

    removeFavorite: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addFavorite, clearFavorites, removeFavorite } =
  favoritesSlice.actions;
