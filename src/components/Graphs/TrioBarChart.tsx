import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { RussianArmyTechnics } from '../../helpers/mockedDB/mockedDB.models';
import { theme } from '../../theme/theme';
// import { BarProps } from './BarChart.model';

export const TrioBarChart = ({ monthData, labels, label, legendStatus = false}: any): JSX.Element => {
  
  const getArtilleryValue = (monthData: RussianArmyTechnics) => Object.values(monthData.artillery);
  const getArtilleryNames= (monthData: RussianArmyTechnics) =>Object.keys(monthData.artillery);
  const getMonthName = (monthData: RussianArmyTechnics) => (Object.values(monthData.monthName)).toString();

    const getBarChartDataset = {
      labels: getArtilleryNames(monthData[0]),
      datasets: [
        {
          label: getMonthName(monthData[0]),
          backgroundColor: [theme.palette.chartColor.dark],
          borderColor: [theme.palette.neutral.main],
          borderWidth: 1,
          data: getArtilleryValue(monthData[0]),
          fill: false,
        },
        {
          label: getMonthName(monthData[1]),
          backgroundColor: [theme.palette.chartColor.main],
          borderColor: [theme.palette.neutral.main],
          borderWidth: 1,
          data: getArtilleryValue(monthData[1]),
          fill: false,
        },
        {
          label: getMonthName(monthData[2]),
          backgroundColor: [theme.palette.chartColor.light],
          borderColor: [theme.palette.neutral.main],
          borderWidth: 1,
          data: getArtilleryValue(monthData[2]),
          fill: false,
        },
      ],
    };

    return (
      <Bar
        data={getBarChartDataset}
        options={{
          indexAxis: 'y',
          scales: {
            x: {
              stacked: true,
            },
  
            y: {
              stacked: true,
              suggestedMin: 100,
              suggestedMax: 100,
            },
          },
          plugins: {
            legend: {
              display: true,
            },
          },
        }}
      />
    );
  };
  