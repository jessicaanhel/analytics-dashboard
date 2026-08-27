import React from 'react';
import { useApi } from '../hooks/useApi';
import { Card } from '../components/UI/Card';
import { Pill } from '../components/UI/Pill';
import { thStyle, tdStyle } from '../components/UI/table';
import { BlackRockHoldings } from '../components/Crypto/BlackRockHoldings';
import { COLORS, changeColor } from '../theme/tokens';
import { formatUsdMillions, formatPercent, formatCompactNumber } from '../utils/format';

interface OverviewKpis {
  net_smart_money_flow_24h: number;
  exchange_netflow_24h: number;
  whale_tx_volume_24h: number;
  spot_etf_net_flow_week: number;
}

interface InstitutionalFlows {
  pct_freed_fair: number;
  new_investors: number;
  btc_flow: number;
}

interface WhaleTransfer {
  asset: string;
  qty_label: string;
  usd: number;
  direction: 'Inflow' | 'Outflow';
  route: string;
  time_label: string;
}

interface WhaleTransfersResponse {
  threshold_usd: number;
  transfers: WhaleTransfer[];
}

interface ExchangeFlow {
  exchange: string;
  value_musd: number;
}

interface Future {
  asset: string;
  open_interest_label: string;
  change_24h_pct: number;
  funding_label: string;
}

interface EtfFlow {
  week: string;
  value_musd: number;
}

const KpiCard: React.FC<{ label: string; value: string; color?: string }> = ({
  label,
  value,
  color,
}) => (
  <Card>
    <div style={{ fontSize: 12, color: COLORS.textLabel, marginBottom: 8 }}>{label}</div>
    <div
      style={{
        fontSize: 28,
        fontFamily: "'Manrope', sans-serif",
        fontWeight: 600,
        color: color ?? COLORS.textPrimary,
      }}
    >
      {value}
    </div>
  </Card>
);

