import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
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
            <span style={{ color: '#374151' }}>Giriş Yapın</span>
          </div>

          <div style={{
            background: 'white',
            border: '1px solid var(--border-color)',
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
          }}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
              <div style={{padding: 28}}>
                <h2 style={{margin: 0, fontSize: 20}}>TatilBudur'a Hoş Geldiniz.</h2>
                <p style={{color: '#666', fontSize: 13, marginTop: 8}}>
                  E-posta adresini girerek hesabına giriş yapabilir veya üye olabilirsin.
                </p>
                <input type="email" placeholder="E-Posta adresi *" style={{
                  width: '100%', padding: '12px 14px', border: '1px solid #dee2e6',
                  borderRadius: 8, fontSize: 14
                }} />
                <button style={{
                  marginTop: 16, width: '100%', padding: '12px 14px', background: '#0b5ed7',
                  color: 'white', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer'
                }}>Devam Et</button>
                <p style={{color: '#666', fontSize: 12, marginTop: 12}}>
                  Kişisel Verileriniz, 6698 sayılı yasa ve Aydınlatma metni kapsamında işlenmektedir.
                </p>
              </div>
              <div style={{background: '#0b5ed7', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28}}>
                <div>
                  <img src="https://images.unsplash.com/photo-1606761568499-6d2451b23c56?w=320&h=220&fit=crop" alt="Travel" style={{borderRadius:8}} />
                  <div style={{marginTop:12,fontWeight:700}}>Hemen Üye Ol, Tatilini Planlamaya Başla!</div>
                  <ul style={{marginTop:8, paddingLeft:18}}>
                    <li>Rezervasyonlarını Kolayca Yönet</li>
                    <li>Kampanya ve Fırsatları Takip Et</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

