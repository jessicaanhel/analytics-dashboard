import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { theme } from './theme/theme';
import { ThemeProvider } from '@emotion/react';
import { GlobalStyle } from './GlobalStyle'
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle/>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();