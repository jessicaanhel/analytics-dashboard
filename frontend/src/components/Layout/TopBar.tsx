import React from 'react';
import { useLocation } from 'react-router-dom';
import { COLORS } from '../../theme/tokens';
import { SegmentedControl, TimeRange } from '../UI/SegmentedControl';

const VIEW_CONFIG: Record<string, { title: string; showTimeRange: boolean }> = {
  '/': { title: 'Overview — Smart Money Flow', showTimeRange: true },
  '/crypto': { title: 'Crypto Markets', showTimeRange: true },
  '/fiat': { title: 'Fiat & Currency Rates', showTimeRange: true },
  '/personal-pnl': { title: 'Personal PnL', showTimeRange: true },
  '/watchlist': { title: 'Watchlist & Alerts', showTimeRange: false },
  '/settings': { title: 'Settings', showTimeRange: false },
};

interface TopBarProps {
  timeRange: TimeRange;
  onTimeRangeChange: (value: TimeRange) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ timeRange, onTimeRangeChange }) => {
  const { pathname } = useLocation();
  const config = VIEW_CONFIG[pathname] ?? { title: '', showTimeRange: false };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '26px 36px 20px',
      }}
    >
      <div>
        <h2
          style={{
            margin: 0,
            fontSize: 26,
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 600,
            letterSpacing: '-0.01em',
          }}
        >
          {config.title}
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: COLORS.positive,
              display: 'inline-block',
              boxShadow: `0 0 6px ${COLORS.positive}`,
            }}
          />
          <span style={{ fontSize: 12, color: COLORS.textMuted }}>
            Mock data · wire a real feed in Settings
          </span>
        </div>
      </div>
      {config.showTimeRange && <SegmentedControl value={timeRange} onChange={onTimeRangeChange} />}
    </div>
  );
};

export default TopBar;
