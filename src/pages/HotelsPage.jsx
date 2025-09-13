import React, { useState } from 'react';
import { Star, MapPin, Wifi, Car, Coffee, Utensils, Waves, Users, SlidersHorizontal } from 'lucide-react';
import './HotelsPage.css';

const HotelsPage = () => {
  const [filters, setFilters] = useState({
    priceRange: [0, 5000],
    starRating: [],
    amenities: [],
    sortBy: 'popularity'
  });
  const [showFilters, setShowFilters] = useState(false);

  const hotels = [
    {
      id: 1,
      name: "Rixos Premium Belek",
      location: "Antalya, Belek",
      image: "/api/placeholder/300/200",
      rating: 4.8,
      reviewCount: 2547,
      price: 1250,
      oldPrice: 1500,
      stars: 5,
      amenities: ["wifi", "parking", "pool", "restaurant", "spa"],
      description: "Akdeniz'in muhteşem manzarasında ultra lüks tatil deneyimi",
      features: ["Her Şey Dahil", "Özel Plaj", "Spa", "Aquapark"]
    },
    {
      id: 2,
      name: "Maxx Royal Kemer Resort",
      location: "Antalya, Kemer",
      image: "/api/placeholder/300/200",
      rating: 4.9,
      reviewCount: 1834,
      price: 2100,
      oldPrice: 2400,
      stars: 5,
      amenities: ["wifi", "parking", "pool", "restaurant", "spa"],
      description: "Kemer'in en prestijli resort oteli",
      features: ["Ultra Her Şey Dahil", "Golf", "Spa", "Kids Club"]
    },
    {
      id: 3,
      name: "Calista Luxury Resort",
      location: "Antalya, Belek",
      image: "/api/placeholder/300/200",
      rating: 4.7,
      reviewCount: 1923,
      price: 1800,
      oldPrice: 2200,
      stars: 5,
      amenities: ["wifi", "parking", "pool", "restaurant"],
      description: "Belek'te aile dostu lüks tatil",
      features: ["Her Şey Dahil", "Kids Club", "Aquapark", "Spa"]
    },
    {
      id: 4,
      name: "Club Hotel Sera",
      location: "Antalya, Side",
      image: "/api/placeholder/300/200",
      rating: 4.5,
      reviewCount: 987,
      price: 850,
      oldPrice: 1200,
      stars: 4,
      amenities: ["wifi", "pool", "restaurant"],
      description: "Side'de ekonomik tatil seçeneği",
      features: ["Her Şey Dahil", "Plaj", "Animasyon"]
    },
    {
      id: 5,
      name: "Swandor Hotels Topkapi Palace",
      location: "Antalya, Kundu",
      image: "/api/placeholder/300/200",
      rating: 4.6,
      reviewCount: 1456,
      price: 1100,
      oldPrice: 1400,
      stars: 4,
      amenities: ["wifi", "parking", "pool", "restaurant"],
      description: "Kundu'da tarihi atmosferde konaklama",
      features: ["Her Şey Dahil", "Tema Parkı", "Spa", "Aquapark"]
    },
    {
      id: 6,
      name: "Crystal Sunrise Queen Luxury Resort",
      location: "Antalya, Side",
      image: "/api/placeholder/300/200",
      rating: 4.4,
      reviewCount: 743,
      price: 950,
      oldPrice: 1300,
      stars: 4,
      amenities: ["wifi", "pool", "restaurant"],
      description: "Side'de aile dostu konaklama",
      features: ["Her Şey Dahil", "Aquapark", "Kids Club"]
    }
  ];

  const amenityIcons = {
    wifi: <Wifi size={16} />,
    parking: <Car size={16} />,
    pool: <Waves size={16} />,
    restaurant: <Utensils size={16} />,
    spa: <Coffee size={16} />
  };

  const amenityNames = {
    wifi: "WiFi",
    parking: "Otopark",
    pool: "Havuz",
    restaurant: "Restoran",
    spa: "Spa"
  };

  return (
    <div className="hotels-page">
      <div className="container">
        <div className="page-header">
          <h1>Oteller</h1>
          <p>{hotels.length} otel bulundu</p>
        </div>

        <div className="hotels-container">
          {/* Filters Sidebar */}
          <aside className={`filters-sidebar ${showFilters ? 'show-filters' : ''}`}>
            <div className="filters-header">
              <h3>Filtreler</h3>
              <button 
                className="close-filters"
                onClick={() => setShowFilters(false)}
              >
                ✕
              </button>
            </div>

            <div className="filter-group">
              <h4>Fiyat Aralığı</h4>
              <div className="price-range">
                <input type="range" min="0" max="5000" />
                <div className="price-labels">
                  <span>0 TL</span>
                  <span>5000 TL</span>
                </div>
              </div>
            </div>

            <div className="filter-group">
              <h4>Yıldız Sayısı</h4>
              <div className="star-filters">
                {[5, 4, 3, 2, 1].map(stars => (
                  <label key={stars} className="checkbox-label">
                    <input type="checkbox" />
                    <div className="stars">
                      {Array.from({length: stars}, (_, i) => (
                        <Star key={i} size={12} fill="currentColor" />
                      ))}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h4>Olanaklar</h4>
              <div className="amenity-filters">
                {Object.entries(amenityNames).map(([key, name]) => (
                  <label key={key} className="checkbox-label">
                    <input type="checkbox" />
                    <div className="amenity-item">
                      {amenityIcons[key]}
                      <span>{name}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Hotels List */}
          <main className="hotels-main">
            <div className="hotels-header">
              <button 
                className="filters-toggle"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal size={20} />
                Filtreler
              </button>
              
              <div className="sort-options">
                <select value={filters.sortBy} onChange={(e) => setFilters({...filters, sortBy: e.target.value})}>
                  <option value="popularity">Popülerlik</option>
                  <option value="price-low">Fiyat (Düşükten Yükseğe)</option>
                  <option value="price-high">Fiyat (Yüksekten Düşüğe)</option>
                  <option value="rating">Değerlendirme</option>
                  <option value="stars">Yıldız Sayısı</option>
                </select>
              </div>
            </div>

            <div className="hotels-grid">
              {hotels.map((hotel) => (
                <div key={hotel.id} className="hotel-card-detailed">
                  <div className="hotel-image">
                    <img src={hotel.image} alt={hotel.name} />
                    <div className="discount-badge">
                      %{Math.round(((hotel.oldPrice - hotel.price) / hotel.oldPrice) * 100)} İNDİRİM
                    </div>
                  </div>

                  <div className="hotel-content">
                    <div className="hotel-main-info">
                      <div className="hotel-header">
                        <div>
                          <h3>{hotel.name}</h3>
                          <div className="hotel-stars">
                            {Array.from({length: hotel.stars}, (_, i) => (
                              <Star key={i} size={14} fill="currentColor" />
                            ))}
                          </div>
                        </div>
                        <div className="hotel-rating">
                          <div className="rating-score">{hotel.rating}</div>
                          <div className="rating-text">
                            <span>Mükemmel</span>
                            <small>{hotel.reviewCount} değerlendirme</small>
                          </div>
                        </div>
                      </div>

                      <div className="hotel-location">
                        <MapPin size={14} />
                        <span>{hotel.location}</span>
                      </div>

                      <p className="hotel-description">{hotel.description}</p>

                      <div className="hotel-features">
                        {hotel.features.map((feature, index) => (
                          <span key={index} className="feature-tag">{feature}</span>
                        ))}
                      </div>

                      <div className="hotel-amenities">
                        {hotel.amenities.slice(0, 4).map((amenity) => (
                          <div key={amenity} className="amenity" title={amenityNames[amenity]}>
                            {amenityIcons[amenity]}
                          </div>
                        ))}
                        {hotel.amenities.length > 4 && (
                          <span className="more-amenities">+{hotel.amenities.length - 4} daha</span>
                        )}
                      </div>
                    </div>

                    <div className="hotel-pricing">
                      <div className="price-info">
                        <span className="old-price">{hotel.oldPrice} TL</span>
                        <span className="current-price">{hotel.price} TL</span>
                        <span className="per-night">/ gece</span>
                      </div>
                      <button className="btn btn-primary">
                        Detayları Gör
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default HotelsPage;