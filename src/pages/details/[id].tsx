import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { getCharacterById } from '@/api';
import { CharacterInfoSidebar } from '@/components';
import {
  getSearchParamHelper,
  parseNumberHelper,
  type RickAndMortyCharacter,
} from '@/shared';

export const getServerSideProps = (async (context) => {
  const { id } = context.query;

  const character: RickAndMortyCharacter | null = await getCharacterById(
    parseNumberHelper(getSearchParamHelper(id))
  );

  if (!character) {
    return { notFound: true };
  }

  return { props: { character } };
}) satisfies GetServerSideProps<{ character: RickAndMortyCharacter }>;

const Details = ({
  character,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <CharacterInfoSidebar character={character} />;
};

export default Details;
