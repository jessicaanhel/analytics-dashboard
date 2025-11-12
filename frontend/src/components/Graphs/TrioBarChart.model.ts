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


export interface BarDataPoint {
  label: string; // Label for each bar
  value: number; // Value for the bar
}

export interface BarProps {
  timeData: BarDataPoint[];
  legendStatus?: boolean;
}
