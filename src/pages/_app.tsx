import App, { type AppProps } from 'next/app';
import { Provider } from 'react-redux';

import '@/styles/globals.css';

import type { AppContext } from 'next/app';

import { getCharacters } from '@/api';
import {
  PAGE_SIZE,
  store,
  ThemeProvider,
  type RickAndMortyCharacter,
} from '@/shared';
import { getSearchParamHelper, parseNumberHelper } from '@/shared';

import Layout from './my-layout';

type AppOwnProps = {
  characters: Array<RickAndMortyCharacter>;
  searchQuery: string;
  totalPages: number;
  currentPage: number;
};

export default function MyApp({
  characters,
  Component,
  currentPage,
  pageProps,
  searchQuery,
  totalPages,
}: AppProps & AppOwnProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Layout
          characters={characters}
          searchQuery={searchQuery}
          currentPage={currentPage}
          totalPages={totalPages}
        >
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  const searchQuery = getSearchParamHelper(context.router.query.q);
  const currentPage = parseNumberHelper(
    getSearchParamHelper(context.router.query.page)
  );
  const ctx = await App.getInitialProps(context);
  const { characters, totalPages } = await getCharacters({
    limit: PAGE_SIZE,
    page: currentPage,
    q: searchQuery,
  });

  return { ...ctx, characters, currentPage, searchQuery, totalPages };
};
