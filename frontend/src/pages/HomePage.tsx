import React from 'react';
import BlackRockHoldings from '../components/Crypto/BlackRockHoldings';
import { FilterHeader } from '../components/Filtering/FilterHeader';
import InfoPanel from "../components/Crypto/InfoPanel";


export const HomePage = (): JSX.Element => {

    return (
      <>
        {/* Info panels */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "20px" }}>
          <InfoPanel title="% Freed/Fair" value="72%" color="yellow" />
          <InfoPanel title="New Investors" value="1200" color="pink" />
          <InfoPanel title="BTC Flow" value="15.3k" color="blue" />
        </div>

        {/* Main content */}
          <BlackRockHoldings />
      </>
    );
}
export default HomePage;