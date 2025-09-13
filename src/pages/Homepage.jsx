import React, { useState } from 'react';
import SearchForm from '../components/SearchForm';
import { Star, Percent, CreditCard, Shield, Award, Users } from 'lucide-react';
import './Homepage.css';

const Homepage = () => {
  const [activeHotelTab, setActiveHotelTab] = useState('september');
  const [activeTourTab, setActiveTourTab] = useState('culture');

  const featuredHotels = [
    {
      id: 1,
      name: "Rixos Premium Belek",
      location: "Antalya, Belek",
      image: "/api/placeholder/300/200",
      rating: 4.8,
      price: "1,250",
      oldPrice: "1,500",
      features: ["Her Şey Dahil", "Spa", "Özel Plaj"]
    },
    {
      id: 2,
      name: "Maxx Royal Kemer Resort",
      location: "Antalya, Kemer",
      image: "/api/placeholder/300/200",
      rating: 4.9,
      price: "2,100",
      oldPrice: "2,400",
      features: ["Ultra Her Şey Dahil", "Aquapark", "Golf"]
    },
    {
      id: 3,
      name: "Calista Luxury Resort",
      location: "Antalya, Belek",
      image: "/api/placeholder/300/200",
      rating: 4.7,
      price: "1,800",
      oldPrice: "2,200",
      features: ["Her Şey Dahil", "Kids Club", "Spa"]
    }
  ];

  const popularDestinations = [
    { name: "Antalya", hotels: 1250, image: "/api/placeholder/200/150" },
    { name: "İstanbul", hotels: 890, image: "/api/placeholder/200/150" },
    { name: "Bodrum", hotels: 425, image: "/api/placeholder/200/150" },
    { name: "Kapadokya", hotels: 320, image: "/api/placeholder/200/150" },
    { name: "Çeşme", hotels: 280, image: "/api/placeholder/200/150" },
    { name: "Marmaris", hotels: 390, image: "/api/placeholder/200/150" }
  ];

  const features = [
    {
      icon: <CreditCard size={32} />,
      title: "12 Aya Varan Taksit",
      description: "Kredi kartına 12 aya varan taksit imkanı"
    },
    {
      icon: <Shield size={32} />,
      title: "Güvenli Ödeme",
      description: "256 bit SSL sertifikası ile güvenli alışveriş"
    },
    {
      icon: <Award size={32} />,
      title: "25+ Yıllık Tecrübe",
      description: "1997'den beri güvenilir tatil deneyimi"
    },
    {
      icon: <Users size={32} />,
      title: "24/7 Müşteri Hizmetleri",
      description: "Her an yanınızda profesyonel destek"
    }
  ];

  const hotelTabs = [
    { id: 'september', label: 'Eylül Fırsatları Otelleri' },
    { id: 'popular', label: 'En Popüler Oteller' },
    { id: 'nearby', label: 'Yakın Bölge Otelleri' },
    { id: 'cyprus', label: 'Kıbrıs Otelleri' },
    { id: 'nature', label: 'Doğa Otelleri' },
    { id: 'thermal', label: 'Termal Oteller' }
  ];

  const tourTabs = [
    { id: 'culture', label: 'Kültür Turları' },
    { id: 'international', label: 'Yurt Dışı Turları' },
    { id: 'cruise', label: 'Gemi Turları' }
  ];

  const legendaryHotels = [
    {
      id: 1,
      name: "Infinity By Yelken Aquapark & Resorts",
      location: "Aydın, Kuşadası",
      image: "/api/placeholder/300/200",
      rating: 8.2,
      ratingText: "ÇOK İYİ"
    },
    {
      id: 2,
      name: "Vogue Hotel Supreme Bodrum",
      location: "Muğla, Bodrum",
      image: "/api/placeholder/300/200",
      rating: 9.0,
      ratingText: "FEVKALADE"
    },
    {
      id: 3,
      name: "FashionTV Luxe Resort",
      location: "Antalya, Kemer",
      image: "/api/placeholder/300/200",
      rating: 9.0,
      ratingText: "FEVKALADE"
    },
    {
      id: 4,
      name: "Ramada Resort By Wyndham Kuşadası & Golf",
      location: "Aydın, Kuşadası",
      image: "/api/placeholder/300/200",
      rating: 8.8,
      ratingText: "MÜTHİŞ"
    }
  ];

  const popularHotels = [
    "Antalya Otelleri", "Didim Otelleri", "Her Şey Dahil Antalya Otelleri", "Alanya Otelleri",
    "Çeşme Otelleri", "Antalya Balayı Otelleri", "Bodrum Otelleri", "Assos Otelleri",
    "Marmaris Otelleri", "Fethiye Otelleri", "Kaş Otelleri", "Alaçatı Otelleri",
    "Kemer Otelleri", "Kuşadası Otelleri"
  ];

  return (
    <div className="homepage">
      {/* Section 2: Promo Quick Links */}
      <section className="promo-quicklinks">
        <div className="container">
          <div className="promo-grid">
            <a className="promo-card" href="#">
              <div className="promo-icon">🏖️</div>
              <div>
                <div className="promo-title">Sınırlı Sayıda 2026 Avantajlı Yaz Otelleri</div>
                <div className="promo-link">Özelini incele</div>
              </div>
            </a>
            <a className="promo-card" href="#">
              <div className="promo-icon">💸</div>
              <div>
                <div className="promo-title">Eylül Ayı 30.000 TL ve Altı Oteller</div>
                <div className="promo-link">Hemen incele</div>
              </div>
            </a>
            <a className="promo-card" href="#">
              <div className="promo-icon">💍</div>
              <div>
                <div className="promo-title">Avantajlı Balayı Otelleri</div>
                <div className="promo-link">Hemen incele</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Section 3: Deals Carousel + Side Cards */}
      <section className="deals-showcase">
        <div className="container">
          <div className="deals-layout">
            <div className="deals-left">
              <div className="deals-hero">
                <img src="/api/placeholder/720/360" alt="Yaz Fırsatları" />
                <div className="deals-overlay">
                  <span className="badge">Sınırlı Sayıda</span>
                  <h3>2026 Yazı İlk Tatil Fırsatları TatilBudur'da!</h3>
                  <p>TB Club Üyelerine Özel İlk İndirimler - Vade Farksız Taksit</p>
                  <button className="btn btn-secondary">Otelleri incele</button>
                </div>
              </div>
            </div>
            <div className="deals-right">
              <a className="side-card" href="#">
                <img src="/api/placeholder/320/170" alt="İstanbul'a Yakın" />
                <div className="side-content">
                  <div className="side-title">İstanbul'a Yakın Tatil Fırsatları</div>
                  <span className="side-cta">Hemen incele</span>
                </div>
              </a>
              <a className="side-card" href="#">
                <img src="/api/placeholder/320/170" alt="Vogue Hotel Supreme Bodrum" />
                <div className="side-content">
                  <div className="side-title">Vogue Hotel Supreme Bodrum TatilBudur'da!</div>
                  <span className="side-cta">Oteli incele</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Member Notice Strip */}
      <section className="member-notice">
        <div className="container">
          <div className="member-strip">
            <div>Üyelere özel indirimli fiyatlar <span className="underline-link">Giriş yaptığınızda daha düşük fiyatlar</span> görürsünüz!</div>
            <a className="notice-btn" href="/login">Giriş Yapın</a>
          </div>
        </div>
      </section>

      {/* Section 5: Legendary Opportunities */}
      <section className="legendary-opportunities">
        <div className="container">
          <h2 className="section-title">Efsane Fırsatları Kaçırma!</h2>
          <div className="hotel-tabs">
            {hotelTabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-button ${activeHotelTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveHotelTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
            <a href="#" className="show-more">Daha fazla göster</a>
          </div>
          <div className="hotels-carousel">
            {legendaryHotels.map((hotel) => (
              <div key={hotel.id} className="hotel-card-small">
                <div className="hotel-image-small">
                  <img src={hotel.image} alt={hotel.name} />
                  <div className="rating-badge">
                    {hotel.rating}/10 {hotel.ratingText}
                  </div>
                </div>
                <div className="hotel-info-small">
                  <h3>{hotel.name}</h3>
                  <p>{hotel.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: App Download Banner */}
      <section className="app-download-banner">
        <div className="container">
          <div className="app-banner-content">
            <div className="app-banner-left">
              <h3>TatilBudur uygulamasını indirin, aklınızdaki tatili hemen planlayın!</h3>
              <div className="app-buttons">
                <a href="#" className="app-btn app-store">App Store</a>
                <a href="#" className="app-btn google-play">Google Play</a>
                <a href="#" className="app-btn app-gallery">AppGallery</a>
              </div>
            </div>
            <div className="app-banner-right">
              <div className="qr-code">
                <div className="qr-placeholder">QR</div>
                <span>QR Kod ile İndir</span>
              </div>
              <div className="phone-mockup">
                <img src="/api/placeholder/200/400" alt="TatilBudur App" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Tour Discovery */}
      <section className="tour-discovery">
        <div className="container">
          <h2 className="section-title">Her Zevke Uygun Turları Keşfet</h2>
          <div className="tour-tabs">
            {tourTabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-button ${activeTourTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTourTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="tour-showcase">
            <div className="tour-main-card">
              <img src="/api/placeholder/600/300" alt="Kapadokya" />
              <div className="tour-overlay">
                <h3>Türkiye'nin Her Noktasını</h3>
                <p>699,99 TL'den başlayan fiyatlar</p>
                <button className="btn btn-primary">Turları İncele</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Popular Hotels Links */}
      <section className="popular-hotels-links">
        <div className="container">
          <h3>Popüler Oteller</h3>
          <div className="hotel-links-grid">
            {popularHotels.map((hotel, index) => (
              <a key={index} href="#" className="hotel-link">{hotel}</a>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9: Sponsor Logos */}
      <section className="sponsor-logos">
        <div className="container">
          <div className="sponsor-content">
            <div className="sponsor-item">
              <div className="sponsor-logo">TVF</div>
              <span>Voleybol Milli Takımlar Resmi Sponsoru</span>
            </div>
            <div className="sponsor-item">
              <div className="sponsor-logo">TBF</div>
              <span>Basketbol Milli Takımlar Resmi Sponsoru</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 10: Content Cards */}
      <section className="content-cards">
        <div className="container">
          <div className="content-grid">
            <div className="content-card">
              <h3>Hayalinizdeki Tatile Ulaşmanın Yolu, TatilBudur'dan Geçiyor!</h3>
            </div>
            <div className="content-card">
              <div className="card-icon">🎈</div>
              <h3>Türkiye'de En Güzel Tatil Yerleri</h3>
              <p>Ege ve Akdeniz bölgesinde birçok farklı içeriklere sahip tur...</p>
              <a href="#" className="read-more">Devamını Oku</a>
            </div>
            <div className="content-card">
              <div className="card-icon">🌍</div>
              <h3>Daha Fazla Tatil, TatilBudur!</h3>
              <p>1997'den beri otel, tur, uçak, organizasyon hizmetleri...</p>
              <a href="#" className="read-more">Devamını Oku</a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="featured-hotels">
        <div className="container">
          <div className="section-header">
            <h2>Öne Çıkan Oteller</h2>
            <p>En popüler ve kaliteli otel seçeneklerimizi keşfedin</p>
          </div>
          <div className="hotels-grid">
            {featuredHotels.map((hotel) => (
              <div key={hotel.id} className="hotel-card">
                <div className="hotel-image">
                  <img src={hotel.image} alt={hotel.name} />
                  <div className="discount-badge">
                    <Percent size={14} />
                    %{Math.round(((hotel.oldPrice - hotel.price) / hotel.oldPrice) * 100)}
                  </div>
                </div>
                <div className="hotel-info">
                  <div className="hotel-header">
                    <h3>{hotel.name}</h3>
                    <div className="rating">
                      <Star size={16} fill="currentColor" />
                      <span>{hotel.rating}</span>
                    </div>
                  </div>
                  <p className="location">{hotel.location}</p>
                  <div className="features">
                    {hotel.features.map((feature, index) => (
                      <span key={index} className="feature-tag">{feature}</span>
                    ))}
                  </div>
                  <div className="pricing">
                    <span className="old-price">{hotel.oldPrice} TL</span>
                    <span className="current-price">{hotel.price} TL</span>
                    <span className="per-night">/gece</span>
                  </div>
                  <button className="btn btn-primary">Detayları Gör</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="popular-destinations">
        <div className="container">
          <div className="section-header">
            <h2>Popüler Destinasyonlar</h2>
            <p>En çok tercih edilen tatil bölgelerini keşfedin</p>
          </div>
          <div className="destinations-grid">
            {popularDestinations.map((destination, index) => (
              <div key={index} className="destination-card">
                <img src={destination.image} alt={destination.name} />
                <div className="destination-info">
                  <h3>{destination.name}</h3>
                  <p>{destination.hotels} otel</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    
    </div>
  );
};

export default Homepage;