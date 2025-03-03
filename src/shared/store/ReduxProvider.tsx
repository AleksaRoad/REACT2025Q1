'use client';

import { Provider } from 'react-redux';

import type { ReactNode } from 'react';

import { store } from '@/shared';

type ReduxProviderProps = {
  children: ReactNode;
};

function ReduxProvider({ children }: ReduxProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;
