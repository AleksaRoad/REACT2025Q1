import { PAGE_SIZE, type RickAndMortyCharacter } from '@/shared';

import { BASE_URL, ENDPOINTS } from './constants';

type GetCharactersProps = {
  q?: string;
  page?: number;
  limit?: number;
};

const addImageToCharacter = (character: RickAndMortyCharacter) => ({
  ...character,
  image: `${BASE_URL.avatar}${ENDPOINTS.avatar}${character.id}.jpeg`,
});

export const getCharacters = async ({
  limit = PAGE_SIZE,
  page = 1,
  q = '',
}: GetCharactersProps) => {
  try {
    const searchParams = new URLSearchParams([
      ['q', q.toString()],
      ['_page', page.toString()],
      ['_limit', PAGE_SIZE.toString()],
    ]);

    const response = await fetch(
      `${BASE_URL.api}${ENDPOINTS.character}?${searchParams.toString()}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch characters');
    }

    const characters: RickAndMortyCharacter[] = await response.json();
    const totalCount = Number(response.headers.get('X-Total-Count')) || 0;
    const totalPages = totalCount ? Math.ceil(totalCount / Number(limit)) : 1;

    const charactersWithImages = characters.map(addImageToCharacter);

    return { characters: charactersWithImages, totalPages };
  } catch (error) {
    console.error('Error fetching characters:', error);
    return { characters: [], totalPages: 1 };
  }
};

export const getCharacterById = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL.api}${ENDPOINTS.character}/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch character');
    }

    const character: RickAndMortyCharacter = await response.json();
    return addImageToCharacter(character);
  } catch (error) {
    console.error('Error fetching character:', error);
    return null;
  } finally {
    return null;
  }
};
