import { RussianArmyTechnics } from '../../helpers/mockedDB/mockedDB.models';
export interface BarInterface {
  labels: string[];
  datasets: {
    label: string;
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
    data: number[];
    fill: boolean;
  }[];
}
export interface BarProps {
  monthData: RussianArmyTechnics[];
  legendStatus?: boolean;
}
