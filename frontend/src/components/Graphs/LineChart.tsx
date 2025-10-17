import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { neonTheme } from '../../theme/neonChartTheme';
import { LineChartInterface, LineChartProps } from './LineChart.model';

export const LineChart = ({ monthData, label, legendStatus = false }: LineChartProps): JSX.Element => {
  const personnelNumber: number[] = monthData.map(m => Number(Object.values(m.personnel)));
  const monthName: string[] = monthData.map(m => m.monthName);

  const dataset: LineChartInterface = {
    labels: monthName,
    datasets: [
      {
        label,
        data: personnelNumber,
        borderColor: [neonTheme.colors.cyan],
        backgroundColor: [neonTheme.colors.cyan],
        fill: false,
        tension: 0.4,
        pointBackgroundColor: neonTheme.colors.cyan,
        pointBorderColor: neonTheme.colors.cyan,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    ...neonTheme.options,
    plugins: {
      ...neonTheme.options.plugins,
      legend: { display: legendStatus },
    },
  };

  return <Line data={dataset} options={options} />;
};
