import { clsx } from 'clsx';
import localFont from 'next/font/local';
import { useRouter } from 'next/router';
import { useState } from 'react';

import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import type { FC } from 'react';

import { getCharacterById, getCharacters } from '@/api';
import { Header, MainContent, Spinner, Footer } from '@/components';
import { PAGE_SIZE } from '@/shared';

const ramFont = localFont({
  src: '../../public/assets/fonts/ramFont.woff2',
});

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id = 1, limit = PAGE_SIZE, page = 1, q = '' } = context.query;

  const params = {
    id: Number(id),
    limit: Number(limit),
    page: Number(page),
    q: String(q),
  };

  const characters = await getCharacters(params);
  const character = await getCharacterById(params.id);

  return {
    props: {
      ...characters,
      character,
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
  const [isLoading, setIsLoading] = useState(false);

  const searchQuery = params.q ?? '';
  const currentPage = params.page ?? 1;

  const handlePageChange = (newPage: number) => {
    setIsLoading(true);

    router
      .push({
        pathname: '/',
        query: { page: newPage, q: searchQuery },
      })
      .then(() => setIsLoading(false));
  };

  const handleSearch = (newSearchQuery: string) => {
    setIsLoading(true);

    router
      .push({
        pathname: '/',
        query: { page: 1, q: newSearchQuery },
      })
      .then(() => setIsLoading(false));
  };

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
          showPagination={totalPages > 1}
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
