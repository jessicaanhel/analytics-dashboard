import '@mui/material/styles';

// Define PaletteGlow globally first
export interface PaletteGlow {
  primary: string;
  secondary: string;
  warning: string;
  info: string;
}

// Extend MUI theme
declare module '@mui/material/styles' {
  interface Palette {
    glow: PaletteGlow;
  }

  interface PaletteOptions {
    glow?: PaletteGlow;
  }

  interface Theme {
    palette: Palette;
  }

  interface ThemeOptions {
    palette?: PaletteOptions;
  }
}

// Optional: keep your custom ThemeType for internal typings
export interface ThemeType {
  palette: {
    mode: 'light' | 'dark';
    common: {
      black: string;
      white: string;
    };
    primary: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    secondary: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    warning: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    info: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    glow: PaletteGlow;
  };
  typography: {
    fontFamily: string;
  };
  spacing: number;
}

export type ThemeColorKey = keyof Pick<
  ThemeType['palette'],
  'primary' | 'secondary' | 'warning' | 'info'
>;
