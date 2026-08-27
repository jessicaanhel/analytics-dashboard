import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './components/Layout/DashboardLayout';
import { RequireAuth } from './components/Layout/RequireAuth';
import Overview from './pages/Overview';
import SmartMoney from './pages/SmartMoney';
import CryptoMarkets from './pages/CryptoMarkets';
import FiatRates from './pages/FiatRates';
import PersonalPnl from './pages/PersonalPnl';
import Watchlist from './pages/Watchlist';
import SettingsPage from './pages/SettingsPage';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Overview />} />
        <Route path="/smart-money" element={<SmartMoney />} />
        <Route path="/crypto" element={<CryptoMarkets />} />
        <Route path="/fiat" element={<FiatRates />} />
        <Route
          path="/personal-pnl"
          element={
            <RequireAuth>
              <PersonalPnl />
            </RequireAuth>
          }
        />
        <Route
          path="/watchlist"
          element={
            <RequireAuth>
              <Watchlist />
            </RequireAuth>
          }
        />
        <Route
          path="/settings"
          element={
            <RequireAuth>
              <SettingsPage />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
