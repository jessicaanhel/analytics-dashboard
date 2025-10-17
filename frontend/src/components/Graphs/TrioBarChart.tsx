import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { RussianArmyTechnics } from '../../helpers/mockedDB/mockedDB.models';
import { neonTheme } from '../../theme/neonChartTheme';
import { BarInterface, BarProps } from './TrioBarChart.model';

export const TrioBarChart = ({ monthData, legendStatus = false }: BarProps): JSX.Element => {
  const neonColors = [neonTheme.colors.cyan, neonTheme.colors.pink, neonTheme.colors.yellow];
  const neonBorder = neonTheme.colors.border;

  const getArtilleryValue = (month: RussianArmyTechnics) => Object.values(month.artillery);
  const getArtilleryNames = (month: RussianArmyTechnics) => Object.keys(month.artillery);

  const getBarChartDataset: BarInterface = {
    labels: getArtilleryNames(monthData[0]),
    datasets: monthData.map((month, idx) => ({
      label: month.monthName,
      data: getArtilleryValue(month),
      backgroundColor: new Array(getArtilleryValue(month).length).fill(neonColors[idx]),
      borderColor: new Array(getArtilleryValue(month).length).fill(neonBorder),
      borderWidth: 0.1,
      fill: false,
    })),
  };

  return (
    <Bar
      data={getBarChartDataset}
      options={{
        indexAxis: 'y',
        scales: neonTheme.options.scales,
        plugins: {
          legend: {
            display: legendStatus,
            labels: neonTheme.options.plugins.legend.labels,
          },
        },
      }}
    />
  );
};
