import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    common: {
        black: '#121213',
        white: '#ffffff',
      },
    primary: {
        light: '#0057B8',
        main: '#FFD700'
    },
    grey: {
      '100': '#f1ff1f'
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});