import React, { useState } from 'react';
import { layoutStyles } from "./App.styles";

// Pages
import HomePage from './pages/HomePage';
import SmartMoneyActual from './pages/CryptoData/SmartMoneyActual';
import AnalyticsTab1 from './pages/Analytics/AnalyticsTab1';
import AnalyticsTab2 from './pages/Analytics/AnalyticsTab2';
import CurrencyRates from './pages/Fiat/CurrencyRates';

const TABS = {
  CryptoData: ["Smart Money || Actual"],
  Analytics: ["Website Metrics Overview", "Chart.js Example"],
  Fiat: ["Actual Currency Rate"],
};

function App() {
  const [activeTab, setActiveTab] = useState("Overview");

  const renderContent = () => {
    switch (activeTab) {
      case "Overview":
        return <HomePage />;

      // * Crypto *
      case "CryptoData - Smart Money || Actual":
        return <SmartMoneyActual />;

      // * Analytics *
      case "Analytics - Website Metrics Overview":
        return <AnalyticsTab1 />;
      case "Analytics - Chart.js Example":
        return <AnalyticsTab2 />;

      // * Fiat *
      case "Fiat - Actual Currency Rate":
        return <CurrencyRates />;

      default:
        return <div>Unknown tab</div>;
    }
  };

  return (
  <div style={layoutStyles.container}>
    {/* Sidebar */}
    <aside style={layoutStyles.sidebar}>
      <h2
        onClick={() => setActiveTab("Overview")}
        style={{ cursor: "pointer" }}
      >
        Overview
      </h2>

      {Object.entries(TABS).map(([topic, tabs]) => (
        <div key={topic} style={{ marginTop: 20 }}>
          <h3>{topic}</h3>
          {tabs.map((tab) => {
            const tabLabel = `${topic} - ${tab}`;
            return (
              <div
                key={tab}
                onClick={() => setActiveTab(tabLabel)}
                style={
                  activeTab === tabLabel ? layoutStyles.activeTab : layoutStyles.tab
                }
              >
                {tab}
              </div>
            );
          })}
        </div>
      ))}
    </aside>

    {/* Main content */}
    <main style={layoutStyles.main}>{renderContent()}</main>
  </div>
);
}

export default App;