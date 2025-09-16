import React, { useState } from 'react';
import './FlightSearch.css';

const FlightSearch = ({ onSubmit }) => {
  const [flightType, setFlightType] = useState('roundtrip');
  const [formData, setFormData] = useState({
    departure: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    passengers: 1
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ flightType, ...formData });
  };

  return (
    <div className="flight-search-container">
      <form onSubmit={handleSubmit}>
        {/* 1. SATIR: Uçuş Tipi Seçimi */}
        <div className="flight-type-row">
          <div className="radio-group">
            <div className="radio-option">
              <input
                type="radio"
                id="roundtrip"
                name="flightType"
                value="roundtrip"
                checked={flightType === 'roundtrip'}
                onChange={(e) => setFlightType(e.target.value)}
              />
              <label htmlFor="roundtrip">✈️ Gidiş-Dönüş</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="oneway"
                name="flightType"
                value="oneway"
                checked={flightType === 'oneway'}
                onChange={(e) => setFlightType(e.target.value)}
              />
              <label htmlFor="oneway">➡️ Tek Yön</label>
            </div>
          </div>
        </div>

        {/* 2. SATIR: Arama Alanları */}
        <div className="search-fields-row">
          <div className="field-group">
            <div className="input-with-icon">
              <span className="leading-icon">📍</span>
              <input
                type="text"
                placeholder="Nereden"
                value={formData.departure}
                onChange={(e) => handleInputChange('departure', e.target.value)}
              />
            </div>
          </div>

          <div className="field-group">
            <div className="input-with-icon">
              <span className="leading-icon">📍</span>
              <input
                type="text"
                placeholder="Nereye"
                value={formData.destination}
                onChange={(e) => handleInputChange('destination', e.target.value)}
              />
            </div>
          </div>

          <div className="field-group">
            <div className="input-with-icon">
              <span className="leading-icon">📅</span>
              <input
                type="date"
                placeholder="Tarih Seçin"
                value={formData.departureDate}
                onChange={(e) => handleInputChange('departureDate', e.target.value)}
              />
            </div>
          </div>

          {flightType === 'roundtrip' && (
            <div className="field-group">
              <div className="input-with-icon">
                <span className="leading-icon"></span>
                <input
                  type="date"
                  placeholder="Dönüş Tarihi"
                  value={formData.returnDate}
                  onChange={(e) => handleInputChange('returnDate', e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="field-group">
            <div className="input-with-icon">
              <span className="leading-icon"></span>
              <span className="passenger-count">{formData.passengers} Yetişkin</span>
            </div>
          </div>

          <div className="field-group">
            <div className="input-with-icon">
              <span className="leading-icon">✈️</span>
              <span className="class-text">Kabin/Sınıf</span>
            </div>
          </div>

          <button type="submit" className="search-button">
            Uçuş Ara
          </button>
        </div>
      </form>
    </div>
  );
};

export default FlightSearch;