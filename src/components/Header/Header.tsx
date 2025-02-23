import { type FC } from 'react';

import { SearchForm, ErrorDisplay } from '@/components';
import { BUTTON_STYLES, ERROR_MESSAGES, useTheme } from '@/shared';

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
        className={BUTTON_STYLES.theme}
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        <img src={themeIcon} alt="" className="h-10 w-10" />
      </button>
    </header>
  );
};
