import React, { useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { apiFetch } from '../utils/api';
import { Card } from '../components/UI/Card';
import { Pill } from '../components/UI/Pill';
import { DataSourceTag } from '../components/UI/DataSourceTag';
import { COLORS, RADIUS } from '../theme/tokens';

interface Alert {
  id: number;
  asset: string;
  operator: 'above' | 'below';
  threshold: number;
  condition: string;
  armed: boolean;
}

// Keep in sync with backend/services/live_data.py's COINGECKO_IDS keys.
const ASSET_OPTIONS = ['BTC', 'ETH', 'SOL', 'PEPE', 'WIF'];

const inputStyle: React.CSSProperties = {
  background: COLORS.pillMutedBg,
  color: COLORS.textPrimary,
  border: `1px solid ${COLORS.inputBorder}`,
  borderRadius: RADIUS.input,
  padding: '8px 10px',
  fontSize: 13,
  fontFamily: "'Manrope', sans-serif",
};

export const Watchlist: React.FC = () => {
  const { data, source } = useApi<Alert[]>('/api/alerts');
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [asset, setAsset] = useState(ASSET_OPTIONS[0]);
  const [operator, setOperator] = useState<'above' | 'below'>('above');
  const [threshold, setThreshold] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (data) setAlerts(data);
  }, [data]);

  const toggleAlert = async (id: number) => {
    const res = await apiFetch(`/api/alerts/${id}/toggle`, { method: 'POST' });
    if (!res.ok) return;
    const updated: Alert = await res.json();
    setAlerts((prev) => prev.map((a) => (a.id === id ? updated : a)));
  };

  const createAlert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!threshold) return;
    setSubmitting(true);
    try {
      const res = await apiFetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ asset, operator, threshold: Number(threshold) }),
      });
      if (!res.ok) return;
      const created: Alert = await res.json();
      setAlerts((prev) => [created, ...prev]);
      setThreshold('');
      setShowForm(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card style={{ maxWidth: 680 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 14,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 600,
            fontSize: 16,
          }}
        >
          Alerts
          <DataSourceTag source={source} />
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          style={{
            background: COLORS.accent,
            color: COLORS.background,
            border: 'none',
            borderRadius: 12,
            padding: '10px 18px',
            fontWeight: 700,
            fontSize: 14,
            cursor: 'pointer',
            fontFamily: "'Manrope', sans-serif",
          }}
        >
          {showForm ? 'Cancel' : '+ New alert'}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={createAlert}
          style={{
            display: 'flex',
            gap: 10,
            alignItems: 'center',
            padding: '12px 0',
            borderBottom: `1px solid ${COLORS.borderSubtle}`,
            flexWrap: 'wrap',
          }}
        >
          <select value={asset} onChange={(e) => setAsset(e.target.value)} style={inputStyle}>
            {ASSET_OPTIONS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
          <select
            value={operator}
            onChange={(e) => setOperator(e.target.value as 'above' | 'below')}
            style={inputStyle}
          >
            <option value="above">above</option>
            <option value="below">below</option>
          </select>
          <input
            type="number"
            step="any"
            required
            placeholder="Price ($)"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            style={{ ...inputStyle, width: 120 }}
          />
          <button
            type="submit"
            disabled={submitting}
            style={{
              background: COLORS.pillMutedBg,
              color: COLORS.textPrimary,
              border: `1px solid ${COLORS.inputBorder}`,
              borderRadius: 10,
              padding: '8px 14px',
              fontSize: 13,
              cursor: submitting ? 'default' : 'pointer',
              fontFamily: "'Manrope', sans-serif",
            }}
          >
            Create
          </button>
        </form>
      )}

      {alerts.map((a) => (
        <div
          key={a.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '12px 0',
            borderBottom: `1px solid ${COLORS.borderSubtle}`,
          }}
        >
          <Pill
            background={COLORS.pillMutedBg}
            color={COLORS.pillMutedText}
            style={{ width: 52, textAlign: 'center' }}
          >
            {a.asset}
          </Pill>
          <div style={{ flex: 1 }}>{a.condition}</div>
          <Pill
            background={a.armed ? 'rgba(52,209,161,0.16)' : COLORS.pillMutedBg}
            color={a.armed ? COLORS.positive : COLORS.textLabel}
          >
            {a.armed ? 'Armed' : 'Paused'}
          </Pill>
          <button
            onClick={() => toggleAlert(a.id)}
            style={{
              background: COLORS.pillMutedBg,
              color: COLORS.textPrimary,
              border: `1px solid ${COLORS.inputBorder}`,
              borderRadius: 10,
              padding: '7px 14px',
              fontSize: 13,
              cursor: 'pointer',
              fontFamily: "'Manrope', sans-serif",
            }}
          >
            {a.armed ? 'Pause' : 'Arm'}
          </button>
        </div>
      ))}
    </Card>
  );
};

export default Watchlist;
