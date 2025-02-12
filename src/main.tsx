import './styles.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';
import { ERROR_MESSAGES, ThemeProvider } from './shared';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error(ERROR_MESSAGES.ROOT_ELEMENT_NOT_FOUND);
}

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
