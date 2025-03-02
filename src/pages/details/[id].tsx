import type { GetServerSideProps } from 'next';
import type { FC } from 'react';

import { getCharacterById } from '@/api';
import { CharacterInfoSidebar } from '@/components';
import { ERROR_MESSAGES } from '@/shared';

import type { RickAndMortyCharacter } from '@/shared';

type CharacterDetailsProps = {
  character: RickAndMortyCharacter;
};

const CharacterDetails: FC<CharacterDetailsProps> = ({ character }) => {
  if (!character) {
    return <div>{ERROR_MESSAGES.NOT_FOUND}</div>;
  }

  return <CharacterInfoSidebar character={character} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  if (!id) {
    return {
      notFound: true,
    };
  }
  const character = await getCharacterById(Number(id));

  if (!character) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      character,
    },
  };
};

export default CharacterDetails;
