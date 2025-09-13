import React from 'react';
import { Link } from 'react-router-dom';

const ReservationsPage = () => {
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
            <span style={{ color: '#374151' }}>Rezervasyonlarım</span>
          </div>

          <div style={{
            background: 'white',
            border: '1px solid var(--border-color)',
            borderRadius: 12,
            padding: 24,
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{marginTop: 0}}>Rezervasyon Kontrol</h2>
            <p style={{color:'#666'}}>E-posta adresinize iletilen doğrulama kodunu giriniz.</p>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
              <div>
                <label style={{fontSize: 12, color: '#666'}}>E-Posta veya Kimlik No*</label>
                <input style={{width:'100%', padding:'12px 14px', border:'1px solid #dee2e6', borderRadius:8}} />
              </div>
              <div>
                <label style={{fontSize: 12, color: '#666'}}>Rezervasyon No*</label>
                <input style={{width:'100%', padding:'12px 14px', border:'1px solid #dee2e6', borderRadius:8}} />
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
            }}>Rezervasyonunu Kontrol Et</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationsPage;

