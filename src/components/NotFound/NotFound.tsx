import { useNavigate } from 'react-router';

import type { FC } from 'react';

import { BUTTON_STYLES, ERROR_MESSAGES } from '@/shared';

export const NotFound: FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/', { replace: true });
  };

  return (
    <section className="h-full w-full bg-[url('/assets/images/bg.webp')] bg-cover bg-fixed bg-center dark:bg-[url('/assets/images/bg1.webp')]">
      <article className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-5">
          <img className="h-80" src="assets/images/404.webp" alt="404" />
          <div className="dark:bg-blue-xs flex w-80 flex-col items-center gap-5 rounded-3xl bg-lime-100/80 p-5 text-center text-2xl text-red-800 md:w-72">
            <p className="text-6xl text-red-600">404</p>
            <p>{ERROR_MESSAGES.NOT_FOUND}</p>
            <button className={BUTTON_STYLES.home} onClick={handleGoHome}>
              Home
            </button>
          </div>
        </div>
      </article>
    </section>
  );
};
