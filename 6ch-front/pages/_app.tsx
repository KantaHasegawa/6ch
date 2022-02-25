import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';

function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider>
      <Component {...pageProps} />
    </SnackbarProvider>
  );
}

export default App;
