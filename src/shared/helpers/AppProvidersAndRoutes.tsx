import { Provider } from 'react-redux';
import { MemoryRouter, Routes } from 'react-router';

import type { FC, ReactNode } from 'react';

import { ThemeProvider } from '@/shared';
import { store } from '@/store';

interface AppProvidersProps {
  children: ReactNode;
  withStore?: boolean;
}

export const AppProvidersAndRoutes: FC<AppProvidersProps> = ({
  children,
  withStore = false,
}) => {
  const content = (
    <ThemeProvider>
      <MemoryRouter>
        <Routes>{children}</Routes>
      </MemoryRouter>
    </ThemeProvider>
  );

  return withStore ? <Provider store={store}>{content}</Provider> : content;
};
