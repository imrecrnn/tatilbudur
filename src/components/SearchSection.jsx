import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, Users, MapPin, Plane, ArrowUpDown } from 'lucide-react';
import './SearchSection.css';

const SearchSection = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('hotel');
  const [dropdowns, setDropdowns] = useState({
    hotelDate: false,
    hotelGuest: false,
    tourDate: false,
    tourGuest: false,
    flightDate: false,
    flightPassenger: false,
    flightClass: false
  });
  const dropdownRefs = useRef({});
  
  const [searchData, setSearchData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    children: 0,
    rooms: 1,
    departDate: '',
    returnDate: '',
    passengers: 1,
    infants: 0,
    class: 'economy',
    tripType: 'roundtrip',
    fromLocation: '',
    toLocation: ''
  });

  // Only show SearchSection on homepage
  if (location.pathname !== '/') {
    return null;
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.keys(dropdownRefs.current).forEach(key => {
        if (dropdownRefs.current[key] && !dropdownRefs.current[key].contains(event.target)) {
          setDropdowns(prev => ({ ...prev, [key]: false }));
        }
      });
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (field, value) => {
    setSearchData(prev => ({ ...prev, [field]: value }));
  };

  const toggleDropdown = (dropdownKey) => {
    setDropdowns(prev => ({
      ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
      [dropdownKey]: !prev[dropdownKey]
    }));
  };

  const swapLocations = () => {
    setSearchData(prev => ({
      ...prev,
      fromLocation: prev.toLocation,
      toLocation: prev.fromLocation
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${activeTab} search:`, searchData);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Tarih Seçin';
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getGuestText = () => {
    const adults = searchData.guests;
    const children = searchData.children;
    let text = `${adults} Yetişkin`;
    if (children > 0) text += `, ${children} Çocuk`;
    return text;
  };

  const getPassengerText = () => {
    const { passengers, children, infants } = searchData;
    let text = `${passengers} Yetişkin`;
    if (children > 0) text += `, ${children} Çocuk`;
    if (infants > 0) text += `, ${infants} Bebek`;
    return text;
  };

  return (
    <div className="search-section">
      <div className="container">
        <div className="search-card">
          <div className="search-tabs-container">
            <div className="search-tabs">
              <button 
                className={`search-tab ${activeTab === 'hotel' ? 'active' : ''}`}
                onClick={() => setActiveTab('hotel')}
              >
                🏨 Otel Ara
              </button>
              <button 
                className={`search-tab ${activeTab === 'tour' ? 'active' : ''}`}
                onClick={() => setActiveTab('tour')}
              >
                🧳 Tur Ara
              </button>
              <button 
                className={`search-tab ${activeTab === 'flight' ? 'active' : ''}`}
                onClick={() => setActiveTab('flight')}
              >
                ✈️ Uçuş Ara
              </button>
            </div>
            <div className="tabs-underline" />
          </div>

          <div className="search-content">
            <form onSubmit={handleSubmit} className="search-form-main">
              {/* Hotel Search */}
              {activeTab === 'hotel' && (
                <div className="search-fields hotel-search">
                  <div className="field-group destination-field">
                    <div className="input-with-icon">
                      <MapPin size={16} className="leading-icon" />
                      <input
                        type="text"
                        placeholder="Otel, Şehir, Bölge veya Tema Adı"
                        value={searchData.destination}
                        onChange={(e) => handleInputChange('destination', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="field-group date-field">
                    <div 
                      className="date-picker-trigger"
                      onClick={() => toggleDropdown('hotelDate')}
                    >
                      <Calendar size={16} />
                      <span>11 - 16 Eylül 2025</span>
                    </div>
                    {dropdowns.hotelDate && (
                      <div className="date-picker-dropdown">
                        <div className="calendar-grid">
                          <div className="calendar-header">
                            <button type="button">‹</button>
                            <span>Eylül 2025</span>
                            <button type="button">›</button>
                          </div>
                          <div className="calendar-days">
                            <div className="day-header">Pt</div>
                            <div className="day-header">Sa</div>
                            <div className="day-header">Ça</div>
                            <div className="day-header">Pe</div>
                            <div className="day-header">Cu</div>
                            <div className="day-header">Ct</div>
                            <div className="day-header">Pa</div>
                            {Array.from({length: 30}, (_, i) => (
                              <div key={i} className={`calendar-day ${i >= 10 && i <= 15 ? 'selected' : ''}`}>
                                {i + 1}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="field-group guest-field">
                    <div 
                      className="guest-picker-trigger"
                      onClick={() => toggleDropdown('hotelGuest')}
                    >
                      <Users size={16} />
                      <div className="guest-display">
                        <span className="guest-label">Kişi Sayısı</span>
                        <span className="guest-count">{searchData.guests} Yetişkin</span>
                      </div>
                    </div>
                    {dropdowns.hotelGuest && (
                      <div className="guest-picker-dropdown">
                        <div className="guest-row">
                          <span>Yetişkin</span>
                          <div className="counter">
                            <button 
                              type="button" 
                              onClick={() => handleInputChange('guests', Math.max(1, searchData.guests - 1))}
                            >
                              -
                            </button>
                            <span>{searchData.guests}</span>
                            <button 
                              type="button" 
                              onClick={() => handleInputChange('guests', searchData.guests + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="guest-row">
                          <span>Çocuk</span>
                          <div className="counter">
                            <button 
                              type="button" 
                              onClick={() => handleInputChange('children', Math.max(0, searchData.children - 1))}
                            >
                              -
                            </button>
                            <span>{searchData.children}</span>
                            <button 
                              type="button" 
                              onClick={() => handleInputChange('children', searchData.children + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="guest-row">
                          <span>Oda</span>
                          <div className="counter">
                            <button 
                              type="button" 
                              onClick={() => handleInputChange('rooms', Math.max(1, searchData.rooms - 1))}
                            >
                              -
                            </button>
                            <span>{searchData.rooms}</span>
                            <button 
                              type="button" 
                              onClick={() => handleInputChange('rooms', searchData.rooms + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <button type="submit" className="search-button">
                    Otel Ara
                  </button>
                </div>
              )}

              {/* Tour Search */}
              {activeTab === 'tour' && (
                <div className="search-fields tour-search">
                  <div className="field-group destination-field">
                    <div className="input-with-icon">
                      <MapPin size={16} className="leading-icon" />
                      <input
                        type="text"
                        placeholder="Tur Adı veya Bölge Girin"
                        value={searchData.destination}
                        onChange={(e) => handleInputChange('destination', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="field-group date-field">
                    <div 
                      className="date-picker-trigger"
                      onClick={() => toggleDropdown('tourDate')}
                    >
                      <Calendar size={16} />
                      <span>Farketmez</span>
                    </div>
                    {dropdowns.tourDate && (
                      <div className="date-picker-dropdown">
                        <div className="calendar-grid">
                          <div className="calendar-header">
                            <button type="button">‹</button>
                            <span>Eylül 2025</span>
                            <button type="button">›</button>
                          </div>
                          <div className="calendar-days">
                            <div className="day-header">Pt</div>
                            <div className="day-header">Sa</div>
                            <div className="day-header">Ça</div>
                            <div className="day-header">Pe</div>
                            <div className="day-header">Cu</div>
                            <div className="day-header">Ct</div>
                            <div className="day-header">Pa</div>
                            {Array.from({length: 30}, (_, i) => (
                              <div key={i} className="calendar-day">
                                {i + 1}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="field-group guest-field">
                    <div 
                      className="guest-picker-trigger"
                      onClick={() => toggleDropdown('tourGuest')}
                    >
                      <Users size={16} />
                      <div className="guest-display">
                        <span className="guest-label">Kişi Sayısı</span>
                        <span className="guest-count">{searchData.guests} Yetişkin</span>
                      </div>
                    </div>
                    {dropdowns.tourGuest && (
                      <div className="guest-picker-dropdown">
                        <div className="guest-row">
                          <span>Yetişkin</span>
                          <div className="counter">
                            <button 
                              type="button" 
                              onClick={() => handleInputChange('guests', Math.max(1, searchData.guests - 1))}
                            >
                              -
                            </button>
                            <span>{searchData.guests}</span>
                            <button 
                              type="button" 
                              onClick={() => handleInputChange('guests', searchData.guests + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="guest-row">
                          <span>Çocuk</span>
                          <div className="counter">
                            <button 
                              type="button" 
                              onClick={() => handleInputChange('children', Math.max(0, searchData.children - 1))}
                            >
                              -
                            </button>
                            <span>{searchData.children}</span>
                            <button 
                              type="button" 
                              onClick={() => handleInputChange('children', searchData.children + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <button type="submit" className="search-button">
                    Tur Ara
                  </button>
                </div>
              )}

              {/* Flight Search */}
              {activeTab === 'flight' && (
                <div className="search-fields flight-search">
                  <div className="flight-type-buttons">
                    <button 
                      type="button" 
                      className={`flight-type-btn ${searchData.tripType === 'roundtrip' ? 'active' : ''}`}
                      onClick={() => handleInputChange('tripType', 'roundtrip')}
                    >
                      ✈️ Gidiş Dönüş
                    </button>
                    <button 
                      type="button" 
                      className={`flight-type-btn ${searchData.tripType === 'oneway' ? 'active' : ''}`}
                      onClick={() => handleInputChange('tripType', 'oneway')}
                    >
                      → Tek Yön
                    </button>
                  </div>

                  <div className="flight-search-fields">
                    <div className="field-group route-field">
                      <div className="input-with-icon">
                        <MapPin size={16} className="leading-icon" />
                        <input
                          type="text"
                          placeholder="Nereden"
                          value={searchData.fromLocation}
                          onChange={(e) => handleInputChange('fromLocation', e.target.value)}
                        />
                      </div>
                      <div className="route-swap" onClick={swapLocations}>⇄</div>
                      <div className="input-with-icon">
                        <MapPin size={16} className="leading-icon" />
                        <input
                          type="text"
                          placeholder="Nereye"
                          value={searchData.toLocation}
                          onChange={(e) => handleInputChange('toLocation', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="field-group date-field">
                      <div 
                        className="date-picker-trigger"
                        onClick={() => toggleDropdown('flightDate')}
                      >
                        <Calendar size={16} />
                        <span>Uçuş Tarihi</span>
                      </div>
                      {dropdowns.flightDate && (
                        <div className="date-picker-dropdown">
                          <div className="calendar-grid">
                            <div className="calendar-header">
                              <button type="button">‹</button>
                              <span>Eylül 2025</span>
                              <button type="button">›</button>
                            </div>
                            <div className="calendar-days">
                              <div className="day-header">Pt</div>
                              <div className="day-header">Sa</div>
                              <div className="day-header">Ça</div>
                              <div className="day-header">Pe</div>
                              <div className="day-header">Cu</div>
                              <div className="day-header">Ct</div>
                              <div className="day-header">Pa</div>
                              {Array.from({length: 30}, (_, i) => (
                                <div key={i} className="calendar-day">
                                  {i + 1}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="field-group passenger-field">
                      <div 
                        className="passenger-picker-trigger"
                        onClick={() => toggleDropdown('flightPassenger')}
                      >
                        <Users size={16} />
                        <span>{searchData.passengers} Yetişkin</span>
                      </div>
                      {dropdowns.flightPassenger && (
                        <div className="passenger-picker-dropdown">
                          <div className="guest-row">
                            <span>Yetişkin</span>
                            <div className="counter">
                              <button 
                                type="button" 
                                onClick={() => handleInputChange('passengers', Math.max(1, searchData.passengers - 1))}
                              >
                                -
                              </button>
                              <span>{searchData.passengers}</span>
                              <button 
                                type="button" 
                                onClick={() => handleInputChange('passengers', searchData.passengers + 1)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="field-group class-field">
                      <div 
                        className="class-picker-trigger"
                        onClick={() => toggleDropdown('flightClass')}
                      >
                        <span>Kabin/Sınıf</span>
                      </div>
                      {dropdowns.flightClass && (
                        <div className="class-picker-dropdown">
                          <div className="class-option" onClick={() => handleInputChange('class', 'economy')}>
                            Ekonomi
                          </div>
                          <div className="class-option" onClick={() => handleInputChange('class', 'business')}>
                            Business
                          </div>
                          <div className="class-option" onClick={() => handleInputChange('class', 'first')}>
                            First Class
                          </div>
                        </div>
                      )}
                    </div>

                    <button type="submit" className="search-button">
                      Uçuş Ara
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;