import React from 'react';
import { NavLink } from 'react-router-dom';
import { COLORS } from '../../theme/tokens';

interface NavItem {
  to: string;
  label: string;
  icon: React.ReactNode;
}

const iconProps = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
};

const NAV_ITEMS: NavItem[] = [
  {
    to: '/',
    label: 'Overview',
    icon: (
      <svg {...iconProps}>
        <path d="M3 12h4l2.5 7L13 4l2.5 8H21" />
      </svg>
    ),
  },
  {
    to: '/crypto',
    label: 'Crypto',
    icon: (
      <svg {...iconProps}>
        <circle cx="9" cy="9" r="6" />
        <circle cx="15" cy="15" r="6" />
      </svg>
    ),
  },
  {
    to: '/fiat',
    label: 'Fiat rates',
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="6" width="18" height="12" rx="3" />
        <circle cx="12" cy="12" r="2.6" />
      </svg>
    ),
  },
  {
    to: '/personal-pnl',
    label: 'Personal PnL',
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="9" r="3.4" />
        <path d="M6 19c0-3.3 2.7-5.6 6-5.6s6 2.3 6 5.6" />
      </svg>
    ),
  },
  {
    to: '/watchlist',
    label: 'Watchlist',
    icon: (
      <svg {...iconProps}>
        <path d="M6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v17l-6-4-6 4z" />
      </svg>
    ),
  },
  {
    to: '/settings',
    label: 'Settings',
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v3M12 18v3M4.2 6.2l2.1 2.1M17.7 15.7l2.1 2.1M3 12h3M18 12h3M4.2 17.8l2.1-2.1M17.7 8.3l2.1-2.1" />
      </svg>
    ),
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapsed: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggleCollapsed }) => (
  <div
    style={{
      width: collapsed ? 72 : 228,
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 0',
      flexShrink: 0,
      borderRight: `1px solid ${COLORS.border}`,
      transition: 'width 0.15s ease',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 20px 24px' }}>
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 10,
          background: COLORS.brandGradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <svg
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke={COLORS.background}
          strokeWidth={2}
        >
          <path d="M3 12h4l2.5 7L13 4l2.5 8H21" />
        </svg>
      </div>
      {!collapsed && (
        <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: 18 }}>
          Flowdesk
        </span>
      )}
    </div>

    {NAV_ITEMS.map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        end={item.to === '/'}
        style={({ isActive }) => ({
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          margin: '2px 12px',
          padding: collapsed ? '10px 0' : '10px 14px',
          justifyContent: collapsed ? 'center' : 'flex-start',
          borderRadius: 12,
          cursor: 'pointer',
          fontSize: 14,
          fontWeight: 600,
          color: isActive ? COLORS.accentText : COLORS.textSecondary,
          background: isActive ? COLORS.accentSoft : 'transparent',
        })}
      >
        {item.icon}
        {!collapsed && <span>{item.label}</span>}
      </NavLink>
    ))}

    <div style={{ marginTop: 'auto', padding: '16px 20px 0' }}>
      <div
        onClick={onToggleCollapsed}
        style={{ cursor: 'pointer', fontSize: 12, color: '#5c6270' }}
      >
        {collapsed ? '»' : '« Collapse'}
      </div>
    </div>
  </div>
);

export default Sidebar;
