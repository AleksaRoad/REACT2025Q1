import type { FC } from 'react';

export const Spinner: FC = () => {
  return (
    <div
      role="status"
      className="dark:border-t-purple-xs dark:border-b-purple-md h-12 w-12 animate-spin rounded-full border-8 border-transparent border-t-amber-50 border-b-amber-500"
    ></div>
  );
};
