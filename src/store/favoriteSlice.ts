import { createSlice } from '@reduxjs/toolkit';
import { type PayloadAction } from '@reduxjs/toolkit';

import { type RickAndMortyCharacter } from '@/shared';

const initialState: Array<RickAndMortyCharacter> = [];

export const favoritesSlice = createSlice({
  initialState,
  name: 'favorites',
  reducers: {
    addFavorite: (state, action: PayloadAction<RickAndMortyCharacter>) => {
      if (!state.some((character) => character.id === action.payload.id)) {
        state.push(action.payload);
      }
    },

    clearFavorites: () => {
      return [];
    },

    removeFavorite: (
      state,
      action: PayloadAction<RickAndMortyCharacter['id']>
    ) => {
      return state.filter((character) => character.id !== action.payload);
    },

    setFavorites: (_, action: PayloadAction<RickAndMortyCharacter[]>) => {
      return action.payload;
    },
  },
});

export const { addFavorite, clearFavorites, removeFavorite, setFavorites } =
  favoritesSlice.actions;
