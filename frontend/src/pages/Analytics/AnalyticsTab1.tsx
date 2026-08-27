import React from 'react';
import Plot from 'react-plotly.js';
import { Box, Grid } from '@mui/material';

// Mocked data
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const mockData1 = [10, 15, 13, 17, 20, 18];
const mockData2 = [5, 9, 14, 12, 8, 10];
const mockData3 = [8, 12, 11, 9, 14, 16];
const mockData4 = [20, 22, 18, 25, 24, 23];
const mockData5 = [15, 18, 16, 19, 17, 20];

const chartLayout = {
  paper_bgcolor: '#0d0d0d',
  plot_bgcolor: '#0d0d0d',
  font: { color: '#00ffcc' },
  margin: { t: 40, b: 40, l: 40, r: 40 },
};

const AnalyticsTab1 = () => {
  return (
    <Box p={3}>
      <h1>Website Metrics Overview</h1>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Plot
            data={[
              {
                x: months,
                y: mockData1,
                type: 'scatter',
                mode: 'lines+markers',
                line: { color: '#00ffcc' },
                marker: { color: '#00ffcc' },
              },
            ]}
            layout={{ ...chartLayout, title: { text: 'Visitors per Month' } }}
            style={{ width: '100%', height: '250px' }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Plot
            data={[
              {
                x: months,
                y: mockData2,
                type: 'bar',
                marker: { color: '#ff66ff' },
              },
            ]}
            layout={{ ...chartLayout, title: { text: 'New Signups' } }}
            style={{ width: '100%', height: '250px' }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Plot
            data={[
              {
                labels: ['Chrome', 'Firefox', 'Safari', 'Edge'],
                values: [50, 20, 20, 10],
                type: 'pie',
                marker: { colors: ['#00ffcc', '#ff66ff', '#ffff66', '#66ccff'] },
              },
            ]}
            layout={{ ...chartLayout, title: { text: 'Browser Usage' } }}
            style={{ width: '100%', height: '250px' }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Plot
            data={[
              {
                x: months,
                y: mockData3,
                type: 'scatter',
                mode: 'lines',
                line: { color: '#ffff66' },
              },
            ]}
            layout={{ ...chartLayout, title: { text: 'Active Users' } }}
            style={{ width: '100%', height: '250px' }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Plot
            data={[
              {
                x: months,
                y: mockData4,
                type: 'bar',
                marker: { color: '#66ccff' },
              },
            ]}
            layout={{ ...chartLayout, title: { text: 'Page Views' } }}
            style={{ width: '100%', height: '250px' }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Plot
            data={[
              {
                x: months,
                y: mockData5,
                type: 'scatter',
                mode: 'lines+markers',
                line: { color: '#ffcc00' },
                marker: { color: '#ffcc00' },
              },
            ]}
            layout={{ ...chartLayout, title: { text: 'Conversion Rate (%)' } }}
            style={{ width: '100%', height: '250px' }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsTab1;
