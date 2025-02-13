import type { FC } from 'react';
import { useLocation } from 'react-router';

import { ErrorDisplay, Spinner } from '@/components';
import { rickAndMortyApi } from '@/services';
import { ERROR_MESSAGES } from '@/shared';

import { CharacterInfoSidebar } from './CharacterInfoSidebar';

export const CharacterPage: FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const characterId = searchParams.get('details');

  const {
    data: character,
    error,
    isLoading,
  } = rickAndMortyApi.useGetCharacterByIdQuery(Number(characterId));

  const errorMessage = error
    ? 'status' in error
      ? `Error ${error.status}: ${JSON.stringify(error.data)}`
      : (error.message ?? ERROR_MESSAGES.FAILED_TO_FETCH_DATA)
    : '';

  return (
    <>
      {isLoading && (
        <div className="flex min-w-72 items-center justify-center">
          <Spinner />
        </div>
      )}
      {error && <ErrorDisplay errorMessage={errorMessage} />}
      {!isLoading && !error && character && (
        <CharacterInfoSidebar character={character} />
      )}
    </>
  );
};
