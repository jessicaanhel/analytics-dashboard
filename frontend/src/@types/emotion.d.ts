import '@emotion/react';
import { ThemeType } from '../theme/theme.model';

declare module '@emotion/react' {
  export interface Theme extends ThemeType {}
}
