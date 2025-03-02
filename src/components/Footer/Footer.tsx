import type { FC } from 'react';

import { PaginationControl } from '@/components';

import { SelectionActions } from './SelectionActions';

type FooterProps = {
  showPagination: boolean;
  currentPage: number;
  totalPages?: number;
  onPreviousPage: (num: number) => void;
  onNextPage: (num: number) => void;
};

export const Footer: FC<FooterProps> = ({
  currentPage,
  onNextPage,
  onPreviousPage,
  showPagination,
  totalPages = 1,
}) => {
  return (
    <footer className="mt-auto flex flex-col items-center justify-center gap-5">
      <SelectionActions />
      {showPagination && (
        <PaginationControl
          currentPage={currentPage}
          totalPages={totalPages}
          onPreviousPage={() => onPreviousPage(currentPage - 1)}
          onNextPage={() => onNextPage(currentPage + 1)}
        />
      )}
    </footer>
  );
};
