import React, { useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { Card } from '../components/UI/Card';
import { InstitutionFilter, Institution } from '../components/SmartMoney/InstitutionFilter';
import { HoldingsHistoryChart } from '../components/SmartMoney/HoldingsHistoryChart';
import { WhaleTransfersCard } from '../components/SmartMoney/WhaleTransfersCard';
import { ExchangeFlowsCard } from '../components/SmartMoney/ExchangeFlowsCard';
import { BlackRockHoldings } from '../components/Crypto/BlackRockHoldings';

export const SmartMoney: React.FC = () => {
  const { data: institutions } = useApi<Institution[]>('/api/institutions');
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (!selected && institutions && institutions.length > 0) {
      setSelected(institutions[0].id);
    }
  }, [institutions, selected]);

  return (
    <div>
      <InstitutionFilter
        institutions={institutions ?? []}
        value={selected}
        onChange={setSelected}
      />

      {selected === 'blackrock' && (
        <div>
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}
          >
            <Card>
              <div
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 600,
                  fontSize: 16,
                  marginBottom: 24,
                }}
              >
                BlackRock crypto holdings — today
              </div>
              <BlackRockHoldings />
            </Card>
            <HoldingsHistoryChart institutionId="blackrock" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 16 }}>
            <WhaleTransfersCard />
            <ExchangeFlowsCard />
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartMoney;
