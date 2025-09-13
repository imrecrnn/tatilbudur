import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CallbackPage = () => {
  const [isPhoneClicked, setIsPhoneClicked] = useState(false);

  const handlePhoneClick = () => {
    setIsPhoneClicked(true);
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

          <div style={{
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
              0 850 333 3 333
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
              <select style={{width:'100%', padding:'12px 14px', border:'1px solid #dee2e6', borderRadius:8}}>
                <option>Yurtiçi Otel veya Paket Tur Rezervasyon Talebi</option>
                <option>Yurtdışı Tur Rezervasyon Talebi</option>
                <option>Uçak Bileti Talebi</option>
              </select>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'150px 1fr', gap:12, marginTop:12}}>
              <select style={{padding:'12px 14px', border:'1px solid #dee2e6', borderRadius:8}}>
                <option>+90</option>
              </select>
              <input placeholder="( ___ ) ________" style={{padding:'12px 14px', border:'1px solid #dee2e6', borderRadius:8}} />
            </div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:12}}>
              <input placeholder="Adınız *" style={{padding:'12px 14px', border:'1px solid #dee2e6', borderRadius:8}} />
              <input placeholder="Soyadınız *" style={{padding:'12px 14px', border:'1px solid #dee2e6', borderRadius:8}} />
            </div>
            <div style={{marginTop:12, color:'#444', fontSize:12}}>
              Kişisel Verileriniz, 6698 sayılı yasa ve Aydınlatma metni kapsamında işlenmektedir.
            </div>
            <div style={{marginTop:12, display:'grid', gap:8}}>
              <label><input type="checkbox" /> KVKK kapsamında hazırlanan Açık Rıza Metni'ni onaylıyorum.</label>
              <label><input type="checkbox" /> Ticari elektronik ileti gönderimine onay veriyorum.</label>
              <div style={{display:'flex', gap:12}}>
                <label><input type="checkbox" /> Telefon</label>
                <label><input type="checkbox" /> SMS</label>
              </div>
            </div>
            <button style={{
              marginTop: 16,
              padding: '12px 18px',
              background: '#0b5ed7',
              color: 'white',
              border: 'none',
              borderRadius: 12,
              fontWeight: 700
            }}>Gönder</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallbackPage;

