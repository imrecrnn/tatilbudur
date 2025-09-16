import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  User, Phone, Mail, Calendar, CreditCard, Shield, 
  Clock, MapPin, Star, ArrowLeft, Check
} from 'lucide-react';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [timeLeft, setTimeLeft] = useState({ minutes: 8, seconds: 9 });
  const [guestInfo, setGuestInfo] = useState({
    guests: [
      {
        gender: '',
        firstName: '',
        lastName: '',
        phone: '+90',
        email: '',
        birthDate: '',
        tcNumber: '',
        isForeign: false
      },
      {
        gender: '',
        firstName: '',
        lastName: '',
        phone: '+90',
        email: '',
        birthDate: '',
        tcNumber: '',
        isForeign: false
      }
    ]
  });
  const [hotel, setHotel] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [invoiceInfo, setInvoiceInfo] = useState({
    addInvoice: false,
    companyName: '',
    taxNumber: '',
    address: '',
    city: '',
    district: ''
  });
  const [reservationNote, setReservationNote] = useState({
    addNote: false,
    arrivalTime: '',
    bedPreference: '',
    specialRequests: ''
  });
  const [transportation, setTransportation] = useState({
    selected: null,
    options: [
      { id: 'flight', name: 'Uçak', description: 'Havayolu ile ulaşım' },
      { id: 'flight-transfer', name: 'Uçak + Transfer', description: 'Havayolu + Havaalanı transferi' },
      { id: 'airport-transfer', name: 'Havaalanından Tesise Transfer', description: 'Sadece havaalanı transferi' }
    ]
  });

  // Sample hotel data
  const sampleHotels = {
    1: {
      id: 1,
      name: "Rixos Premium Belek",
      location: "Belek, Antalya",
      serviceType: "Ultra Her Şey Dahil",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
      rooms: [
        {
          id: 1,
          name: "Deluxe Sea View Room",
          type: "Deniz Manzaralı Deluxe Oda",
          size: "35 m²",
          features: ["Merkezi Klima", "Seramik Zemin", "Saç Kurutma Makinası", "LCD / Plazma TV", "Emanet Kasa", "Minibar"],
          price: 1250
        }
      ]
    },
    3: {
      id: 3,
      name: "Calista Luxury Resort",
      location: "Belek, Antalya",
      serviceType: "Her Şey Dahil",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      rooms: [
        {
          id: 1,
          name: "Superior Garden View Room",
          type: "Kara Manzaralı Superior Oda",
          size: "42 m²",
          features: ["Merkezi Klima", "Seramik Zemin", "Saç Kurutma Makinası", "LCD / Plazma TV", "Emanet Kasa", "Minibar"],
          price: 1800
        }
      ]
    }
  };

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          return { minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Load hotel and booking data
  useEffect(() => {
    setTimeout(() => {
      const hotelData = sampleHotels[parseInt(hotelId)];
      if (hotelData) {
        setHotel(hotelData);
        
        // Get booking data from location state or set defaults
        const booking = location.state?.bookingData || {
          checkIn: '2025-09-14',
          checkOut: '2025-09-27',
          adults: 2,
          children: 0,
          nights: 13,
          totalPrice: 195003.90
        };
        setBookingData(booking);
      }
      setLoading(false);
    }, 1000);
  }, [hotelId, location.state]);

  const updateGuestInfo = (guestIndex, field, value) => {
    setGuestInfo(prev => ({
      ...prev,
      guests: prev.guests.map((guest, index) => 
        index === guestIndex 
          ? { ...guest, [field]: value }
          : guest
      )
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const handleContinuePayment = () => {
    // Navigate to payment page without validation
    navigate(`/payment/${hotelId}`, { 
      state: { 
        hotel, 
        bookingData, 
        guestInfo,
        invoiceInfo,
        reservationNote,
        transportation
      } 
    });
  };

  if (loading) {
    return (
      <div className="checkout-loading">
        <div className="loading-spinner"></div>
        <p>Rezervasyon bilgileri yükleniyor...</p>
      </div>
    );
  }

  if (!hotel || !bookingData) {
    return (
      <div className="checkout-error">
        <h2>Rezervasyon bilgileri bulunamadı</h2>
        <button onClick={() => navigate(-1)} className="btn btn-primary">
          Geri Dön
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        {/* Header */}
        <div className="checkout-header">
          <button onClick={() => navigate(-1)} className="back-btn">
            <ArrowLeft size={20} />
            Geri
          </button>
          <h1>Rezervasyon</h1>
        </div>

        <div className="checkout-layout">
          {/* Left Column - Guest Information */}
          <div className="guest-info-section">
            {/* TatilBudur Logo */}
            <div className="brand-section">
              <div className="logo">
                <span className="brand-name">tatilbudur</span>
                <span className="brand-number">27</span>
              </div>
              <p className="brand-subtitle">TatilBudur bir İŞ GİRİŞİM SERMAYESİ İştirakidir.</p>
            </div>

            <div className="section-header">
              <h2>Misafir Bilgileri</h2>
              <p>Otelde konaklayacak kişiye ait bilgileri doldurun.</p>
            </div>

            {guestInfo.guests.slice(0, bookingData.adults).map((guest, index) => (
              <div key={index} className="guest-form">
                <h3>{index + 1}. Kişi</h3>
                
                <div className="form-group">
                  <label>Cinsiyet</label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name={`gender-${index}`}
                        value="female"
                        checked={guest.gender === 'female'}
                        onChange={(e) => updateGuestInfo(index, 'gender', e.target.value)}
                      />
                      <span>Kadın</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name={`gender-${index}`}
                        value="male"
                        checked={guest.gender === 'female'}
                        onChange={(e) => updateGuestInfo(index, 'gender', e.target.value)}
                      />
                      <span>Erkek</span>
                    </label>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>{index === 0 ? 'Adınız*' : 'Adı*'}</label>
                    <input
                      type="text"
                      value={guest.firstName}
                      onChange={(e) => updateGuestInfo(index, 'firstName', e.target.value)}
                      placeholder="Ad"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>{index === 0 ? 'Soyadınız*' : 'Soyadı*'}</label>
                    <input
                      type="text"
                      value={guest.lastName}
                      onChange={(e) => updateGuestInfo(index, 'lastName', e.target.value)}
                      placeholder="Soyad"
                      required
                    />
                  </div>
                </div>

                {index === 0 && (
                  <>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Telefon Numaranız*</label>
                        <div className="phone-input">
                          <div className="country-code">
                            <span>🇹🇷</span>
                            <span>+90</span>
                          </div>
                          <input
                            type="tel"
                            value={guest.phone.replace('+90', '')}
                            onChange={(e) => updateGuestInfo(index, 'phone', '+90' + e.target.value)}
                            placeholder="5XX XXX XX XX"
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>E-Posta*</label>
                        <input
                          type="email"
                          value={guest.email}
                          onChange={(e) => updateGuestInfo(index, 'email', e.target.value)}
                          placeholder="ornek@email.com"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="form-group">
                  <label>{index === 0 ? 'Doğum Tarihiniz*' : 'Doğum Tarihi*'}</label>
                  <input
                    type="date"
                    value={guest.birthDate}
                    onChange={(e) => updateGuestInfo(index, 'birthDate', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>T.C Kimlik Numarası*</label>
                  <div className="tc-input">
                    <input
                      type="text"
                      value={guest.tcNumber}
                      onChange={(e) => updateGuestInfo(index, 'tcNumber', e.target.value)}
                      placeholder="XXXXXXXXXXX"
                      maxLength="11"
                      required
                      disabled={guest.isForeign}
                    />
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={guest.isForeign}
                        onChange={(e) => {
                          updateGuestInfo(index, 'isForeign', e.target.checked);
                          if (e.target.checked) {
                            updateGuestInfo(index, 'tcNumber', '');
                          }
                        }}
                      />
                      <span>T.C Vatandaşı Değilim</span>
                    </label>
                  </div>
                </div>
              </div>
            ))}

            {/* Privacy Notice */}
            <div className="privacy-notice">
              <p>Rezervasyon sırasında girilen kişisel bilgiler, daha iyi hizmet sunabilmek amacıyla saklanacak ve işlenecektir. 
                <a href="#" className="privacy-link">Detaylı Bilgi</a>
              </p>
            </div>

            {/* Invoice Information */}
            <div className="optional-section">
              <div className="section-toggle">
                <input
                  type="checkbox"
                  id="addInvoice"
                  checked={invoiceInfo.addInvoice}
                  onChange={(e) => setInvoiceInfo({...invoiceInfo, addInvoice: e.target.checked})}
                />
                <label htmlFor="addInvoice">
                  <strong>Fatura Bilgisi Ekle (Opsiyonel)</strong>
                  <span>Rezervasyon için iletişim bilgilerini girin.</span>
                </label>
              </div>
              
              {invoiceInfo.addInvoice && (
                <div className="invoice-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Şirket Adı</label>
                      <input
                        type="text"
                        value={invoiceInfo.companyName}
                        onChange={(e) => setInvoiceInfo({...invoiceInfo, companyName: e.target.value})}
                        placeholder="Şirket adı"
                      />
                    </div>
                    <div className="form-group">
                      <label>Vergi Numarası</label>
                      <input
                        type="text"
                        value={invoiceInfo.taxNumber}
                        onChange={(e) => setInvoiceInfo({...invoiceInfo, taxNumber: e.target.value})}
                        placeholder="Vergi numarası"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Adres</label>
                    <textarea
                      value={invoiceInfo.address}
                      onChange={(e) => setInvoiceInfo({...invoiceInfo, address: e.target.value})}
                      placeholder="Tam adres"
                      rows="3"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Şehir</label>
                      <input
                        type="text"
                        value={invoiceInfo.city}
                        onChange={(e) => setInvoiceInfo({...invoiceInfo, city: e.target.value})}
                        placeholder="Şehir"
                      />
                    </div>
                    <div className="form-group">
                      <label>İlçe</label>
                      <input
                        type="text"
                        value={invoiceInfo.district}
                        onChange={(e) => setInvoiceInfo({...invoiceInfo, district: e.target.value})}
                        placeholder="İlçe"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Reservation Notes */}
            <div className="optional-section">
              <div className="section-toggle">
                <input
                  type="checkbox"
                  id="addNote"
                  checked={reservationNote.addNote}
                  onChange={(e) => setReservationNote({...reservationNote, addNote: e.target.checked})}
                />
                <label htmlFor="addNote">
                  <strong>Rezervasyon Notu Ekle (Opsiyonel)</strong>
                  <span>Varış saati ve yatak tercihinizi belirtin.</span>
                </label>
              </div>
              
              {reservationNote.addNote && (
                <div className="note-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Varış Saati</label>
                      <input
                        type="time"
                        value={reservationNote.arrivalTime}
                        onChange={(e) => setReservationNote({...reservationNote, arrivalTime: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Yatak Tercihi</label>
                      <select
                        value={reservationNote.bedPreference}
                        onChange={(e) => setReservationNote({...reservationNote, bedPreference: e.target.value})}
                      >
                        <option value="">Seçiniz</option>
                        <option value="single">Tek Kişilik</option>
                        <option value="double">Çift Kişilik</option>
                        <option value="twin">İki Tek</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Özel İstekler</label>
                    <textarea
                      value={reservationNote.specialRequests}
                      onChange={(e) => setReservationNote({...reservationNote, specialRequests: e.target.value})}
                      placeholder="Özel isteklerinizi yazın..."
                      rows="3"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Transportation */}
            <div className="transportation-section">
              <h3>Konaklamanıza Ulaşım Ekleyin</h3>
              <p>Hizmet seçimi yaparak ulaşımınızı kolaylaştırın.</p>
              
              <div className="transportation-options">
                {transportation.options.map((option) => (
                  <div key={option.id} className="transport-option">
                    <div className="transport-info">
                      <h4>{option.name}</h4>
                      <p>{option.description}</p>
                    </div>
                    <button 
                      className={`add-btn ${transportation.selected === option.id ? 'selected' : ''}`}
                      onClick={() => setTransportation({...transportation, selected: transportation.selected === option.id ? null : option.id})}
                    >
                      {transportation.selected === option.id ? 'Eklendi' : '+ Ekle'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Summary */}
          <div className="booking-summary-section">
            {/* Urgency Banner */}
            <div className="urgency-banner">
              <div className="urgency-content">
                <span>Acele Edin, Size Özel Fiyat Bekletiliyor!</span>
                <div className="countdown">
                  {timeLeft.minutes.toString().padStart(2, '0')}:{timeLeft.seconds.toString().padStart(2, '0')}
                </div>
              </div>
            </div>

            {/* Hotel Details */}
            <div className="hotel-summary">
              <h3>{hotel.name}</h3>
              <div className="hotel-location">
                <MapPin size={16} />
                <span>{hotel.location}</span>
              </div>
              <div className="service-type">
                <Star size={16} />
                <span>{hotel.serviceType}</span>
              </div>
            </div>

            {/* Room Details */}
            <div className="room-summary">
              <div className="room-image">
                <img src={hotel.image} alt={hotel.name} />
              </div>
              <div className="room-info">
                <h4>{hotel.rooms[0].type}</h4>
                <div className="room-features">
                  {hotel.rooms[0].features.slice(0, 6).map((feature, index) => (
                    <div key={index} className="feature-item">
                      <Check size={14} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <a href="#" className="see-all-features">Tüm Özellikleri Gör</a>
              </div>
            </div>

            {/* Booking Dates */}
            <div className="booking-dates">
              <div className="date-item">
                <Calendar size={16} />
                <div>
                  <span>Giriş Tarihi:</span>
                  <strong>{formatDate(bookingData.checkIn)}</strong>
                </div>
              </div>
              <div className="date-item">
                <Calendar size={16} />
                <div>
                  <span>Çıkış Tarihi:</span>
                  <strong>{formatDate(bookingData.checkOut)}</strong>
                </div>
              </div>
              <div className="guest-info">
                <User size={16} />
                <span>
                  {bookingData.adults} Yetişkin
                  {bookingData.children > 0 && `, ${bookingData.children} Çocuk`}
                  , {bookingData.nights} Gece
                </span>
              </div>
            </div>

            {/* Price Summary */}
            <div className="price-summary">
              <h4>Fiyat Özeti</h4>
              <div className="price-breakdown">
                <div className="price-item">
                  <span>Oda Fiyatı ({bookingData.nights} gece)</span>
                  <span>{(bookingData.totalPrice / bookingData.nights).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</span>
                </div>
                <div className="price-item">
                  <span>Toplam Konaklama</span>
                  <span>{bookingData.totalPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</span>
                </div>
                {bookingData.children > 0 && (
                  <div className="price-item discount">
                    <span>Çocuk İndirimi ({bookingData.children} çocuk)</span>
                    <span>-{(bookingData.totalPrice * 0.1).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</span>
                  </div>
                )}
                <div className="price-item">
                  <span>Konaklama Vergisi</span>
                  <span>Dahil</span>
                </div>
                <div className="price-total">
                  <span>TOPLAM FİYAT</span>
                  <span>{bookingData.totalPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</span>
                </div>
              </div>
              <div className="price-details">
                <div className="detail-item">
                  <span>Gece Başına Ortalama:</span>
                  <span>{(bookingData.totalPrice / bookingData.nights).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</span>
                </div>
                <div className="detail-item">
                  <span>Kişi Başına Ortalama:</span>
                  <span>{(bookingData.totalPrice / (bookingData.adults + bookingData.children)).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</span>
                </div>
              </div>
              <p className="tax-note">Fiyatlara konaklama vergisi dahildir.</p>
            </div>

            {/* Continue Button */}
            <button 
              className="continue-payment-btn"
              onClick={handleContinuePayment}
            >
              <CreditCard size={20} />
              Ödeme Adımına Devam Et
            </button>
            
            <div className="payment-notice">
              <p>Merak etmeyin sizden henüz bir ücret alınmayacak!</p>
            </div>

            {/* Security Info */}
            <div className="security-info">
              <Shield size={16} />
              <span>Güvenli ödeme sistemi ile korunuyorsunuz</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
