export const CACHE_KEY = {
  searchQuery: 'RAM_SearchQuery',
  theme: 'RAM_Theme',
};

export const PAGE_SIZE = 10;

export const ERROR_MESSAGES = {
  FAILED_TO_FETCH_DATA: 'Failed to fetch data:',
  HTTP_ERROR: 'HTTP error! Status: ',
  NO_RESULTS_FOUND: 'No results found for your search for ',
  NO_THEME_PROVIDER: 'useTheme must be used within a ThemeProvider',
  NOT_FOUND: 'The page you are looking for does not exist.',
  OOOPS: 'Ooops! Something went wrong!',
  PLEASE_TRY_AGAIN: 'Please try using different keywords.',
  ROOT_ELEMENT_NOT_FOUND: 'Root element not found',
};

export const BUTTON_STYLES = {
  search:
    'dark:sm:hover:bg-violet-500 sm:hover:bg-yellow-900 active:bg-yellow-900 dark:active:bg-blue-700 focus:outline-amber-200 dark:focus:outline-blue-xs cursor-pointer rounded-xl border-none dark:bg-black bg-yellow-950 px-4 py-3 text-white transition-colors duration-500 ease-in-out',
};
