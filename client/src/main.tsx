import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import '@/index.css';
import App from '@/App.tsx';
import { store } from '@/store/index.ts';
import { AlertProvider } from './components/alerts';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
        <BrowserRouter>
          <AlertProvider>
            <App />
          </AlertProvider>
        </BrowserRouter>
    </Provider>
  </StrictMode>
);