import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import './App.css';
import ReactPage from './AppCopy';
import NavigationBar from './components/NavigationBar';
import { FilterHeader } from './components/Filtering/FilterHeader';

function App() {
  const [openFilterBar, setFilterBar] = useState(false);

  const openFilterOverlay = () => setFilterBar(true);
  const closeFilterOverlay = () => setFilterBar(false);

  return (
    <div className="wrapper">
      <h1>Marine Mammals</h1>
      <BrowserRouter>
      <NavigationBar />
      <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path="/react" element={<ReactPage />} />
      </Routes>
      <FilterHeader isOpen={openFilterBar} onClose={closeFilterOverlay} />
      </BrowserRouter>
    </div>
  );
}

export default App;