import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    common: {
      black: '#121213',
      white: '#ffffff',
    },
    primary: {
      light: '#0057B8',
      main: '#FFD700',
    },
    chartColor: {
      light: '#FE4A49',
      main: '#2AB7CA',
      dark: '#FED766',
      contrastText: '#121213',
    },
    neutral: {
      main: 'transparent',
      contrastText: '#121213',
    },
    grey: {
      '100': '#f1ff1f',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
    chartColor: Palette['primary'];
  }

  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
    chartColor?: Palette['primary'];
  }
}
