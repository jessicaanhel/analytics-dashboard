import React, { useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { RatesResponseProps } from './CurrencyRates.models';

import CurrencyTable from '../../components/Graphs/CurrencyTable';
import { theme } from '../../theme/theme';

export const CurrencyRates = () => {
  const [reloadKey, setReloadKey] = useState(0);
  const { data, loading, error } = useApi(`/refresh?reload=${reloadKey}`);

  const [lastUpdated, setLastUpdated] = useState(
    new Date().toLocaleString('en-GB', { timeZone: 'Europe/Warsaw' }),
  );

  const handleRefresh = () => {
    setReloadKey((prev) => prev + 1);
    setLastUpdated(new Date().toLocaleString('en-GB', { timeZone: 'Europe/Warsaw' }));
  };

  if (loading) return <p style={{ color: theme.palette.primary.main }}>Loading...</p>;
  if (error) return <p style={{ color: theme.palette.secondary.main }}>{error}</p>;

  const ratesData = data as RatesResponseProps;

  const primaryColor = theme.palette.primary.main; // neon green
  const accentColor = theme.palette.secondary.main; // neon pink/blue for hover
  const bgColor = theme.palette.common.black;

  return (
    <div
      style={{
        backgroundColor: bgColor,
        padding: '20px',
        borderRadius: '8px',
        minHeight: '100%',
      }}
    >
      <h2
        style={{
          color: primaryColor,
          textShadow: `0 0 5px ${primaryColor}, 0 0 10px ${primaryColor}`,
        }}
      >
        Fiat Currency Rates
      </h2>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <p style={{ color: primaryColor }}>
          Last updated: <strong>{lastUpdated}</strong> (+2 UTC)
        </p>
        <button
          onClick={handleRefresh}
          style={{
            backgroundColor: accentColor,
            color: '#000',
            padding: '8px 16px',
            borderRadius: '5px',
            fontWeight: 'bold',
            cursor: 'pointer',
            textTransform: 'uppercase',
            boxShadow: `0 0 5px ${accentColor}, 0 0 10px ${accentColor}`,
            transition: 'all 0.2s ease-in-out',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow = `0 0 10px ${accentColor}, 0 0 20px ${accentColor}`)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.boxShadow = `0 0 5px ${accentColor}, 0 0 10px ${accentColor}`)
          }
        >
          Refresh
        </button>
      </div>

      <CurrencyTable data={ratesData} />
    </div>
  );
};

export default CurrencyRates;
