import { useLocation } from 'react-router';

import type { FC } from 'react';

import { ErrorDisplay, Spinner } from '@/components';
import { rickAndMortyApi } from '@/services';
import { ERROR_MESSAGES } from '@/shared';
import { getErrorMessage } from '@/shared/helpers/helperError';

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
