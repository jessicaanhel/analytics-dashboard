import { RussianArmyTechnics } from '../../helpers/mockedDB/mockedDB.models';

export interface LineChartInterface {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string[];
    fill: boolean;
    tension: number;
    backgroundColor?: string[];
    pointBackgroundColor?: string;
    pointBorderColor?: string;
    pointHoverRadius?: number;
  }[];
}

export interface LineChartProps {
  monthData: RussianArmyTechnics[];
  label: string;
  legendStatus?: boolean;
}
