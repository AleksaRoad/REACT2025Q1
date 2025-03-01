import { PAGE_SIZE } from '@/shared/constants';
import { type RickAndMortyCharacter } from '@/shared/types';
import { BASE_URL, ENDPOINTS } from './constants';
import { NextApiRequest, NextApiResponse } from 'next';

const addImageToCharacter = (character: RickAndMortyCharacter) => ({
  ...character,
  image: `${BASE_URL.avatar}${ENDPOINTS.avatar}${character.id}.jpeg`,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page = '1', searchQuery = '' } = req.query;
  const pageNumber = parseInt(page as string, 10);

  try {
    const searchParams = new URLSearchParams({
      q: searchQuery as string,
      _page: pageNumber.toString(),
      _limit: PAGE_SIZE.toString(),
    });

    const response = await fetch(
      `${BASE_URL.api}${ENDPOINTS.character}?${searchParams}`
    );
    const characters = await response.json();
    const totalCount = Number(response.headers.get('X-Total-Count')) || 0;
    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

    res
      .status(200)
      .json({ characters: characters.map(addImageToCharacter), totalPages });
  } catch (error) {
    console.error('Error fetching characters:', error);
    res.status(500).json({ message: 'Ошибка при получении данных' });
  }
}
