import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Calendar, MapPin, Users, Clock, Star, Camera, Bus, Utensils, Loader2, SlidersHorizontal } from 'lucide-react';
import './ToursPage.css';

const ToursPage = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('domestic');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  // API state
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [destinationFilter, setDestinationFilter] = useState('');
  const [pageTitle, setPageTitle] = useState('Tüm Turlar');
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 3000],
    sortBy: 'popularity'
  });

  const months = [
    { value: '01', label: 'Ocak' },
    { value: '02', label: 'Şubat' },
    { value: '03', label: 'Mart' },
    { value: '04', label: 'Nisan' },
    { value: '05', label: 'Mayıs' },
    { value: '06', label: 'Haziran' },
    { value: '07', label: 'Temmuz' },
    { value: '08', label: 'Ağustos' },
    { value: '09', label: 'Eylül' },
    { value: '10', label: 'Ekim' },
    { value: '11', label: 'Kasım' },
    { value: '12', label: 'Aralık' }
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 3 }, (_, i) => currentYear + i);

  // API base URL
  const API_BASE_URL = 'http://localhost:3002/api';

  // URL parametrelerini kontrol et ve destinasyon filtresini ayarla
  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    const searchQuery = searchParams.get('search');

    // URL'den destinasyon bilgisini al (/tours/cappadocia gibi)
    if (pathSegments.length > 2 && pathSegments[2]) {
      const destination = pathSegments[2];
      const destinationNames = {
        'cappadocia': 'Kapadokya',
        'istanbul': 'İstanbul',
        'pamukkale': 'Pamukkale',
        'ephesus': 'Efes',
        'antalya': 'Antalya',
        'trabzon': 'Trabzon',
        'bursa': 'Bursa',
        'konya': 'Konya'
      };

      const destinationName = destinationNames[destination.toLowerCase()] || destination;
      setDestinationFilter(destinationName);
      setPageTitle(`${destinationName} Turları`);
    }
    // Search parametresinden destinasyon bilgisini al (?search=kapadokya gibi)
    else if (searchQuery) {
      setDestinationFilter(searchQuery);
      setPageTitle(`${searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1)} Turları`);
    } else {
      setDestinationFilter('');
      setPageTitle('Tüm Turlar');
    }
  }, [location.pathname, searchParams]);

  // Fetch tours from API
  const fetchTours = async () => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams();

      // Add filters to query params
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.priceRange[0] > 0) queryParams.append('minPrice', filters.priceRange[0]);
      if (filters.priceRange[1] < 3000) queryParams.append('maxPrice', filters.priceRange[1]);

      // Destinasyon filtresini ekle
      if (destinationFilter) {
        queryParams.append('destination', destinationFilter);
      }

      const endpoint = queryParams.toString() ? `/tours/search?${queryParams}` : '/tours';
      const response = await fetch(`${API_BASE_URL}${endpoint}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setTours(data.data || []);
      } else {
        throw new Error(data.error || 'API error');
      }

    } catch (err) {
      console.error('Error fetching tours:', err);
      setError('Tur verileri yüklenirken bir hata oluştu.');
      // Fallback to existing sample data
      setTours([]);
    } finally {
      setLoading(false);
    }
  };

  // Load tours on component mount and when filters change
  useEffect(() => {
    fetchTours();
  }, [destinationFilter, filters]);

  const domesticTours = [
    {
      id: 1,
      name: "Kapadokya Balon Turu",
      destination: "Nevşehir, Kapadokya",
      image: "/api/placeholder/400/250",
      duration: "3 Gün 2 Gece",
      price: 1200,
      oldPrice: 1500,
      rating: 4.9,
      reviewCount: 1247,
      highlights: ["Balon Turu", "Yeraltı Şehri", "Göreme Açık Hava Müzesi"],
      includes: ["Ulaşım", "Konaklama", "Rehber", "Müze Girişleri"]
    },
    {
      id: 2,
      name: "Pamukkale & Hierapolis",
      destination: "Denizli, Pamukkale",
      image: "/api/placeholder/400/250",
      duration: "2 Gün 1 Gece",
      price: 850,
      oldPrice: 1100,
      rating: 4.7,
      reviewCount: 892,
      highlights: ["Pamukkale Travertenleri", "Hierapolis Antik Kenti", "Termal Havuzlar"],
      includes: ["Ulaşım", "Konaklama", "Rehber", "Girişler"]
    },
    {
      id: 3,
      name: "İstanbul Şehir Turu",
      destination: "İstanbul",
      image: "/api/placeholder/400/250",
      duration: "1 Gün",
      price: 350,
      oldPrice: 450,
      rating: 4.6,
      reviewCount: 2145,
      highlights: ["Ayasofya", "Sultanahmet", "Kapalıçarşı", "Boğaz Turu"],
      includes: ["Rehber", "Müze Girişleri", "Öğle Yemeği"]
    }
  ];

  const internationalTours = [
    {
      id: 4,
      name: "Yunanistan Adaları Turu",
      destination: "Atina - Mykonos - Santorini",
      image: "/api/placeholder/400/250",
      duration: "7 Gün 6 Gece",
      price: 4500,
      oldPrice: 5200,
      rating: 4.8,
      reviewCount: 567,
      highlights: ["3 Ada", "Akropolis", "Beyaz Evler", "Mavi Kubbeler"],
      includes: ["Uçak", "Konaklama", "Rehber", "Bazı Öğünler"]
    },
    {
      id: 5,
      name: "Dubai Şehir & Çöl Turu",
      destination: "Dubai, BAE",
      image: "/api/placeholder/400/250",
      duration: "5 Gün 4 Gece",
      price: 3200,
      oldPrice: 3800,
      rating: 4.7,
      reviewCount: 834,
      highlights: ["Burj Khalifa", "Çöl Safari", "Dubai Mall", "Marina"],
      includes: ["Uçak", "Konaklama", "Rehber", "Transferler"]
    },
    {
      id: 6,
      name: "Paris & Disneyland",
      destination: "Paris, Fransa",
      image: "/api/placeholder/400/250",
      duration: "4 Gün 3 Gece",
      price: 2800,
      oldPrice: 3400,
      rating: 4.9,
      reviewCount: 423,
      highlights: ["Eyfel Kulesi", "Disneyland Paris", "Seine Nehri", "Louvre"],
      includes: ["Uçak", "Konaklama", "Park Bileti", "Rehber"]
    }
  ];

  // API'den gelen turları kullan, yoksa fallback olarak sample data
  const currentTours = tours.length > 0 ? tours : (activeTab === 'domestic' ? domesticTours : internationalTours);

  return (
    <div className="tours-page">
      <div className="container">
        <div className="page-header">
          <h1>{pageTitle}</h1>
          <p>{loading ? 'Yükleniyor...' : `${tours.length} tur bulundu`}</p>
          {destinationFilter && (
            <div className="filter-info">
              <span className="filter-tag">📍 {destinationFilter}</span>
            </div>
          )}
          {error && (
            <div className="error-message" style={{color: 'red', marginTop: '10px'}}>
              {error}
            </div>
          )}
        </div>

        {/* Tour Search */}
        <div className="tour-search">
          <div className="search-form-tour">
            <div className="input-group-with-icon">
              <div className="input-with-icon">
                <MapPin size={14} className="input-icon" />
                <input
                  type="text"
                  placeholder="Tur adı veya bölge girin..."
                />
              </div>
            </div>
            <div className="date-selector-group">
              <div className="input-group-with-icon">
                <div className="input-with-icon">
                  <Calendar size={14} className="input-icon" />
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    <option value="">Ay Seçin</option>
                    {months.map((month) => (
                      <option key={month.value} value={month.value}>
                        {month.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="input-group-with-icon">
                <div className="input-with-icon">
                  <Calendar size={14} className="input-icon" />
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    <option value="">Yıl Seçin</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="input-group-with-icon">
              <div className="input-with-icon">
                <Users size={14} className="input-icon" />
                <select>
                  {[1,2,3,4,5,6,7,8].map(num => (
                    <option key={num} value={num}>{num} Kişi</option>
                  ))}
                </select>
              </div>
            </div>
            <button className="btn btn-primary">
              Tur Ara
            </button>
          </div>
        </div>

        {/* Tour Categories */}
        <div className="tour-tabs">
          <button 
            className={`tour-tab ${activeTab === 'domestic' ? 'active' : ''}`}
            onClick={() => setActiveTab('domestic')}
          >
            🇹🇷 Yurt İçi Turlar
          </button>
          <button 
            className={`tour-tab ${activeTab === 'international' ? 'active' : ''}`}
            onClick={() => setActiveTab('international')}
          >
            🌍 Yurt Dışı Turlar
          </button>
        </div>

        {/* Tours Grid */}
        <div className="tours-grid">
          {loading ? (
            <div className="loading-state" style={{gridColumn: '1 / -1', textAlign: 'center', padding: '50px'}}>
              <Loader2 className="spinner" size={32} style={{animation: 'spin 1s linear infinite'}} />
              <p>Turlar yükleniyor...</p>
            </div>
          ) : currentTours.length === 0 ? (
            <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '50px'}}>
              <p>Bu destinasyon için tur bulunamadı.</p>
            </div>
          ) : (
            currentTours.map((tour) => (
            <div key={tour.id} className="tour-card">
              <div className="tour-image">
                <img src={tour.image} alt={tour.name} />
                <div className="tour-duration">
                  <Clock size={14} />
                  {tour.duration}
                </div>
                <div className="discount-badge">
                  %{Math.round(((tour.oldPrice - tour.price) / tour.oldPrice) * 100)} İNDİRİM
                </div>
              </div>

              <div className="tour-content">
                <div className="tour-header">
                  <h3>{tour.name}</h3>
                  <div className="tour-rating">
                    <Star size={14} fill="currentColor" />
                    <span>{tour.rating}</span>
                    <small>({tour.reviewCount})</small>
                  </div>
                </div>

                <div className="tour-destination">
                  <MapPin size={14} />
                  <span>{tour.destination}</span>
                </div>

                <div className="tour-highlights">
                  <h4>Öne Çıkanlar:</h4>
                  <ul>
                    {tour.highlights.map((highlight, index) => (
                      <li key={index}>
                        <Camera size={12} />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="tour-includes">
                  <h4>Tur Dahil:</h4>
                  <div className="includes-list">
                    {tour.includes.map((include, index) => (
                      <span key={index} className="include-tag">
                        {include === 'Ulaşım' && <Bus size={12} />}
                        {include === 'Uçak' && <span>✈️</span>}
                        {include === 'Konaklama' && <span>🏨</span>}
                        {include === 'Rehber' && <span>👨‍🎓</span>}
                        {include === 'Öğle Yemeği' && <Utensils size={12} />}
                        {include === 'Bazı Öğünler' && <Utensils size={12} />}
                        {!['Ulaşım', 'Uçak', 'Konaklama', 'Rehber', 'Öğle Yemeği', 'Bazı Öğünler'].includes(include) && <span>✓</span>}
                        {include}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="tour-footer">
                  <div className="tour-pricing">
                    {tour.oldPrice && <span className="old-price">{tour.oldPrice}</span>}
                    <span className="current-price">{tour.price}</span>
                    <span className="per-person">/ kişi</span>
                  </div>
                  <button className="btn btn-secondary">
                    Detayları Gör
                  </button>
                </div>
              </div>
            </div>
          )))}
        </div>

        {/* Why Choose Our Tours */}
        <div className="why-choose-tours">
          <h2>Neden Turlarımızı Tercih Etmelisiniz?</h2>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">👨‍🎓</div>
              <h3>Uzman Rehberler</h3>
              <p>Deneyimli ve bilgili rehberlerimiz eşliğinde keşfetmenin tadını çıkarın</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🚐</div>
              <h3>Konforlu Ulaşım</h3>
              <p>Modern ve konforlu araçlarımızla güvenli yolculuk deneyimi</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🏨</div>
              <h3>Kaliteli Konaklama</h3>
              <p>Özenle seçilmiş otellerde konforlu konaklama imkanı</p>
            </div>
            <div className="feature">
              <div className="feature-icon">💳</div>
              <h3>Uygun Fiyat</h3>
              <p>En uygun fiyatlarla kaliteli tur deneyimi ve taksit seçenekleri</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToursPage;