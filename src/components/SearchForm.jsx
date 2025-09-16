import React, { useState } from 'react';
import { Search, Calendar, Users, MapPin } from 'lucide-react';
import './SearchForm.css';

const SearchForm = () => {
  const [searchType, setSearchType] = useState('hotels');
  const [flightType, setFlightType] = useState('roundtrip');
  const [formData, setFormData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    rooms: 1
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Search:', { searchType, ...formData });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="search-form-container">
      <div className="search-tabs">
        <button 
          className={`search-tab ${searchType === 'hotels' ? 'active' : ''}`}
          onClick={() => setSearchType('hotels')}
        >
          <span className="tab-icon">🏨</span>
          Otel
        </button>
        <button 
          className={`search-tab ${searchType === 'tours' ? 'active' : ''}`}
          onClick={() => setSearchType('tours')}
        >
          <span className="tab-icon">🧳</span>
          Tur
        </button>
        <button 
          className={`search-tab ${searchType === 'flights' ? 'active' : ''}`}
          onClick={() => setSearchType('flights')}
        >
          <span className="tab-icon">✈️</span>
          Uçak
        </button>
      </div>

      <div className="search-content">
        <form onSubmit={handleSubmit} className="search-form">
          <div className="search-fields">
            <div className="field-group">
              <input
                type="text"
                placeholder="Nereye gitmek istiyorsunuz?"
                value={formData.destination}
                onChange={(e) => handleInputChange('destination', e.target.value)}
              />
            </div>

            {searchType === 'hotels' && (
              <>
                <div className="field-group">
                  <input
                    type="date"
                    value={formData.checkIn}
                    onChange={(e) => handleInputChange('checkIn', e.target.value)}
                  />
                </div>

                <div className="field-group">
                  <input
                    type="date"
                    value={formData.checkOut}
                    onChange={(e) => handleInputChange('checkOut', e.target.value)}
                  />
                </div>

                <div className="field-group guest-info">
                  <div className="guest-display">
                    <span className="guest-label">Misafir & Oda</span>
                    <span className="guest-count">{formData.guests} Misafir, {formData.rooms} Oda</span>
                  </div>
                </div>
              </>
            )}

            {searchType === 'flights' && (
              <>
                <div className="flight-options">
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
                      <label htmlFor="roundtrip">Gidiş-Dönüş</label>
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
                      <label htmlFor="oneway">Tek Yön</label>
                    </div>
                  </div>
                </div>

                <div className="field-group">
                  <input
                    type="date"
                    placeholder="Gidiş Tarihi"
                    value={formData.checkIn}
                    onChange={(e) => handleInputChange('checkIn', e.target.value)}
                  />
                </div>

                {flightType === 'roundtrip' && (
                  <div className="field-group">
                    <input
                      type="date"
                      placeholder="Dönüş Tarihi"
                      value={formData.checkOut}
                      onChange={(e) => handleInputChange('checkOut', e.target.value)}
                    />
                  </div>
                )}

                <div className="field-group passenger-info">
                  <span className="passenger-count">{formData.guests} Yolcu</span>
                </div>
              </>
            )}

            {searchType === 'tours' && (
              <>
                <div className="field-group">
                  <input
                    type="date"
                    value={formData.checkIn}
                    onChange={(e) => handleInputChange('checkIn', e.target.value)}
                  />
                </div>

                <div className="field-group">
                  <span className="passenger-count">{formData.guests} Kişi</span>
                </div>
              </>
            )}

            <button type="submit" className="search-button">
              <Search size={20} />
              Ara
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;