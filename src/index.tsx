import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { grey } from '@mui/material/colors';
import type {} from '@mui/x-data-grid/themeAugmentation';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { routes } from './_app';
import reportWebVitals from './reportWebVitals';
import { setupStore } from './store/store';

const themeLight = createTheme({
  palette: {
    background: {
      default: grey[100],
    },
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        columnSeparator: {
          display: 'none',
        },
        columnHeader: {
          fontWeight: 700,
        },
        columnHeaderTitle: {
          fontWeight: 700,
        },
        columnHeaders: ({ theme }) => ({
          backgroundColor: theme.palette.grey[300],
        }),
        root: {
          backgroundColor: 'white',
        },
      },
    },
  },
});
const store = setupStore();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <ThemeProvider theme={createTheme(themeLight)}>
      <CssBaseline />
      <RouterProvider router={routes} />
    </ThemeProvider>
  </Provider>,
);

reportWebVitals();
