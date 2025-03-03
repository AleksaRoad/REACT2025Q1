import { Suspense, type FC } from 'react';

import { PaginationControl } from '@/components';

import { SelectionActions } from './SelectionActions';

type FooterProps = {
  showPagination: boolean;
  totalPages?: number;
};

export const Footer: FC<FooterProps> = ({ showPagination, totalPages = 1 }) => {
  return (
    <footer className="mt-auto flex flex-col items-center justify-center gap-5">
      <SelectionActions />
      {showPagination && (
        <Suspense fallback={<div>Loading...</div>}>
          <PaginationControl totalPages={totalPages} />
        </Suspense>
      )}
    </footer>
  );
};
