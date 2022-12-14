import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { routesConfig } from './routes/routes-config';

const themeLight = createTheme({
  palette: {
    background: {
      default: grey[100],
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={createTheme(themeLight)}>
      <CssBaseline />
      <RouterProvider router={routesConfig} />
    </ThemeProvider>
  </React.StrictMode>,
);

reportWebVitals();
