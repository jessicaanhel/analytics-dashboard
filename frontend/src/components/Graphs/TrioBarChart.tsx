import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { RussianArmyTechnics } from '../../helpers/mockedDB/mockedDB.models';
import { theme } from '../../theme/theme';
import { BarInterface, BarProps } from './TrioBarChart.model';

export const TrioBarChart = ({ monthData, legendStatus = false}: BarProps): JSX.Element => {
  
  const getArtilleryValue = (monthData: RussianArmyTechnics) => Object.values(monthData.artillery);
  const getArtilleryNames= (monthData: RussianArmyTechnics) =>Object.keys(monthData.artillery);
  const getMonthName = (monthData: RussianArmyTechnics) => monthData.monthName;

    const getBarChartDataset: BarInterface = {
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
  