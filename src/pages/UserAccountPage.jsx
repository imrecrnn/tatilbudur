import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { User, Calendar, Star, Crown, Heart, LogOut, Settings, Eye, EyeOff } from 'lucide-react';
import { auth, db } from '../firebase/config';
import { onAuthStateChanged, updatePassword, reauthenticateWithCredential, EmailAuthProvider, signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import './UserAccountPage.css';

const UserAccountPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('account');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    birthDate: '',
    gender: '',
    country: 'Türkiye',
    city: '',
    district: '',
    address: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    emailNotifications: false,
    smsNotifications: true,
    phoneNotifications: false,
    consent: true
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        await loadUserData(user.uid);
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Read tab parameter from URL
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['account', 'reservations', 'reviews', 'club', 'favorites'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const loadUserData = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserData(data);
        setFormData(prev => ({
          ...prev,
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          phone: data.phone || '',
          email: data.email || '',
          birthDate: data.birthDate ? `${data.birthDate.day}.${data.birthDate.month}.${data.birthDate.year}` : '',
          gender: data.gender || '',
          country: data.country || 'Türkiye',
          city: data.city || '',
          district: data.district || '',
          address: data.address || '',
          emailNotifications: data.emailNotifications || false,
          smsNotifications: data.smsNotifications !== undefined ? data.smsNotifications : true,
          phoneNotifications: data.phoneNotifications || false,
          consent: data.consent !== undefined ? data.consent : true
        }));
      }
    } catch (error) {
      console.error('Kullanıcı verisi yükleme hatası:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSavePersonalInfo = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      const [day, month, year] = formData.birthDate.split('.');
      await updateDoc(doc(db, 'users', user.uid), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        gender: formData.gender,
        country: formData.country,
        city: formData.city,
        district: formData.district,
        address: formData.address,
        birthDate: {
          day: parseInt(day) || '',
          month: parseInt(month) || '',
          year: parseInt(year) || ''
        },
        updatedAt: new Date()
      });
      
      alert('Kişisel bilgileriniz başarıyla güncellendi!');
    } catch (error) {
      console.error('Güncelleme hatası:', error);
      alert('Güncelleme sırasında bir hata oluştu!');
    } finally {
      setSaving(false);
    }
  };

  const handleSavePassword = async () => {
    if (!user) return;
    
    if (formData.newPassword !== formData.confirmPassword) {
      alert('Yeni şifreler eşleşmiyor!');
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
    if (!passwordRegex.test(formData.newPassword)) {
      alert('Şifre en az 1 büyük harf, 1 özel karakter ve 1 sayı içermeli, minimum 8 karakter olmalıdır!');
      return;
    }

    setSaving(true);
    try {
      // Mevcut şifre ile yeniden doğrulama
      const credential = EmailAuthProvider.credential(user.email, formData.currentPassword);
      await reauthenticateWithCredential(user, credential);
      
      // Yeni şifre ile güncelleme
      await updatePassword(user, formData.newPassword);
      
      alert('Şifreniz başarıyla güncellendi!');
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (error) {
      console.error('Şifre güncelleme hatası:', error);
      if (error.code === 'auth/wrong-password') {
        alert('Mevcut şifre yanlış!');
      } else {
        alert('Şifre güncelleme sırasında bir hata oluştu!');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleSavePermissions = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        emailNotifications: formData.emailNotifications,
        smsNotifications: formData.smsNotifications,
        phoneNotifications: formData.phoneNotifications,
        consent: formData.consent,
        updatedAt: new Date()
      });
      
      alert('İzinleriniz başarıyla güncellendi!');
    } catch (error) {
      console.error('İzin güncelleme hatası:', error);
      alert('Güncelleme sırasında bir hata oluştu!');
    } finally {
      setSaving(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('Kullanıcı çıkış yaptı');
      // Çıkış yapıldıktan sonra ana sayfaya yönlendir
      window.location.href = '/';
    } catch (error) {
      console.error('Çıkış hatası:', error);
      alert('Çıkış yapılırken bir hata oluştu!');
    }
  };

  if (loading) {
    return (
      <div className="user-account-page">
        <div className="loading">Yükleniyor...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="user-account-page">
        <div className="not-logged-in">
          <h2>Giriş Yapın</h2>
          <p>Hesap bilgilerinizi görüntülemek için giriş yapmanız gerekiyor.</p>
          <Link to="/login" className="login-button">Giriş Yap</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="user-account-page">
      <div className="container">
        <div className="account-layout">
          {/* Sol Sidebar */}
          <div className="sidebar">
            <div className="user-info">
              <div className="welcome">Hoşgeldin, {user.displayName || user.email.split('@')[0]}</div>
              <div className="user-email">{user.email}</div>
            </div>
            
            <div className="tb-club-points">
              <div className="points-header">Harcanabilir TB Club Puanı</div>
              <div className="points-value">0.00</div>
            </div>

            <nav className="sidebar-nav">
              <button 
                className={`nav-item ${activeTab === 'account' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('account');
                  setSearchParams({ tab: 'account' });
                }}
              >
                <User size={16} />
                Hesap Bilgilerim
              </button>
              <button 
                className={`nav-item ${activeTab === 'reservations' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('reservations');
                  setSearchParams({ tab: 'reservations' });
                }}
              >
                <Calendar size={16} />
                Rezervasyonlar
              </button>
              <button 
                className={`nav-item ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('reviews');
                  setSearchParams({ tab: 'reviews' });
                }}
              >
                <Star size={16} />
                Değerlendirmeler
              </button>
              <button 
                className={`nav-item ${activeTab === 'club' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('club');
                  setSearchParams({ tab: 'club' });
                }}
              >
                <Crown size={16} />
                Club
              </button>
              <button 
                className={`nav-item ${activeTab === 'favorites' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('favorites');
                  setSearchParams({ tab: 'favorites' });
                }}
              >
                <Heart size={16} />
                Favoriler
              </button>
              <button className="nav-item logout" onClick={handleLogout}>
                <LogOut size={16} />
                Oturumu Kapat
              </button>
            </nav>
          </div>

          {/* Ana İçerik */}
          <div className="main-content">
            {activeTab === 'account' && (
              <div className="account-content">
                <h1>Hesap Bilgilerim</h1>
                
                {/* Kişisel Bilgiler */}
                <div className="form-section">
                  <h2>Kişisel Bilgilerim</h2>
                  
                  <div className="form-group">
                    <label>Cinsiyet</label>
                    <div className="radio-group">
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          checked={formData.gender === 'female'}
                          onChange={handleInputChange}
                        />
                        Kadın
                      </label>
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          checked={formData.gender === 'male'}
                          onChange={handleInputChange}
                        />
                        Erkek
                      </label>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Ad</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Soyad</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Telefon Numarası</label>
                    <div className="phone-input">
                      <span className="country-code">🇹🇷 +90</span>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Telefon numaranız"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>E-posta</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled
                    />
                  </div>

                  <div className="form-group">
                    <label>Doğum Tarihi</label>
                    <input
                      type="text"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      placeholder="GG.AA.YYYY"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Ülke</label>
                      <select name="country" value={formData.country} onChange={handleInputChange}>
                        <option value="Türkiye">Türkiye</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Şehir</label>
                      <select name="city" value={formData.city} onChange={handleInputChange}>
                        <option value="">Seçiniz</option>
                        <option value="İstanbul">İstanbul</option>
                        <option value="Ankara">Ankara</option>
                        <option value="İzmir">İzmir</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>İlçe</label>
                      <select name="district" value={formData.district} onChange={handleInputChange}>
                        <option value="">Seçiniz</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Adres</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Adresinizi girin"
                    />
                  </div>

                  <button 
                    className="save-button"
                    onClick={handleSavePersonalInfo}
                    disabled={saving}
                  >
                    {saving ? 'Kaydediliyor...' : 'Kaydet'}
                  </button>
                </div>

                {/* Şifre Bilgileri */}
                <div className="form-section">
                  <h2>Şifre Bilgileri</h2>
                  
                  <div className="form-group">
                    <label>Geçerli Şifre</label>
                    <div className="password-input">
                      <input
                        type={showPassword.currentPassword ? 'text' : 'password'}
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => togglePasswordVisibility('currentPassword')}
                      >
                        {showPassword.currentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Yeni Şifre</label>
                    <div className="password-input">
                      <input
                        type={showPassword.newPassword ? 'text' : 'password'}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => togglePasswordVisibility('newPassword')}
                      >
                        {showPassword.newPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Şifre Tekrar</label>
                    <div className="password-input">
                      <input
                        type={showPassword.confirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => togglePasswordVisibility('confirmPassword')}
                      >
                        {showPassword.confirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="password-requirements">
                    *Şifreniz en az 1 büyük harf, 1 özel işaret ve 1 sayı içeren, minimum 8 karakter uzunluğunda olmalıdır.
                  </div>

                  <button 
                    className="save-button"
                    onClick={handleSavePassword}
                    disabled={saving}
                  >
                    {saving ? 'Kaydediliyor...' : 'Kaydet'}
                  </button>
                </div>

                {/* İzinlerim */}
                <div className="form-section">
                  <h2>İzinlerim</h2>
                  
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="emailNotifications"
                        checked={formData.emailNotifications}
                        onChange={handleInputChange}
                      />
                      Fırsat ve kampanyalardan e-posta ile haberdar olmak istiyorum.
                    </label>
                    
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="smsNotifications"
                        checked={formData.smsNotifications}
                        onChange={handleInputChange}
                      />
                      Fırsat ve kampanyalardan SMS ile haberdar olmak istiyorum.
                    </label>
                    
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="phoneNotifications"
                        checked={formData.phoneNotifications}
                        onChange={handleInputChange}
                      />
                      Fırsat ve kampanyalardan telefon araması ile haberdar olmak istiyorum.
                    </label>
                  </div>

                  <div className="consent-section">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleInputChange}
                      />
                      Açık Rıza metnini onaylıyorum
                    </label>
                    <p className="consent-text">
                      Kişisel verileriniz, 6698 sayılı yasa ve Aydınlatma metni kapsamında işlenmektedir. 
                      <a href="#" className="consent-link">Aydınlatma metnine ulaşabilirsiniz.</a>
                    </p>
                  </div>

                  <button 
                    className="save-button"
                    onClick={handleSavePermissions}
                    disabled={saving}
                  >
                    {saving ? 'Kaydediliyor...' : 'Kaydet'}
                  </button>

                  <div className="danger-actions">
                    <button className="danger-button">Hesabımı Sil</button>
                    <button className="danger-button">TB Club Üyeliğimi Sonlandır</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reservations' && (
              <div className="reservations-content">
                <h1>Rezervasyonlar</h1>
                <div className="no-reservations">
                  <p>Herhangi bir rezervasyonunuz bulunmuyor.</p>
                </div>
                
                <div className="external-reservation">
                  <h3>Rezervasyonunuz mu var?</h3>
                  <p>Üye girişi yapmadan gerçekleştirdiğiniz rezervasyonları rezervasyon numarası ve telefon numaranızla, rezervasyonunuzu listeye ekleyebilirsiniz.</p>
                  
                  <div className="reservation-form">
                    <div className="form-group">
                      <label>E-posta</label>
                      <input
                        type="email"
                        value={user.email}
                        disabled
                      />
                    </div>
                    <div className="form-group">
                      <label>Rezervasyon Numarası</label>
                      <input
                        type="text"
                        placeholder="Rezervasyon numaranızı girin"
                      />
                    </div>
                    <button className="search-button">Rezervasyon Sorgula</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="reviews-content">
                <h1>Değerlendirmeler</h1>
                
                <div className="reviews-stats">
                  <div className="stat-card">
                    <div className="stat-number">0</div>
                    <div className="stat-label">Onaylı Yorumlar</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number">0</div>
                    <div className="stat-label">Onay Bekleyen Yorumlar</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number">0</div>
                    <div className="stat-label">Reddedilen Yorumlar</div>
                  </div>
                </div>

                <div className="reviews-tabs">
                  <button className="tab-button active">Değerlendir</button>
                  <button className="tab-button">Geçmiş Değerlendirmeler</button>
                </div>

                <div className="no-reviews">
                  <p>Henüz değerlendirmeniz bulunmuyor.</p>
                </div>
              </div>
            )}

            {activeTab === 'club' && (
              <div className="club-content">
                <h1>TB Club</h1>
                
                <div className="club-banner">
                  <h2>TB Club Ayrıcalık Budur</h2>
                  <p>Özel fırsatlar ve ayrıcalıklarla tatilinizi daha keyifli hale getirin</p>
                  <button className="search-button">Fırsatları Gör</button>
                </div>

                <div className="club-features">
                  <div className="feature-card">
                    <div className="feature-icon">
                      <Crown size={24} />
                    </div>
                    <h3>Özel İndirimler</h3>
                    <p>TB Club üyelerine özel indirimli fiyatlar</p>
                  </div>
                  
                  <div className="feature-card">
                    <div className="feature-icon">
                      <Star size={24} />
                    </div>
                    <h3>Erken Rezervasyon</h3>
                    <p>En iyi fırsatları önce siz görün</p>
                  </div>
                  
                  <div className="feature-card">
                    <div className="feature-icon">
                      <Heart size={24} />
                    </div>
                    <h3>Özel Hizmetler</h3>
                    <p>VIP müşteri hizmetleri ve ayrıcalıklar</p>
                  </div>
                  
                  <div className="feature-card">
                    <div className="feature-icon">
                      <Settings size={24} />
                    </div>
                    <h3>Puan Kazanma</h3>
                    <p>Her rezervasyonunuzda puan kazanın</p>
                  </div>
                </div>

                <div className="club-info">
                  <p>TB Club üyeliğiniz aktif. Harcanabilir puanınız: <strong>0.00</strong></p>
                </div>
              </div>
            )}

            {activeTab === 'favorites' && (
              <div className="favorites-content">
                <h1>Favoriler</h1>
                <div className="no-favorites">
                  <p>Henüz favori listenizde ürün bulunmuyor.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccountPage;
