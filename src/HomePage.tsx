import { Box, Grid } from '@mui/material';
import React from 'react';
import { LineChart } from './components/Graphs/LineChart';
import { TrioBarChart } from './components/Graphs/TrioBarChart';
import { septemberLosses, octoberLosses, augustLosses} from './helpers/mockedDB/mockedDB';
// import { RussianArmyTechnics } from './helpers/mockedDB/mockedDB.models';


export const HomePage = (): JSX.Element => {

  return (
    <Box p={5}>
        <Grid container spacing={4}>
          <Grid item xs={5}>
            <TrioBarChart monthData={[octoberLosses, septemberLosses, augustLosses]} legendStatus = {true} />
          </Grid>
          <Grid item xs={5}>
            <LineChart monthData={[octoberLosses, septemberLosses, augustLosses]} label="Loss of personnel"/>
          </Grid>
        </Grid>
    </Box>
  );
};
