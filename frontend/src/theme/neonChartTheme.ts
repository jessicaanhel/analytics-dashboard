export const neonTheme = {
  colors: {
    cyan: "#00ffcc",
    pink: "#ff66ff",
    yellow: "#ffff66",
    blue: "#66ccff",
    border: "#00ffcc",
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#00ffcc",
          font: { size: 14, weight: "bold" },
        },
      },
    },
    scales: {
      x: {
        grid: { color: "#00ffcc33" },
        ticks: { color: "#00ffcc" },
      },
      y: {
        grid: { color: "#00ffcc33" },
        ticks: { color: "#00ffcc" },
      },
    },
  },
};
