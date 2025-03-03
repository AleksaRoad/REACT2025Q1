'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, type FC, type FormEvent, useEffect } from 'react';

import { BUTTON_STYLES } from '@/shared';

export const SearchForm: FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const queryFromURL = searchParams.get('q') || '';
    setSearchQuery(queryFromURL);
  }, [searchParams]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const query = searchQuery.trim();
    if (query === '') {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('q');
      router.push(`/?${params.toString()}`, { scroll: false });
    } else {
      const queryString = new URLSearchParams({ q: query }).toString();
      router.push(`/?${queryString}`, { scroll: false });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form className="flex gap-3.5" onSubmit={handleSubmit}>
        <input
          className="dark:focus:border-blue-md dark:focus:ring-blue-lm min-w-52 rounded-lg border-none bg-white/[0.9] px-4 py-1 focus:border-amber-500 focus:ring-2 focus:ring-amber-800 focus:outline-amber-500 dark:focus:outline-violet-500"
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter search term"
        />
        <button className={BUTTON_STYLES.search} type="submit">
          Search
        </button>
      </form>
    </div>
  );
};
