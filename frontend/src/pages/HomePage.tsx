import React from 'react';
import BlackRockHoldings from '../components/Crypto/BlackRockHoldings';
import InfoPanel from '../components/Crypto/InfoPanel';

export const HomePage = (): JSX.Element => {
  return (
    <>
      {/* Info panels */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        <InfoPanel title="% Freed/Fair" value="72%" color="warning" />
        <InfoPanel title="New Investors" value="1200" color="secondary" />
        <InfoPanel title="BTC Flow" value="15.3k" color="info" />
      </div>

      {/* Main content */}
      <BlackRockHoldings />
    </>
  );
};
export default HomePage;
