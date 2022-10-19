import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { RussianArmyTechnics } from '../../helpers/mockedDB/mockedDB.models';
import { theme } from '../../theme/theme';
// import { BarProps } from './BarChart.model';

export const LineChart = ({monthData, label, legendStatus= false }: any): JSX.Element => {
  
  const getPersonnelValue = (monthData: RussianArmyTechnics) => Object.values(monthData.personnel);
  const getMonthName = (monthData: RussianArmyTechnics) => (Object.values(monthData.monthName));
  
  let personnelNumber = []
  for (let i=0; i< monthData.length; i++) {
    personnelNumber.push(Number(getPersonnelValue(monthData[i])))
    console.log(personnelNumber);
}

let monthName = []
for (let i=0; i< monthData.length; i++) {
  monthName.push((getMonthName(monthData[i])).toString())
  console.log(monthName);
}

    const getBarChartDataset = {
      labels: monthName,
    //   Object.values(monthData.monthName[0])
      datasets: [
        {
        label,
        data: personnelNumber,
        // data: getPersonnelValue(monthData[0]),
        borderColor: [theme.palette.chartColor.main],
        fill: false,
        tension: 0.4
      }
      ],
    };

    return (
      <Line
        data={getBarChartDataset}
        options={{
        //   scales: {
        //     x: {
        //       type: 'time',
        //       time: {
        //         unit: 'month',
        //       },
        //     },
        //   },
          plugins: {
            legend: {
              display: legendStatus,
            },
          },
        }}
      />
  );
};
