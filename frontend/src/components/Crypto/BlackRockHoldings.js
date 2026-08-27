import React from "react";
import Plot from "react-plotly.js";
import { useApi } from "../../hooks/useApi";

const BlackRockHoldings = () => {
  const { data, loading, error } = useApi("/api/blackrock");

  if (loading) return <p style={{ textAlign: "center" }}>Loading data...</p>;
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
          title: "Total Value of BlackRock Holdings (Billions USD)",
          yaxis: { title: "Billion USD" },
          plot_bgcolor: "#fafafa",
          paper_bgcolor: "#fafafa",
        }}
        style={{ width: "80%", margin: "auto" }}
      />
    </div>
  );
};

export default BlackRockHoldings;
