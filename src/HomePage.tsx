import { Box, Grid } from '@mui/material';
import React from 'react';

export const HomePage = (): JSX.Element => {
 
  return (
    <Box p={5}>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <h1>Hello</h1>
          </Grid>
          <Grid item xs={4}>
          </Grid>
        </Grid>
    </Box>
  );
};
