import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SearchSection from './components/SearchSection';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import ReservationsPage from './pages/ReservationsPage';
import CallbackPage from './pages/CallbackPage';
import SalesOfficesPage from './pages/SalesOfficesPage';
import HotelsPage from './pages/HotelsPage';
import ToursPage from './pages/ToursPage';
import FlightsPage from './pages/FlightsPage';
import TBClubPage from './pages/TBClubPage';
import PremiumPage from './pages/PremiumPage';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <SearchSection />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/reservations" element={<ReservationsPage />} />
            <Route path="/callback" element={<CallbackPage />} />
            <Route path="/sales-offices" element={<SalesOfficesPage />} />
            <Route path="/hotels" element={<HotelsPage />} />
            <Route path="/tours" element={<ToursPage />} />
            <Route path="/flights" element={<FlightsPage />} />
            <Route path="/tbclub" element={<TBClubPage />} />
            <Route path="/premium" element={<PremiumPage />} />
            <Route path="/packages" element={<div>Tatil Paketleri - Coming Soon</div>} />
            <Route path="/thermal" element={<div>Termal Oteller - Coming Soon</div>} />
            <Route path="/ski" element={<div>Kayak Otelleri - Coming Soon</div>} />
            <Route path="/register" element={<div>Kayıt Sayfası - Coming Soon</div>} />
            
            {/* Campaign Routes */}
            <Route path="/campaigns" element={<div>Kampanyalar Sayfası - Coming Soon</div>} />
            <Route path="/campaigns/*" element={<div>Kampanya Detayları - Coming Soon</div>} />
            
            {/* Hotel Category Routes */}
            <Route path="/hotels/*" element={<div>Otel Kategorileri - Coming Soon</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
