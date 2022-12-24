import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { grey } from '@mui/material/colors';
import type {} from '@mui/x-data-grid/themeAugmentation';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { routes } from './_app';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './routes/AuthProvider';
import { setupStore } from './store/store';
import { theme } from './styles/styles';

const store = setupStore();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={createTheme(theme)}>
        <CssBaseline />
        <AuthProvider>
          <RouterProvider router={routes} />
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
