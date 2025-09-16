import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import SearchSection from './components/SearchSection';
import Footer from './components/Footer';
import Modal from './components/Modal';
import LoginModal from './components/LoginModal';
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import ReservationsPage from './pages/ReservationsPage';
import ReservationCheckPage from './pages/ReservationCheckPage';
import CallbackPage from './pages/CallbackPage';
import PaymentCallbackPage from './pages/PaymentCallbackPage';
import SalesOfficesPage from './pages/SalesOfficesPage';
import HotelsPage from './pages/HotelsPage';
import AntalyaHotelsPage from './pages/AntalyaHotelsPage';
import HotelDetailPage from './pages/HotelDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentPage from './pages/PaymentPage';
import ToursPage from './pages/ToursPage';
import FlightsPage from './pages/FlightsPage';
import TBClubPage from './pages/TBClubPage';
import PremiumPage from './pages/PremiumPage';
import UserAccountPage from './pages/UserAccountPage';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const isPremiumPage = location.pathname === '/premium';
  const isLoginPage = location.pathname === '/login';
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Login sayfasına gidildiğinde modal aç
  React.useEffect(() => {
    if (isLoginPage) {
      setShowLoginModal(true);
    } else {
      setShowLoginModal(false);
    }
  }, [isLoginPage]);

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
    navigate('/'); // Ana sayfaya yönlendir
  };

  return (
    <div className={`app ${isPremiumPage ? 'premium-page-layout' : ''}`}>
      <Header />
      <SearchSection />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<div></div>} />
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route path="/reservation-check" element={<ReservationCheckPage />} />
          <Route path="/callback" element={<CallbackPage />} />
          <Route path="/payment-callback" element={<PaymentCallbackPage />} />
          <Route path="/sales-offices" element={<SalesOfficesPage />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/hotels/:city" element={<HotelsPage />} />
          <Route path="/tours" element={<ToursPage />} />
          <Route path="/tours/:destination" element={<ToursPage />} />
          <Route path="/flights" element={<FlightsPage />} />
          <Route path="/tbclub" element={<TBClubPage />} />
          <Route path="/premium" element={<PremiumPage />} />
          <Route path="/user/account" element={<UserAccountPage />} />
          <Route path="/packages" element={<div>Tatil Paketleri - Coming Soon</div>} />
          <Route path="/thermal" element={<div>Termal Oteller - Coming Soon</div>} />
          <Route path="/ski" element={<div>Kayak Otelleri - Coming Soon</div>} />
          <Route path="/register" element={<div>Kayıt Sayfası - Coming Soon</div>} />
          
          {/* Campaign Routes */}
          <Route path="/campaigns" element={<div>Kampanyalar Sayfası - Coming Soon</div>} />
          <Route path="/campaigns/*" element={<div>Kampanya Detayları - Coming Soon</div>} />
          
          {/* Hotel Category Routes */}
        <Route path="/yurtici-oteller/antalya-otelleri" element={<AntalyaHotelsPage />} />
        <Route path="/hotel/:hotelId" element={<HotelDetailPage />} />
        <Route path="/checkout/:hotelId" element={<CheckoutPage />} />
        <Route path="/payment/:hotelId" element={<PaymentPage />} />
          <Route path="/hotels/*" element={<div>Otel Kategorileri - Coming Soon</div>} />
        </Routes>
      </main>
      <Footer />
      
      {/* Login Modal */}
      <Modal isOpen={showLoginModal} onClose={handleCloseLoginModal}>
        <LoginModal onClose={handleCloseLoginModal} />
      </Modal>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
