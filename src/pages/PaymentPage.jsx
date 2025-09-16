import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  CreditCard, Calendar, User, MapPin, Star, Check, 
  ArrowLeft, Shield, Clock, Plus, Trash2, Edit3, Loader2
} from 'lucide-react';
import './PaymentPage.css';
import { createPayment, getInstallmentOptions } from '../services/iyzicoService';

const PaymentPage = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [hotel, setHotel] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Payment processing state
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  // Payment form state
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardInfo, setCardInfo] = useState({
    cardHolder: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvc: ''
  });
  
  // Installment options
  const [installmentOptions, setInstallmentOptions] = useState([
    { id: 1, name: 'Tek Çekim', installments: 1, monthlyAmount: 185253.71, finalPrice: 185253.71, discount: 0, selected: true },
    { id: 3, name: '3 Taksit', installments: 3, monthlyAmount: 61751.24, finalPrice: 185253.71, discount: 0, selected: false },
    { id: 6, name: '6 Taksit', installments: 6, monthlyAmount: 30875.62, finalPrice: 185253.71, discount: 0, selected: false },
    { id: 9, name: '9 Taksit', installments: 9, monthlyAmount: 21667.10, finalPrice: 195003.90, discount: 0, selected: false }
  ]);
  
  const [selectedInstallment, setSelectedInstallment] = useState(1);
  const [discountCode, setDiscountCode] = useState('');
  const [tbClubPoints, setTbClubPoints] = useState(false);
  
  // Card selection modal state
  const [showCardSelection, setShowCardSelection] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  
  // World Pay QR code state
  const [showWorldPayQR, setShowWorldPayQR] = useState(false);
  const [savedCards, setSavedCards] = useState([
    {
      id: 1,
      cardNumber: '4506 3440 1787 2105',
      cardHolder: 'CEREN IMRE',
      expiryMonth: '04',
      expiryYear: '28',
      cardType: 'yapi-kredi',
      isDefault: true
    },
    {
      id: 2,
      cardNumber: '5555 4444 3333 2222',
      cardHolder: 'CEREN IMRE',
      expiryMonth: '12',
      expiryYear: '26',
      cardType: 'mastercard',
      isDefault: false
    },
    {
      id: 3,
      cardNumber: '4111 1111 1111 1111',
      cardHolder: 'CEREN IMRE',
      expiryMonth: '08',
      expiryYear: '27',
      cardType: 'visa',
      isDefault: false
    }
  ]);

  // Sample hotel data
  const sampleHotels = {
    1: {
      id: 1,
      name: "Calista Luxury Resort",
      location: "Antalya / Kemer / Göynük",
      serviceType: "Luxury Her Şey Dahil",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
      rooms: [
        {
          type: "Kara Manzaralı Superior Oda",
          features: [
            "42 m²",
            "Merkezi Klima",
            "Seramik Zemin",
            "Saç Kurutma Makinası",
            "LCD / Plazma TV",
            "Emanet Kasa"
          ]
        }
      ]
    }
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Try to get hotel data from location state first, then fallback to sample data
      const hotelData = location.state?.hotel || sampleHotels[parseInt(hotelId)];
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
        
        // Load installment options from Iyzico
        loadInstallmentOptions(booking.totalPrice);
      }
      setLoading(false);
    }, 1000);
  }, [hotelId, location.state]);

  // Load installment options from Iyzico
  const loadInstallmentOptions = async (price) => {
    try {
      // For demo purposes, we'll use a sample bin number
      // In production, you would get this from the card number
      const binNumber = '454360';
      const result = await getInstallmentOptions(price, binNumber);
      
      if (result.status === 'success' && result.installmentDetails && result.installmentDetails.length > 0) {
        const installmentDetails = result.installmentDetails[0];
        if (installmentDetails && installmentDetails.installmentPrices && Array.isArray(installmentDetails.installmentPrices)) {
          const newOptions = installmentDetails.installmentPrices.map((installment, index) => ({
            id: installment.installmentNumber,
            name: installment.installmentNumber === 1 ? 'Tek Çekim' : `${installment.installmentNumber} Taksit`,
            installments: installment.installmentNumber,
            monthlyAmount: parseFloat(installment.price),
            finalPrice: parseFloat(installment.totalPrice),
            discount: 0,
            selected: installment.installmentNumber === 1
          }));
          setInstallmentOptions(newOptions);
        } else {
          console.warn('installmentPrices is not an array or is undefined');
          // Fallback to default options
          setInstallmentOptions([{
            id: 1,
            name: 'Tek Çekim',
            installments: 1,
            monthlyAmount: price,
            finalPrice: price,
            discount: 0,
            selected: true
          }]);
        }
      } else {
        console.warn('No installment details available, using fallback');
        // Fallback to default options
        setInstallmentOptions([{
          id: 1,
          name: 'Tek Çekim',
          installments: 1,
          monthlyAmount: price,
          finalPrice: price,
          discount: 0,
          selected: true
        }]);
      }
    } catch (error) {
      console.error('Error loading installment options:', error);
      // Keep default options if Iyzico fails
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

  const handleInstallmentChange = (installmentId) => {
    setInstallmentOptions(prev => 
      prev.map(option => ({
        ...option,
        selected: option.id === installmentId
      }))
    );
    setSelectedInstallment(installmentId);
  };

  const handleCardNumberChange = (value) => {
    // Format card number with spaces
    const formatted = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
    setCardInfo(prev => ({ ...prev, cardNumber: formatted }));
  };


  const handleCardSelect = (card) => {
    setSelectedCard(card);
    setCardInfo({
      cardHolder: card.cardHolder,
      cardNumber: card.cardNumber,
      expiryMonth: card.expiryMonth,
      expiryYear: card.expiryYear,
      cvc: ''
    });
    setShowCardSelection(false);
  };

  const handleNewCard = () => {
    setSelectedCard(null);
    setCardInfo({
      cardHolder: '',
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvc: ''
    });
    setShowCardSelection(false);
  };

  const handleConfirmPayment = async () => {
    // Validate form
    if (!cardInfo.cardHolder || !cardInfo.cardNumber || !cardInfo.expiryMonth || !cardInfo.expiryYear || !cardInfo.cvc) {
      setPaymentError('Lütfen tüm kart bilgilerini doldurun.');
      return;
    }

    // Validate card number length
    const cleanCardNumber = cardInfo.cardNumber.replace(/\s/g, '');
    if (cleanCardNumber.length < 16) {
      setPaymentError('Kart numarası en az 16 haneli olmalıdır.');
      return;
    }

    // Validate CVC
    if (cardInfo.cvc.length < 3) {
      setPaymentError('CVC kodu en az 3 haneli olmalıdır.');
      return;
    }

    setIsProcessingPayment(true);
    setPaymentError(null);

    try {
      const selectedOption = installmentOptions.find(opt => opt.selected);
      
      // Prepare payment data for Iyzico
      const paymentData = {
        cardHolder: cardInfo.cardHolder,
        cardNumber: cleanCardNumber,
        expiryMonth: cardInfo.expiryMonth,
        expiryYear: cardInfo.expiryYear,
        cvc: cardInfo.cvc,
        price: selectedOption.finalPrice,
        installment: selectedOption.installments,
        conversationId: `TB_${Date.now()}`,
        basketId: `BASKET_${Date.now()}`
      };

        // Process payment with Iyzico
        const paymentResult = await createPayment(paymentData);

        if (paymentResult.status === 'success') {
          // Prepare user info for reservation
          const userInfo = {
            email: 'user@example.com', // This should come from user authentication
            firstName: 'Kullanıcı', // This should come from user profile
            lastName: 'Adı', // This should come from user profile
            phone: '+90 555 123 45 67' // This should come from user profile
          };

          // Redirect to payment callback with reservation data
          navigate('/payment-callback', {
            state: {
              token: paymentResult.token,
              status: 'success',
              bookingData: bookingData,
              hotel: hotel,
              userInfo: userInfo,
              paymentResult: paymentResult
            }
          });
        } else {
          setPaymentError(paymentResult.errorMessage || 'Ödeme işlemi başarısız oldu. Lütfen tekrar deneyin.');
        }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentError(error.message || 'Ödeme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const getCardTypeClass = (cardType) => {
    switch (cardType) {
      case 'yapi-kredi':
        return 'yapi-kredi';
      case 'mastercard':
        return 'mastercard';
      case 'visa':
        return 'visa';
      case 'troy':
        return 'troy';
      default:
        return '';
    }
  };

  const getCardTypeName = (cardType) => {
    switch (cardType) {
      case 'yapi-kredi':
        return 'Yapı Kredi WORLD';
      case 'mastercard':
        return 'MasterCard';
      case 'visa':
        return 'VISA';
      case 'troy':
        return 'Troy';
      default:
        return 'Kart';
    }
  };

  if (loading) {
    return (
      <div className="payment-loading">
        <div className="loading-spinner"></div>
        <p>Ödeme sayfası yükleniyor...</p>
      </div>
    );
  }

  if (!hotel || !bookingData) {
    return (
      <div className="payment-error">
        <p>Rezervasyon bilgileri bulunamadı.</p>
        <button onClick={() => navigate(-1)}>Geri Dön</button>
      </div>
    );
  }

  const selectedOption = installmentOptions.find(opt => opt.selected);

  return (
    <div className="payment-page">
      <div className="container">
        {/* Header */}
        <div className="payment-header">
          <button onClick={() => navigate(-1)} className="back-btn">
            <ArrowLeft size={20} />
            Geri
          </button>
          <h1>Ödeme</h1>
        </div>

        <div className="payment-layout">
          {/* Left Column - Payment Information */}
          <div className="payment-info-section">
            <div className="section-header">
              <h2>Ödeme Bilgileri</h2>
            </div>

            {/* Payment Method Selection */}
            <div className="payment-methods">
              <div className={`payment-method ${paymentMethod === 'card' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  id="card-payment"
                  name="payment-method"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="card-payment">
                  <CreditCard size={20} />
                  <span>Kart ile Öde</span>
                </label>
              </div>
            </div>

            {/* Payment Error Message */}
            {paymentError && (
              <div className="payment-error-message">
                <p>{paymentError}</p>
                <button onClick={() => setPaymentError(null)}>×</button>
              </div>
            )}

            {/* Payment Success Message */}
            {paymentSuccess && (
              <div className="payment-success-message">
                <Check size={20} />
                <p>Ödeme işlemi başarılı! Rezervasyonunuz tamamlandı.</p>
              </div>
            )}

            {/* Card Form */}
            {paymentMethod === 'card' && (
              <div className="card-form">
                {/* Yapı Kredi World Card Visual */}
                <div className="card-visual">
                  <div className="yapi-kredi-world-card">
                    <div className="card-header">
                      <div className="card-logo">Yapı Kredi WORLD</div>
                      <div className="card-chip"></div>
                    </div>
                    <div className="card-number">
                      {cardInfo.cardNumber || '**** **** **** ****'}
                    </div>
                    <div className="card-footer">
                      <div className="card-holder">
                        {cardInfo.cardHolder || 'KART SAHİBİ'}
                      </div>
                      <div className="card-expiry">
                        {cardInfo.expiryMonth && cardInfo.expiryYear ? 
                          `${cardInfo.expiryMonth}/${cardInfo.expiryYear}` : 
                          'S.K TARIHI'
                        }
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Kart Üzerindeki Ad Soyad</label>
                  <input
                    type="text"
                    value={cardInfo.cardHolder}
                    onChange={(e) => setCardInfo(prev => ({ ...prev, cardHolder: e.target.value.toUpperCase() }))}
                    placeholder="KART SAHİBİ"
                    style={{ textTransform: 'uppercase' }}
                  />
                </div>

                <div className="form-group">
                  <label>Kart Numarası</label>
                  <input
                    type="text"
                    value={cardInfo.cardNumber}
                    onChange={(e) => handleCardNumberChange(e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Ay</label>
                    <select
                      value={cardInfo.expiryMonth}
                      onChange={(e) => setCardInfo(prev => ({ ...prev, expiryMonth: e.target.value }))}
                    >
                      <option value="">Seçiniz</option>
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                          {String(i + 1).padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Yıl</label>
                    <select
                      value={cardInfo.expiryYear}
                      onChange={(e) => setCardInfo(prev => ({ ...prev, expiryYear: e.target.value }))}
                    >
                      <option value="">Seçiniz</option>
                      {Array.from({ length: 10 }, (_, i) => {
                        const year = new Date().getFullYear() + i;
                        return (
                          <option key={year} value={String(year).slice(-2)}>
                            {year}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>CVC</label>
                    <input
                      type="password"
                      value={cardInfo.cvc}
                      onChange={(e) => setCardInfo(prev => ({ ...prev, cvc: e.target.value.replace(/\D/g, '').slice(0, 3) }))}
                      placeholder="***"
                      maxLength="3"
                    />
                  </div>
                </div>

                {/* Card Brands */}
                <div className="card-brands">
                  <div className="card-brand mastercard">MasterCard</div>
                  <div className="card-brand visa">VISA</div>
                  <div className="card-brand troy">Troy</div>
                </div>
              </div>
            )}

            {/* Installment Options */}
            {paymentMethod === 'card' && (
              <div className="installment-section">
              <h3>Taksit Seçenekleri</h3>
              <div className="installment-table">
                <div className="table-header">
                  <div>Taksit Sayısı</div>
                  <div>Ödeme</div>
                  <div>İndirim</div>
                  <div>Fiyat</div>
                  <div>Seçim</div>
                </div>
                {installmentOptions.map((option) => (
                  <div key={option.id} className={`table-row ${option.selected ? 'selected' : ''}`}>
                    <div>{option.name}</div>
                    <div>{option.installments} x {option.monthlyAmount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</div>
                    <div>{option.discount > 0 ? `-${option.discount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺` : '-'}</div>
                    <div>{option.finalPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</div>
                    <div>
                      <input
                        type="radio"
                        name="installment"
                        checked={option.selected}
                        onChange={() => handleInstallmentChange(option.id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <a href="#" className="all-installments">Tüm Taksit Seçenekleri</a>
              </div>
            )}

            {/* Alternative Payment Methods */}
            {paymentMethod === 'card' && (
              <div className="alternative-payments">
                <div className="payment-option">
                  <button 
                    className="world-pay-btn"
                    onClick={() => setShowWorldPayQR(!showWorldPayQR)}
                  >
                    <span>World Pay ile Öde</span>
                    <span className="dropdown-arrow">{showWorldPayQR ? '▲' : '▼'}</span>
                  </button>
                </div>
                
                {showWorldPayQR && (
                  <div className="world-pay-content">
                    <div className="world-pay-qr-section">
                      <h4>World Pay ile Ödeme</h4>
                      <div className="qr-code-container">
                        <div className="qr-code-placeholder">
                          <div className="qr-code">
                            <div className="qr-pattern">
                              <div className="qr-square"></div>
                              <div className="qr-square"></div>
                              <div className="qr-square"></div>
                              <div className="qr-square"></div>
                              <div className="qr-square"></div>
                              <div className="qr-square"></div>
                              <div className="qr-square"></div>
                              <div className="qr-square"></div>
                              <div className="qr-square"></div>
                              <div className="qr-square"></div>
                              <div className="qr-square"></div>
                              <div className="qr-square"></div>
                              <div className="qr-square"></div>
                              <div className="qr-square"></div>
                              <div className="qr-square"></div>
                              <div className="qr-square"></div>
                            </div>
                          </div>
                          <p className="qr-instruction">QR Kodu okutun</p>
                        </div>
                      </div>
                      
                      <div className="world-pay-instructions">
                        <h5>World Pay'i nasıl kullanırım?</h5>
                        <ul>
                          <li>World Mobil veya Yapı Kredi Mobil uygulamalarında yer alan World Pay menüsünden QR Kod ile Öde'yi seçin</li>
                          <li>Açılan QR Kod okuyucu ile ödeme sayfasında bulunan QR Kodu okutun</li>
                          <li>Ödeme yapacağınız kartınızı veya hesabınızı seçerek alışverişinizi hızlı ve kolayca tamamlayın</li>
                          <li>Ödemeyi tamamladıktan sonra TatilBudur'da sipariş onayı ve detayını görüntüleyebilirsiniz</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TB Club Points */}
            {paymentMethod === 'card' && (
              <div className="tb-club-section">
              <div className="club-balance">
                <span>TatilBudur Club Güncel Bakiyeniz 0 TB Puan</span>
              </div>
              <div className="club-checkbox">
                <input
                  type="checkbox"
                  id="use-points"
                  checked={tbClubPoints}
                  onChange={(e) => setTbClubPoints(e.target.checked)}
                />
                <label htmlFor="use-points">TB Club Puan Kullanmak İstiyorum</label>
              </div>
              </div>
            )}
          </div>

          {/* Right Column - Booking Summary */}
          <div className="booking-summary-section">
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
                  {hotel.rooms[0].features.map((feature, index) => (
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
              <div className="date-info">
                <Calendar size={16} />
                <div>
                  <span>Giriş Tarihi: {formatDate(bookingData.checkIn)}</span>
                  <span>Çıkış Tarihi: {formatDate(bookingData.checkOut)}</span>
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

            {/* Discount Code */}
            <div className="discount-section">
              <div className="discount-input">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  placeholder="İndirim Kodu"
                />
                <button className="apply-btn">Uygula</button>
              </div>
            </div>

            {/* Price Summary */}
            <div className="price-summary">
              <h4>Fiyat Özeti</h4>
              <div className="price-breakdown">
                <div className="price-item">
                  <span>Konaklama</span>
                  <span>{bookingData.totalPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</span>
                </div>
                <div className="price-item discount">
                  <span>İndirimler</span>
                  <span>-9.750,19 ₺</span>
                </div>
                <div className="discount-note">
                  <span>Yapı Kredi World Kart'a özel %5 İndirim</span>
                </div>
                <div className="price-total">
                  <span>TOPLAM FİYAT</span>
                  <span>{selectedOption.finalPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</span>
                </div>
                <div className="charge-amount">
                  <span>ÇEKİLECEK TUTAR</span>
                  <span>{selectedOption.finalPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</span>
                </div>
                {selectedOption.installments > 1 && (
                  <div className="installment-info">
                    <span>{selectedOption.installments} Taksit × {selectedOption.monthlyAmount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</span>
                  </div>
                )}
              </div>
              <p className="tax-note">Fiyatlara konaklama vergisi dahildir.</p>
            </div>

            {/* Payment Button */}
            <button 
              className={`payment-btn ${isProcessingPayment ? 'processing' : ''}`}
              onClick={handleConfirmPayment}
              disabled={isProcessingPayment || paymentSuccess}
            >
              {isProcessingPayment ? (
                <>
                  <Loader2 size={20} className="spinning" />
                  İşleniyor...
                </>
              ) : paymentSuccess ? (
                <>
                  <Check size={20} />
                  Ödeme Tamamlandı
                </>
              ) : (
                <>
                  <CreditCard size={20} />
                  Ödemeyi Tamamla
                </>
              )}
            </button>

            {/* Security Info */}
            <div className="security-info">
              <Shield size={16} />
              <span>Güvenli ödeme sistemi ile korunuyorsunuz</span>
            </div>

            {/* Privacy Notice */}
            <div className="privacy-notice">
              <p>Kişisel verileriniz, 6698 sayılı yasa ve Aydınlatma metni kapsamında işlenmektedir. 
                <a href="#" className="privacy-link">Aydınlatma metnine</a> ulaşabilirsiniz.
              </p>
              <div className="newsletter-opt">
                <input
                  type="checkbox"
                  id="newsletter"
                />
                <label htmlFor="newsletter">
                  %50'ye varan Fırsat ve Kampanyalardan haberdar olmak istiyorum. 
                  <a href="#" className="newsletter-link">Detaylı bilgi.</a>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Selection Modal */}
      {showCardSelection && (
        <div className="card-selection-modal">
          <div className="modal-overlay" onClick={() => setShowCardSelection(false)}></div>
          <div className="modal-content">
            <div className="modal-header">
              <h3>Kart Seçin</h3>
              <button 
                className="close-btn"
                onClick={() => setShowCardSelection(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="saved-cards">
                {savedCards.map((card) => (
                  <div 
                    key={card.id} 
                    className={`saved-card ${selectedCard?.id === card.id ? 'selected' : ''}`}
                    onClick={() => handleCardSelect(card)}
                  >
                    <div className="card-visual-small">
                      <div className={`card-preview ${getCardTypeClass(card.cardType)}`}>
                        <div className="card-header-small">
                          <div className="card-logo-small">{getCardTypeName(card.cardType)}</div>
                          <div className="card-chip-small"></div>
                        </div>
                        <div className="card-number-small">
                          {card.cardNumber}
                        </div>
                        <div className="card-footer-small">
                          <div className="card-holder-small">{card.cardHolder}</div>
                          <div className="card-expiry-small">
                            {card.expiryMonth}/{card.expiryYear}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-actions">
                      <button className="action-btn edit-btn">
                        <Edit3 size={16} />
                      </button>
                      <button className="action-btn delete-btn">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    {card.isDefault && (
                      <div className="default-badge">Varsayılan</div>
                    )}
                  </div>
                ))}
              </div>
              
              <button 
                className="new-card-btn"
                onClick={handleNewCard}
              >
                <Plus size={20} />
                Yeni Kart Ekle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
