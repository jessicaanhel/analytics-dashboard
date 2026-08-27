import React from 'react';
import { Box, Grid } from '@mui/material';

import { LineChart } from '../../components/Graphs/LineChart';
import { TrioBarChart } from '../../components/Graphs/TrioBarChart';

import { septemberLosses, octoberLosses, augustLosses } from '../../helpers/mockedDB/mockedDB';

const AnalyticsTab2 = () => {
  return (
    <Box p={3}>
      <h1>War loss</h1>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <LineChart
            monthData={[augustLosses, septemberLosses, octoberLosses]}
            label="Loss of personnel"
            legendStatus={true}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TrioBarChart
            monthData={[augustLosses, septemberLosses, octoberLosses]}
            legendStatus={true}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsTab2;
