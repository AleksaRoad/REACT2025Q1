import clsx from 'clsx';
import localFont from 'next/font/local';

import type { FC, ReactNode } from 'react';

import { getCharacters, type GetCharactersProps } from '@/api';
import { Footer, Header, MainContent } from '@/components';
import { PAGE_SIZE } from '@/shared';

const ramFont = localFont({
  src: '../../public/assets/fonts/ramFont.woff2',
});

type PageProps = {
  searchParams: Promise<GetCharactersProps>;
  children: ReactNode;
};

const Page: FC<PageProps> = async ({ children, searchParams }) => {
  const { limit = PAGE_SIZE, page = 1, q = '' } = await searchParams;

  const { characters, totalPages } = await getCharacters({ limit, page, q });

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
        <Header apiErrorMessage="" />
        <MainContent characters={characters}>{children}</MainContent>
        <Footer showPagination={totalPages > 1} totalPages={totalPages} />
      </div>
    </section>
  );
};

export default Page;
