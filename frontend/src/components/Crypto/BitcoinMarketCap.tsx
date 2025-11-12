import React, { useState, useEffect } from "react";
import { LineChart } from "../Graphs/LineChart";
import { useApi } from "../../hooks/useApi";


export const BitcoinMarketCapChart = () => {
  const { data, loading, error } = useApi("/api/bitcoin_market_cap");

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (error || !data) return <p style={{ textAlign: "center" }}>Failed to load data</p>;

  return (
    <div>
      <h2>Bitcoin Market Cap & SSR</h2>
      <LineChart
        timeData={data}
        label={["Market Cap (B USD)", "Stablecoin Supply Ratio"]}
        legendStatus={true}
      />
    </div>
  );
};
