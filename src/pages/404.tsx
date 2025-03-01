import Image from 'next/image';
import Link from 'next/link';

import { BUTTON_STYLES, CACHE_KEY, ERROR_MESSAGES, useStorage } from '@/shared';

export default function NotFound() {
  const { save } = useStorage(CACHE_KEY.searchQuery);

  const handleClick = () => {
    save('');
  };

  return (
    <section className="h-full w-full bg-[url('/assets/images/bg.webp')] bg-cover bg-fixed bg-center dark:bg-[url('/assets/images/bg1.webp')]">
      <article className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-5">
          <Image
            src="/assets/images/404.webp"
            alt="404"
            width={400}
            height={400}
            className="h-auto w-full"
            priority
          />
          <div className="dark:bg-blue-xs flex w-80 flex-col items-center gap-5 rounded-3xl bg-lime-100/80 p-5 text-center text-2xl text-red-800 md:w-72">
            <p className="text-6xl text-red-600">404</p>
            <p>{ERROR_MESSAGES.NOT_FOUND}</p>
            <Link
              href="/"
              className={BUTTON_STYLES.home}
              onClick={handleClick}
              replace
            >
              Home
            </Link>
          </div>
        </div>
      </article>
    </section>
  );
}
