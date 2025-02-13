import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { PAGE_SIZE, type RickAndMortyCharacter } from '@/shared';

import { BASE_URL, ENDPOINTS } from './constants';

const addImageToCharacter = (character: RickAndMortyCharacter) => ({
  ...character,
  image:
    character.image ||
    `${BASE_URL.avatar}${ENDPOINTS.avatar}${character.id}.jpeg`,
});

export const rickAndMortyApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL.api }),
  endpoints: (builder) => ({
    getCharacterById: builder.query<RickAndMortyCharacter, number>({
      query: (id) => `${ENDPOINTS.character}/${id}`,
      transformResponse: (response: RickAndMortyCharacter) =>
        addImageToCharacter(response),
    }),

    getCharacters: builder.query<
      { characters: RickAndMortyCharacter[]; totalPages: number },
      { searchQuery: string; page: number }
    >({
      query: ({ page, searchQuery }) => {
        const searchParams = new URLSearchParams([
          ['q', searchQuery],
          ['_page', page.toString()],
          ['_limit', PAGE_SIZE.toString()],
        ]);
        return `${ENDPOINTS.character}?${searchParams.toString()}`;
      },
      transformResponse: (response: RickAndMortyCharacter[], meta) => {
        const count = Number(meta?.response?.headers.get('X-Total-Count')) || 0;
        const totalPages = count ? Math.ceil(count / PAGE_SIZE) : 1;
        const charactersWithImages = response.map(addImageToCharacter);

        return { characters: charactersWithImages, totalPages };
      },
    }),
  }),
  reducerPath: 'rickAndMortyApi',
});

export const { useGetCharacterByIdQuery, useGetCharactersQuery } =
  rickAndMortyApi;
