import { type SerializedError } from '@reduxjs/toolkit';
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

type getErrorMessageProps = {
  apiErrorMessage?: string;
  error?: FetchBaseQueryError | SerializedError;
};

export const getErrorMessage = ({
  apiErrorMessage = '',
  error,
}: getErrorMessageProps) => {
  if (!error) return '';

  if ('status' in error) {
    return 'error' in error ? error.error : JSON.stringify(error.data);
  }

  return error.message ?? apiErrorMessage;
};
