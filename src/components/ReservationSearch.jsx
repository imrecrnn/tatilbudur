import React, { useState } from 'react';
import { Search, Mail, Hash, AlertCircle, CheckCircle } from 'lucide-react';
import { getReservationsByEmail, getReservationByCode } from '../firebase/reservationService';

const ReservationSearch = ({ onReservationsFound }) => {
  const [searchType, setSearchType] = useState('email'); // 'email' or 'code'
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchValue.trim()) {
      setError('Lütfen arama değeri girin.');
      return;
    }

    setIsSearching(true);
    setError('');
    setSuccess('');

    try {
      if (searchType === 'email') {
        // Search by email
        const result = await getReservationsByEmail(searchValue.trim());
        
        if (result.success) {
          if (result.reservations.length > 0) {
            setSuccess(`${result.reservations.length} rezervasyon bulundu.`);
            onReservationsFound(result.reservations);
          } else {
            setError('Bu e-posta adresine ait rezervasyon bulunamadı.');
            onReservationsFound([]);
          }
        } else {
          setError(result.error || 'Rezervasyon arama sırasında bir hata oluştu.');
          onReservationsFound([]);
        }
      } else {
        // Search by reservation code
        const result = await getReservationByCode(searchValue.trim().toUpperCase());
        
        if (result.success) {
          setSuccess('Rezervasyon bulundu.');
          onReservationsFound([result.reservation]);
        } else {
          setError(result.error || 'Rezervasyon bulunamadı.');
          onReservationsFound([]);
        }
      }
    } catch (error) {
      console.error('Search error:', error);
      setError('Arama sırasında bir hata oluştu.');
      onReservationsFound([]);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchValue('');
    setError('');
    setSuccess('');
    onReservationsFound([]);
  };

  return (
    <div style={{
      background: 'white',
      border: '1px solid #dee2e6',
      borderRadius: 12,
      padding: 24,
      marginBottom: 24,
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
    }}>
      <h3 style={{ marginTop: 0, marginBottom: 16, color: '#374151' }}>
        Rezervasyon Sorgula
      </h3>
      
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

        {/* Search Input */}
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
                transition: 'border-color 0.2s'
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
                Ara
              </>
            )}
          </button>
        </div>

        {/* Clear Button */}
        {searchValue && (
          <button
            type="button"
            onClick={clearSearch}
            style={{
              padding: '8px 16px',
              background: 'transparent',
              color: '#6b7280',
              border: '1px solid #dee2e6',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: 12,
              marginBottom: 16
            }}
          >
            Temizle
          </button>
        )}

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
      </form>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ReservationSearch;
