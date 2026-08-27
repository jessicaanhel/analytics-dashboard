import React, { useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { apiFetch } from '../utils/api';
import { Card } from '../components/UI/Card';
import { Pill } from '../components/UI/Pill';
import { DataSourceTag } from '../components/UI/DataSourceTag';
import { COLORS, RADIUS } from '../theme/tokens';

interface Connection {
  name: string;
  type: string;
  status: 'connected' | 'not_connected';
}

interface TelegramLinkInfo {
  code: string;
  bot_username: string;
}

export const SettingsPage: React.FC = () => {
  const { data, source } = useApi<Connection[]>('/api/settings/connections');
  const [connections, setConnections] = useState<Connection[]>([]);
  const [linkInfo, setLinkInfo] = useState<TelegramLinkInfo | null>(null);

  useEffect(() => {
    if (data) setConnections(data);
  }, [data]);

  const openTelegramLink = async () => {
    const res = await apiFetch('/api/settings/telegram/link-code', { method: 'POST' });
    if (!res.ok) return;
    setLinkInfo(await res.json());
  };

  const refreshConnections = async () => {
    const res = await apiFetch('/api/settings/connections');
    if (!res.ok) return;
    setConnections(await res.json());
  };

  return (
    <div style={{ maxWidth: 680 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontFamily: "'Manrope', sans-serif",
          fontWeight: 600,
          fontSize: 16,
          marginBottom: 14,
        }}
      >
        Connected sources
        <DataSourceTag source={source} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 }}>
        {connections.map((c) => {
          const connected = c.status === 'connected';
          const isTelegram = c.name === 'Telegram';
          return (
            <Card
              key={c.name}
              style={{
                padding: 18,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 600, fontSize: 15 }}>
                  {c.name}
                </div>
                <div style={{ fontSize: 12, color: COLORS.textMuted }}>{c.type}</div>
              </div>
              <Pill
                background={connected ? 'rgba(52,209,161,0.16)' : COLORS.accentSoft}
                color={connected ? COLORS.positive : '#8fa8ff'}
                style={!connected && isTelegram ? { cursor: 'pointer' } : undefined}
                onClick={!connected && isTelegram ? openTelegramLink : undefined}
              >
                {connected ? 'Connected' : 'Connect'}
              </Pill>
            </Card>
          );
        })}
      </div>

      {linkInfo && (
        <Card style={{ marginTop: 16, padding: 18 }}>
          <div style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 600, marginBottom: 8 }}>
            Link Telegram
          </div>
          <div style={{ fontSize: 13, color: COLORS.textSecondary, marginBottom: 12 }}>
            Open the bot in Telegram and send <strong>{linkInfo.code}</strong>, or use the button
            below.
          </div>
          {linkInfo.bot_username && (
            <a
              href={`https://t.me/${linkInfo.bot_username}?start=${linkInfo.code}`}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-block',
                background: COLORS.accent,
                color: COLORS.background,
                borderRadius: RADIUS.input,
                padding: '9px 16px',
                fontWeight: 700,
                fontSize: 13,
                textDecoration: 'none',
                marginRight: 10,
                fontFamily: "'Manrope', sans-serif",
              }}
            >
              Open in Telegram
            </a>
          )}
          <button
            onClick={refreshConnections}
            style={{
              background: COLORS.pillMutedBg,
              color: COLORS.textPrimary,
              border: `1px solid ${COLORS.inputBorder}`,
              borderRadius: RADIUS.input,
              padding: '9px 16px',
              fontSize: 13,
              cursor: 'pointer',
              fontFamily: "'Manrope', sans-serif",
            }}
          >
            I've linked it — refresh
          </button>
        </Card>
      )}
    </div>
  );
};

export default SettingsPage;
