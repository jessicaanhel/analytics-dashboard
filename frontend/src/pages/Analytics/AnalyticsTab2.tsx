import React from "react";
import { Box, Grid } from '@mui/material';

import { LineChart } from '../../components/Graphs/LineChart';
import { TrioBarChart } from '../../components/Graphs/TrioBarChart';
import { BarDataPoint } from '../../components/Graphs/TrioBarChart.model';

const AnalyticsTab2 = () => {
    const mockedBackendData = [
      { label: 'Artillery', value: 12 },
      { label: 'Tanks', value: 5 },
      { label: 'Planes', value: 3 },
    ];

  return (
      <Box p={3}>
          <h1>War loss</h1>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <LineChart
//                 endpoint="/api/bitcoin_market_cap"
                data={[
                    { timeLabel: "11/10", values: [2112.46, 4.5] },
                    { timeLabel: "11/11", values: [2112.5, 4.5] },
                    { timeLabel: "11/12", values: [2055.6, 4.5] },
                  ]}
                labels={["Market Cap (B USD)", "Stablecoin Supply Ratio"]}
                legendStatus={true}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TrioBarChart timeData={mockedBackendData} legendStatus={true} />
            </Grid>
          </Grid>
        </Box>
      )
};

export default AnalyticsTab2;