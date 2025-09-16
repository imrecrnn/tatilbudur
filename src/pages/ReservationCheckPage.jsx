import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Hash, MapPin, Calendar, User, CreditCard, CheckCircle, Clock, AlertCircle, Copy, Mail } from 'lucide-react';
import { getReservationByCode, getReservationsByEmail } from '../firebase/reservationService';

const ReservationCheckPage = () => {
  const [searchParams] = useSearchParams();
  const [searchType, setSearchType] = useState('email'); // 'email' or 'code'
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [paymentAmount, setPaymentAmount] = useState(null);

  // URL parametrelerinden gelen bilgileri işle
  useEffect(() => {
    const code = searchParams.get('code');
    const amount = searchParams.get('amount');
    
    if (code) {
      setSearchType('code');
      setSearchValue(code);
      setPaymentAmount(amount ? parseFloat(amount) : null);
      // Otomatik arama yap
      handleAutoSearch(code);
    }
  }, [searchParams]);

  const handleAutoSearch = async (code) => {
    setIsSearching(true);
    setError('');
    setSuccess('');
    setReservations([]);

    try {
      const result = await getReservationByCode(code);
      if (result.success && result.reservation) {
        setReservations([result.reservation]);
        setSuccess('Rezervasyon bulundu!');
      } else {
        setError(result.error || 'Rezervasyon bulunamadı.');
      }
    } catch (err) {
      console.error('❌ Rezervasyon arama hatası:', err);
      setError('Rezervasyon aranırken bir hata oluştu.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchValue.trim()) {
      setError('Lütfen arama değeri girin.');
      return;
    }

    setIsSearching(true);
    setError('');
    setSuccess('');
    setReservations([]);

    try {
      if (searchType === 'email') {
        // Search by email
        const result = await getReservationsByEmail(searchValue.trim());
        
        if (result.success) {
          if (result.reservations.length > 0) {
            setReservations(result.reservations);
            setSuccess(`${result.reservations.length} rezervasyon bulundu!`);
          } else {
            setError('Bu e-posta adresine ait rezervasyon bulunamadı.');
            setReservations([]);
          }
        } else {
          setError(result.error || 'Rezervasyon arama sırasında bir hata oluştu.');
          setReservations([]);
        }
      } else {
        // Search by reservation code
        const result = await getReservationByCode(searchValue.trim().toUpperCase());
        
        if (result.success) {
          setReservations([result.reservation]);
          setSuccess('Rezervasyon bulundu!');
        } else {
          setError(result.error || 'Rezervasyon bulunamadı.');
          setReservations([]);
        }
      }
    } catch (error) {
      console.error('Search error:', error);
      setError('Arama sırasında bir hata oluştu.');
      setReservations([]);
    } finally {
      setIsSearching(false);
    }
  };

  const copyReservationCode = (code) => {
    navigator.clipboard.writeText(code);
    setSuccess('Rezervasyon kodu kopyalandı!');
    setTimeout(() => setSuccess(''), 2000);
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

  return (
    <div style={{minHeight: '100vh', background: '#f8f9fa'}}>
      {/* Logo Section */}
      <div style={{
        background: 'white',
        padding: '20px 0',
        borderBottom: '1px solid #dee2e6',
        textAlign: 'center'
      }}>
        <div style={{fontSize: '24px', fontWeight: 'bold', color: '#0b5ed7'}}>
          TatilBudur<span style={{color: '#666'}}>.com</span>
        </div>
        <div style={{fontSize: '12px', color: '#666', marginTop: '4px'}}>27 yıl</div>
      </div>

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
            <span style={{ color: '#374151' }}>Rezervasyon Kontrol</span>
          </div>

          {/* Search Form */}
          <div style={{
            background: 'white',
            border: '1px solid #dee2e6',
            borderRadius: 12,
            padding: 24,
            marginBottom: 24,
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            <h2 style={{ marginTop: 0, marginBottom: 16, color: '#374151' }}>
              Rezervasyon Kontrol
            </h2>
            <p style={{ color: '#6b7280', marginBottom: 20 }}>
              E-posta adresinizi veya rezervasyon kodunuzu girerek rezervasyon detaylarınızı görüntüleyebilirsiniz.
            </p>
            
            <form onSubmit={handleSearch}>
              {/* Search Type Selection */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="searchType"
                      value="email"
                      checked={searchType === 'email'}
                      onChange={(e) => setSearchType(e.target.value)}
                    />
                    <Mail size={16} />
                    <span>E-posta ile Ara</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="searchType"
                      value="code"
                      checked={searchType === 'code'}
                      onChange={(e) => setSearchType(e.target.value)}
                    />
                    <Hash size={16} />
                    <span>Rezervasyon Kodu ile Ara</span>
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                <div style={{ flex: 1, position: 'relative' }}>
                  <input
                    type={searchType === 'email' ? 'email' : 'text'}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder={
                      searchType === 'email' 
                        ? 'E-posta adresinizi girin' 
                        : 'Rezervasyon kodunuzu girin (örn: TB123ABC456)'
                    }
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #dee2e6',
                      borderRadius: 8,
                      fontSize: 14,
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      textTransform: searchType === 'code' ? 'uppercase' : 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#0b5ed7'}
                    onBlur={(e) => e.target.style.borderColor = '#dee2e6'}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSearching || !searchValue.trim()}
                  style={{
                    padding: '12px 24px',
                    background: isSearching || !searchValue.trim() ? '#6b7280' : '#0b5ed7',
                    color: 'white',
                    border: 'none',
                    borderRadius: 8,
                    cursor: isSearching || !searchValue.trim() ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontWeight: 600,
                    transition: 'background-color 0.2s'
                  }}
                >
                  {isSearching ? (
                    <>
                      <div style={{
                        width: 16,
                        height: 16,
                        border: '2px solid transparent',
                        borderTop: '2px solid white',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}></div>
                      Aranıyor...
                    </>
                  ) : (
                    <>
                      <Search size={16} />
                      Sorgula
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Error Message */}
            {error && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 16px',
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: 8,
                color: '#dc2626',
                fontSize: 14,
                marginBottom: 16
              }}>
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 16px',
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: 8,
                color: '#16a34a',
                fontSize: 14,
                marginBottom: 16
              }}>
                <CheckCircle size={16} />
                {success}
              </div>
            )}
          </div>

          {/* Reservation Details */}
          {reservations.length > 0 && (
            <div>
              <h3 style={{ marginBottom: '16px', color: '#374151' }}>
                Bulunan Rezervasyonlar ({reservations.length})
              </h3>
              {reservations.map((reservation, index) => (
                <div key={reservation.id || reservation.reservationCode || index} style={{
                  background: 'white',
                  border: '1px solid #dee2e6',
                  borderRadius: 12,
                  padding: 24,
                  marginBottom: 16,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ margin: '0 0 8px 0', color: '#374151', fontSize: '20px' }}>
                    {reservation.hotel.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>
                    <MapPin size={16} />
                    <span>{reservation.hotel.location}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0b5ed7', fontSize: '14px', fontWeight: '600' }}>
                    <Hash size={16} />
                    <span>Rezervasyon No: {reservation.reservationCode || reservation.reservationNumber}</span>
                    <button
                      onClick={() => copyReservationCode(reservation.reservationCode || reservation.reservationNumber)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#0b5ed7',
                        cursor: 'pointer',
                        padding: '4px',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                      title="Kodu Kopyala"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                </div>
                <div style={{
                  padding: '8px 16px',
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

              {/* Guest Information */}
              <div style={{ marginBottom: '20px', padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
                <h4 style={{ margin: '0 0 12px 0', color: '#374151', fontSize: '16px' }}>Misafir Bilgileri</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>Ad Soyad:</span>
                    <div style={{ fontSize: '14px', color: '#374151', fontWeight: '500' }}>
                      {reservation.firstName} {reservation.lastName}
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>E-posta:</span>
                    <div style={{ fontSize: '14px', color: '#374151', fontWeight: '500' }}>
                      {reservation.email}
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>Telefon:</span>
                    <div style={{ fontSize: '14px', color: '#374151', fontWeight: '500' }}>
                      {reservation.phone}
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Giriş Tarihi</div>
                  <div style={{ fontSize: '16px', color: '#374151', fontWeight: '500' }}>
                    {formatDate(reservation.bookingData.checkIn)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Çıkış Tarihi</div>
                  <div style={{ fontSize: '16px', color: '#374151', fontWeight: '500' }}>
                    {formatDate(reservation.bookingData.checkOut)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Misafir Sayısı</div>
                  <div style={{ fontSize: '16px', color: '#374151', fontWeight: '500' }}>
                    {reservation.bookingData.adults} Yetişkin
                    {reservation.bookingData.children > 0 && `, ${reservation.bookingData.children} Çocuk`}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Gece Sayısı</div>
                  <div style={{ fontSize: '16px', color: '#374151', fontWeight: '500' }}>
                    {reservation.bookingData.nights} Gece
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div style={{ paddingTop: '20px', borderTop: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Toplam Tutar</div>
                    <div style={{ fontSize: '24px', color: '#374151', fontWeight: '700' }}>
                      {formatCurrency(reservation.totalPrice)}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280', fontSize: '12px' }}>
                    <CreditCard size={16} />
                    <span>**** {reservation.paymentInfo?.cardNumber || '****'}</span>
                  </div>
                </div>
                
                {/* Ödenen Tutar */}
                {paymentAmount && (
                  <div style={{ 
                    background: '#f0f9ff', 
                    border: '1px solid #0ea5e9', 
                    borderRadius: '8px', 
                    padding: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <div style={{ fontSize: '12px', color: '#0369a1', marginBottom: '4px' }}>Ödenen Tutar</div>
                      <div style={{ fontSize: '18px', color: '#0c4a6e', fontWeight: '600' }}>
                        {formatCurrency(paymentAmount)}
                      </div>
                    </div>
                    <div style={{ 
                      background: '#0ea5e9', 
                      color: 'white', 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      ✅ Ödendi
                    </div>
                  </div>
                )}
              </div>

                  <div style={{ marginTop: '16px', fontSize: '12px', color: '#6b7280' }}>
                    Rezervasyon Tarihi: {formatDate(reservation.createdAt?.toDate ? reservation.createdAt.toDate() : reservation.createdAt)}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Back to Home */}
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
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
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ReservationCheckPage;
