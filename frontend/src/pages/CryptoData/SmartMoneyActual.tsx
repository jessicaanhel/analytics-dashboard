import React, { useState } from "react";
import BlackRockHoldings from "../../components/Crypto/BlackRockHoldings";
import { LineChart } from "../../components/Graphs/LineChart";
import { Button } from "@mui/material";
import { theme } from "../../theme/theme";

const SmartMoneyActual = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefreshAll = () => setRefreshKey((prev) => prev + 1);

  return (
    <div style={{ padding: 20 }}>
      <Button
        variant="outlined"
        onClick={handleRefreshAll}
        sx={{
          mb: 2,
          color: theme.palette.secondary.main,
          borderColor: theme.palette.secondary.main,
          "&:hover": { borderColor: theme.palette.primary.main },
        }}
      >
        Refresh All
      </Button>

      {/* Pass refreshKey down to both components */}
      <BlackRockHoldings/>
      <LineChart
//           endpoint="/api/bitcoin_market_cap"
            data={[
    { timeLabel: "11/10", values: [2112.46, 4.5] },
    { timeLabel: "11/11", values: [2112.5, 4.5] },
    { timeLabel: "11/12", values: [2055.6, 4.5] },
  ]}
          labels={["Market Cap (B USD)", "Stablecoin Supply Ratio"]}
          legendStatus={true}
        />
    </div>
  );
};

export default SmartMoneyActual;