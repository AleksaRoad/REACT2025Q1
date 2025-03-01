import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getCharacters } from '@/api';
import { Header, MainContent, Spinner, Footer } from '@/components';
import { CACHE_KEY, PAGE_SIZE, useStorage } from '@/shared';
import { clsx } from 'clsx';
import localFont from 'next/font/local';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export const ramFont = localFont({
  src: '../../public/assets/fonts/ramFont.woff2',
});

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { page = 1, limit = PAGE_SIZE, q = '' } = context.query;

  const params = {
    q: String(q),
    page: Number(page),
    limit: Number(limit),
  };

  const characters = await getCharacters(params);

  return {
    props: {
      ...characters,
      params,
    },
  };
};

const Home: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  characters,
  params,
  totalPages,
}) => {
  const router = useRouter();
  const { load: loadSearchQuery, save: saveSearchQuery } = useStorage(
    CACHE_KEY.searchQuery
  );
  const [isLoading, setLoading] = useState(true);

  const searchQuery = loadSearchQuery() ?? '';
  const currentPage = params.page ?? 1;

  useEffect(() => {
    setLoading(false);
  }, [characters]);

  const handlePageChange = (newPage: number) => {
    setLoading(true);
    router.push({
      pathname: '/',
      query: { q: searchQuery, page: newPage },
    });
  };

  const handleSearch = (newSearchQuery: string) => {
    setLoading(true);
    saveSearchQuery(newSearchQuery);
    router.push({
      pathname: '/',
      query: { q: newSearchQuery, page: 1 },
    });
  };

  const isPaginationVisible = totalPages > 1;

  return (
    <section className="h-full w-full bg-[url('/assets/images/bg.webp')] bg-cover bg-fixed bg-center dark:bg-[url('/assets/images/bg1.webp')]">
      <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col items-center justify-center p-5">
        <h1
          className={clsx(
            ramFont.className,
            'p-6 text-center text-6xl text-yellow-950 dark:text-white'
          )}
        >
          Rick and Morty Characters
        </h1>
        <Header onSearch={handleSearch} apiErrorMessage={''} />
        {isLoading ? (
          <div className="flex flex-grow items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <MainContent characters={characters} searchQuery={searchQuery} />
        )}
        <Footer
          showPagination={isPaginationVisible}
          currentPage={currentPage}
          totalPages={totalPages}
          onNextPage={() => handlePageChange(currentPage + 1)}
          onPreviousPage={() => handlePageChange(currentPage - 1)}
        />
      </div>
    </section>
  );
};

export default Home;