export const Overview: React.FC = () => {
  const { data: kpis } = useApi<OverviewKpis>('/api/overview');
  const { data: institutional } = useApi<InstitutionalFlows>('/api/smart-money/institutional');
  const { data: whaleData } = useApi<WhaleTransfersResponse>('/api/smart-money/whale-transfers');
  const { data: exchangeFlows } = useApi<ExchangeFlow[]>('/api/smart-money/exchange-flows');
  const { data: futures } = useApi<Future[]>('/api/smart-money/futures');
  const { data: etfFlows } = useApi<EtfFlow[]>('/api/smart-money/etf-flows');

  const maxExchangeAbs = exchangeFlows
    ? Math.max(...exchangeFlows.map((f) => Math.abs(f.value_musd)))
    : 1;
  const maxEtfAbs = etfFlows ? Math.max(...etfFlows.map((f) => Math.abs(f.value_musd))) : 1;

  return (
    <div>
      {kpis && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gap: 16,
            marginBottom: 20,
          }}
        >
          <KpiCard
            label="Net smart money flow (24h)"
            value={formatUsdMillions(kpis.net_smart_money_flow_24h)}
            color={changeColor(kpis.net_smart_money_flow_24h)}
          />
          <KpiCard
            label="Exchange netflow (24h)"
            value={formatUsdMillions(kpis.exchange_netflow_24h)}
            color={changeColor(kpis.exchange_netflow_24h)}
          />
          <KpiCard
            label="Whale tx volume (24h)"
            value={formatUsdMillions(kpis.whale_tx_volume_24h, { signed: false })}
          />
          <KpiCard
            label="Spot ETF net flow (week)"
            value={formatUsdMillions(kpis.spot_etf_net_flow_week)}
            color={changeColor(kpis.spot_etf_net_flow_week)}
          />
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <Card>
          <div
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 600,
              fontSize: 16,
              marginBottom: 14,
            }}
          >
            Institutional flows
          </div>
          {institutional && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
              <div>
                <div style={{ fontSize: 11, color: COLORS.textLabel, marginBottom: 4 }}>
                  % Freed/Fair
                </div>
                <div style={{ fontSize: 22, fontFamily: "'Manrope', sans-serif", fontWeight: 600 }}>
                  {institutional.pct_freed_fair}%
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: COLORS.textLabel, marginBottom: 4 }}>
                  New investors
                </div>
                <div style={{ fontSize: 22, fontFamily: "'Manrope', sans-serif", fontWeight: 600 }}>
                  {institutional.new_investors.toLocaleString()}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: COLORS.textLabel, marginBottom: 4 }}>
                  BTC flow
                </div>
                <div style={{ fontSize: 22, fontFamily: "'Manrope', sans-serif", fontWeight: 600 }}>
                  {formatCompactNumber(institutional.btc_flow)}
                </div>
              </div>
            </div>
          )}
        </Card>

        <Card>
          <div
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 600,
              fontSize: 16,
              marginBottom: 24,
            }}
          >
            BlackRock crypto holdings
          </div>
          <BlackRockHoldings />
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 16, marginBottom: 16 }}>
        <Card>
          <div
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 600,
              fontSize: 16,
              marginBottom: 8,
            }}
          >
            Whale wallet transfers
          </div>
          {whaleData?.transfers.map((w, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 0',
                borderBottom: `1px solid ${COLORS.borderSubtle}`,
              }}
            >
              <Pill
                background={COLORS.pillMutedBg}
                color={COLORS.pillMutedText}
                style={{ width: 54, textAlign: 'center' }}
              >
                {w.asset}
              </Pill>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13 }}>{w.route}</div>
                <div style={{ fontSize: 11, color: COLORS.textMuted }}>
                  {w.qty_label} · {w.time_label}
                </div>
              </div>
              {w.usd >= whaleData.threshold_usd && (
                <Pill background={COLORS.largeBg} color={COLORS.large} style={{ fontSize: 10 }}>
                  LARGE
                </Pill>
              )}
              <span
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 600,
                  color: w.direction === 'Inflow' ? COLORS.positive : COLORS.negative,
                  width: 80,
                  textAlign: 'right',
                }}
              >
                {formatUsdMillions(w.direction === 'Inflow' ? w.usd : -w.usd)}
              </span>
            </div>
          ))}
        </Card>

        <Card>
          <div
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 600,
              fontSize: 16,
              marginBottom: 16,
            }}
          >
            Exchange in/outflow
          </div>
          {exchangeFlows?.map((f) => {
            const color = changeColor(f.value_musd);
            const width = `${Math.min(100, (Math.abs(f.value_musd) / maxExchangeAbs) * 100)}%`;
            return (
              <div key={f.exchange} style={{ marginBottom: 14 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: 12,
                    marginBottom: 6,
                  }}
                >
                  <span>{f.exchange}</span>
                  <span style={{ color, fontFamily: "'Manrope', sans-serif" }}>
                    {(f.value_musd >= 0 ? '+$' : '-$') + Math.abs(f.value_musd) + 'M'}
                  </span>
                </div>
                <div style={{ height: 6, background: COLORS.pillMutedBg, borderRadius: 99 }}>
                  <div style={{ height: '100%', width, background: color, borderRadius: 99 }} />
                </div>
              </div>
            );
          })}
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Card>
          <div
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 600,
              fontSize: 16,
              marginBottom: 12,
            }}
          >
            Futures open interest &amp; funding
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                <th style={thStyle}>Asset</th>
                <th style={thStyle}>Open interest</th>
                <th style={thStyle}>24h</th>
                <th style={thStyle}>Funding</th>
              </tr>
            </thead>
            <tbody>
              {futures?.map((f) => (
                <tr key={f.asset}>
                  <td style={tdStyle}>{f.asset}</td>
                  <td style={tdStyle}>{f.open_interest_label}</td>
                  <td style={tdStyle}>
                    <span style={{ color: changeColor(f.change_24h_pct) }}>
                      {formatPercent(f.change_24h_pct)}
                    </span>
                  </td>
                  <td style={tdStyle}>{f.funding_label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card>
          <div
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 600,
              fontSize: 16,
              marginBottom: 16,
            }}
          >
            Spot ETF net flow — last 6 weeks
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, height: 90 }}>
            {etfFlows?.map((b) => {
              const color = changeColor(b.value_musd);
              const height = Math.max(6, (Math.abs(b.value_musd) / maxEtfAbs) * 72);
              return (
                <div
                  key={b.week}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 6,
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      maxWidth: 28,
                      height,
                      background: color,
                      borderRadius: '8px 8px 0 0',
                    }}
                  />
                  <span style={{ fontSize: 10, color: COLORS.textMuted }}>{b.week}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
