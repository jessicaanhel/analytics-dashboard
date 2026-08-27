import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './components/Layout/DashboardLayout';
import Overview from './pages/Overview';
import CryptoMarkets from './pages/CryptoMarkets';
import FiatRates from './pages/FiatRates';
import PersonalPnl from './pages/PersonalPnl';
import Watchlist from './pages/Watchlist';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Overview />} />
        <Route path="/crypto" element={<CryptoMarkets />} />
        <Route path="/fiat" element={<FiatRates />} />
        <Route path="/personal-pnl" element={<PersonalPnl />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
