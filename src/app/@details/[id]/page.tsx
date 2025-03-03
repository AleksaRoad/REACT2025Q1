import type { FC } from 'react';

import { getCharacterById } from '@/api';
import { CharacterInfoSidebar } from '@/components';

interface CharacterDetailsProps {
  params: { id: string };
}

const CharacterDetails: FC<CharacterDetailsProps> = async ({ params }) => {
  const character = await getCharacterById({ id: Number(params.id) });

  if (!character) {
    return <div>Character not found</div>;
  }
  return <CharacterInfoSidebar character={character} />;
};

export default CharacterDetails;
