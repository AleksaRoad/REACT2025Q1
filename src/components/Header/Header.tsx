import { type FC } from 'react';

import { SearchForm } from '@/components';
import { ErrorDisplay } from '@/components';
import { ERROR_MESSAGES, useTheme } from '@/shared';

type HeaderProps = {
  apiErrorMessage: string | null | undefined;
  onSearch: (searchQuery: string) => void;
};

export const Header: FC<HeaderProps> = ({ apiErrorMessage, onSearch }) => {
  const { isDark, toggleTheme } = useTheme();

  const themeIcon = isDark ? '/assets/icons/sun.svg' : '/assets/icons/moon.svg';

  return (
    <header className="my-8 flex flex-col content-center items-center gap-8 md:flex-row">
      <SearchForm onSearch={onSearch} />
      {apiErrorMessage && (
        <ErrorDisplay
          errorMessage={ERROR_MESSAGES.OOOPS}
          apiErrorMessage={apiErrorMessage}
        />
      )}
      <button
        className="h-12 w-12 cursor-pointer rounded-xl bg-yellow-900 p-1 text-white dark:bg-white dark:text-black"
        onClick={toggleTheme}
      >
        <img src={themeIcon} alt="theme" className="h-10 w-10" />
      </button>
    </header>
  );
};
