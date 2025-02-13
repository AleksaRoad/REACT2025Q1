import { type FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import { CharacterPage, HomePage, NotFound } from '@/components';

export const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route index element={<CharacterPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/404" replace />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
