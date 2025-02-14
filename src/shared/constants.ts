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
  card: 'dark:bg-blue-xs dark:focus:outline-blue-xs focus:outline-focus flex w-64 cursor-pointer flex-col items-center justify-center gap-5 rounded-3xl bg-lime-100/80 p-5 text-black transition-transform duration-400 ease-in-out focus-visible:ring-2 active:scale-95 sm:hover:scale-105',
  close:
    'active:bg-yellow-900 sm:hover:bg-yellow-900 dark:active:bg-violet-500 dark:sm:hover:bg-violet-500 focus:outline-amber-200 dark:focus:outline-blue-xs w-20 cursor-pointer rounded-xl border-none bg-white py-2.5 text-black transition-colors duration-500 ease-in-out active:text-white sm:hover:text-white dark:bg-black dark:text-white dark:sm:hover:bg-violet-500 dark:sm:hover:text-white',
  home: 'active:bg-yellow-900 sm:hover:bg-yellow-900 dark:active:bg-violet-500 dark:sm:hover:bg-violet-500 focus:outline-amber-200 dark:focus:outline-blue-xs w-24 cursor-pointer rounded-xl border-none bg-yellow-950 py-2 text-white transition-colors duration-500 ease-in-out active:text-white sm:hover:text-white dark:bg-black dark:text-white dark:sm:hover:bg-violet-500 dark:sm:hover:text-white',
  pagination:
    'sm:hover:bg-blue-md focus:outline-lime-200 w-20 cursor-pointer rounded-xl border-none bg-white py-1.5 text-black transition-colors duration-500 ease-in-out active:bg-blue-700 disabled:pointer-events-none disabled:opacity-50 sm:hover:text-white',
  search:
    'dark:sm:hover:bg-violet-500 sm:hover:bg-yellow-900 active:bg-yellow-900 dark:active:bg-blue-700 focus:outline-amber-200 dark:focus:outline-blue-xs cursor-pointer rounded-xl border-none dark:bg-black bg-yellow-950 px-4 py-3 text-white transition-colors duration-1000 ease-in-out',
  theme:
    'active:bg-yellow-950 sm:hover:bg-yellow-950 dark:active:bg-yellow-200 dark:sm:hover:bg-amber-200 focus:outline-amber-200 dark:focus:outline-amber-200 cursor-pointer px-2 rounded-xl border-none bg-yellow-900 py-1 text-black transition-colors duration-1500 ease-in-out active:text-white sm:hover:text-white dark:bg-white dark:text-black dark:sm:hover:bg-amber-200 dark:hover:text-black',
};
