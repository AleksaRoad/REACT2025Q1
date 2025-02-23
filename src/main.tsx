import './styles.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { App } from './App';
import { ERROR_MESSAGES, ThemeProvider } from './shared';
import { store } from './store';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error(ERROR_MESSAGES.ROOT_ELEMENT_NOT_FOUND);
}

createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
