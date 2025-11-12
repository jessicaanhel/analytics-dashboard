import React from "react";
import Plot from "react-plotly.js";
import { useApi } from "../../hooks/useApi";

export const BlackRockHoldings = () => {
  const { data, loading, error } = useApi("/api/blackrock");

  if (loading) return <p style={{ textAlign: "center" }}>Loa§   1awz`ding data...</p>;
  if (error || !data) return <p style={{ textAlign: "center" }}>Failed to load data</p>;

  const btcValue = data.btc_value_usd / 1e9;
  const ethValue = data.eth_value_usd / 1e9;

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2>BlackRock Crypto Holdings</h2>
      <p style={{ color: "#888" }}>
        Updated: {new Date(data.timestamp).toLocaleString()}
      </p>

      <Plot
        data={[
          {
            x: ["Bitcoin (IBIT)", "Ethereum (ETHA)"],
            y: [btcValue, ethValue],
            type: "bar",
            marker: { color: ["#f7931a", "#3c3c3d"] },
            text: [`${btcValue.toFixed(2)}B USD`, `${ethValue.toFixed(2)}B USD`],
            textposition: "auto",
          },
        ]}
        layout={{
          paper_bgcolor: "#0d0d0d",
          plot_bgcolor: "#0d0d0d",
          font: { color: "#00ffcc" },
          title: "Total Value of BlackRock Holdings",
          yaxis: { title: "Billion USD", color: "#00ffcc" },
          xaxis: { color: "#00ffcc" },
        }}
        style={{ width: "80%", margin: "auto" }}
      />
    </div>
  );
};

export default BlackRockHoldings;
