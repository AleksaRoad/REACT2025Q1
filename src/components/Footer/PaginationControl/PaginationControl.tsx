'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import type { FC } from 'react';

import { BUTTON_STYLES } from '@/shared';

type PaginationControlProps = {
  totalPages: number;
};

const PaginationControl: FC<PaginationControlProps> = ({
  totalPages,
}: PaginationControlProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;

  const updatePageParam = (newPage: number) => {
    const page = Math.max(1, Math.min(newPage, totalPages));
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="my-5 flex items-center justify-center gap-2">
      <button
        className={BUTTON_STYLES.pagination}
        onClick={() => updatePageParam(currentPage - 1)}
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
        onClick={() => updatePageParam(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControl;
