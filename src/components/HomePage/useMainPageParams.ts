import { useMemo } from 'react';
import { useLocation } from 'react-router';

export const useHomePageParams = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  let currentPage = 1;
  const parsePageNumber = Number(searchParams.get('page'));

  currentPage =
    Number.isNaN(parsePageNumber) || parsePageNumber <= 0 ? 1 : parsePageNumber;

  return useMemo(
    () => ({
      currentPage,
    }),
    [currentPage]
  );
};
