import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { neonTheme } from '../../theme/neonChartTheme';
import { BarInterface, BarProps } from './TrioBarChart.model';

export const TrioBarChart = ({ timeData, legendStatus = false }: BarProps): JSX.Element => {
  const neonColors = [neonTheme.colors.cyan, neonTheme.colors.pink, neonTheme.colors.yellow];
  const neonBorder = neonTheme.colors.border;

  const labels = timeData.map(d => d.label);
  const dataValues = timeData.map(d => d.value);

  const datasets = [
    {
      label: 'Value',
      data: dataValues,
      backgroundColor: neonColors.slice(0, dataValues.length),
      borderColor: new Array(dataValues.length).fill(neonBorder),
      borderWidth: 1,
      fill: false,
    },
  ];

  const barChartData: BarInterface = {
    labels,
    datasets,
  };

  return (
    <Bar
      data={barChartData}
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