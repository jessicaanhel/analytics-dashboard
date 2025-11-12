export interface DatasetConfig {
  label: string;
  data: number[];
  borderColor: string | string[];
  backgroundColor?: string | string[];
  fill: boolean;
  tension: number;
  pointBackgroundColor?: string;
  pointBorderColor?: string;
  pointHoverRadius?: number;
}

export interface LineChartInterface {
  labels: string[];
  datasets: DatasetConfig[];
}

export interface TimePointEntry {
  timeLabel: string;
  values: number[];
}

export interface LineChartProps {
    endpoint: string;
    labels: string[];
    legendStatus?: boolean;
}

export interface UseAPiDataProps {
    data: { timeLabel: string; values: number[] }[]
}

export interface LineChartWithApiProps extends Omit<LineChartProps, "timeData"> {
  endpoint: string;
}

import { ChartOptions, InteractionMode } from "chart.js";

