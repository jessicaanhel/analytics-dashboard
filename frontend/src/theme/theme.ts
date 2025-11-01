export const theme = {
  palette: {
    mode: 'dark',
    common: {
      black: '#0d0d0d',
      white: '#ffffff',
    },
    primary: {
      main: '#00ffcc', // dominant neon green
      light: '#66fff9',
      dark: '#00b399',
      contrastText: '#0d0d0d',
    },
    secondary: {
      main: '#ff66ff', // neon pink for accents
      light: '#ff99ff',
      dark: '#cc00cc',
      contrastText: '#0d0d0d',
    },
    warning: {
      main: '#ffff66', // neon yellow for highlights
      light: '#ffff99',
      dark: '#cccc00',
      contrastText: '#0d0d0d',
    },
    info: {
      main: '#66ccff', // neon blue for accents
      light: '#99ddff',
      dark: '#3399cc',
      contrastText: '#0d0d0d',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    allVariants: {
      color: '#ffffff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'uppercase',
          borderRadius: '5px',
          border: '2px solid #00ffcc',
          color: '#00ffcc',
          backgroundColor: 'transparent',
          boxShadow: '0 0 5px #00ffcc, 0 0 10px #00ffcc',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            color: '#0ff',
            borderColor: '#0ff',
            boxShadow: '0 0 10px #0ff, 0 0 20px #0ff, 0 0 30px #0ff',
            backgroundColor: 'transparent',
          },
        },
      },
    },
  },
};


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
