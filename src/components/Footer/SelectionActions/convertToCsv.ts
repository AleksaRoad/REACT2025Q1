import { type RickAndMortyCharacter } from '@/shared';

export const convertToCsv = (characters: RickAndMortyCharacter[]): string => {
  if (characters.length === 0) return '';

  const fields = Object.keys(characters[0]);

  const csvRows = characters.map((character) => {
    return fields
      .map((field) => {
        const value = character[field as keyof RickAndMortyCharacter] ?? 'N/A';
        return `"${String(value).replace(/"/g, '""')}"`;
      })
      .join(';');
  });

  const csvContent = [fields.join(';'), ...csvRows].join('\n');

  return csvContent;
};
