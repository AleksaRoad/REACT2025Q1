import { useParams } from 'react-router';

import type { FC } from 'react';

import { ErrorDisplay, Spinner } from '@/components';
import { rickAndMortyApi } from '@/services';
import { ERROR_MESSAGES, getErrorMessage } from '@/shared';

import { CharacterInfoSidebar } from './CharacterInfoSidebar';

export const CharacterPage: FC = () => {
  const { id: characterId } = useParams();
  const validCharacterId = Number(characterId) || 1;

  const {
    data: character,
    error,
    isLoading,
  } = rickAndMortyApi.useGetCharacterByIdQuery(validCharacterId);

  if (isLoading) {
    return (
      <div className="flex min-w-72 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorDisplay
        errorMessage={getErrorMessage({
          apiErrorMessage: ERROR_MESSAGES.FAILED_TO_FETCH_DATA,
          error,
        })}
      />
    );
  }

  if (!character) {
    return (
      <ErrorDisplay
        errorMessage={ERROR_MESSAGES.NO_RESULTS_FOUND}
        searchQuery={characterId}
      />
    );
  }

  return <CharacterInfoSidebar character={character} />;
};
