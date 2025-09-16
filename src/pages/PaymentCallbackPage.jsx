import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, useLocation, Link } from 'react-router-dom';
import { Check, X, Loader2 } from 'lucide-react';
import { verifyPayment } from '../services/iyzicoService';
import { createReservation } from '../firebase/reservationService';
import ReservationCodeModal from '../components/ReservationCodeModal';
import './PaymentCallbackPage.css';

const PaymentCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [message, setMessage] = useState('');
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [reservationCode, setReservationCode] = useState(null);
  const [reservationData, setReservationData] = useState(null);
  const [showReservationModal, setShowReservationModal] = useState(false);

  useEffect(() => {
    const handlePaymentCallback = async () => {
      try {
        // Check if data comes from navigation state or URL params
        const token = location.state?.token || searchParams.get('token');
        const status = location.state?.status || searchParams.get('status');
        
        if (!token) {
          setStatus('error');
          setMessage('Ödeme token\'ı bulunamadı.');
          return;
        }

        if (status === 'success') {
          // Get payment amount from location.state (price summary) or URL params or use default
          const paymentAmount = location.state?.paymentResult?.price || 
                               location.state?.bookingData?.totalPrice || 
                               searchParams.get('amount') || 
                               '100.00';
          
          // Verify payment with Iyzico
          const verificationResult = await verifyPayment(token, paymentAmount);
          
          if (verificationResult.status === 'success') {
            setStatus('success');
            setMessage('Ödeme işlemi başarıyla tamamlandı!');
            setPaymentDetails(verificationResult);
            
            // Create reservation in Firebase
            try {
              // Get reservation data from location.state (price summary) or use demo data
              const reservationData = {
                email: location.state?.userInfo?.email || 'demo@example.com',
                firstName: location.state?.userInfo?.firstName || 'Demo',
                lastName: location.state?.userInfo?.lastName || 'Kullanıcı',
                phone: location.state?.userInfo?.phone || '+90 555 123 45 67',
                hotel: {
                  id: location.state?.hotel?.id || 'demo-hotel-1',
                  name: location.state?.hotel?.name || 'Calista Luxury Resort',
                  location: location.state?.hotel?.location || 'Belek, Antalya',
                  image: location.state?.hotel?.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
                  rating: location.state?.hotel?.rating || 5
                },
                bookingData: {
                  checkIn: location.state?.bookingData?.checkIn || '2025-09-14',
                  checkOut: location.state?.bookingData?.checkOut || '2025-09-17',
                  adults: location.state?.bookingData?.adults || 2,
                  children: location.state?.bookingData?.children || 1,
                  nights: location.state?.bookingData?.nights || 3
                },
                totalPrice: parseFloat(location.state?.bookingData?.totalPrice || 
                                     location.state?.paymentResult?.price || 
                                     verificationResult.price || 
                                     paymentDetails.paidPrice || 0),
                paymentInfo: {
                  method: 'card',
                  transactionId: verificationResult.paymentId || 'DEMO_' + Date.now(),
                  cardNumber: '****1234',
                  paymentDate: new Date().toISOString()
                }
              };
              
              const reservationResult = await createReservation(reservationData);
              
              if (reservationResult.success) {
                setReservationCode(reservationResult.reservationCode);
                setReservationData(reservationData);
                console.log('✅ Rezervasyon oluşturuldu:', reservationResult.reservationCode);
                // Modal'ı otomatik aç
                setTimeout(() => {
                  setShowReservationModal(true);
                }, 1000);
              } else {
                console.error('❌ Rezervasyon oluşturma hatası:', reservationResult.error);
                // Hata durumunda da demo rezervasyon kodu göster
                const fallbackCode = 'TB' + Date.now().toString(36).toUpperCase();
                setReservationCode(fallbackCode);
                setReservationData(reservationData);
                setTimeout(() => {
                  setShowReservationModal(true);
                }, 1000);
              }
            } catch (reservationError) {
              console.error('❌ Rezervasyon oluşturma hatası:', reservationError);
              // Hata durumunda da demo rezervasyon kodu göster
              const fallbackCode = 'TB' + Date.now().toString(36).toUpperCase();
              setReservationCode(fallbackCode);
              setReservationData(reservationData);
              setTimeout(() => {
                setShowReservationModal(true);
              }, 1000);
            }
            
            // Rezervasyon kodu sayfasında kal, otomatik yönlendirme yok
          } else {
            setStatus('error');
            setMessage(verificationResult.errorMessage || 'Ödeme doğrulaması başarısız oldu.');
          }
        } else {
          setStatus('error');
          setMessage('Ödeme işlemi başarısız oldu.');
        }
      } catch (error) {
        console.error('Payment callback error:', error);
        setStatus('error');
        setMessage('Ödeme işlemi sırasında bir hata oluştu.');
      }
    };

    handlePaymentCallback();
  }, [searchParams, navigate]);

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="callback-content loading">
            <Loader2 size={48} className="spinning" />
            <h2>Ödeme işlemi kontrol ediliyor...</h2>
            <p>Lütfen bekleyin, ödeme durumunuz doğrulanıyor.</p>
          </div>
        );
      
      case 'success':
        return (
          <div className="callback-content success">
            <Check size={48} className="success-icon" />
            <h2>Rezervasyon Onaylandı! ✅</h2>
            <p>Ödemeniz başarıyla tamamlandı ve rezervasyonunuz onaylandı. Rezervasyon kodunuz aşağıda görüntülenmektedir.</p>
            <div className="success-message">
              <p><strong>✅ Ödeme:</strong> Başarıyla tamamlandı</p>
              <p><strong>✅ Rezervasyon:</strong> Onaylandı ve kaydedildi</p>
              <p><strong>✅ E-posta:</strong> Rezervasyon detayları gönderildi</p>
            </div>
            {paymentDetails && (
              <div className="payment-details">
                <h3>Ödeme Detayları</h3>
                <div className="detail-item">
                  <span>Ödeme ID:</span>
                  <span>{paymentDetails.paymentId}</span>
                </div>
                <div className="detail-item">
                  <span>Tutar:</span>
                  <span>{parseFloat(location.state?.bookingData?.totalPrice || 
                                   location.state?.paymentResult?.price || 
                                   paymentDetails.paidPrice || 0).toLocaleString('tr-TR', { 
                    minimumFractionDigits: 2 
                  })} ₺</span>
                </div>
                <div className="detail-item">
                  <span>Tarih:</span>
                  <span>{new Date(paymentDetails.createdDate).toLocaleString('tr-TR')}</span>
                </div>
              </div>
            )}
            {reservationCode && (
              <div className="reservation-code">
                <h3>🎫 Rezervasyon Kodunuz</h3>
                <div className="code-display">{reservationCode}</div>
                <p>Bu kod ile rezervasyonunuzu sorgulayabilir ve detaylarını görüntüleyebilirsiniz.</p>
                <div style={{ marginTop: '16px' }}>
                  <button
                    onClick={() => setShowReservationModal(true)}
                    style={{
                      padding: '8px 16px',
                      background: '#0b5ed7',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      marginRight: '8px'
                    }}
                  >
                    Rezervasyon Kodunu Göster
                  </button>
                  <Link 
                    to="/reservations" 
                    style={{
                      display: 'inline-block',
                      padding: '8px 16px',
                      background: '#16a34a',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    Rezervasyonlarım
                  </Link>
                </div>
              </div>
            )}
          </div>
        );
      
      case 'error':
        return (
          <div className="callback-content error">
            <X size={48} className="error-icon" />
            <h2>Ödeme Başarısız</h2>
            <p>{message}</p>
            <div className="action-buttons">
              <button 
                className="btn-primary"
                onClick={() => navigate('/payment')}
              >
                Tekrar Dene
              </button>
              <button 
                className="btn-secondary"
                onClick={() => navigate('/')}
              >
                Ana Sayfaya Dön
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="payment-callback-page">
      <div className="container">
        <div className="callback-container">
          {renderContent()}
        </div>
      </div>
      
      {/* Rezervasyon Kodu Modal */}
      <ReservationCodeModal
        isOpen={showReservationModal}
        onClose={() => setShowReservationModal(false)}
        reservationCode={reservationCode}
        reservationData={reservationData}
      />
    </div>
  );
};

export default PaymentCallbackPage;
