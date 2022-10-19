import { RussianArmyTechnics } from '../../helpers/mockedDB/mockedDB.models';

export interface LineChartInterface {
  labels: string[];
  datasets: {
    label: string;
    borderColor: string[];
    data: number[];
    fill: boolean;
    tension: number;
  }[];
}
export interface LineChartProps {
  monthData: RussianArmyTechnics[];
  label: string;
  legendStatus?: boolean;
}
