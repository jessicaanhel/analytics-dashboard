import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import { theme } from './theme/theme';

test('renders the dashboard overview by default', () => {
  render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>,
  );
  expect(screen.getByRole('heading', { name: 'Overview' })).toBeInTheDocument();
});
