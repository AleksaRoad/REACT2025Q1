// import { CharacterPage } from '@/components';
import { MainContent, Spinner } from '@/components';
import { type RickAndMortyCharacter } from '@/shared';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export const getServerSideProps = (async () => {
  const res = await fetch(
    'https://rickandmortyapi-sigma.vercel.app/api/character'
  );
  const RAM = await res.json();
  return { props: { RAM } };
}) satisfies GetServerSideProps<{
  RAM: RickAndMortyCharacter[];
}>;

import localFont from 'next/font/local';

export const ramFont = localFont({
  src: '../../public/assets/fonts/ramFont.woff2',
});

export default function Home({
  RAM,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!RAM) {
    return <Spinner />;
  }

  // const {load, save} = useStorage(CACHE_KEY.searchQuery);

  return (
    <section className="h-full w-full bg-[url('/assets/images/bg.webp')] bg-cover bg-fixed bg-center dark:bg-[url('/assets/images/bg1.webp')]">
      <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col items-center justify-center p-5">
        <h1 className="font-ramFont p-6 text-center text-6xl text-yellow-950 dark:text-white">
          Rick and Morty Characters
        </h1>
        <MainContent characters={RAM} searchQuery="" />
      </div>
    </section>
  );
}
