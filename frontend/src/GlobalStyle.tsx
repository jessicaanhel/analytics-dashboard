import { Global, css } from '@emotion/react';
import { theme } from './theme/theme';

export const GlobalStyle = () => (
  <Global
    styles={css`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        padding: 0;
        font-family: ${theme.typography.fontFamily};
        background-color: ${theme.palette.common.black};
        color: ${theme.palette.primary.main};
      }
      a {
        color: inherit;
        text-decoration: none;
      }
    `}
  />
);
