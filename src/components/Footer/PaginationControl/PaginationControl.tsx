import type { FC } from 'react';

import { BUTTON_STYLES } from '@/shared';

type PaginationControlProps = {
  currentPage: number;
  totalPages: number;
  onPreviousPage: VoidFunction;
  onNextPage: VoidFunction;
};

export const PaginationControl: FC<PaginationControlProps> = ({
  currentPage,
  onNextPage,
  onPreviousPage,
  totalPages,
}: PaginationControlProps) => {
  return (
    <div className="my-5 flex items-center justify-center gap-2">
      <button
        className={BUTTON_STYLES.pagination}
        onClick={onPreviousPage}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <div className="flex w-32 items-center justify-center text-white">
        <span>
          Page {currentPage} of {totalPages}
        </span>
      </div>
      <button
        className={BUTTON_STYLES.pagination}
        onClick={onNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};
