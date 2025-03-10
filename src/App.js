import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateQRCode from './pages/CreateQRCode';
import QRScanner from './pages/QRScanner';
import InventoryList from './pages/InventoryList';
import BottomNav from './components/BottomNav';

function App() {
  return (
    <div style={{ paddingBottom: '60px' /* leave space for nav */ }}>
      {/* ...existing code... */}
      <Routes>
        <Route path="/" element={<CreateQRCode />} />
        <Route path="/scan" element={<QRScanner />} />
        <Route path="/inventory" element={<InventoryList />} />
      </Routes>
      <BottomNav />
    </div>
  );
}

export default App;
