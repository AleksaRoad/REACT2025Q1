import { useParams } from 'react-router';

import type { FC } from 'react';

import { ErrorDisplay, Spinner } from '@/components';
import { rickAndMortyApi } from '@/services';
import { ERROR_MESSAGES, getErrorMessage } from '@/shared';

import { CharacterInfoSidebar } from './CharacterInfoSidebar';

export const CharacterPage: FC = () => {
  const { id: characterId } = useParams();

  const {
    data: character,
    error,
    isLoading,
  } = rickAndMortyApi.useGetCharacterByIdQuery(Number(characterId));

  return (
    <>
      {isLoading && (
        <div className="flex min-w-72 items-center justify-center">
          <Spinner />
        </div>
      )}
      {error && (
        <ErrorDisplay
          errorMessage={getErrorMessage({
            apiErrorMessage: ERROR_MESSAGES.FAILED_TO_FETCH_DATA,
            error,
          })}
        />
      )}
      {!isLoading && !error && character && (
        <CharacterInfoSidebar character={character} />
      )}
    </>
  );
};
