import React, { useState, useEffect } from 'react';
import { completeUserRegistration, sendVerificationEmail, checkEmailExists, directLogin } from '../firebase/authService';
import { otpService } from '../firebase/otpService';
import { testFirebaseConnection } from '../firebase/config';
import './LoginModal.css';

const LoginModal = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1); // 1: Email, 2: Email OTP, 3: Phone, 4: Phone OTP, 5: Registration, 6: Direct Login
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [firebaseConnected, setFirebaseConnected] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    emailOtp: '',
    phone: '',
    phoneOtp: '',
    firstName: '',
    lastName: '',
    tcNumber: '',
    isTcCitizen: true,
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    password: '',
    confirmPassword: '',
    agreements: {
      tbClub: false,
      kvkk: false,
      etk: false
    }
  });

  // Firebase bağlantısını test et
  useEffect(() => {
    const testConnection = async () => {
      const result = await testFirebaseConnection();
      setFirebaseConnected(result.success);
      if (result.success) {
        console.log('✅ Firebase bağlantısı başarılı!');
      } else {
        console.error('❌ Firebase bağlantı hatası:', result.error);
      }
    };
    
    testConnection();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('agreements.')) {
      const agreementKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        agreements: {
          ...prev.agreements,
          [agreementKey]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    // Clear notification when user starts typing
    if (notification) {
      setNotification('');
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (formData.email) {
      setIsLoading(true);
      setNotification('');
      
      try {
        // OTP servisi ile email gönder
        const result = await otpService.sendEmailOTP(formData.email);
        
        if (result.success) {
          setNotification(`Doğrulama kodu ${formData.email} adresine gönderildi!`);
          setCurrentStep(2);
        } else {
          setNotification(`Hata: ${result.error}`);
        }
      } catch (error) {
        setNotification(`Hata: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleEmailOtpSubmit = async (e) => {
    e.preventDefault();
    if (formData.emailOtp) {
      setIsLoading(true);
      setNotification('');
      
      try {
        // OTP doğrula
        const result = otpService.verifyOTP('email', formData.email, formData.emailOtp);
        
        if (result.success) {
          setNotification('E-posta doğrulandı!');
          setEmailVerified(true);
          
          // E-posta doğrulandıktan sonra e-posta kontrolü yap
          console.log('E-posta doğrulandı, e-posta kontrolü yapılıyor:', formData.email);
          const emailCheckResult = await checkEmailExists(formData.email);
          console.log('E-posta kontrolü sonucu:', emailCheckResult);
          
          if (emailCheckResult.success) {
            if (emailCheckResult.exists) {
              // E-posta kayıtlı, direkt giriş adımına geç
              console.log('E-posta kayıtlı, direkt giriş adımına geçiliyor');
              setEmailExists(true);
              setIsExistingUser(true);
              setCurrentStep(6); // Direct Login step
              setNotification('Bu e-posta adresi ile kayıtlı bir hesap bulundu. Lütfen şifrenizi girin.');
            } else {
              // E-posta kayıtlı değil, telefon adımına geç
              console.log('E-posta kayıtlı değil, telefon adımına geçiliyor');
              setEmailExists(false);
              setIsExistingUser(false);
              setCurrentStep(3);
            }
          } else {
            setNotification(`E-posta kontrol hatası: ${emailCheckResult.error}`);
          }
        } else {
          setNotification(`Hata: ${result.error}`);
        }
      } catch (error) {
        setNotification(`Hata: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    if (formData.phone) {
      setIsLoading(true);
      setNotification('');
      
      try {
        // OTP servisi ile telefon gönder
        const result = await otpService.sendPhoneOTP(formData.phone);
        
        if (result.success) {
          setNotification(`Doğrulama kodu ${formData.phone} numarasına gönderildi!`);
          setCurrentStep(4);
        } else {
          setNotification(`Hata: ${result.error}`);
        }
      } catch (error) {
        setNotification(`Hata: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handlePhoneOtpSubmit = (e) => {
    e.preventDefault();
    if (formData.phoneOtp) {
      setIsLoading(true);
      setNotification('');
      
      try {
        // OTP doğrula
        const result = otpService.verifyOTP('phone', formData.phone, formData.phoneOtp);
        
        if (result.success) {
          setNotification('Telefon doğrulandı!');
          setPhoneVerified(true);
          setCurrentStep(5); // Registration form
        } else {
          setNotification(`Hata: ${result.error}`);
        }
      } catch (error) {
        setNotification(`Hata: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDirectLogin = async (e) => {
    e.preventDefault();
    
    if (!formData.password) {
      setNotification('Lütfen şifrenizi girin!');
      return;
    }
    
    setIsLoading(true);
    setNotification('');
    
    try {
      const result = await directLogin(formData.email, formData.password);
      
      if (result.success) {
        setNotification('Giriş başarılı! Yönlendiriliyorsunuz...');
        // Başarılı giriş sonrası modalı kapat
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setNotification(`Giriş hatası: ${result.error}`);
      }
    } catch (error) {
      setNotification(`Hata: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    
    // Doğrulama kontrolü
    if (!emailVerified || !phoneVerified) {
      setNotification('Lütfen önce e-posta ve telefon doğrulamasını tamamlayın!');
      return;
    }
    
    // Şifre kontrolü
    if (formData.password !== formData.confirmPassword) {
      setNotification('Şifreler eşleşmiyor!');
      return;
    }
    
    // Şifre güçlülük kontrolü
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setNotification('Şifre en az 1 büyük harf, 1 özel karakter ve 1 sayı içermeli, minimum 8 karakter olmalıdır!');
      return;
    }
    
    setIsLoading(true);
    setNotification('');
    
    try {
      // Firebase'e kullanıcı kaydı (email ve telefon doğrulandıktan sonra)
      const result = await completeUserRegistration(formData);
      
      if (result.success) {
        setNotification('Üyelik başarıyla tamamlandı! E-posta adresinizi kontrol ederek hesabınızı aktifleştirin.');
        // Başarılı kayıt sonrası modalı kapat
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        setNotification(`Üyelik tamamlama hatası: ${result.error}`);
      }
    } catch (error) {
      setNotification(`Hata: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="auth-step">
            <h2>TatilBudur'a Hoş Geldiniz.</h2>
            <p className="step-description">
              E-posta adresini girerek hesabına giriş yapabilir veya üye olabilirsin.
            </p>
            
            {/* Firebase Bağlantı Durumu */}
            <div className={`firebase-status ${firebaseConnected ? 'connected' : 'disconnected'}`}>
              <span className="status-icon">{firebaseConnected ? '🔥' : '❌'}</span>
              <span>{firebaseConnected ? 'Firebase Bağlı' : 'Firebase Bağlantısı Bekleniyor...'}</span>
            </div>
            {notification && (
              <div className={`notification ${notification.includes('Hata') || notification.includes('hatası') ? 'error' : 'success'}`}>
                {notification}
              </div>
            )}
            <form onSubmit={handleEmailSubmit}>
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="E-Posta adresi *"
                  required
                  disabled={isLoading}
                />
              </div>
              <button type="submit" className="primary-button" disabled={isLoading}>
                {isLoading ? 'Gönderiliyor...' : 'Devam Et'}
              </button>
            </form>
            <p className="privacy-text">
              Kişisel Verileriniz, 6698 sayılı yasa ve Aydınlatma metni kapsamında işlenmektedir.
            </p>
          </div>
        );

      case 2:
        return (
          <div className="auth-step">
            <h2>E-posta Doğrulama</h2>
            <p className="step-description">
              <strong>{formData.email}</strong> adresine gönderilen 6 haneli doğrulama kodunu girin.
            </p>
            <form onSubmit={handleEmailOtpSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  name="emailOtp"
                  value={formData.emailOtp}
                  onChange={handleInputChange}
                  placeholder="Doğrulama kodu"
                  maxLength="6"
                  required
                />
              </div>
              <button type="submit" className="primary-button">
                Doğrula
              </button>
              <button 
                type="button" 
                className="secondary-button"
                onClick={() => setCurrentStep(1)}
              >
                E-posta Adresini Değiştir
              </button>
            </form>
          </div>
        );

      case 3:
        return (
          <div className="auth-step">
            <h2>Cep Telefonu Bilgisi</h2>
            <p className="step-description">
              E-posta adresiniz doğrulandı. Şimdi cep telefonu numaranızı girin.
            </p>
            {notification && (
              <div className={`notification ${notification.includes('Hata') || notification.includes('hatası') ? 'error' : 'success'}`}>
                {notification}
              </div>
            )}
            <form onSubmit={handlePhoneSubmit}>
              <div className="input-group">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Cep telefonu numarası *"
                  required
                  disabled={isLoading}
                />
              </div>
              <button type="submit" className="primary-button" disabled={isLoading}>
                {isLoading ? 'Gönderiliyor...' : 'Devam Et'}
              </button>
            </form>
          </div>
        );

      case 4:
        return (
          <div className="auth-step">
            <h2>Telefon Doğrulama</h2>
            <p className="step-description">
              <strong>{formData.phone}</strong> numarasına gönderilen 6 haneli doğrulama kodunu girin.
            </p>
            <form onSubmit={handlePhoneOtpSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  name="phoneOtp"
                  value={formData.phoneOtp}
                  onChange={handleInputChange}
                  placeholder="Doğrulama kodu"
                  maxLength="6"
                  required
                />
              </div>
              <button type="submit" className="primary-button">
                Doğrula
              </button>
              <button 
                type="button" 
                className="secondary-button"
                onClick={() => setCurrentStep(3)}
              >
                Telefon Numarasını Değiştir
              </button>
            </form>
          </div>
        );

      case 5:
        return (
          <div className="auth-step registration-form">
            <h2>Üyelik Bilgilerini Tamamla</h2>
            
            {/* Doğrulama Durumu Göstergesi */}
            <div className="verification-status">
              <div className={`status-item ${emailVerified ? 'verified' : 'pending'}`}>
                <span className="status-icon">{emailVerified ? '✓' : '○'}</span>
                <span>E-posta Doğrulandı: {formData.email}</span>
              </div>
              <div className={`status-item ${phoneVerified ? 'verified' : 'pending'}`}>
                <span className="status-icon">{phoneVerified ? '✓' : '○'}</span>
                <span>Telefon Doğrulandı: {formData.phone}</span>
              </div>
            </div>
            
            {notification && (
              <div className={`notification ${notification.includes('Hata') || notification.includes('hatası') ? 'error' : 'success'}`}>
                {notification}
              </div>
            )}
            
            <form onSubmit={handleRegistrationSubmit}>
              <div className="form-row">
                <div className="input-group">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Adınız*"
                    required
                  />
                </div>
                <div className="input-group">
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Soyadınız*"
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <input
                  type="text"
                  name="tcNumber"
                  value={formData.tcNumber}
                  onChange={handleInputChange}
                  placeholder="T.C. Kimlik Numarası"
                  disabled={!formData.isTcCitizen}
                />
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={!formData.isTcCitizen}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      isTcCitizen: !e.target.checked
                    }))}
                  />
                  T.C Vatandaşı Değilim
                </label>
              </div>

              <div className="birth-date-group">
                <label>Doğum Tarihi</label>
                <div className="date-inputs">
                  <select
                    name="birthDay"
                    value={formData.birthDay}
                    onChange={handleInputChange}
                  >
                    <option value="">Gün</option>
                    {Array.from({ length: 31 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                  <select
                    name="birthMonth"
                    value={formData.birthMonth}
                    onChange={handleInputChange}
                  >
                    <option value="">Ay</option>
                    {[
                      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
                      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
                    ].map((month, index) => (
                      <option key={index + 1} value={index + 1}>{month}</option>
                    ))}
                  </select>
                  <select
                    name="birthYear"
                    value={formData.birthYear}
                    onChange={handleInputChange}
                  >
                    <option value="">Yıl</option>
                    {Array.from({ length: 100 }, (_, i) => {
                      const year = new Date().getFullYear() - i;
                      return <option key={year} value={year}>{year}</option>;
                    })}
                  </select>
                </div>
              </div>

              <div className="input-group">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Şifre*"
                  required
                />
              </div>

              <div className="input-group">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Şifre Tekrar*"
                  required
                />
              </div>

              <div className="password-requirements">
                * Şifreniz en az 1 büyük harf, 1 özel işaret ve 1 sayı içeren, minimum 8 karakter uzunluğunda olmalıdır.
              </div>

              <div className="agreements">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="agreements.tbClub"
                    checked={formData.agreements.tbClub}
                    onChange={handleInputChange}
                    required
                  />
                  <span>
                    <a href="#" className="link">TB Club Üyelik Sözleşmesi</a>'ni ve{' '}
                    <a href="#" className="link">TB Club Açık Rıza Metinleri</a>'ni onaylıyorum.
                  </span>
                </label>

                <p className="agreement-link">
                  <a href="#" className="link">TB Club Aydınlatma Metni</a>'ne ulaşabilirsiniz.
                </p>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="agreements.kvkk"
                    checked={formData.agreements.kvkk}
                    onChange={handleInputChange}
                    required
                  />
                  <span>
                    KVKK kapsamında hazırlanan{' '}
                    <a href="#" className="link">Açık Rıza Metni</a>'ni onaylıyorum.
                  </span>
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="agreements.etk"
                    checked={formData.agreements.etk}
                    onChange={handleInputChange}
                    required
                  />
                  <span>
                    TatilBudur tarafından 6563 sayılı ETK kapsamında{' '}
                    <a href="#" className="link">ticari elektronik ileti</a> gönderimine onay veriyorum.
                  </span>
                </label>
              </div>

              <button type="submit" className="primary-button">
                Üyeliği Tamamla
              </button>
            </form>
          </div>
        );

      case 6:
        return (
          <div className="auth-step">
            <h2>Giriş Yapın</h2>
            <p className="step-description">
              <strong>{formData.email}</strong> adresi ile kayıtlı hesabınız için şifrenizi girin.
            </p>
            
            {notification && (
              <div className={`notification ${notification.includes('Hata') || notification.includes('hatası') ? 'error' : 'success'}`}>
                {notification}
              </div>
            )}
            
            <form onSubmit={handleDirectLogin}>
              <div className="input-group">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Şifreniz *"
                  required
                  disabled={isLoading}
                />
              </div>
              <button type="submit" className="primary-button" disabled={isLoading}>
                {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
              </button>
              <button 
                type="button" 
                className="secondary-button"
                onClick={() => {
                  setCurrentStep(1);
                  setFormData(prev => ({ ...prev, password: '' }));
                  setNotification('');
                }}
              >
                Farklı E-posta Adresi Kullan
              </button>
            </form>
            
            <div className="forgot-password">
              <a href="#" className="link">Şifremi Unuttum</a>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="login-modal-content">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-content">
            <div className="form-section">
              {renderStepContent()}
            </div>
            <div className="promo-section">
              <div className="promo-content">
                <div className="promo-logo">tatilbudur</div>
                <h3>Hemen Üye Ol, Tatilini Planlamaya Başla!</h3>
                <ul className="promo-features">
                  <li>Rezervasyonlarını Kolayca Yönet</li>
                  <li>TatilBudur.com</li>
                </ul>
                <div className="years-experience">27 yıl</div>
                <div className="promo-image">
                  <div className="suitcase-illustration">
                    <div className="suitcase suitcase-1"></div>
                    <div className="suitcase suitcase-2"></div>
                    <div className="travel-pillow"></div>
                    <div className="hat"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
