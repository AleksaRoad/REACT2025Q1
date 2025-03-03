'use client';

import Image from 'next/image';
import { type FC } from 'react';

import { SearchForm, ErrorDisplay } from '@/components';
import { BUTTON_STYLES, ERROR_MESSAGES, useTheme } from '@/shared';

type HeaderProps = {
  apiErrorMessage: string | null | undefined;
};

export const Header: FC<HeaderProps> = ({ apiErrorMessage }) => {
  const { isDark, toggleTheme } = useTheme();

  const themeIcon = isDark ? '/assets/icons/sun.svg' : '/assets/icons/moon.svg';

  return (
    <header className="my-8 flex flex-col content-center items-center gap-8 md:flex-row">
      <SearchForm />
      {apiErrorMessage && (
        <ErrorDisplay
          errorMessage={ERROR_MESSAGES.OOOPS}
          apiErrorMessage={apiErrorMessage}
        />
      )}
      <button
        className={BUTTON_STYLES.theme}
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        <Image src={themeIcon} alt="" width={40} height={40} priority />
      </button>
    </header>
  );
};
