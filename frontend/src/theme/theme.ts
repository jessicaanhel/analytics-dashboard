import { createTheme } from '@mui/material/styles';
import type { ThemeColorKey } from './theme.model';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    common: {
      black: '#0d0d0d',
      white: '#ffffff',
    },
    primary: {
      main: '#00ffcc',
      light: '#66fff9',
      dark: '#00b399',
      contrastText: '#0d0d0d',
    },
    secondary: {
      main: '#ff66ff',
      light: '#ff99ff',
      dark: '#cc00cc',
      contrastText: '#0d0d0d',
    },
    warning: {
      main: '#ffff66',
      light: '#ffff99',
      dark: '#cccc00',
      contrastText: '#0d0d0d',
    },
    info: {
      main: '#66ccff',
      light: '#99ddff',
      dark: '#3399cc',
      contrastText: '#0d0d0d',
    },
    glow: {
      primary: '0 0 10px #00ffcc, 0 0 20px #00ffcc',
      secondary: '0 0 10px #ff66ff, 0 0 20px #ff66ff',
      warning: '0 0 10px #ffff66, 0 0 20px #ffff66',
      info: '0 0 10px #66ccff, 0 0 20px #66ccff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  spacing: 8,
});

export const getInfoPanelStyle = (colorKey: ThemeColorKey) => {
  const palette = theme.palette[colorKey];
  return {
    base: {
      border: `2px solid ${palette.main}`,
      color: palette.main,
      padding: '12px 16px',
      borderRadius: 8,
      boxShadow: theme.palette.glow[colorKey],
      transition: 'all 0.3s ease-in-out',
      cursor: 'pointer',
      minWidth: '120px',
      backgroundColor: 'transparent',
    },
    hover: {
      boxShadow: theme.palette.glow[colorKey].replace(/10px/g, '15px'),
    },
  };
};
