import { type AppProps } from 'next/app';
import { Provider } from 'react-redux';

import '@/styles/globals.css';
import { store, ThemeProvider } from '@/shared';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
