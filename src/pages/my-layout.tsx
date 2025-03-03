import clsx from 'clsx';
import localFont from 'next/font/local';
import { useRouter } from 'next/router';
import { useState, type FC, type ReactNode } from 'react';

import { Header, Spinner, MainContent, Footer } from '@/components';
import { type RickAndMortyCharacter } from '@/shared';

const ramFont = localFont({
  src: '../../public/assets/fonts/ramFont.woff2',
});

type LayoutProps = {
  characters: Array<RickAndMortyCharacter>;
  children: ReactNode;
  currentPage: number;
  searchQuery: string;
  totalPages: number;
};

const Layout: FC<LayoutProps> = ({
  characters,
  children,
  currentPage,
  searchQuery,
  totalPages,
}: LayoutProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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
        query: { page: currentPage, q: newSearchQuery },
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
          <MainContent characters={characters} searchQuery={searchQuery}>
            {children}
          </MainContent>
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

export default Layout;
