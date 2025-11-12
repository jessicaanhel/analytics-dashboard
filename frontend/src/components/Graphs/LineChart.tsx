import React from "react";
import { Box } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  InteractionMode,
} from "chart.js";
import { theme } from "../../theme/theme";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface LineChartProps {
  data: { timeLabel: string; values: number[] }[];
  labels: string[]; // labels for datasets
  legendStatus?: boolean;
}

export const LineChart = ({ data, labels, legendStatus = true }: LineChartProps) => {
  const primaryColor = theme.palette.primary.main;
  const accentColor = theme.palette.secondary.main;
  const textColor = theme.palette.text.primary;
  const gridColor = "#333";
  const bgColor = theme.palette.common.black;

  if (!data || !data.length) return <p style={{ color: "red", textAlign: "center" }}>No data</p>;

  const chartData = {
    labels: data.map(d => d.timeLabel),
    datasets: [
      {
        label: labels[0] || "Dataset 1",
        data: data.map(d => d.values[0]),
        borderColor: primaryColor,
        backgroundColor: primaryColor,
        yAxisID: "y1",
        tension: 0.3,
        fill: false,
        pointRadius: 3,
      },
      {
        label: labels[1] || "Dataset 2",
        data: data.map(d => d.values[1]),
        borderColor: accentColor,
        backgroundColor: accentColor,
        yAxisID: "y2",
        tension: 0.3,
        fill: false,
        pointRadius: 3,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "nearest" as InteractionMode,
      intersect: false,
    },
    plugins: {
      legend: { display: legendStatus, labels: { color: textColor } },
      tooltip: { mode: "index" as InteractionMode, intersect: false },
    },
    scales: {
      x: { ticks: { color: textColor }, grid: { color: gridColor } },
      y1: {
        type: "linear",
        position: "left",
        ticks: { color: textColor },
        grid: { color: gridColor },
        title: { display: true, text: labels[0], color: textColor },
      },
      y2: {
        type: "linear",
        position: "right",
        ticks: { color: textColor },
        grid: { drawOnChartArea: false },
        title: { display: true, text: labels[1], color: textColor },
      },
    },
  };

  return (
    <Box sx={{ height: 400, p: 2, backgroundColor: bgColor, borderRadius: 2 }}>
      <Line data={chartData} options={options} />
    </Box>
  );
};