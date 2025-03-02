import { useRouter } from 'next/router';
import { useRef, useEffect, useState } from 'react';

import type { FC, FormEvent } from 'react';

import { BUTTON_STYLES } from '@/shared';

type SearchFormProps = {
  onSearch: (query: string) => void;
};

export const SearchForm: FC<SearchFormProps> = ({ onSearch }) => {
  const searchInput = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const [initialQuery, setInitialQuery] = useState('');

  useEffect(() => {
    if (router.isReady) {
      const query = (router.query.q as string) || '';
      setInitialQuery(query);
      if (searchInput.current) {
        searchInput.current.value = query;
      }
    }
  }, [router.query.q, router.isReady]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchQuery = searchInput.current?.value?.trim() || '';
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
          defaultValue={initialQuery}
        />
        <button className={BUTTON_STYLES.search} type="submit">
          Search
        </button>
      </form>
    </div>
  );
};
