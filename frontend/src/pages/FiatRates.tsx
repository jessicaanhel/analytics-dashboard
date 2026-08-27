import React from 'react';
import { useApi } from '../hooks/useApi';
import { Card } from '../components/UI/Card';
import { thStyle, tdStyle } from '../components/UI/table';
import CurrencyTable from '../components/Graphs/CurrencyTable';
import { CurrencyTableProps } from '../components/Graphs/CurrencyTable.model';
import { changeColor } from '../theme/tokens';
import { formatPercent } from '../utils/format';

interface FiatPair {
  pair: string;
  rate: string;
  change_24h_pct: number;
}

export const FiatRates: React.FC = () => {
  const { data: pairs } = useApi<FiatPair[]>('/api/fiat/pairs');
  const { data: bankRates } = useApi<CurrencyTableProps['data']>('/refresh');

  return (
    <div>
      <Card style={{ maxWidth: 640, marginBottom: 20 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr>
              <th style={thStyle}>Pair</th>
              <th style={thStyle}>Rate</th>
              <th style={thStyle}>24h</th>
            </tr>
          </thead>
          <tbody>
            {pairs?.map((f) => (
              <tr key={f.pair}>
                <td style={tdStyle}>{f.pair}</td>
                <td style={tdStyle}>{f.rate}</td>
                <td style={tdStyle}>
                  <span style={{ color: changeColor(f.change_24h_pct) }}>
                    {formatPercent(f.change_24h_pct)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card style={{ overflow: 'auto' }}>
        <div
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 600,
            fontSize: 16,
            marginBottom: 12,
          }}
        >
          Bank exchange rates
        </div>
        <CurrencyTable data={bankRates ?? {}} />
      </Card>
    </div>
  );
};

export default FiatRates;
