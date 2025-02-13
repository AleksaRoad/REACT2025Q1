import { type FC } from 'react';
import { useSearchParams } from 'react-router';

import { Footer, Header, Main, Spinner } from '@/components';
import { rickAndMortyApi } from '@/services';
import { CACHE_KEY, ERROR_MESSAGES, useStorage } from '@/shared';
import { getErrorMessage } from '@/shared/helpers/helperError';

import { useHomePageParams } from './useMainPageParams';

export const HomePage: FC = () => {
  const [, setSearchParams] = useSearchParams();
  const { currentPage } = useHomePageParams();

  const { load: loadSearchQuery, save: saveSearchQuery } = useStorage(
    CACHE_KEY.searchQuery
  );
  const searchQuery = loadSearchQuery() ?? '';

  const { data, error, isLoading } = rickAndMortyApi.useGetCharactersQuery({
    page: currentPage,
    searchQuery,
  });

  const handleSearch = (newSearchQuery: string) => {
    saveSearchQuery(newSearchQuery);
    setSearchParams({ page: '1' });
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  const isPaginationVisible = !!(data && data.characters.length > 0);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col items-center justify-center p-5">
      <h1 className="font-ramFont p-6 text-center text-6xl text-yellow-950 dark:text-white">
        Rick and Morty Characters
      </h1>
      <Header
        onSearch={handleSearch}
        apiErrorMessage={getErrorMessage({
          apiErrorMessage: ERROR_MESSAGES.FAILED_TO_FETCH_DATA,
          error,
        })}
      />
      {isLoading ? (
        <div className="flex flex-grow items-center justify-center">
          <Spinner />
        </div>
      ) : (
        data && <Main characters={data.characters} searchQuery={searchQuery} />
      )}
      <Footer
        showPagination={isPaginationVisible}
        currentPage={currentPage}
        totalPages={data?.totalPages}
        onPreviousPage={() => handlePageChange(currentPage - 1)}
        onNextPage={() => handlePageChange(currentPage + 1)}
      />
    </div>
  );
};
