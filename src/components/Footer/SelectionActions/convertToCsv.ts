import { type RickAndMortyCharacter } from '@/shared';

export const convertToCsv = (characters: RickAndMortyCharacter[]): string => {
  if (!characters.length) return '';

  const headers = Object.keys(characters[0]);

  const csvRows = characters.map((obj) => {
    return headers
      .map((key) => {
        const value = obj[key as keyof RickAndMortyCharacter] ?? 'N/A';
        return `"${String(value).replace(/"/g, '""')}"`;
      })
      .join(';');
  });

  const csvContent = [headers.join(';'), ...csvRows].join('\n');

  return csvContent;
};
