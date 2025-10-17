import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { RussianArmyTechnics } from '../../helpers/mockedDB/mockedDB.models';
import { theme } from '../../theme/theme';
import { LineChartInterface, LineChartProps } from './LineChart.model';
// import { BarProps } from './BarChart.model';

export const LineChart = ({monthData, label, legendStatus= false }: LineChartProps): JSX.Element => {
  
  const getPersonnelValue = (monthData: RussianArmyTechnics) => Object.values(monthData.personnel);
  const getMonthName = (monthData: RussianArmyTechnics) => monthData.monthName;
  
  let personnelNumber = []
  for (let i=0; i< monthData.length; i++) {
    personnelNumber.push(Number(getPersonnelValue(monthData[i])));
}

  let monthName = []
  for (let i=0; i< monthData.length; i++) {
    monthName.push((getMonthName(monthData[i])).toString());
  }

  const getLineChartDataset: LineChartInterface = {
    labels: monthName,
    datasets: [
      {
      label,
      data: personnelNumber,
      borderColor: [theme.palette.chartColor.main],
      fill: false,
      tension: 0.4
    }
    ],
  };

    return (
      <Line
        data={getLineChartDataset}
        options={{
          plugins: {
            legend: {
              display: legendStatus,
            },
          },
        }}
      />
  );
};
