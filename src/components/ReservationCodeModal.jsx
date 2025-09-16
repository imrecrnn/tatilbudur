import React, { useState } from 'react';
import { X, Copy, Check, Hash, Calendar, MapPin, Star } from 'lucide-react';
import './ReservationCodeModal.css';

const ReservationCodeModal = ({ isOpen, onClose, reservationCode, reservationData }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(reservationCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Kopyalama hatası:', err);
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

  const formatCurrency = (amount) => {
    return amount.toLocaleString('tr-TR', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    }) + ' ₺';
  };

  if (!isOpen) return null;

  return (
    <div className="reservation-code-modal-overlay" onClick={onClose}>
      <div className="reservation-code-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Rezervasyon Kodunuz</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-content">
          {/* Rezervasyon Kodu */}
          <div className="reservation-code-section">
            <div className="code-label">
              <Hash size={16} />
              <span>Rezervasyon Kodu</span>
            </div>
            <div className="code-display">
              <span className="code-text">{reservationCode}</span>
              <button 
                className="copy-btn"
                onClick={copyToClipboard}
                title="Kodu Kopyala"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
            <p className="code-description">
              Bu kodu rezervasyon sorgulama için kullanabilirsiniz.
            </p>
          </div>

          {/* Rezervasyon Özeti */}
          {reservationData && (
            <div className="reservation-summary">
              <h3>Rezervasyon Özeti</h3>
              
              <div className="hotel-info">
                <h4>{reservationData.hotel.name}</h4>
                <div className="hotel-location">
                  <MapPin size={14} />
                  <span>{reservationData.hotel.location}</span>
                </div>
                <div className="hotel-rating">
                  <Star size={14} />
                  <span>{reservationData.hotel.rating} Yıldız</span>
                </div>
              </div>

              <div className="booking-details">
                <div className="detail-row">
                  <Calendar size={14} />
                  <span>Giriş:</span>
                  <span>{formatDate(reservationData.bookingData.checkIn)}</span>
                </div>
                <div className="detail-row">
                  <Calendar size={14} />
                  <span>Çıkış:</span>
                  <span>{formatDate(reservationData.bookingData.checkOut)}</span>
                </div>
                <div className="detail-row">
                  <span>Misafir:</span>
                  <span>
                    {reservationData.bookingData.adults} Yetişkin
                    {reservationData.bookingData.children > 0 && `, ${reservationData.bookingData.children} Çocuk`}
                  </span>
                </div>
                <div className="detail-row">
                  <span>Gece:</span>
                  <span>{reservationData.bookingData.nights} Gece</span>
                </div>
              </div>

              <div className="price-info">
                <span className="price-label">Toplam Tutar:</span>
                <span className="price-amount">{formatCurrency(reservationData.totalPrice)}</span>
              </div>
            </div>
          )}

          {/* Butonlar */}
          <div className="modal-actions">
            <button 
              className="btn-secondary"
              onClick={onClose}
            >
              Kapat
            </button>
            <button 
              className="btn-primary"
              onClick={() => {
                window.open('/reservation-check', '_blank');
                onClose();
              }}
            >
              Rezervasyon Kontrol Et
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationCodeModal;
