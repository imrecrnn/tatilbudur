import React, { useState } from 'react';
import { Plane, Calendar, Users, ArrowRight, Clock, Star, Luggage, Wifi, Coffee } from 'lucide-react';
import './FlightsPage.css';

const FlightsPage = () => {
  const [tripType, setTripType] = useState('roundtrip');
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
    passengers: 1,
    class: 'economy'
  });

  const flights = [
    {
      id: 1,
      airline: "Turkish Airlines",
      logo: "🇹🇷",
      route: "İstanbul → Antalya",
      departure: "08:30",
      arrival: "10:15",
      duration: "1s 45dk",
      price: 450,
      oldPrice: 580,
      aircraft: "Boeing 737",
      amenities: ["wifi", "meal", "entertainment"],
      stops: "Direkt",
      baggage: "20 kg dahil"
    },
    {
      id: 2,
      airline: "Pegasus Airlines",
      logo: "🐎",
      route: "İstanbul → Antalya",
      departure: "14:20",
      arrival: "16:10",
      duration: "1s 50dk",
      price: 320,
      oldPrice: 420,
      aircraft: "Airbus A320",
      amenities: ["wifi"],
      stops: "Direkt",
      baggage: "15 kg dahil"
    },
    {
      id: 3,
      airline: "SunExpress",
      logo: "☀️",
      route: "İstanbul → Antalya",
      departure: "19:45",
      arrival: "21:35",
      duration: "1s 50dk",
      price: 380,
      oldPrice: 480,
      aircraft: "Boeing 737",
      amenities: ["wifi", "meal"],
      stops: "Direkt",
      baggage: "20 kg dahil"
    },
    {
      id: 4,
      airline: "Turkish Airlines",
      logo: "🇹🇷",
      route: "İstanbul → Paris",
      departure: "23:35",
      arrival: "05:20+1",
      duration: "3s 45dk",
      price: 1250,
      oldPrice: 1450,
      aircraft: "Airbus A330",
      amenities: ["wifi", "meal", "entertainment", "power"],
      stops: "Direkt",
      baggage: "30 kg dahil"
    },
    {
      id: 5,
      airline: "Pegasus Airlines",
      logo: "🐎",
      route: "İstanbul → London",
      departure: "12:15",
      arrival: "15:30",
      duration: "4s 15dk",
      price: 890,
      oldPrice: 1150,
      aircraft: "Airbus A320",
      amenities: ["wifi", "meal"],
      stops: "Direkt",
      baggage: "20 kg dahil"
    },
    {
      id: 6,
      airline: "Turkish Airlines",
      logo: "🇹🇷",
      route: "İstanbul → Dubai",
      departure: "02:15",
      arrival: "07:45",
      duration: "4s 30dk",
      price: 1580,
      oldPrice: 1880,
      aircraft: "Boeing 777",
      amenities: ["wifi", "meal", "entertainment", "power"],
      stops: "Direkt",
      baggage: "30 kg dahil"
    }
  ];

  const amenityIcons = {
    wifi: <Wifi size={14} />,
    meal: <Coffee size={14} />,
    entertainment: <span>📺</span>,
    power: <span>🔌</span>
  };

  const amenityNames = {
    wifi: "WiFi",
    meal: "Yemek",
    entertainment: "Eğlence",
    power: "Şarj"
  };

  const popularRoutes = [
    { from: "İstanbul", to: "Antalya", price: "320 TL'den", flights: "Günde 15 sefer" },
    { from: "İstanbul", to: "İzmir", price: "280 TL'den", flights: "Günde 12 sefer" },
    { from: "İstanbul", to: "Ankara", price: "350 TL'den", flights: "Günde 18 sefer" },
    { from: "İstanbul", to: "Bodrum", price: "420 TL'den", flights: "Günde 8 sefer" },
    { from: "İstanbul", to: "Trabzon", price: "390 TL'den", flights: "Günde 6 sefer" },
    { from: "İstanbul", to: "Gaziantep", price: "340 TL'den", flights: "Günde 4 sefer" }
  ];

  return (
    <div className="flights-page">
      <div className="container">
        <div className="page-header">
          <h1>Uçak Bileti</h1>
          <p>En uygun fiyatlarla uçak bileti arayın ve rezervasyon yapın</p>
        </div>

        {/* Flight Search */}
        <div className="flight-search">
          <div className="flight-search-header">
            <div className="trip-type-selector">
              <label className="trip-option">
                <input
                  type="radio"
                  value="roundtrip"
                  checked={tripType === 'roundtrip'}
                  onChange={(e) => setTripType(e.target.value)}
                />
                <span>Gidiş-Dönüş</span>
              </label>
              <label className="trip-option">
                <input
                  type="radio"
                  value="oneway"
                  checked={tripType === 'oneway'}
                  onChange={(e) => setTripType(e.target.value)}
                />
                <span>Tek Yön</span>
              </label>
            </div>
          </div>

          <form className="flight-search-form">
            <div className="search-inputs-row">
              {/* Route Row */}
              <div className="route-row">
                <div className="input-group-with-icon">
                  <div className="input-with-icon">
                    <Plane size={14} className="input-icon" />
                    <input
                      type="text"
                      placeholder="Nereden?"
                      value={searchData.from}
                      onChange={(e) => setSearchData({...searchData, from: e.target.value})}
                    />
                  </div>
                </div>

                <button type="button" className="swap-button">
                  ⇄
                </button>

                <div className="input-group-with-icon">
                  <div className="input-with-icon">
                    <Plane size={14} className="input-icon" />
                    <input
                      type="text"
                      placeholder="Nereye?"
                      value={searchData.to}
                      onChange={(e) => setSearchData({...searchData, to: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* Date Row */}
              <div className="date-row">
                <div className="input-group-with-icon">
                  <div className="input-with-icon">
                    <Calendar size={14} className="input-icon" />
                    <input
                      type="date"
                      value={searchData.departDate}
                      onChange={(e) => setSearchData({...searchData, departDate: e.target.value})}
                    />
                  </div>
                </div>

                {tripType === 'roundtrip' && (
                  <div className="input-group-with-icon">
                    <div className="input-with-icon">
                      <Calendar size={14} className="input-icon" />
                      <input
                        type="date"
                        value={searchData.returnDate}
                        onChange={(e) => setSearchData({...searchData, returnDate: e.target.value})}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Passengers and Class Row */}
              <div className="passenger-class-row">
                <div className="input-group-with-icon">
                  <div className="input-with-icon">
                    <Users size={14} className="input-icon" />
                    <select
                      value={searchData.passengers}
                      onChange={(e) => setSearchData({...searchData, passengers: parseInt(e.target.value)})}
                    >
                      {[1,2,3,4,5,6,7,8,9].map(num => (
                        <option key={num} value={num}>{num} Yolcu</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="input-group-with-icon">
                  <div className="input-with-icon">
                    <span className="input-icon">✈</span>
                    <select
                      value={searchData.class}
                      onChange={(e) => setSearchData({...searchData, class: e.target.value})}
                    >
                      <option value="economy">Ekonomi</option>
                      <option value="business">Business</option>
                      <option value="first">First Class</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Search Button Row */}
              <div className="search-button-row">
                <button type="submit" className="btn btn-primary search-flights-btn">
                  Uçuş Ara
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Flight Results */}
        <div className="flight-results">
          <div className="results-header">
            <h2>Uçuş Seçenekleri</h2>
            <div className="sort-options">
              <select>
                <option value="price">Fiyata Göre</option>
                <option value="duration">Süreye Göre</option>
                <option value="departure">Kalkış Saatine Göre</option>
                <option value="arrival">İniş Saatine Göre</option>
              </select>
            </div>
          </div>

          <div className="flights-list">
            {flights.map((flight) => (
              <div key={flight.id} className="flight-card">
                <div className="flight-info">
                  <div className="airline-info">
                    <div className="airline-logo">{flight.logo}</div>
                    <div className="airline-details">
                      <span className="airline-name">{flight.airline}</span>
                      <span className="aircraft">{flight.aircraft}</span>
                    </div>
                  </div>

                  <div className="flight-route">
                    <div className="departure">
                      <span className="time">{flight.departure}</span>
                      <span className="city">{flight.route.split(' → ')[0]}</span>
                    </div>
                    
                    <div className="flight-duration">
                      <div className="duration-line">
                        <div className="line"></div>
                        <Plane size={16} />
                      </div>
                      <span className="duration">{flight.duration}</span>
                      <span className="stops">{flight.stops}</span>
                    </div>

                    <div className="arrival">
                      <span className="time">{flight.arrival}</span>
                      <span className="city">{flight.route.split(' → ')[1]}</span>
                    </div>
                  </div>

                  <div className="flight-details">
                    <div className="baggage">
                      <Luggage size={14} />
                      <span>{flight.baggage}</span>
                    </div>
                    <div className="amenities">
                      {flight.amenities.map((amenity) => (
                        <div key={amenity} className="amenity" title={amenityNames[amenity]}>
                          {amenityIcons[amenity]}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flight-pricing">
                  <div className="price-info">
                    {flight.oldPrice && (
                      <span className="old-price">{flight.oldPrice} TL</span>
                    )}
                    <span className="current-price">{flight.price} TL</span>
                    <span className="per-person">/ kişi</span>
                  </div>
                  <button className="btn btn-secondary">
                    Seç
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Routes */}
        <div className="popular-routes">
          <h2>Popüler Rotalar</h2>
          <div className="routes-grid">
            {popularRoutes.map((route, index) => (
              <div key={index} className="route-card">
                <div className="route-info">
                  <div className="route-cities">
                    <span>{route.from}</span>
                    <ArrowRight size={16} />
                    <span>{route.to}</span>
                  </div>
                  <div className="route-price">{route.price}</div>
                  <div className="route-frequency">{route.flights}</div>
                </div>
                <button className="btn btn-outline">
                  Ara
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightsPage;