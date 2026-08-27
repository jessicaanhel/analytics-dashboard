import React from 'react';
import { CurrencyTableProps } from './CurrencyTable.model';
import { theme } from '../../theme/theme';

const CurrencyTable: React.FC<CurrencyTableProps> = ({ data }) => {
  const primaryColor = theme.palette.primary.main;
  const bgColor = theme.palette.common.black;

  if (!data) return null;

  const allCurrencies = Array.from(
    new Set(
      Object.values(data)
        .flatMap((rates) => Object.keys(rates))
        .sort(),
    ),
  );

  const cellStyle = {
    border: `1px solid ${primaryColor}`,
    padding: '8px',
    textAlign: 'center' as const,
    color: primaryColor,
    textShadow: `0 0 5px ${primaryColor}, 0 0 10px ${primaryColor}`,
  };

  const missingCellStyle = {
    ...cellStyle,
    color: '#555',
    textShadow: 'none',
  };

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: bgColor }}>
      <thead>
        <tr>
          <th style={cellStyle}>Bank</th>
          {allCurrencies.map((currency) => (
            <th key={currency} colSpan={2} style={cellStyle}>
              {currency}
            </th>
          ))}
        </tr>
        <tr>
          <th style={cellStyle}></th>
          {allCurrencies.map((currency) => (
            <React.Fragment key={`${currency}-headers`}>
              <th style={cellStyle}>Buy</th>
              <th style={cellStyle}>Sell</th>
            </React.Fragment>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.entries(data).map(([bank, rates]) => (
          <tr key={bank}>
            <td style={cellStyle}>{bank}</td>
            {allCurrencies.map((currency) => {
              const rate = rates ? rates[currency] : undefined;
              return rate ? (
                <React.Fragment key={`${bank}-${currency}`}>
                  <td style={cellStyle}>{rate.buy}</td>
                  <td style={cellStyle}>{rate.sell}</td>
                </React.Fragment>
              ) : (
                <React.Fragment key={`${bank}-${currency}`}>
                  <td style={missingCellStyle}>-</td>
                  <td style={missingCellStyle}>-</td>
                </React.Fragment>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CurrencyTable;
