import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/Graphs/NavigationBar';

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
      <div style={{ display: "flex", height: "100vh", fontFamily: "Roboto, sans-serif" }}>
      {/* * Main content * */}
      <main className="main-content">{renderContent()}</main>

      {/*  Sidebar  */}
      <aside className="sidebar">
        <h2 onClick={() => setActiveTab("Overview")}>Overview</h2>

        {Object.entries(TABS).map(([topic, tabs]) => (
          <div key={topic} style={{ marginTop: 20 }}>
            <h3>{topic}</h3>
            {tabs.map((tab) => {
              const tabLabel = `${topic} - ${tab}`;

              return (
                <div
                  key={tab}
                  onClick={() => setActiveTab(tabLabel)}
                  className={`tab ${activeTab === tabLabel ? "active" : ""}`}
                >
                  {tab}
                </div>
              );
            })}
          </div>
        ))}
      </aside>
    </div>
  );
}

export default App;