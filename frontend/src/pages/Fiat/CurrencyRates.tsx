import React, { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import RateInterface, BankRatesProps, RatesResponseProps from "./CurrencyRates.models";


const CurrencyRates: React.FC = () => {
  const [rates, setRates] = useState<RatesResponse>({});
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRates = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/refresh");
      const data = await response.json();
      setRates(data);

      const now = new Date();
      const formatted = now.toLocaleString("en-GB", {
        timeZone: "Europe/Warsaw",
        hour12: false,
      });
      setLastUpdated(`${formatted} +2 UTC`);
    } catch (error) {
      console.error("Error fetching rates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>💶 Fiat Currency Exchange Rates</h2>

      <div style={styles.header}>
        <div>
          Last updated:{" "}
          <strong>{lastUpdated ? lastUpdated : "Loading..."}</strong>
        </div>
        <button style={styles.button} onClick={fetchRates} disabled={loading}>
          {loading ? "Refreshing..." : "🔄 Refresh"}
        </button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Bank</th>
            <th>Currency</th>
            <th>Buy</th>
            <th>Sell</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(rates).map(([bank, currencies]) =>
            Object.entries(currencies).map(([currency, values], i) => (
              <tr key={`${bank}-${currency}-${i}`}>
                <td>{bank}</td>
                <td>{currency}</td>
                <td>{values.buy}</td>
                <td>{values.sell}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

// 💅 Inline styles
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "30px",
    fontFamily: "Inter, Arial, sans-serif",
  },
  title: {
    marginBottom: "20px",
    fontSize: "24px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  button: {
    padding: "8px 16px",
    fontSize: "16px",
    cursor: "pointer",
    border: "1px solid #ccc",
    borderRadius: "6px",
    backgroundColor: "#007bff",
    color: "white",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    borderBottom: "2px solid #ddd",
    padding: "10px",
  },
  td: {
    borderBottom: "1px solid #eee",
    padding: "10px",
  },
};

export default CurrencyRates;
