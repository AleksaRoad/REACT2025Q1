import { FC, FormEvent, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useStorage } from '@/shared';
import { BUTTON_STYLES, CACHE_KEY } from '@/shared';

type SearchFormProps = {
  onSearch: (query: string) => void;
};

export const SearchForm: FC<SearchFormProps> = ({ onSearch }) => {
  const searchInput = useRef<HTMLInputElement | null>(null);
  const { load, save } = useStorage(CACHE_KEY.searchQuery);
  const router = useRouter();

  useEffect(() => {
    const cachedValue = load();

    if (cachedValue && searchInput.current) {
      searchInput.current.value = cachedValue;
    }
  }, [load]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchQuery = searchInput.current?.value?.trim() || '';
    save(searchQuery);
    onSearch(searchQuery);
    router.push({
      pathname: '/',
      query: { q: searchQuery },
    });
  };

  return (
    <div className="flex items-center justify-center">
      <form className="flex gap-3.5" onSubmit={handleSubmit}>
        <input
          className="dark:focus:border-blue-md dark:focus:ring-blue-lm min-w-52 rounded-lg border-none bg-white/[0.9] px-4 py-1 focus:border-amber-500 focus:ring-2 focus:ring-amber-800 focus:outline-amber-500 dark:focus:outline-violet-500"
          type="search"
          ref={searchInput}
          placeholder="Enter search term"
        />
        <button className={BUTTON_STYLES.search} type="submit">
          Search
        </button>
      </form>
    </div>
  );
};
