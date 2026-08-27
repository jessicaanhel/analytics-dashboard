import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';

// Pages
import HomePage from './pages/HomePage';
import SmartMoneyActual from './pages/CryptoData/SmartMoneyActual';
import AutoTab2 from './pages/CryptoData/AutoTab2';
import AutoTab3 from './pages/CryptoData/AutoTab3';
import AnalyticsTab1 from './pages/Analytics/AnalyticsTab1';
import AnalyticsTab2 from './pages/Analytics/AnalyticsTab2';
import AnalyticsTab3 from './pages/Analytics/AnalyticsTab3';
import CustomTab1 from './pages/Custom/CustomTab1';
import CustomTab2 from './pages/Custom/CustomTab2';
import CustomTab3 from './pages/Custom/CustomTab3';




const TABS = {
  CryptoData: ["Smart Money || Actual", "Auto Tab 2", "Auto Tab 3"],
  Analytics: ["Analytics Tab 1", "Analytics Tab 2", "Analytics Tab 3"],
  Custom: ["Custom Tab 1", "Custom Tab 2", "Custom Tab 3"],
};

function App() {
  const [activeTab, setActiveTab] = useState("Overview");

  const renderContent = () => {
    switch (activeTab) {
      case "Overview":
        return <HomePage />;

      // * Crypto *
      case "Crypto - Smart Money Up to Date":
        return <SmartMoneyActual />;
      case "Automation - Auto Tab 2":
        return <AutoTab2 />;
      case "Automation - Auto Tab 3":
        return <AutoTab3 />;

      // * Analytics *
      case "Analytics - Analytics Tab 1":
        return <AnalyticsTab1 />;
      case "Analytics - Analytics Tab 2":
        return <AnalyticsTab2 />;
      case "Analytics - Analytics Tab 3":
        return <AnalyticsTab3 />;

      // * Custom *
      case "Custom - Custom Tab 1":
        return <CustomTab1 />;
      case "Custom - Custom Tab 2":
        return <CustomTab2 />;
      case "Custom - Custom Tab 3":
        return <CustomTab3 />;

      default:
        return <div>Unknown tab</div>;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial, sans-serif" }}>
      {/* * Main content * */}
      <main style={{ flexGrow: 1, padding: 20, overflowY: "auto" }}>
        {renderContent()}
      </main>

      {/*  Sidebar  */}
      <aside style={{ width: 250, borderLeft: "1px solid #ccc", padding: 20, backgroundColor: "#fafafa" }}>
        <h2 style={{ cursor: "pointer" }} onClick={() => setActiveTab("Overview")}>
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
                  style={{
                    cursor: "pointer",
                    padding: 5,
                    fontWeight: activeTab === tabLabel ? "bold" : "normal",
                    backgroundColor: activeTab === tabLabel ? "#ddd" : "transparent",
                    borderRadius: 3,
                    marginBottom: 3,
                  }}
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