// export interface BarInterface {
//   labels: string[];
//   datasets: {
//     label: string;
//     backgroundColor: string[];
//     borderColor: string[];
//     borderWidth: number;
//     data: number[];
//     fill: boolean;
//   }[];
// }

export interface BarProps {
  monthData: number[];
  // firstMonth: number[];
  // secondMonth: number[];
  // thirdsMonth: number[];
  labels: string[];
  label?: string;
  legendStatus?: boolean;
}
