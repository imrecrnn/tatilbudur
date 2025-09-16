import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Star, CreditCard, CheckCircle, Clock, Hash } from 'lucide-react';
import { getReservationsByEmail } from '../firebase/reservationService';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Firebase auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        // Load user's reservations from Firebase
        loadUserReservations(user.email);
      } else {
        // Load from localStorage as fallback
        const savedReservations = JSON.parse(localStorage.getItem('reservations') || '[]');
        
        // Eğer localStorage'da rezervasyon yoksa demo rezervasyon ekle
        if (savedReservations.length === 0) {
          const demoReservation = {
            id: 'demo-reservation-1',
            reservationCode: 'TB' + Date.now().toString(36).toUpperCase(),
            reservationNumber: Date.now().toString().slice(-8),
            email: 'demo@example.com',
            firstName: 'Demo',
            lastName: 'Kullanıcı',
            phone: '+90 555 123 45 67',
            hotel: {
              id: 'demo-hotel-1',
              name: 'Rixos Premium Belek',
              location: 'Belek, Antalya',
              image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
              rating: 5
            },
            bookingData: {
              checkIn: '2025-09-14',
              checkOut: '2025-09-17',
              adults: 2,
              children: 1,
              nights: 3
            },
            totalPrice: 3750,
            paymentInfo: {
              method: 'card',
              transactionId: 'DEMO_' + Date.now(),
              cardNumber: '****1234',
              paymentDate: new Date().toISOString()
            },
            status: 'confirmed',
            createdAt: new Date().toISOString()
          };
          
          localStorage.setItem('reservations', JSON.stringify([demoReservation]));
          setReservations([demoReservation]);
        } else {
          setReservations(savedReservations);
        }
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const loadUserReservations = async (email) => {
    try {
      setLoading(true);
      const result = await getReservationsByEmail(email);
      if (result.success) {
        setReservations(result.reservations);
      } else {
        // Fallback to localStorage
        const savedReservations = JSON.parse(localStorage.getItem('reservations') || '[]');
        setReservations(savedReservations);
      }
    } catch (error) {
      console.error('Error loading reservations:', error);
      // Fallback to localStorage
      const savedReservations = JSON.parse(localStorage.getItem('reservations') || '[]');
      setReservations(savedReservations);
    } finally {
      setLoading(false);
    }
  };


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString('tr-TR', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    }) + ' ₺';
  };

  if (loading) {
    return (
      <div style={{minHeight: '100vh', background: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{textAlign: 'center'}}>
          <div style={{width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #0b5ed7', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px'}}></div>
          <p>Rezervasyonlar yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{minHeight: '100vh', background: '#f8f9fa'}}>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* Container Section */}
      <div style={{padding: '40px 20px'}}>
        <div style={{maxWidth: 860, margin: '0 auto'}}>
          {/* Breadcrumb Navigation */}
          <div style={{ 
            marginBottom: '24px', 
            fontSize: '14px', 
            color: '#6b7280',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Link 
              to="/" 
              style={{ 
                color: '#0b5ed7', 
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              Tatilbudur
            </Link>
            <span style={{ color: '#d1d5db' }}>›</span>
            <span style={{ color: '#374151' }}>
              Rezervasyonlarım
            </span>
          </div>


          {reservations.length === 0 ? (
            <div style={{
              background: 'white',
              border: '1px solid #dee2e6',
              borderRadius: 12,
              padding: 48,
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              textAlign: 'center'
            }}>
              <div style={{fontSize: '48px', marginBottom: '16px'}}>📋</div>
              <h2 style={{marginTop: 0, color: '#374151'}}>
                {user ? 'Henüz rezervasyonunuz bulunmuyor' : 'Rezervasyonlarınızı görüntülemek için giriş yapın'}
              </h2>
              <p style={{color: '#6b7280', marginBottom: '24px'}}>
                {user 
                  ? 'İlk rezervasyonunuzu yapmak için otel aramaya başlayın.'
                  : 'Giriş yaparak rezervasyonlarınızı görüntüleyebilirsiniz.'
                }
              </p>
              <div style={{display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap'}}>
                {user ? (
                  <Link 
                    to="/"
                    style={{
                      display: 'inline-block',
                      padding: '12px 24px',
                      background: '#0b5ed7',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: 8,
                      fontWeight: '600'
                    }}
                  >
                    Otel Ara
                  </Link>
                ) : (
                  <Link 
                    to="/login"
                    style={{
                      display: 'inline-block',
                      padding: '12px 24px',
                      background: '#0b5ed7',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: 8,
                      fontWeight: '600'
                    }}
                  >
                    Giriş Yap
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <div>
              <h2 style={{marginBottom: '24px', color: '#374151'}}>
                Rezervasyonlarım ({reservations.length})
              </h2>
              {reservations.map((reservation) => (
                <div key={reservation.id || reservation.reservationCode} style={{
                  background: 'white',
                  border: '1px solid #dee2e6',
                  borderRadius: 12,
                  padding: 24,
                  marginBottom: 16,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px'}}>
                    <div>
                      <h3 style={{margin: '0 0 8px 0', color: '#374151', fontSize: '18px'}}>
                        {reservation.hotel.name}
                      </h3>
                      <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280', fontSize: '14px', marginBottom: '4px'}}>
                        <MapPin size={16} />
                        <span>{reservation.hotel.location}</span>
                      </div>
                      <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#0b5ed7', fontSize: '12px', fontWeight: '600', marginBottom: '4px'}}>
                        <Hash size={14} />
                        <span>Rezervasyon No: {reservation.reservationCode || reservation.reservationNumber || reservation.id || 'N/A'}</span>
                      </div>
                    </div>
                    <div style={{
                      padding: '6px 12px',
                      borderRadius: '20px',
                      background: reservation.status === 'confirmed' ? '#dcfce7' : '#fef3c7',
                      color: reservation.status === 'confirmed' ? '#166534' : '#92400e',
                      fontSize: '12px',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      {reservation.status === 'confirmed' ? <CheckCircle size={14} /> : <Clock size={14} />}
                      {reservation.status === 'confirmed' ? 'Onaylandı' : 'Beklemede'}
                    </div>
                  </div>

                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px'}}>
                    <div>
                      <div style={{fontSize: '12px', color: '#6b7280', marginBottom: '4px'}}>Giriş Tarihi</div>
                      <div style={{fontSize: '14px', color: '#374151', fontWeight: '500'}}>
                        {formatDate(reservation.bookingData.checkIn)}
                      </div>
                    </div>
                    <div>
                      <div style={{fontSize: '12px', color: '#6b7280', marginBottom: '4px'}}>Çıkış Tarihi</div>
                      <div style={{fontSize: '14px', color: '#374151', fontWeight: '500'}}>
                        {formatDate(reservation.bookingData.checkOut)}
                      </div>
                    </div>
                    <div>
                      <div style={{fontSize: '12px', color: '#6b7280', marginBottom: '4px'}}>Misafir Sayısı</div>
                      <div style={{fontSize: '14px', color: '#374151', fontWeight: '500'}}>
                        {reservation.bookingData.adults} Yetişkin
                        {reservation.bookingData.children > 0 && `, ${reservation.bookingData.children} Çocuk`}
                      </div>
                    </div>
                    <div>
                      <div style={{fontSize: '12px', color: '#6b7280', marginBottom: '4px'}}>Gece Sayısı</div>
                      <div style={{fontSize: '14px', color: '#374151', fontWeight: '500'}}>
                        {reservation.bookingData.nights} Gece
                      </div>
                    </div>
                  </div>

                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid #e5e7eb'}}>
                    <div>
                      <div style={{fontSize: '12px', color: '#6b7280', marginBottom: '4px'}}>Toplam Tutar</div>
                      <div style={{fontSize: '18px', color: '#374151', fontWeight: '700'}}>
                        {formatCurrency(reservation.totalPrice)}
                      </div>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280', fontSize: '12px'}}>
                      <CreditCard size={16} />
                      <span>**** {reservation.cardInfo?.cardNumber || reservation.paymentInfo?.cardNumber || '****'}</span>
                    </div>
                  </div>

                  <div style={{marginTop: '12px', fontSize: '12px', color: '#6b7280'}}>
                    Rezervasyon Tarihi: {formatDate(reservation.createdAt)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationsPage;

