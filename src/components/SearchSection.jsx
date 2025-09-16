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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
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

  // Date picker state
  const [datePickerState, setDatePickerState] = useState({
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
    selectedStartDate: null,
    selectedEndDate: null,
    tempStartDate: null,
    tempEndDate: null
  });

  // Guest picker state - separate for each search type
  const [hotelGuestPickerState, setHotelGuestPickerState] = useState({
    tempGuests: 2,
    tempChildren: 0,
    tempRooms: 1
  });

  const [tourGuestPickerState, setTourGuestPickerState] = useState({
    tempGuests: 2,
    tempChildren: 0
  });

  const [flightGuestPickerState, setFlightGuestPickerState] = useState({
    tempPassengers: 1,
    tempInfants: 0
  });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // Date picker helper functions
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const formatDateRange = (startDate, endDate) => {
    if (!startDate) return 'Tarih Seçin';
    if (!endDate) return formatDate(startDate);
    
    const start = formatDate(startDate);
    const end = formatDate(endDate);
    return `${start} - ${end}`;
  };

  const isDateInRange = (date, startDate, endDate) => {
    if (!startDate || !endDate) return false;
    return date >= startDate && date <= endDate;
  };

  const handleDateSelect = (day, month, year) => {
    const selectedDate = new Date(year, month, day);
    
    setDatePickerState(prev => {
      if (!prev.tempStartDate || (prev.tempStartDate && prev.tempEndDate)) {
        // Start new selection
        return {
          ...prev,
          tempStartDate: selectedDate,
          tempEndDate: null
        };
      } else {
        // Complete selection
        const start = prev.tempStartDate;
        const end = selectedDate;
        
        return {
          ...prev,
          tempStartDate: start <= end ? start : end,
          tempEndDate: start <= end ? end : start
        };
      }
    });
  };

  const handleApplyDate = (dropdownKey) => {
    const { tempStartDate, tempEndDate } = datePickerState;
    
    if (tempStartDate) {
      setDatePickerState(prev => ({
        ...prev,
        selectedStartDate: tempStartDate,
        selectedEndDate: tempEndDate
      }));

      // Update search data
      setSearchData(prev => ({
        ...prev,
        checkIn: tempStartDate.toISOString().split('T')[0],
        checkOut: tempEndDate ? tempEndDate.toISOString().split('T')[0] : ''
      }));
    }

    // Close dropdown
    setDropdowns(prev => ({ ...prev, [dropdownKey]: false }));
  };

  const navigateMonth = (direction) => {
    setDatePickerState(prev => {
      let newMonth = prev.currentMonth + direction;
      let newYear = prev.currentYear;

      if (newMonth < 0) {
        newMonth = 11;
        newYear--;
      } else if (newMonth > 11) {
        newMonth = 0;
        newYear++;
      }

      return {
        ...prev,
        currentMonth: newMonth,
        currentYear: newYear
      };
    });
  };

  const navigateYear = (direction) => {
    setDatePickerState(prev => ({
      ...prev,
      currentYear: prev.currentYear + direction
    }));
  };

  // Guest picker helper functions
  const handleGuestChange = (type, value, searchType) => {
    if (searchType === 'hotel') {
      setHotelGuestPickerState(prev => ({
        ...prev,
        [type]: Math.max(0, value)
      }));
    } else if (searchType === 'tour') {
      setTourGuestPickerState(prev => ({
        ...prev,
        [type]: Math.max(0, value)
      }));
    } else if (searchType === 'flight') {
      setFlightGuestPickerState(prev => ({
        ...prev,
        [type]: Math.max(0, value)
      }));
    }
  };

  const handleApplyGuest = (dropdownKey, guestType = 'hotel') => {
    if (guestType === 'hotel') {
      setSearchData(prev => ({
        ...prev,
        guests: hotelGuestPickerState.tempGuests,
        children: hotelGuestPickerState.tempChildren,
        rooms: hotelGuestPickerState.tempRooms
      }));
    } else if (guestType === 'tour') {
      setSearchData(prev => ({
        ...prev,
        guests: tourGuestPickerState.tempGuests,
        children: tourGuestPickerState.tempChildren
      }));
    } else if (guestType === 'flight') {
      setSearchData(prev => ({
        ...prev,
        passengers: flightGuestPickerState.tempPassengers,
        infants: flightGuestPickerState.tempInfants
      }));
    }

    // Close dropdown
    setDropdowns(prev => ({ ...prev, [dropdownKey]: false }));
  };

  const getGuestDisplayText = (type = 'hotel') => {
    if (type === 'hotel') {
      const { tempGuests, tempChildren, tempRooms } = hotelGuestPickerState;
      let text = `${tempGuests} Yetişkin`;
      if (tempChildren > 0) text += `, ${tempChildren} Çocuk`;
      text += `, ${tempRooms} Oda`;
      return text;
    } else if (type === 'tour') {
      const { tempGuests, tempChildren } = tourGuestPickerState;
      let text = `${tempGuests} Yetişkin`;
      if (tempChildren > 0) text += `, ${tempChildren} Çocuk`;
      return text;
    } else if (type === 'flight') {
      const { tempPassengers, tempInfants } = flightGuestPickerState;
      let text = `${tempPassengers} Yetişkin`;
      if (tempInfants > 0) text += `, ${tempInfants} Bebek`;
      return text;
    }
    return '';
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

  // Only show SearchSection on homepage
  if (location.pathname !== '/') {
    return null;
  }

  const hasActiveDropdown = Object.values(dropdowns).some(Boolean);

  return (
    <div className="search-section">
      {/* Dropdown backdrop */}
      {hasActiveDropdown && isMobile && (
        <div 
          className="dropdown-backdrop active"
          onClick={() => setDropdowns({
            hotelDate: false,
            hotelGuest: false,
            tourDate: false,
            tourGuest: false,
            flightDate: false,
            flightPassenger: false,
            flightClass: false
          })}
        />
      )}
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
                      <span>{formatDateRange(datePickerState.selectedStartDate, datePickerState.selectedEndDate)}</span>
                    </div>
                    {dropdowns.hotelDate && (
                      <div 
                        ref={el => dropdownRefs.current.hotelDate = el}
                        className={`date-picker-dropdown ${isMobile ? 'mobile-dropdown' : ''}`}
                      >
                        <div className="calendar-container">
                          <div className="calendar-header">
                            <button type="button" onClick={() => navigateYear(-1)}>‹‹</button>
                            <button type="button" onClick={() => navigateMonth(-1)}>‹</button>
                            <div className="month-year-display">
                              <span>{new Date(datePickerState.currentYear, datePickerState.currentMonth).toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}</span>
                            </div>
                            <button type="button" onClick={() => navigateMonth(1)}>›</button>
                            <button type="button" onClick={() => navigateYear(1)}>››</button>
                          </div>
                          <div className="calendar-days">
                            <div className="day-header">Pt</div>
                            <div className="day-header">Sa</div>
                            <div className="day-header">Ça</div>
                            <div className="day-header">Pe</div>
                            <div className="day-header">Cu</div>
                            <div className="day-header">Ct</div>
                            <div className="day-header">Pa</div>
                            
                            {(() => {
                              const daysInMonth = getDaysInMonth(datePickerState.currentMonth, datePickerState.currentYear);
                              const firstDay = getFirstDayOfMonth(datePickerState.currentMonth, datePickerState.currentYear);
                              const days = [];
                              
                              // Add empty cells for days before the first day of the month
                              for (let i = 0; i < firstDay; i++) {
                                days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
                              }
                              
                              // Add days of the month
                              for (let day = 1; day <= daysInMonth; day++) {
                                const currentDate = new Date(datePickerState.currentYear, datePickerState.currentMonth, day);
                                const isSelected = datePickerState.tempStartDate && currentDate.getTime() === datePickerState.tempStartDate.getTime();
                                const isInRange = datePickerState.tempStartDate && datePickerState.tempEndDate && 
                                  currentDate > datePickerState.tempStartDate && currentDate < datePickerState.tempEndDate;
                                const isEndSelected = datePickerState.tempEndDate && currentDate.getTime() === datePickerState.tempEndDate.getTime();
                                
                                days.push(
                                  <div 
                                    key={day} 
                                    className={`calendar-day ${isSelected ? 'selected' : ''} ${isInRange ? 'in-range' : ''} ${isEndSelected ? 'selected' : ''}`}
                                    onClick={() => handleDateSelect(day, datePickerState.currentMonth, datePickerState.currentYear)}
                                  >
                                    {day}
                                  </div>
                                );
                              }
                              
                              return days;
                            })()}
                              </div>
                          <div className="calendar-footer">
                            <button 
                              type="button" 
                              className="apply-button"
                              onClick={() => handleApplyDate('hotelDate')}
                            >
                              Uygula
                            </button>
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
                        <span className="guest-count">{getGuestDisplayText('hotel')}</span>
                      </div>
                    </div>
                    {dropdowns.hotelGuest && (
                      <div 
                        ref={el => dropdownRefs.current.hotelGuest = el}
                        className={`guest-picker-dropdown ${isMobile ? 'mobile-dropdown' : ''}`}
                      >
                          <div className="guest-container">
                        <div className="guest-row">
                          <span>Yetişkin</span>
                          <div className="counter">
                            <button 
                              type="button" 
                                  onClick={() => handleGuestChange('tempGuests', Math.max(1, hotelGuestPickerState.tempGuests - 1), 'hotel')}
                            >
                              -
                            </button>
                                <span>{hotelGuestPickerState.tempGuests}</span>
                            <button 
                              type="button" 
                                  onClick={() => handleGuestChange('tempGuests', hotelGuestPickerState.tempGuests + 1, 'hotel')}
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
                                  onClick={() => handleGuestChange('tempChildren', Math.max(0, hotelGuestPickerState.tempChildren - 1), 'hotel')}
                            >
                              -
                            </button>
                                <span>{hotelGuestPickerState.tempChildren}</span>
                            <button 
                              type="button" 
                                  onClick={() => handleGuestChange('tempChildren', hotelGuestPickerState.tempChildren + 1, 'hotel')}
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
                                  onClick={() => handleGuestChange('tempRooms', Math.max(1, hotelGuestPickerState.tempRooms - 1), 'hotel')}
                            >
                              -
                            </button>
                                <span>{hotelGuestPickerState.tempRooms}</span>
                            <button 
                              type="button" 
                                  onClick={() => handleGuestChange('tempRooms', hotelGuestPickerState.tempRooms + 1, 'hotel')}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <div className="guest-footer">
                              <button 
                                type="button" 
                                className="apply-button"
                                onClick={() => handleApplyGuest('hotelGuest', 'hotel')}
                              >
                                Uygula
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
                      <span>{formatDateRange(datePickerState.selectedStartDate, datePickerState.selectedEndDate)}</span>
                    </div>
                    {dropdowns.tourDate && (
                      <div 
                        ref={el => dropdownRefs.current.tourDate = el}
                        className={`date-picker-dropdown ${isMobile ? 'mobile-dropdown' : ''}`}
                      >
                        <div className="calendar-container">
                          <div className="calendar-header">
                            <button type="button" onClick={() => navigateYear(-1)}>‹‹</button>
                            <button type="button" onClick={() => navigateMonth(-1)}>‹</button>
                            <div className="month-year-display">
                              <span>{new Date(datePickerState.currentYear, datePickerState.currentMonth).toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}</span>
                            </div>
                            <button type="button" onClick={() => navigateMonth(1)}>›</button>
                            <button type="button" onClick={() => navigateYear(1)}>››</button>
                          </div>
                          <div className="calendar-days">
                            <div className="day-header">Pt</div>
                            <div className="day-header">Sa</div>
                            <div className="day-header">Ça</div>
                            <div className="day-header">Pe</div>
                            <div className="day-header">Cu</div>
                            <div className="day-header">Ct</div>
                            <div className="day-header">Pa</div>
                            
                            {(() => {
                              const daysInMonth = getDaysInMonth(datePickerState.currentMonth, datePickerState.currentYear);
                              const firstDay = getFirstDayOfMonth(datePickerState.currentMonth, datePickerState.currentYear);
                              const days = [];
                              
                              // Add empty cells for days before the first day of the month
                              for (let i = 0; i < firstDay; i++) {
                                days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
                              }
                              
                              // Add days of the month
                              for (let day = 1; day <= daysInMonth; day++) {
                                const currentDate = new Date(datePickerState.currentYear, datePickerState.currentMonth, day);
                                const isSelected = datePickerState.tempStartDate && currentDate.getTime() === datePickerState.tempStartDate.getTime();
                                const isInRange = datePickerState.tempStartDate && datePickerState.tempEndDate && 
                                  currentDate > datePickerState.tempStartDate && currentDate < datePickerState.tempEndDate;
                                const isEndSelected = datePickerState.tempEndDate && currentDate.getTime() === datePickerState.tempEndDate.getTime();
                                
                                days.push(
                                  <div 
                                    key={day} 
                                    className={`calendar-day ${isSelected ? 'selected' : ''} ${isInRange ? 'in-range' : ''} ${isEndSelected ? 'selected' : ''}`}
                                    onClick={() => handleDateSelect(day, datePickerState.currentMonth, datePickerState.currentYear)}
                                  >
                                    {day}
                                  </div>
                                );
                              }
                              
                              return days;
                            })()}
                              </div>
                          <div className="calendar-footer">
                            <button 
                              type="button" 
                              className="apply-button"
                              onClick={() => handleApplyDate('tourDate')}
                            >
                              Uygula
                            </button>
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
                        <span className="guest-count">{getGuestDisplayText('tour')}</span>
                      </div>
                    </div>
                    {dropdowns.tourGuest && (
                      <div 
                        ref={el => dropdownRefs.current.tourGuest = el}
                        className={`guest-picker-dropdown ${isMobile ? 'mobile-dropdown' : ''}`}
                      >
                        <div className="guest-container">
                        <div className="guest-row">
                          <span>Yetişkin</span>
                          <div className="counter">
                            <button 
                              type="button" 
                                onClick={() => handleGuestChange('tempGuests', Math.max(1, tourGuestPickerState.tempGuests - 1), 'tour')}
                            >
                              -
                            </button>
                              <span>{tourGuestPickerState.tempGuests}</span>
                            <button 
                              type="button" 
                                onClick={() => handleGuestChange('tempGuests', tourGuestPickerState.tempGuests + 1, 'tour')}
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
                                onClick={() => handleGuestChange('tempChildren', Math.max(0, tourGuestPickerState.tempChildren - 1), 'tour')}
                            >
                              -
                            </button>
                              <span>{tourGuestPickerState.tempChildren}</span>
                              <button 
                                type="button" 
                                onClick={() => handleGuestChange('tempChildren', tourGuestPickerState.tempChildren + 1, 'tour')}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="guest-footer">
                            <button 
                              type="button" 
                              className="apply-button"
                              onClick={() => handleApplyGuest('tourGuest', 'tour')}
                            >
                              Uygula
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
                  {/* First Row - Trip Type Selection */}
                  <div className="flight-row flight-row-1">
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
                  </div>

                  {/* Second Row - Search Fields */}
                  <div className="flight-row flight-row-2 flight-search-fields">
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
                        <span>{formatDateRange(datePickerState.selectedStartDate, datePickerState.selectedEndDate)}</span>
                      </div>
                      {dropdowns.flightDate && (
                        <div 
                          ref={el => dropdownRefs.current.flightDate = el}
                          className={`date-picker-dropdown ${isMobile ? 'mobile-dropdown' : ''}`}
                        >
                          <div className="calendar-container">
                            <div className="calendar-header">
                              <button type="button" onClick={() => navigateYear(-1)}>‹‹</button>
                              <button type="button" onClick={() => navigateMonth(-1)}>‹</button>
                              <div className="month-year-display">
                                <span>{new Date(datePickerState.currentYear, datePickerState.currentMonth).toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}</span>
                              </div>
                              <button type="button" onClick={() => navigateMonth(1)}>›</button>
                              <button type="button" onClick={() => navigateYear(1)}>››</button>
                            </div>
                            <div className="calendar-days">
                              <div className="day-header">Pt</div>
                              <div className="day-header">Sa</div>
                              <div className="day-header">Ça</div>
                              <div className="day-header">Pe</div>
                              <div className="day-header">Cu</div>
                              <div className="day-header">Ct</div>
                              <div className="day-header">Pa</div>
                              
                              {(() => {
                                const daysInMonth = getDaysInMonth(datePickerState.currentMonth, datePickerState.currentYear);
                                const firstDay = getFirstDayOfMonth(datePickerState.currentMonth, datePickerState.currentYear);
                                const days = [];
                                
                                // Add empty cells for days before the first day of the month
                                for (let i = 0; i < firstDay; i++) {
                                  days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
                                }
                                
                                // Add days of the month
                                for (let day = 1; day <= daysInMonth; day++) {
                                  const currentDate = new Date(datePickerState.currentYear, datePickerState.currentMonth, day);
                                  const isSelected = datePickerState.tempStartDate && currentDate.getTime() === datePickerState.tempStartDate.getTime();
                                  const isInRange = datePickerState.tempStartDate && datePickerState.tempEndDate && 
                                    currentDate > datePickerState.tempStartDate && currentDate < datePickerState.tempEndDate;
                                  const isEndSelected = datePickerState.tempEndDate && currentDate.getTime() === datePickerState.tempEndDate.getTime();
                                  
                                  days.push(
                                    <div 
                                      key={day} 
                                      className={`calendar-day ${isSelected ? 'selected' : ''} ${isInRange ? 'in-range' : ''} ${isEndSelected ? 'selected' : ''}`}
                                      onClick={() => handleDateSelect(day, datePickerState.currentMonth, datePickerState.currentYear)}
                                    >
                                      {day}
                                    </div>
                                  );
                                }
                                
                                return days;
                              })()}
                                </div>
                            <div className="calendar-footer">
                              <button 
                                type="button" 
                                className="apply-button"
                                onClick={() => handleApplyDate('flightDate')}
                              >
                                Uygula
                              </button>
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
                        <span>{getGuestDisplayText('flight')}</span>
                      </div>
                      {dropdowns.flightPassenger && (
                        <div 
                          ref={el => dropdownRefs.current.flightPassenger = el}
                          className={`passenger-picker-dropdown ${isMobile ? 'mobile-dropdown' : ''}`}
                        >
                          <div className="guest-container">
                          <div className="guest-row">
                            <span>Yetişkin</span>
                            <div className="counter">
                              <button 
                                type="button" 
                                  onClick={() => handleGuestChange('tempPassengers', Math.max(1, flightGuestPickerState.tempPassengers - 1), 'flight')}
                                >
                                  -
                                </button>
                                <span>{flightGuestPickerState.tempPassengers}</span>
                                <button 
                                  type="button" 
                                  onClick={() => handleGuestChange('tempPassengers', flightGuestPickerState.tempPassengers + 1, 'flight')}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <div className="guest-row">
                              <span>Bebek</span>
                              <div className="counter">
                                <button 
                                  type="button" 
                                  onClick={() => handleGuestChange('tempInfants', Math.max(0, flightGuestPickerState.tempInfants - 1), 'flight')}
                              >
                                -
                              </button>
                                <span>{flightGuestPickerState.tempInfants}</span>
                                <button 
                                  type="button" 
                                  onClick={() => handleGuestChange('tempInfants', flightGuestPickerState.tempInfants + 1, 'flight')}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <div className="guest-footer">
                              <button 
                                type="button" 
                                className="apply-button"
                                onClick={() => handleApplyGuest('flightPassenger', 'flight')}
                              >
                                Uygula
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
                        <div 
                          ref={el => dropdownRefs.current.flightClass = el}
                          className={`class-picker-dropdown ${isMobile ? 'mobile-dropdown' : ''}`}
                        >
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