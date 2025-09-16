import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Star, MapPin, Wifi, Car, Coffee, Utensils, Waves, Users, SlidersHorizontal, Loader2 } from 'lucide-react';
import './HotelsPage.css';

const HotelsPage = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    priceRange: [0, 5000],
    starRating: [],
    amenities: [],
    sortBy: 'popularity'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  const [cityFilter, setCityFilter] = useState('');
  const [pageTitle, setPageTitle] = useState('Tüm Oteller');

  // API base URL
  const API_BASE_URL = 'http://localhost:3002/api';

  // URL parametrelerini kontrol et ve şehir filtresini ayarla
  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    const searchQuery = searchParams.get('search');

    // URL'den şehir bilgisini al (/hotels/antalya gibi)
    if (pathSegments.length > 2 && pathSegments[2]) {
      const city = pathSegments[2];
      const cityNames = {
        'antalya': 'Antalya',
        'istanbul': 'İstanbul',
        'bodrum': 'Bodrum',
        'marmaris': 'Marmaris',
        'alanya': 'Alanya',
        'kusadasi': 'Kuşadası',
        'fethiye': 'Fethiye',
        'kas': 'Kaş',
        'kemer': 'Kemer',
        'belek': 'Belek',
        'side': 'Side'
      };

      const cityName = cityNames[city.toLowerCase()] || city;
      setCityFilter(cityName);
      setPageTitle(`${cityName} Otelleri`);
    }
    // Search parametresinden şehir bilgisini al (?search=antalya gibi)
    else if (searchQuery) {
      setCityFilter(searchQuery);
      setPageTitle(`${searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1)} Otelleri`);
    } else {
      setCityFilter('');
      setPageTitle('Tüm Oteller');
    }
  }, [location.pathname, searchParams]);

  // Fetch hotels from API
  const fetchHotels = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams({
        page: pagination.page,
        limit: pagination.limit,
        sortBy: filters.sortBy,
        ...params
      });

      // Add filters to query params
      if (filters.priceRange[0] > 0) queryParams.append('minPrice', filters.priceRange[0]);
      if (filters.priceRange[1] < 5000) queryParams.append('maxPrice', filters.priceRange[1]);
      if (filters.starRating.length > 0) queryParams.append('stars', filters.starRating.join(','));
      if (filters.amenities.length > 0) queryParams.append('amenities', filters.amenities.join(','));

      // Şehir filtresini ekle
      if (cityFilter) {
        queryParams.append('query', cityFilter);
      }

      const response = await fetch(`${API_BASE_URL}/hotels/search?${queryParams}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setHotels(data.data || []);
        setPagination({
          page: data.page || 1,
          limit: data.limit || 10,
          total: data.count || 0,
          totalPages: Math.ceil((data.count || 0) / (data.limit || 10))
        });
      } else {
        throw new Error(data.error || 'API error');
      }
      
    } catch (err) {
      console.error('Error fetching hotels:', err);
      setError('Otel verileri yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.');
      // Fallback to sample data if API fails
      setHotels(getSampleHotels());
    } finally {
      setLoading(false);
    }
  };

  // Antalya otelleri için özel veri
  const getAntalyaHotels = () => [
    {
      id: 1,
      name: "Rixos Premium Belek",
      location: "Antalya, Belek",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
      rating: 4.8,
      reviewCount: 2547,
      price: 1250,
      oldPrice: 1500,
      stars: 5,
      amenities: ["wifi", "parking", "pool", "restaurant", "spa"],
      description: "Akdeniz'in muhteşem manzarasında ultra lüks tatil deneyimi",
      features: ["Her Şey Dahil", "Özel Plaj", "Spa", "Aquapark"],
      link: "https://booking.com/hotel1",
      source: "booking.com",
      destination: "Antalya",
      checkin: "2025-10-01",
      checkout: "2025-10-03",
      scrapedAt: "2025-09-15T21:05:04.402Z"
    },
    {
      id: 2,
      name: "Maxx Royal Kemer Resort",
      location: "Antalya, Kemer",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
      rating: 4.9,
      reviewCount: 1834,
      price: 2100,
      oldPrice: 2400,
      stars: 5,
      amenities: ["wifi", "parking", "pool", "restaurant", "spa"],
      description: "Kemer'in en prestijli resort oteli",
      features: ["Ultra Her Şey Dahil", "Golf", "Spa", "Kids Club"],
      link: "https://booking.com/hotel2",
      source: "booking.com",
      destination: "Antalya",
      checkin: "2025-10-01",
      checkout: "2025-10-03",
      scrapedAt: "2025-09-15T21:05:04.403Z"
    },
    {
      id: 8,
      name: "Marmara Antalya",
      location: "Antalya, Kaleiçi",
      image: "https://images.unsplash.com/photo-1549294413-26f195200c16?w=400&h=300&fit=crop",
      rating: 4.2,
      reviewCount: 987,
      price: 980,
      oldPrice: 1200,
      stars: 4,
      amenities: ["wifi", "restaurant"],
      description: "Kaleiçi'nde butik otel deneyimi",
      features: ["Historical District", "Rooftop Terrace", "WiFi"],
      link: "https://booking.com/hotel8",
      source: "booking.com",
      destination: "Antalya",
      checkin: "2025-10-01",
      checkout: "2025-10-03",
      scrapedAt: "2025-09-15T21:05:04.403Z"
    },
    {
      id: 17,
      name: "Kaya Palazzo Golf Resort",
      location: "Antalya, Belek",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
      rating: 4.5,
      reviewCount: 1234,
      price: 2150,
      oldPrice: 2500,
      stars: 5,
      amenities: ["wifi", "parking", "pool", "restaurant", "spa"],
      description: "Golf ve plaj aynı anda",
      features: ["Golf Course", "Beach Access", "Kids Club", "Spa"],
      link: "https://booking.com/hotel17",
      source: "booking.com",
      destination: "Antalya",
      checkin: "2025-10-01",
      checkout: "2025-10-03",
      scrapedAt: "2025-09-15T21:05:04.403Z"
    }
  ];

  // Sample data fallback
  const getSampleHotels = () => [
    {
      id: 1,
      name: "Rixos Premium Belek",
      location: "Antalya, Belek",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
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
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
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
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      rating: 4.7,
      reviewCount: 1923,
      price: 1800,
      oldPrice: 2200,
      stars: 5,
      amenities: ["wifi", "parking", "pool", "restaurant"],
      description: "Belek'te aile dostu lüks tatil",
      features: ["Her Şey Dahil", "Kids Club", "Aquapark", "Spa"]
    }
  ];

  // Load hotels on component mount
  useEffect(() => {
    fetchHotels();
  }, []);

  // Refetch when filters or city filter changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchHotels();
    }, 300); // Debounce filter changes

    return () => clearTimeout(timeoutId);
  }, [filters, pagination.page, cityFilter]);

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
          <h1>{pageTitle}</h1>
          <p>{loading ? 'Yükleniyor...' : `${pagination.total} otel bulundu`}</p>
          {cityFilter && (
            <div className="filter-info">
              <span className="filter-tag">📍 {cityFilter}</span>
            </div>
          )}
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={() => fetchHotels()} className="btn btn-secondary">
              Tekrar Dene
            </button>
          </div>
        )}

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
              {loading ? (
                <div className="loading-container">
                  <Loader2 className="loading-spinner" size={48} />
                  <p>Oteller yükleniyor...</p>
                </div>
              ) : hotels.length === 0 ? (
                <div className="no-hotels">
                  <p>Aradığınız kriterlere uygun otel bulunamadı.</p>
                  <button onClick={() => setFilters({priceRange: [0, 5000], starRating: [], amenities: [], sortBy: 'popularity'})} className="btn btn-primary">
                    Filtreleri Temizle
                  </button>
                </div>
              ) : (
                hotels.map((hotel) => (
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
                            {hotel.stars && Array.from({length: hotel.stars}, (_, i) => (
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
                        {hotel.features && hotel.features.map((feature, index) => (
                          <span key={index} className="feature-tag">{feature}</span>
                        ))}
                      </div>

                      <div className="hotel-amenities">
                        {hotel.amenities && hotel.amenities.slice(0, 4).map((amenity) => (
                          <div key={amenity} className="amenity" title={amenityNames[amenity]}>
                            {amenityIcons[amenity]}
                          </div>
                        ))}
                        {hotel.amenities && hotel.amenities.length > 4 && (
                          <span className="more-amenities">+{hotel.amenities.length - 4} daha</span>
                        )}
                      </div>
                    </div>

                    <div className="hotel-pricing">
                      <div className="price-info">
                        {hotel.oldPrice && <span className="old-price">{hotel.oldPrice} TL</span>}
                        <span className="current-price">{hotel.price} TL</span>
                        <span className="per-night">/ gece</span>
                      </div>
                      <button className="btn btn-primary">
                        Detayları Gör
                      </button>
                    </div>
                  </div>
                </div>
                ))
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default HotelsPage;