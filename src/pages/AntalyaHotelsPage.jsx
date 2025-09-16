import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Wifi, Car, Coffee, Utensils, Waves, Users, SlidersHorizontal, Loader2, X, ChevronDown } from 'lucide-react';
import './AntalyaHotelsPage.css';

const AntalyaHotelsPage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    priceRange: [0, 10000],
    starRating: [],
    amenities: [],
    district: [],
    concepts: [],
    popularFilters: [],
    accommodationType: [],
    hotelType: [],
    specialPeriods: [],
    activities: [],
    themes: [],
    facilities: [],
    campaigns: [],
    childrenFilters: [],
    sortBy: 'popularity'
  });

  const [showFilters, setShowFilters] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [collapsedSections, setCollapsedSections] = useState({});
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0
  });

  // Antalya ilçeleri
  const antalyaDistricts = [
    'Alanya', 'Belek', 'Kemer', 'Side', 'Lara', 'Kundu',
    'Kaş', 'Kalkan', 'Çıralı', 'Olimpos', 'Demre', 'Finike'
  ];

  // Konsept türleri
  const conceptTypes = [
    'Her Şey Dahil', 'Ultra Her Şey Dahil', 'Yarım Pansiyon',
    'Tam Pansiyon', 'Sadece Konaklama', 'Sadece Kahvaltı'
  ];

  // Popüler filtreler
  const popularFilters = [
    'Aqua Park & Su Kaydıraklı Oteller',
    'Çocuk Dostu Oteller',
    'Denize Sıfır Oteller',
    'Erken Rezervasyon Otelleri',
    'Her Şey Dahil Oteller'
  ];

  // Konaklama türleri
  const accommodationTypes = [
    'Otel', 'Resort', 'Pansiyon', 'Apart', 'Villa', 'Butik Otel'
  ];

  // Otel türleri
  const hotelTypes = [
    'Lüks Otel', 'Aile Oteli', 'Romantik Otel', 'İş Oteli', 
    'Spa Oteli', 'Golf Oteli', 'Plaj Oteli', 'Dağ Oteli'
  ];

  // Özel dönemler
  const specialPeriods = [
    'Yılbaşı', 'Sevgililer Günü', 'Anneler Günü', 'Babalar Günü',
    'Ramazan Bayramı', 'Kurban Bayramı', 'Cumhuriyet Bayramı', '23 Nisan'
  ];

  // Aktivite ve eğlence
  const activities = [
    'Aquapark', 'Spa & Wellness', 'Golf', 'Su Sporları', 'Tenis',
    'Fitness', 'Animasyon', 'Gece Kulübü', 'Konser', 'Tiyatro'
  ];

  // Otel temaları
  const themes = [
    'Romantik', 'Aile Dostu', 'Lüks', 'Eko Turizm', 'Kültür Turizmi',
    'Sağlık Turizmi', 'Golf Turizmi', 'Deniz Turizmi'
  ];

  // Olanaklar (genişletilmiş)
  const facilities = [
    'WiFi', 'Otopark', 'Havuz', 'Restoran', 'Spa', 'Fitness',
    'Bar', 'Oda Servisi', 'Klima', 'TV', 'Minibar', 'Balkon',
    'Deniz Manzarası', 'Bahçe', 'Teras', 'Asansör'
  ];

  // Kampanyalar
  const campaigns = [
    'Erken Rezervasyon', 'Son Dakika', 'Hafta Sonu', 'Uzun Dönem',
    'Aile İndirimi', 'Çocuk Ücretsiz', '3 Gece 2 Ödeme', 'Grup İndirimi'
  ];

  // Çocuklar için
  const childrenFilters = [
    'Kids Club', 'Çocuk Havuzu', 'Çocuk Menüsü', 'Bebek Bakımı',
    'Çocuk Animasyonu', 'Oyun Alanı', 'Bebek Beşiği', 'Çocuk Yatağı'
  ];

  // Sample Antalya hotels data
  const getSampleAntalyaHotels = () => [
    {
      id: 1,
      name: "Rixos Premium Belek",
      location: "Belek, Antalya",
      district: "Belek",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
      rating: 4.8,
      reviewCount: 2547,
      price: 1250,
      oldPrice: 1500,
      stars: 5,
      concept: "Ultra Her Şey Dahil",
      amenities: ["wifi", "parking", "pool", "restaurant", "spa"],
      description: "Akdeniz'in muhteşem manzarasında ultra lüks tatil deneyimi. Özel plajı ve geniş bahçesi ile unutulmaz anlar.",
      features: ["Özel Plaj", "Spa Merkezi", "Aquapark", "Golf Sahası", "Kids Club"],
      discountPercentage: 17,
      accommodationType: "Resort",
      hotelType: "Lüks Otel",
      popularFilters: ["Her Şey Dahil Oteller", "Denize Sıfır Oteller"],
      activities: ["Aquapark", "Spa & Wellness", "Golf", "Su Sporları"],
      themes: ["Lüks", "Deniz Turizmi"],
      facilities: ["WiFi", "Otopark", "Havuz", "Restoran", "Spa", "Fitness", "Bar", "Deniz Manzarası"],
      campaigns: ["Erken Rezervasyon"],
      childrenFilters: ["Kids Club", "Çocuk Havuzu", "Çocuk Animasyonu"]
    },
    {
      id: 2,
      name: "Maxx Royal Kemer Resort",
      location: "Kemer, Antalya",
      district: "Kemer",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
      rating: 4.9,
      reviewCount: 1834,
      price: 2100,
      oldPrice: 2400,
      stars: 5,
      concept: "Ultra Her Şey Dahil",
      amenities: ["wifi", "parking", "pool", "restaurant", "spa"],
      description: "Kemer'in en prestijli resort oteli. Dağ ve deniz manzaralı konumu ile eşsiz bir tatil sunar.",
      features: ["Özel Marina", "Golf", "Spa", "Kids Club", "Su Sporları"],
      discountPercentage: 13,
      accommodationType: "Resort",
      hotelType: "Lüks Otel",
      popularFilters: ["Her Şey Dahil Oteller", "Denize Sıfır Oteller"],
      activities: ["Spa & Wellness", "Golf", "Su Sporları", "Fitness"],
      themes: ["Lüks", "Deniz Turizmi"],
      facilities: ["WiFi", "Otopark", "Havuz", "Restoran", "Spa", "Fitness", "Bar", "Deniz Manzarası"],
      campaigns: ["Erken Rezervasyon"],
      childrenFilters: ["Kids Club", "Çocuk Havuzu", "Çocuk Animasyonu"]
    },
    {
      id: 3,
      name: "Calista Luxury Resort",
      location: "Belek, Antalya",
      district: "Belek",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      rating: 4.7,
      reviewCount: 1923,
      price: 1800,
      oldPrice: 2200,
      stars: 5,
      concept: "Her Şey Dahil",
      amenities: ["wifi", "parking", "pool", "restaurant"],
      description: "Belek'te aile dostu lüks tatil. Geniş aquapark ve çocuk aktiviteleri ile aileler için ideal.",
      features: ["Aquapark", "Kids Club", "Mini Golf", "Tenis Kortu"],
      discountPercentage: 18,
      accommodationType: "Resort",
      hotelType: "Aile Oteli",
      popularFilters: ["Her Şey Dahil Oteller", "Çocuk Dostu Oteller", "Aqua Park & Su Kaydıraklı Oteller"],
      activities: ["Aquapark", "Tenis", "Fitness", "Animasyon"],
      themes: ["Aile Dostu", "Deniz Turizmi"],
      facilities: ["WiFi", "Otopark", "Havuz", "Restoran", "Fitness", "Bar", "Deniz Manzarası"],
      campaigns: ["Aile İndirimi", "Çocuk Ücretsiz"],
      childrenFilters: ["Kids Club", "Çocuk Havuzu", "Çocuk Animasyonu", "Oyun Alanı"]
    },
    {
      id: 4,
      name: "Sheraton Voyager Antalya",
      location: "Konyaaltı, Antalya",
      district: "Konyaaltı",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
      rating: 4.5,
      reviewCount: 1456,
      price: 950,
      oldPrice: 1200,
      stars: 4,
      concept: "Her Şey Dahil",
      amenities: ["wifi", "parking", "pool", "restaurant"],
      description: "Antalya şehir merkezine yakın konumu ile hem tatil hem de şehir gezisi imkanı sunar.",
      features: ["Şehir Merkezi", "Sahil", "Spa", "Fitness"],
      discountPercentage: 21,
      accommodationType: "Otel",
      hotelType: "İş Oteli",
      popularFilters: ["Her Şey Dahil Oteller"],
      activities: ["Spa & Wellness", "Fitness"],
      themes: ["Kültür Turizmi"],
      facilities: ["WiFi", "Otopark", "Havuz", "Restoran", "Spa", "Fitness", "Bar", "Asansör"],
      campaigns: ["Son Dakika"],
      childrenFilters: []
    },
    {
      id: 5,
      name: "Gloria Serenity Resort",
      location: "Belek, Antalya",
      district: "Belek",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
      rating: 4.6,
      reviewCount: 2105,
      price: 1450,
      oldPrice: 1750,
      stars: 5,
      concept: "Ultra Her Şey Dahil",
      amenities: ["wifi", "parking", "pool", "restaurant", "spa"],
      description: "Golf tutkunları için ideal konumu ile Belek'in en tercih edilen otellerinden biri.",
      features: ["Golf", "Spa", "Aquapark", "Tennis", "Kids Club"],
      discountPercentage: 17,
      accommodationType: "Resort",
      hotelType: "Golf Oteli",
      popularFilters: ["Her Şey Dahil Oteller", "Çocuk Dostu Oteller", "Aqua Park & Su Kaydıraklı Oteller"],
      activities: ["Golf", "Spa & Wellness", "Tenis", "Fitness"],
      themes: ["Golf Turizmi", "Deniz Turizmi"],
      facilities: ["WiFi", "Otopark", "Havuz", "Restoran", "Spa", "Fitness", "Bar", "Deniz Manzarası"],
      campaigns: ["Erken Rezervasyon", "Grup İndirimi"],
      childrenFilters: ["Kids Club", "Çocuk Havuzu", "Çocuk Animasyonu"]
    },
    {
      id: 6,
      name: "Hotel Su",
      location: "Boğazkent, Antalya",
      district: "Boğazkent",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
      rating: 4.8,
      reviewCount: 987,
      price: 2800,
      oldPrice: 3200,
      stars: 5,
      concept: "Ultra Her Şey Dahil",
      amenities: ["wifi", "parking", "pool", "restaurant", "spa"],
      description: "Butik lüks otel deneyimi. Sadece yetişkinlere özel olan bu otel, huzurlu bir tatil vaat ediyor.",
      features: ["Adults Only", "Spa", "İtalyan Mutfağı", "Özel Plaj"],
      discountPercentage: 13,
      accommodationType: "Butik Otel",
      hotelType: "Romantik Otel",
      popularFilters: ["Denize Sıfır Oteller"],
      activities: ["Spa & Wellness"],
      themes: ["Romantik", "Lüks"],
      facilities: ["WiFi", "Otopark", "Havuz", "Restoran", "Spa", "Bar", "Deniz Manzarası", "Teras"],
      campaigns: ["Romantik Paket"],
      childrenFilters: []
    },
    {
      id: 7,
      name: "Crystal Sunrise Queen",
      location: "Side, Antalya",
      district: "Side",
      image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&h=300&fit=crop",
      rating: 4.4,
      reviewCount: 1678,
      price: 850,
      oldPrice: 1100,
      stars: 4,
      concept: "Her Şey Dahil",
      amenities: ["wifi", "parking", "pool", "restaurant"],
      description: "Side'nin tarihi atmosferi ile modern konforun buluştuğu aile dostu otel.",
      features: ["Aquapark", "Mini Club", "Animation", "Sahil"],
      discountPercentage: 23,
      accommodationType: "Otel",
      hotelType: "Aile Oteli",
      popularFilters: ["Her Şey Dahil Oteller", "Çocuk Dostu Oteller", "Aqua Park & Su Kaydıraklı Oteller"],
      activities: ["Aquapark", "Animasyon"],
      themes: ["Aile Dostu", "Kültür Turizmi"],
      facilities: ["WiFi", "Otopark", "Havuz", "Restoran", "Bar", "Deniz Manzarası"],
      campaigns: ["Aile İndirimi", "Çocuk Ücretsiz"],
      childrenFilters: ["Kids Club", "Çocuk Havuzu", "Çocuk Animasyonu", "Oyun Alanı"]
    },
    {
      id: 8,
      name: "Alva Donna Beach Resort",
      location: "Side, Antalya",
      district: "Side",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
      rating: 4.3,
      reviewCount: 1234,
      price: 780,
      oldPrice: 980,
      stars: 4,
      concept: "Her Şey Dahil",
      amenities: ["wifi", "parking", "pool", "restaurant"],
      description: "Side'de uygun fiyatlı tatil. Genç çiftler ve arkadaş grupları için ideal seçim.",
      features: ["Sahil", "Pool Bar", "Gece Kulübü", "Su Sporları"],
      discountPercentage: 20,
      accommodationType: "Otel",
      hotelType: "Plaj Oteli",
      popularFilters: ["Her Şey Dahil Oteller", "Denize Sıfır Oteller"],
      activities: ["Su Sporları", "Gece Kulübü"],
      themes: ["Deniz Turizmi"],
      facilities: ["WiFi", "Otopark", "Havuz", "Restoran", "Bar", "Deniz Manzarası"],
      campaigns: ["Son Dakika", "Grup İndirimi"],
      childrenFilters: []
    }
  ];

  // Load hotels on component mount
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const sampleHotels = getSampleAntalyaHotels();
      setHotels(sampleHotels);
      setPagination(prev => ({
        ...prev,
        total: sampleHotels.length,
        totalPages: Math.ceil(sampleHotels.length / prev.limit)
      }));
      setLoading(false);
    }, 1000);
  }, []);

  // Filter hotels based on current filters
  const filteredHotels = hotels.filter(hotel => {
    // Price filter
    if (hotel.price < filters.priceRange[0] || hotel.price > filters.priceRange[1]) {
      return false;
    }

    // Star rating filter
    if (filters.starRating.length > 0 && !filters.starRating.includes(hotel.stars)) {
      return false;
    }

    // Amenities filter
    if (filters.amenities.length > 0 &&
        !filters.amenities.every(amenity => hotel.amenities.includes(amenity))) {
      return false;
    }

    // District filter
    if (filters.district.length > 0 && !filters.district.includes(hotel.district)) {
      return false;
    }

    // Concept filter
    if (filters.concepts.length > 0 && !filters.concepts.includes(hotel.concept)) {
      return false;
    }

    // Popular filters
    if (filters.popularFilters.length > 0 &&
        !filters.popularFilters.some(filter => hotel.popularFilters?.includes(filter))) {
      return false;
    }

    // Accommodation type filter
    if (filters.accommodationType.length > 0 && 
        !filters.accommodationType.includes(hotel.accommodationType)) {
      return false;
    }

    // Hotel type filter
    if (filters.hotelType.length > 0 && 
        !filters.hotelType.includes(hotel.hotelType)) {
      return false;
    }

    // Special periods filter
    if (filters.specialPeriods.length > 0 &&
        !filters.specialPeriods.some(period => hotel.specialPeriods?.includes(period))) {
      return false;
    }

    // Activities filter
    if (filters.activities.length > 0 &&
        !filters.activities.some(activity => hotel.activities?.includes(activity))) {
      return false;
    }

    // Themes filter
    if (filters.themes.length > 0 &&
        !filters.themes.some(theme => hotel.themes?.includes(theme))) {
      return false;
    }

    // Facilities filter
    if (filters.facilities.length > 0 &&
        !filters.facilities.some(facility => hotel.facilities?.includes(facility))) {
      return false;
    }

    // Campaigns filter
    if (filters.campaigns.length > 0 &&
        !filters.campaigns.some(campaign => hotel.campaigns?.includes(campaign))) {
      return false;
    }

    // Children filters
    if (filters.childrenFilters.length > 0 &&
        !filters.childrenFilters.some(childFilter => hotel.childrenFilters?.includes(childFilter))) {
      return false;
    }

    return true;
  });

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

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => {
      const newFilters = { ...prev };

      if (filterType === 'starRating' || filterType === 'amenities' ||
          filterType === 'district' || filterType === 'concepts' ||
          filterType === 'popularFilters' || filterType === 'accommodationType' ||
          filterType === 'hotelType' || filterType === 'specialPeriods' ||
          filterType === 'activities' || filterType === 'themes' ||
          filterType === 'facilities' || filterType === 'campaigns' ||
          filterType === 'childrenFilters') {
        if (newFilters[filterType].includes(value)) {
          newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
        } else {
          newFilters[filterType] = [...newFilters[filterType], value];
        }
      } else {
        newFilters[filterType] = value;
      }

      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setFilters({
      priceRange: [0, 10000],
      starRating: [],
      amenities: [],
      district: [],
      concepts: [],
      popularFilters: [],
      accommodationType: [],
      hotelType: [],
      specialPeriods: [],
      activities: [],
      themes: [],
      facilities: [],
      campaigns: [],
      childrenFilters: [],
      sortBy: 'popularity'
    });
  };

  const toggleSection = (section) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="antalya-hotels-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span>Ana Sayfa</span>
          <span>/</span>
          <span>Yurtiçi Oteller</span>
          <span>/</span>
          <span>Antalya Otelleri</span>
        </div>

        {/* Page Header */}
        <div className="page-header">
          <h1>Antalya Otelleri</h1>
          <p>
            {loading ? 'Yükleniyor...' : `${filteredHotels.length} otel bulundu`}
            {!loading && filteredHotels.length !== hotels.length &&
              <span> ({hotels.length} otel içinden)</span>
            }
          </p>
        </div>

        <div className="hotels-layout">
          {/* Filters Sidebar */}
          <aside className={`filters-sidebar ${showFilters ? 'show-filters' : ''}`}>
            <div className="filters-header">
              <h3>Filtreler</h3>
              <button
                className="close-filters-mobile"
                onClick={() => setShowFilters(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="filters-actions">
              <button className="clear-filters-btn" onClick={clearAllFilters}>
                Filtreleri Temizle
              </button>
            </div>

            {/* Price Range Filter */}
            <div className="filter-group">
              <div
                className="filter-group-header"
                onClick={() => toggleSection('price')}
              >
                <h4>Fiyat Aralığı</h4>
                <ChevronDown
                  size={16}
                  className={`chevron ${collapsedSections.price ? 'rotated' : ''}`}
                />
              </div>
              {!collapsedSections.price && (
                <div className="filter-group-content">
                  <div className="price-range">
                    <div className="price-inputs">
                      <div className="price-input-group">
                        <label>En Düşük</label>
                        <input
                          type="number"
                          min="0"
                          max="10000"
                          step="100"
                          value={filters.priceRange[0]}
                          onChange={(e) => {
                            const minValue = parseInt(e.target.value) || 0;
                            const maxValue = Math.max(minValue, filters.priceRange[1]);
                            handleFilterChange('priceRange', [minValue, maxValue]);
                          }}
                        />
                        <span>TL</span>
                      </div>
                      <div className="price-input-group">
                        <label>En Yüksek</label>
                        <input
                          type="number"
                          min="0"
                          max="10000"
                          step="100"
                          value={filters.priceRange[1]}
                          onChange={(e) => {
                            const maxValue = parseInt(e.target.value) || 10000;
                            const minValue = Math.min(maxValue, filters.priceRange[0]);
                            handleFilterChange('priceRange', [minValue, maxValue]);
                          }}
                        />
                        <span>TL</span>
                      </div>
                    </div>
                    <div className="price-slider-container">
                      <input
                        type="range"
                        min="0"
                        max="10000"
                        step="100"
                        value={filters.priceRange[0]}
                        onChange={(e) => {
                          const minValue = parseInt(e.target.value);
                          const maxValue = Math.max(minValue, filters.priceRange[1]);
                          handleFilterChange('priceRange', [minValue, maxValue]);
                        }}
                        className="price-slider min-slider"
                      />
                      <input
                        type="range"
                        min="0"
                        max="10000"
                        step="100"
                        value={filters.priceRange[1]}
                        onChange={(e) => {
                          const maxValue = parseInt(e.target.value);
                          const minValue = Math.min(maxValue, filters.priceRange[0]);
                          handleFilterChange('priceRange', [minValue, maxValue]);
                        }}
                        className="price-slider max-slider"
                      />
                    </div>
                    <div className="price-labels">
                      <span>0 TL</span>
                      <span>10000 TL</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* District Filter */}
            <div className="filter-group">
              <div
                className="filter-group-header"
                onClick={() => toggleSection('district')}
              >
                <h4>Bölge</h4>
                <ChevronDown
                  size={16}
                  className={`chevron ${collapsedSections.district ? 'rotated' : ''}`}
                />
              </div>
              {!collapsedSections.district && (
                <div className="filter-group-content">
                  <div className="checkbox-group">
                    {antalyaDistricts.map(district => (
                      <label key={district} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={filters.district.includes(district)}
                          onChange={() => handleFilterChange('district', district)}
                        />
                        <span className="checkbox-text">{district}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Star Rating Filter */}
            <div className="filter-group">
              <div
                className="filter-group-header"
                onClick={() => toggleSection('stars')}
              >
                <h4>Yıldız Sayısı</h4>
                <ChevronDown
                  size={16}
                  className={`chevron ${collapsedSections.stars ? 'rotated' : ''}`}
                />
              </div>
              {!collapsedSections.stars && (
                <div className="filter-group-content">
                  <div className="star-filters">
                    {[5, 4, 3, 2, 1].map(stars => (
                      <label key={stars} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={filters.starRating.includes(stars)}
                          onChange={() => handleFilterChange('starRating', stars)}
                        />
                        <div className="stars-display">
                          {Array.from({length: stars}, (_, i) => (
                            <Star key={i} size={14} fill="currentColor" />
                          ))}
                          <span className="star-text">{stars} Yıldız</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Concept Filter */}
            <div className="filter-group">
              <div
                className="filter-group-header"
                onClick={() => toggleSection('concepts')}
              >
                <h4>Konsept</h4>
                <ChevronDown
                  size={16}
                  className={`chevron ${collapsedSections.concepts ? 'rotated' : ''}`}
                />
              </div>
              {!collapsedSections.concepts && (
                <div className="filter-group-content">
                  <div className="checkbox-group">
                    {conceptTypes.map(concept => (
                      <label key={concept} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={filters.concepts.includes(concept)}
                          onChange={() => handleFilterChange('concepts', concept)}
                        />
                        <span className="checkbox-text">{concept}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Popular Filters */}
            <div className="filter-group">
              <div
                className="filter-group-header"
                onClick={() => toggleSection('popular')}
              >
                <h4>Popüler Filtreler</h4>
                <ChevronDown
                  size={16}
                  className={`chevron ${collapsedSections.popular ? 'rotated' : ''}`}
                />
              </div>
              {!collapsedSections.popular && (
                <div className="filter-group-content">
                  <div className="checkbox-group">
                    {popularFilters.map(filter => (
                      <label key={filter} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={filters.popularFilters.includes(filter)}
                          onChange={() => handleFilterChange('popularFilters', filter)}
                        />
                        <span className="checkbox-text">{filter}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Accommodation Type Filter */}
            <div className="filter-group">
              <div
                className="filter-group-header"
                onClick={() => toggleSection('accommodation')}
              >
                <h4>Konaklama Tipi</h4>
                <ChevronDown
                  size={16}
                  className={`chevron ${collapsedSections.accommodation ? 'rotated' : ''}`}
                />
              </div>
              {!collapsedSections.accommodation && (
                <div className="filter-group-content">
                  <div className="checkbox-group">
                    {accommodationTypes.map(type => (
                      <label key={type} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={filters.accommodationType.includes(type)}
                          onChange={() => handleFilterChange('accommodationType', type)}
                        />
                        <span className="checkbox-text">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Hotel Type Filter */}
            <div className="filter-group">
              <div
                className="filter-group-header"
                onClick={() => toggleSection('hotelType')}
              >
                <h4>Otel Tipi</h4>
                <ChevronDown
                  size={16}
                  className={`chevron ${collapsedSections.hotelType ? 'rotated' : ''}`}
                />
              </div>
              {!collapsedSections.hotelType && (
                <div className="filter-group-content">
                  <div className="checkbox-group">
                    {hotelTypes.map(type => (
                      <label key={type} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={filters.hotelType.includes(type)}
                          onChange={() => handleFilterChange('hotelType', type)}
                        />
                        <span className="checkbox-text">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Special Periods Filter */}
            <div className="filter-group">
              <div
                className="filter-group-header"
                onClick={() => toggleSection('specialPeriods')}
              >
                <h4>Özel Dönemler</h4>
                <ChevronDown
                  size={16}
                  className={`chevron ${collapsedSections.specialPeriods ? 'rotated' : ''}`}
                />
              </div>
              {!collapsedSections.specialPeriods && (
                <div className="filter-group-content">
                  <div className="checkbox-group">
                    {specialPeriods.map(period => (
                      <label key={period} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={filters.specialPeriods.includes(period)}
                          onChange={() => handleFilterChange('specialPeriods', period)}
                        />
                        <span className="checkbox-text">{period}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Activities Filter */}
            <div className="filter-group">
              <div
                className="filter-group-header"
                onClick={() => toggleSection('activities')}
              >
                <h4>Aktivite-Eğlence</h4>
                <ChevronDown
                  size={16}
                  className={`chevron ${collapsedSections.activities ? 'rotated' : ''}`}
                />
              </div>
              {!collapsedSections.activities && (
                <div className="filter-group-content">
                  <div className="checkbox-group">
                    {activities.map(activity => (
                      <label key={activity} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={filters.activities.includes(activity)}
                          onChange={() => handleFilterChange('activities', activity)}
                        />
                        <span className="checkbox-text">{activity}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Themes Filter */}
            <div className="filter-group">
              <div
                className="filter-group-header"
                onClick={() => toggleSection('themes')}
              >
                <h4>Otel Temaları</h4>
                <ChevronDown
                  size={16}
                  className={`chevron ${collapsedSections.themes ? 'rotated' : ''}`}
                />
              </div>
              {!collapsedSections.themes && (
                <div className="filter-group-content">
                  <div className="checkbox-group">
                    {themes.map(theme => (
                      <label key={theme} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={filters.themes.includes(theme)}
                          onChange={() => handleFilterChange('themes', theme)}
                        />
                        <span className="checkbox-text">{theme}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Facilities Filter */}
            <div className="filter-group">
              <div
                className="filter-group-header"
                onClick={() => toggleSection('facilities')}
              >
                <h4>Olanaklar</h4>
                <ChevronDown
                  size={16}
                  className={`chevron ${collapsedSections.facilities ? 'rotated' : ''}`}
                />
              </div>
              {!collapsedSections.facilities && (
                <div className="filter-group-content">
                  <div className="checkbox-group">
                    {facilities.map(facility => (
                      <label key={facility} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={filters.facilities.includes(facility)}
                          onChange={() => handleFilterChange('facilities', facility)}
                        />
                        <span className="checkbox-text">{facility}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Campaigns Filter */}
            <div className="filter-group">
              <div
                className="filter-group-header"
                onClick={() => toggleSection('campaigns')}
              >
                <h4>Kampanyalar</h4>
                <ChevronDown
                  size={16}
                  className={`chevron ${collapsedSections.campaigns ? 'rotated' : ''}`}
                />
              </div>
              {!collapsedSections.campaigns && (
                <div className="filter-group-content">
                  <div className="checkbox-group">
                    {campaigns.map(campaign => (
                      <label key={campaign} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={filters.campaigns.includes(campaign)}
                          onChange={() => handleFilterChange('campaigns', campaign)}
                        />
                        <span className="checkbox-text">{campaign}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Children Filters */}
            <div className="filter-group">
              <div
                className="filter-group-header"
                onClick={() => toggleSection('children')}
              >
                <h4>Çocuklar İçin</h4>
                <ChevronDown
                  size={16}
                  className={`chevron ${collapsedSections.children ? 'rotated' : ''}`}
                />
              </div>
              {!collapsedSections.children && (
                <div className="filter-group-content">
                  <div className="checkbox-group">
                    {childrenFilters.map(childFilter => (
                      <label key={childFilter} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={filters.childrenFilters.includes(childFilter)}
                          onChange={() => handleFilterChange('childrenFilters', childFilter)}
                        />
                        <span className="checkbox-text">{childFilter}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Amenities Filter */}
            <div className="filter-group">
              <div
                className="filter-group-header"
                onClick={() => toggleSection('amenities')}
              >
                <h4>Temel Olanaklar</h4>
                <ChevronDown
                  size={16}
                  className={`chevron ${collapsedSections.amenities ? 'rotated' : ''}`}
                />
              </div>
              {!collapsedSections.amenities && (
                <div className="filter-group-content">
                  <div className="amenity-filters">
                    {Object.entries(amenityNames).map(([key, name]) => (
                      <label key={key} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={filters.amenities.includes(key)}
                          onChange={() => handleFilterChange('amenities', key)}
                        />
                        <div className="amenity-item">
                          {amenityIcons[key]}
                          <span>{name}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}
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
                {(filters.starRating.length > 0 || filters.amenities.length > 0 ||
                  filters.district.length > 0 || filters.concepts.length > 0 ||
                  filters.popularFilters.length > 0 || filters.accommodationType.length > 0 ||
                  filters.hotelType.length > 0 || filters.specialPeriods.length > 0 ||
                  filters.activities.length > 0 || filters.themes.length > 0 ||
                  filters.facilities.length > 0 || filters.campaigns.length > 0 ||
                  filters.childrenFilters.length > 0 || filters.priceRange[1] < 10000) && (
                  <span className="active-filters-badge">
                    {filters.starRating.length + filters.amenities.length +
                     filters.district.length + filters.concepts.length +
                     filters.popularFilters.length + filters.accommodationType.length +
                     filters.hotelType.length + filters.specialPeriods.length +
                     filters.activities.length + filters.themes.length +
                     filters.facilities.length + filters.campaigns.length +
                     filters.childrenFilters.length + (filters.priceRange[1] < 10000 ? 1 : 0)}
                  </span>
                )}
              </button>

              <div className="sort-options">
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                >
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
                  <p>Antalya otelleri yükleniyor...</p>
                </div>
              ) : filteredHotels.length === 0 ? (
                <div className="no-hotels">
                  <h3>Aradığınız kriterlere uygun otel bulunamadı.</h3>
                  <p>Filtrelerinizi değiştirmeyi deneyin.</p>
                  <button onClick={clearAllFilters} className="btn btn-primary">
                    Filtreleri Temizle
                  </button>
                </div>
              ) : (
                filteredHotels.map((hotel) => (
                  <div key={hotel.id} className="hotel-card-detailed">
                    <div className="hotel-image">
                      <img src={hotel.image} alt={hotel.name} />
                      <div className="discount-badge">
                        %{hotel.discountPercentage} İNDİRİM
                      </div>
                      <div className="concept-badge">
                        {hotel.concept}
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
                              <span>
                                {hotel.rating >= 4.7 ? 'Mükemmel' :
                                 hotel.rating >= 4.5 ? 'Çok İyi' :
                                 hotel.rating >= 4.0 ? 'İyi' : 'Ortalama'}
                              </span>
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
                          {hotel.features.slice(0, 4).map((feature, index) => (
                            <span key={index} className="feature-tag">{feature}</span>
                          ))}
                          {hotel.features.length > 4 && (
                            <span className="feature-tag more">
                              +{hotel.features.length - 4} daha
                            </span>
                          )}
                        </div>

                        <div className="hotel-amenities">
                          {hotel.amenities.slice(0, 5).map((amenity) => (
                            <div key={amenity} className="amenity" title={amenityNames[amenity]}>
                              {amenityIcons[amenity]}
                            </div>
                          ))}
                          {hotel.amenities.length > 5 && (
                            <span className="more-amenities">
                              +{hotel.amenities.length - 5}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="hotel-pricing">
                        <div className="price-info">
                          <span className="old-price">{hotel.oldPrice.toLocaleString()} TL</span>
                          <span className="current-price">{hotel.price.toLocaleString()} TL</span>
                          <span className="per-night">/ gece / oda</span>
                        </div>
                        <button 
                          className="btn btn-primary"
                          onClick={() => navigate(`/hotel/${hotel.id}`)}
                        >
                          Rezervasyon Yap
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            {!loading && filteredHotels.length > 0 && (
              <div className="pagination">
                <button
                  className="btn btn-secondary"
                  disabled={pagination.page === 1}
                >
                  Önceki
                </button>
                <span className="page-info">
                  Sayfa {pagination.page} / {Math.ceil(filteredHotels.length / pagination.limit)}
                </span>
                <button
                  className="btn btn-secondary"
                  disabled={pagination.page >= Math.ceil(filteredHotels.length / pagination.limit)}
                >
                  Sonraki
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AntalyaHotelsPage;