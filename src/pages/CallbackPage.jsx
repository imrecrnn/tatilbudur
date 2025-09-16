import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CallbackPage = () => {
  const [isPhoneClicked, setIsPhoneClicked] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('+1'); // Default to US
  const [phoneNumber, setPhoneNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [requestSubject, setRequestSubject] = useState('Yurtiçi Otel veya Paket Tur Rezervasyon Talebi');
  const [agreements, setAgreements] = useState({
    kvkk: false,
    etk: false,
    phone: false,
    sms: false
  });

  const handlePhoneClick = () => {
    setIsPhoneClicked(true);
  };

  // Country list with flags and codes (excluding +90 Turkey)
  const countries = [
    { code: '+1', name: 'United States', flag: '🇺🇸' },
    { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
    { code: '+49', name: 'Germany', flag: '🇩🇪' },
    { code: '+33', name: 'France', flag: '🇫🇷' },
    { code: '+39', name: 'Italy', flag: '🇮🇹' },
    { code: '+34', name: 'Spain', flag: '🇪🇸' },
    { code: '+31', name: 'Netherlands', flag: '🇳🇱' },
    { code: '+41', name: 'Switzerland', flag: '🇨🇭' },
    { code: '+43', name: 'Austria', flag: '🇦🇹' },
    { code: '+32', name: 'Belgium', flag: '🇧🇪' },
    { code: '+45', name: 'Denmark', flag: '🇩🇰' },
    { code: '+46', name: 'Sweden', flag: '🇸🇪' },
    { code: '+47', name: 'Norway', flag: '🇳🇴' },
    { code: '+358', name: 'Finland', flag: '🇫🇮' },
    { code: '+353', name: 'Ireland', flag: '🇮🇪' },
    { code: '+351', name: 'Portugal', flag: '🇵🇹' },
    { code: '+30', name: 'Greece', flag: '🇬🇷' },
    { code: '+420', name: 'Czech Republic', flag: '🇨🇿' },
    { code: '+48', name: 'Poland', flag: '🇵🇱' },
    { code: '+36', name: 'Hungary', flag: '🇭🇺' },
    { code: '+421', name: 'Slovakia', flag: '🇸🇰' },
    { code: '+386', name: 'Slovenia', flag: '🇸🇮' },
    { code: '+385', name: 'Croatia', flag: '🇭🇷' },
    { code: '+381', name: 'Serbia', flag: '🇷🇸' },
    { code: '+359', name: 'Bulgaria', flag: '🇧🇬' },
    { code: '+40', name: 'Romania', flag: '🇷🇴' },
    { code: '+370', name: 'Lithuania', flag: '🇱🇹' },
    { code: '+371', name: 'Latvia', flag: '🇱🇻' },
    { code: '+372', name: 'Estonia', flag: '🇪🇪' },
    { code: '+7', name: 'Russia', flag: '🇷🇺' },
    { code: '+380', name: 'Ukraine', flag: '🇺🇦' },
    { code: '+375', name: 'Belarus', flag: '🇧🇾' },
    { code: '+355', name: 'Albania', flag: '🇦🇱' },
    { code: '+389', name: 'North Macedonia', flag: '🇲🇰' },
    { code: '+382', name: 'Montenegro', flag: '🇲🇪' },
    { code: '+387', name: 'Bosnia and Herzegovina', flag: '🇧🇦' },
    { code: '+383', name: 'Kosovo', flag: '🇽🇰' },
    { code: '+377', name: 'Monaco', flag: '🇲🇨' },
    { code: '+378', name: 'San Marino', flag: '🇸🇲' },
    { code: '+39', name: 'Vatican City', flag: '🇻🇦' },
    { code: '+376', name: 'Andorra', flag: '🇦🇩' },
    { code: '+423', name: 'Liechtenstein', flag: '🇱🇮' },
    { code: '+352', name: 'Luxembourg', flag: '🇱🇺' },
    { code: '+356', name: 'Malta', flag: '🇲🇹' },
    { code: '+357', name: 'Cyprus', flag: '🇨🇾' },
    { code: '+81', name: 'Japan', flag: '🇯🇵' },
    { code: '+82', name: 'South Korea', flag: '🇰🇷' },
    { code: '+86', name: 'China', flag: '🇨🇳' },
    { code: '+852', name: 'Hong Kong', flag: '🇭🇰' },
    { code: '+886', name: 'Taiwan', flag: '🇹🇼' },
    { code: '+65', name: 'Singapore', flag: '🇸🇬' },
    { code: '+60', name: 'Malaysia', flag: '🇲🇾' },
    { code: '+66', name: 'Thailand', flag: '🇹🇭' },
    { code: '+84', name: 'Vietnam', flag: '🇻🇳' },
    { code: '+63', name: 'Philippines', flag: '🇵🇭' },
    { code: '+62', name: 'Indonesia', flag: '🇮🇩' },
    { code: '+91', name: 'India', flag: '🇮🇳' },
    { code: '+92', name: 'Pakistan', flag: '🇵🇰' },
    { code: '+880', name: 'Bangladesh', flag: '🇧🇩' },
    { code: '+94', name: 'Sri Lanka', flag: '🇱🇰' },
    { code: '+977', name: 'Nepal', flag: '🇳🇵' },
    { code: '+975', name: 'Bhutan', flag: '🇧🇹' },
    { code: '+960', name: 'Maldives', flag: '🇲🇻' },
    { code: '+61', name: 'Australia', flag: '🇦🇺' },
    { code: '+64', name: 'New Zealand', flag: '🇳🇿' },
    { code: '+55', name: 'Brazil', flag: '🇧🇷' },
    { code: '+54', name: 'Argentina', flag: '🇦🇷' },
    { code: '+56', name: 'Chile', flag: '🇨🇱' },
    { code: '+57', name: 'Colombia', flag: '🇨🇴' },
    { code: '+51', name: 'Peru', flag: '🇵🇪' },
    { code: '+58', name: 'Venezuela', flag: '🇻🇪' },
    { code: '+52', name: 'Mexico', flag: '🇲🇽' },
    { code: '+1', name: 'Canada', flag: '🇨🇦' },
    { code: '+52', name: 'Mexico', flag: '🇲🇽' },
    { code: '+966', name: 'Saudi Arabia', flag: '🇸🇦' },
    { code: '+971', name: 'UAE', flag: '🇦🇪' },
    { code: '+974', name: 'Qatar', flag: '🇶🇦' },
    { code: '+965', name: 'Kuwait', flag: '🇰🇼' },
    { code: '+973', name: 'Bahrain', flag: '🇧🇭' },
    { code: '+968', name: 'Oman', flag: '🇴🇲' },
    { code: '+962', name: 'Jordan', flag: '🇯🇴' },
    { code: '+961', name: 'Lebanon', flag: '🇱🇧' },
    { code: '+972', name: 'Israel', flag: '🇮🇱' },
    { code: '+20', name: 'Egypt', flag: '🇪🇬' },
    { code: '+212', name: 'Morocco', flag: '🇲🇦' },
    { code: '+213', name: 'Algeria', flag: '🇩🇿' },
    { code: '+216', name: 'Tunisia', flag: '🇹🇳' },
    { code: '+218', name: 'Libya', flag: '🇱🇾' },
    { code: '+249', name: 'Sudan', flag: '🇸🇩' },
    { code: '+27', name: 'South Africa', flag: '🇿🇦' },
    { code: '+234', name: 'Nigeria', flag: '🇳🇬' },
    { code: '+254', name: 'Kenya', flag: '🇰🇪' },
    { code: '+233', name: 'Ghana', flag: '🇬🇭' },
    { code: '+225', name: 'Ivory Coast', flag: '🇨🇮' },
    { code: '+221', name: 'Senegal', flag: '🇸🇳' },
    { code: '+226', name: 'Burkina Faso', flag: '🇧🇫' },
    { code: '+223', name: 'Mali', flag: '🇲🇱' },
    { code: '+227', name: 'Niger', flag: '🇳🇪' },
    { code: '+228', name: 'Togo', flag: '🇹🇬' },
    { code: '+229', name: 'Benin', flag: '🇧🇯' },
    { code: '+224', name: 'Guinea', flag: '🇬🇳' },
    { code: '+245', name: 'Guinea-Bissau', flag: '🇬🇼' },
    { code: '+238', name: 'Cape Verde', flag: '🇨🇻' },
    { code: '+220', name: 'Gambia', flag: '🇬🇲' },
    { code: '+232', name: 'Sierra Leone', flag: '🇸🇱' },
    { code: '+231', name: 'Liberia', flag: '🇱🇷' }
  ];

  const handleAgreementChange = (agreement, checked) => {
    setAgreements(prev => ({
      ...prev,
      [agreement]: checked
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!firstName || !lastName || !phoneNumber) {
      alert('Lütfen tüm zorunlu alanları doldurun.');
      return;
    }

    if (!agreements.kvkk) {
      alert('Lütfen KVKK onayını verin.');
      return;
    }

    // Here you would typically send the data to your backend
    console.log('Form submitted:', {
      requestSubject,
      selectedCountry,
      phoneNumber,
      firstName,
      lastName,
      agreements
    });

    alert('Talebiniz başarıyla gönderildi! Müşteri hizmetlerimiz en kısa sürede sizinle iletişime geçecek.');
    
    // Reset form
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setSelectedCountry('+1');
    setRequestSubject('Yurtiçi Otel veya Paket Tur Rezervasyon Talebi');
    setAgreements({
      kvkk: false,
      etk: false,
      phone: false,
      sms: false
    });
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
            <span style={{ color: '#374151' }}>Sizi Arayalım</span>
          </div>

          <form onSubmit={handleSubmit} style={{
            background: 'white',
            border: '1px solid var(--border-color)',
            borderRadius: 12,
            padding: 24,
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
          }}>
            <h2 
              style={{
                marginTop:0, 
                cursor: 'pointer',
                color: isPhoneClicked ? '#0b5ed7' : 'inherit',
                transition: 'color 0.3s ease'
              }}
              onClick={handlePhoneClick}
            >
              Sizi Arayalım
            </h2>
            {isPhoneClicked && (
              <div style={{
                marginTop: 16,
                padding: '12px 16px',
                background: '#e7f3ff',
                border: '1px solid #b3d9ff',
                borderRadius: 8,
                color: '#0b5ed7',
                fontSize: 14,
                fontWeight: 500
              }}>
                ✅ Telefon numarasına tıkladınız! Müşteri hizmetlerimiz sizinle iletişime geçecek.
              </div>
            )}
            <div style={{marginTop: 16}}>
              <label style={{fontSize: 12, color: '#666'}}>Talep Konusu</label>
              <select 
                value={requestSubject}
                onChange={(e) => setRequestSubject(e.target.value)}
                style={{width:'100%', padding:'12px 14px', border:'1px solid #dee2e6', borderRadius:8}}
              >
                <option value="Yurtiçi Otel veya Paket Tur Rezervasyon Talebi">Yurtiçi Otel veya Paket Tur Rezervasyon Talebi</option>
                <option value="Yurtdışı Tur Rezervasyon Talebi">Yurtdışı Tur Rezervasyon Talebi</option>
                <option value="Uçak Bileti Talebi">Uçak Bileti Talebi</option>
              </select>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'150px 1fr', gap:12, marginTop:12}}>
              <select 
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                style={{padding:'12px 14px', border:'1px solid #dee2e6', borderRadius:8}}
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.code}
                  </option>
                ))}
              </select>
              <input 
                placeholder="( ___ ) ________" 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                style={{padding:'12px 14px', border:'1px solid #dee2e6', borderRadius:8}} 
              />
            </div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:12}}>
              <input 
                placeholder="Adınız *" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={{padding:'12px 14px', border:'1px solid #dee2e6', borderRadius:8}} 
              />
              <input 
                placeholder="Soyadınız *" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={{padding:'12px 14px', border:'1px solid #dee2e6', borderRadius:8}} 
              />
            </div>
            <div style={{marginTop:12, color:'#444', fontSize:12}}>
              Kişisel Verileriniz, 6698 sayılı yasa ve Aydınlatma metni kapsamında işlenmektedir.
            </div>
            <div style={{marginTop:12, display:'grid', gap:8}}>
              <label style={{display:'flex', alignItems:'center', gap:8, fontSize:12, color:'#444'}}>
                <input 
                  type="checkbox" 
                  checked={agreements.kvkk}
                  onChange={(e) => handleAgreementChange('kvkk', e.target.checked)}
                /> 
                KVKK kapsamında hazırlanan Açık Rıza Metni'ni onaylıyorum.
              </label>
              <label style={{display:'flex', alignItems:'center', gap:8, fontSize:12, color:'#444'}}>
                <input 
                  type="checkbox" 
                  checked={agreements.etk}
                  onChange={(e) => handleAgreementChange('etk', e.target.checked)}
                /> 
                Ticari elektronik ileti gönderimine onay veriyorum.
              </label>
              <div style={{display:'flex', gap:12}}>
                <label style={{display:'flex', alignItems:'center', gap:8, fontSize:12, color:'#444'}}>
                  <input 
                    type="checkbox" 
                    checked={agreements.phone}
                    onChange={(e) => handleAgreementChange('phone', e.target.checked)}
                  /> 
                  Telefon
                </label>
                <label style={{display:'flex', alignItems:'center', gap:8, fontSize:12, color:'#444'}}>
                  <input 
                    type="checkbox" 
                    checked={agreements.sms}
                    onChange={(e) => handleAgreementChange('sms', e.target.checked)}
                  /> 
                  SMS
                </label>
              </div>
            </div>
            <button 
              type="submit"
              style={{
                marginTop: 16,
                padding: '12px 18px',
                background: '#0b5ed7',
                color: 'white',
                border: 'none',
                borderRadius: 12,
                fontWeight: 700,
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Gönder
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CallbackPage;

