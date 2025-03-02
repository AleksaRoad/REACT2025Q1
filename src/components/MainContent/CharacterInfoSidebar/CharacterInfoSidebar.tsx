import Image from 'next/image';
import { useRouter } from 'next/router';

import type { FC } from 'react';

import { BUTTON_STYLES, type RickAndMortyCharacter } from '@/shared';

type CharacterInfoSidebarProps = {
  character: RickAndMortyCharacter;
};

export const CharacterInfoSidebar: FC<CharacterInfoSidebarProps> = ({
  character,
}) => {
  const router = useRouter();

  const handleCloseSidebar = () => {
    router.push('/');
  };

  return (
    <article className="dark:bg-blue-xs flex min-w-72 flex-col items-center gap-5 rounded-4xl bg-lime-100/80 p-5">
      <header className="flex w-64 flex-col items-center justify-center gap-3 rounded-3xl text-black">
        <h1 className="m-0 max-w-full text-center text-3xl font-bold">
          {character.name}
        </h1>
        {character.image && (
          <Image
            className="rounded-full border-4 border-amber-100 dark:border-gray-200/70"
            src={character.image}
            alt={character.name}
            width={120}
            height={120}
          />
        )}
      </header>
      <main>
        <ul className="m-0 flex w-full list-none flex-col gap-3 p-0">
          <li className="flex w-full flex-col items-center justify-center">
            <span className="text-2xl font-bold">Species:</span>
            <span className="text-center">{character.species}</span>
          </li>
          <li className="flex w-full flex-col items-center justify-center">
            <span className="text-2xl font-bold">Gender:</span>
            <span className="text-center">{character.gender}</span>
          </li>
          <li className="flex w-full flex-col items-center justify-center">
            <span className="text-2xl font-bold">Status:</span>
            <span className="text-center">{character.status}</span>
          </li>
          <li className="flex w-full flex-col items-center justify-center">
            <span className="text-2xl font-bold">Type:</span>
            <span className="text-center">{character.type || 'N/A'}</span>
          </li>
          <li className="flex w-full flex-col items-center justify-center">
            <span className="text-2xl font-bold">Origin:</span>
            <span className="text-center">{character.origin}</span>
          </li>
          <li className="flex w-full flex-col items-center justify-center">
            <span className="text-2xl font-bold">Location:</span>
            <span className="text-center">{character.location}</span>
          </li>
        </ul>
      </main>
      <footer>
        <button
          className={BUTTON_STYLES.close}
          type="button"
          onClick={handleCloseSidebar}
        >
          Close
        </button>
      </footer>
    </article>
  );
};
