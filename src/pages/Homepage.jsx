import React, { useState } from 'react';
import SearchForm from '../components/SearchForm';
import { Star, Percent, CreditCard, Shield, Award, Users, MapPin, Globe, Plane, Umbrella } from 'lucide-react';
import './Homepage.css';

const Homepage = () => {
  const [activeHotelTab, setActiveHotelTab] = useState('september');
  const [activeTourTab, setActiveTourTab] = useState('culture');
  const [expandedCards, setExpandedCards] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);

  const toggleCard = (index) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length);
  };

  const carouselData = [
    {
      id: 1,
      title: "2026 Yazı İlk Tatil Fırsatları TatilBudur'da!",
      description: "TB Club Üyelerine Özel İlk İndirimler - Vade Farksız Taksit",
      image: "/src/assets/reklam.png",
      badge: "Sınırlı Sayıda",
      buttonText: "Otelleri incele"
    },
    {
      id: 2,
      title: "Kış Tatili Fırsatları",
      description: "Kayak ve Termal Tatil Seçenekleri - Erken Rezervasyon İndirimleri",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=400&fit=crop",
      badge: "Erken Rezervasyon",
      buttonText: "Fırsatları Gör"
    },
    {
      id: 3,
      title: "Yurt Dışı Tatil Paketleri",
      description: "Avrupa, Asya ve Afrika'nın En Güzel Destinasyonları",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
      badge: "Özel Fiyatlar",
      buttonText: "Paketleri İncele"
    }
  ];

  const sponsors = [
    {
      id: 1,
      name: "TatilBudur Sponsorluk",
      logo: "/src/assets/tblogo-sponsorluk.png",
      description: "Resmi Sponsor Logosu"
    },
    {
      id: 2,
      name: "TVF TatilBudur",
      logo: "/src/assets/tvf-tatilbudur.png",
      description: "TatilBudur TVF Logosu"
    },
    {
      id: 3,
      name: "TBF TatilBudur",
      logo: "/src/assets/tbf-tatilbudur.png",
      description: "TatilBudur TBF Logosu"
    }
  ];

  const infoCards = [
    {
      icon: <MapPin size={32} />,
      title: "Türkiye'de En Güzel Tatil Yerleri",
      description: "Ege ve Akdeniz bölgelerindeki turlarımızla unutulmaz anılar biriktirin.",
      expandedText: "Likya, Karya, Kuzey Ege, Salda ve Göller Bölgesi turları ile keşfe çıkın. Her bölgenin kendine özgü güzelliklerini keşfedin ve unutulmaz anılar biriktirin. Profesyonel rehberlerimiz eşliğinde tarihi ve doğal güzellikleri yakından görme fırsatı yakalayın."
    },
    {
      icon: <Globe size={32} />,
      title: "Daha Fazla Tatil, TatilBudur!",
      description: "1997 yılından beri hizmet veren markamız, otel, tur, uçak ve organizasyon hizmetleri sunuyor.",
      expandedText: "Hayalinizdeki tatili uygun fiyatlarla gerçekleştirmenize yardımcı oluyor. 25 yıllık deneyimimizle müşteri memnuniyetini ön planda tutarak, kaliteli hizmet anlayışımızı sürdürüyoruz. Binlerce memnun müşterimizin güvenini kazandık."
    },
    {
      icon: <Globe size={32} />,
      title: "Dünyanın En Güzel Tatil Yerleri",
      description: "Ege ve Akdeniz bölgelerindeki popüler rotalarımızla çeşitli tur seçenekleri sunuyoruz.",
      expandedText: "Likya, Karya ve Kuzey Ege turları ile dünyayı keşfedin. Avrupa, Asya ve Afrika'nın en güzel destinasyonlarına uygun fiyatlarla seyahat edin. Her bütçeye uygun seçeneklerimizle hayalinizdeki tatili gerçekleştirin."
    },
    {
      icon: <Plane size={32} />,
      title: "Tatil Fiyatları",
      description: "Tatilbudur.com olarak birçok farklı ve uygun tatil önerileri sunuyoruz.",
      expandedText: "Hayalinizdeki tatili seçmenizi sağlıyoruz. En uygun fiyat garantisi ile bütçenize uygun seçenekler sunuyoruz. Erken rezervasyon indirimleri ve özel kampanyalarımızla daha fazla tasarruf edin."
    },
    {
      icon: <Umbrella size={32} />,
      title: "En Uygun Tatil Fırsatları",
      description: "Tatilbudur.com ile unutulmaz bir tatil deneyimi yaşamaya hazır mısınız?",
      expandedText: "Yurt içi ve yurt dışı birçok konaklama seçeneği sunuyoruz. 5 yıldızlı lüks otellerden butik pansiyonlara, her zevke ve bütçeye uygun seçeneklerimizle hizmet veriyoruz. Özel günleriniz için özel paketler hazırlıyoruz."
    },
    {
      icon: <Globe size={32} />,
      title: "Dünyanın En Güzel Tatil Yerleri",
      description: "Ege ve Akdeniz bölgelerindeki popüler rotalarımızla çeşitli tur seçenekleri sunuyoruz.",
      expandedText: "Likya, Karya ve Kuzey Ege turları ile keşfe çıkın. Antik kentler, doğal güzellikler ve kültürel mirasımızı keşfedin. Profesyonel fotoğrafçılık hizmetleri ve özel etkinliklerle tatilinizi unutulmaz kılın."
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
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=250&fit=crop",
      rating: 8.2,
      ratingText: "ÇOK İYİ"
    },
    {
      id: 2,
      name: "Vogue Hotel Supreme Bodrum",
      location: "Muğla, Bodrum",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=250&fit=crop",
      rating: 9.0,
      ratingText: "FEVKALADE"
    },
    {
      id: 3,
      name: "FashionTV Luxe Resort",
      location: "Antalya, Kemer",
      image: "https://images.unsplash.com/photo-1549294413-26f195200c16?w=400&h=250&fit=crop",
      rating: 9.0,
      ratingText: "FEVKALADE"
    },
    {
      id: 4,
      name: "Ramada Resort By Wyndham Kuşadası & Golf",
      location: "Aydın, Kuşadası",
      image: "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=400&h=250&fit=crop",
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

      {/* Section 5: Promo Quick Links */}
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
              <div className="deals-carousel">
                <div className="carousel-container">
                  <div 
                    className="carousel-track" 
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {carouselData.map((item, index) => (
                      <div key={item.id} className="carousel-slide">
                        <div className="slide-content single-ad-layout">
                          <div className="single-ad-container">
                            <img src={item.image} alt={item.title} className="single-ad-image" />
                            <div className="single-ad-overlay">
                              <span className="badge">{item.badge}</span>
                              <h3>{item.title}</h3>
                              <p>{item.description}</p>
                              <button className="btn btn-primary">{item.buttonText}</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="carousel-btn prev" onClick={prevSlide}>
                    ‹
                  </button>
                  <button className="carousel-btn next" onClick={nextSlide}>
                    ›
                  </button>
                  <div className="carousel-dots">
                    {carouselData.map((_, index) => (
                      <button
                        key={index}
                        className={`dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="deals-right">
              <a className="side-card" href="#">
                <img src="https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&h=200&fit=crop" alt="İstanbul'a Yakın" />
                <div className="side-content">
                  <div className="side-title">İstanbul'a Yakın Tatil Fırsatları</div>
                  <span className="side-cta">Hemen incele</span>
                </div>
              </a>
              <a className="side-card" href="#">
                <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=200&fit=crop" alt="Vogue Hotel Supreme Bodrum" />
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
                <a href="#" className="app-btn app-store" title="App Store">
                  <div className="app-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                  </div>
                </a>
                <a href="#" className="app-btn google-play" title="Google Play">
                  <div className="app-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                  </div>
                </a>
                <a href="#" className="app-btn app-gallery" title="AppGallery">
                  <div className="app-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                </a>
              </div>
            </div>
            <div className="app-banner-right">
              <div className="qr-section">
                <div className="qr-background">
                  <img src="/src/assets/qr.png" alt="QR Kod" className="qr-image" />
                </div>
                <span className="qr-text">QR Kod ile İndir</span>
              </div>
              <div className="phone-mockup">
                <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=200&h=400&fit=crop" alt="TatilBudur App" />
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
              <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop" alt="Türkiye Turları" />
              <div className="tour-price-tag">
                699,99 TL'den başlayan fiyatlar
              </div>
              <div className="tour-overlay">
                <h3>Türkiye'nin Her Noktasını TatilBudur'la Keşfetmeye Ne Dersiniz?</h3>
                <p>Keşfederken eğleneceğiniz aynı zamanda tarihe tanıklık edeceğiniz birbirinden değerli bölgelerimiz için tur rotanızı beraber oluşturalım!</p>
                <button className="btn btn-primary">Hemen İncele</button>
              </div>
            </div>
          </div>
          <div className="tour-categories">
            <button className="tour-category-btn">
              <div className="category-icon">🏖️</div>
              <span>Ege Akdeniz Turları</span>
            </button>
            <button className="tour-category-btn">
              <div className="category-icon">🎈</div>
              <span>Kapadokya Turları</span>
            </button>
            <button className="tour-category-btn">
              <div className="category-icon">🏛️</div>
              <span>Gap Turları</span>
            </button>
            <button className="tour-category-btn">
              <div className="category-icon">🏔️</div>
              <span>Karadeniz Turları</span>
            </button>
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

      {/* Sponsors Section */}
      <section className="sponsors-section">
        <div className="container">
          <div className="sponsors-grid">
            
            
            {/* Sponsor Cards */}
            {sponsors.map((sponsor) => (
              <div key={sponsor.id} className="sponsor-card">
                <div className="sponsor-logo">
                  <img 
                    src={sponsor.logo} 
                    alt={sponsor.name}
                    loading="lazy"
                  />
                </div>
                <div className="sponsor-info">
                  <h4 className="sponsor-name">{sponsor.name}</h4>
                  <p className="sponsor-description">{sponsor.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    
    

      {/* Info Cards Grid */}
      <section className="info-cards-section">
        <div className="container">
          <div className="info-cards-grid">
            {infoCards.map((card, index) => (
              <div key={index} className={`info-card ${expandedCards[index] ? 'expanded' : ''}`}>
                <div className="info-card-icon">
                  {card.icon}
                </div>
                <h3 className="info-card-title">{card.title}</h3>
                <p className="info-card-description">{card.description}</p>
                {expandedCards[index] && (
                  <p className="info-card-expanded-text">{card.expandedText}</p>
                )}
                <button 
                  className="info-card-button"
                  onClick={() => toggleCard(index)}
                >
                  {expandedCards[index] ? 'Daha Az Göster' : 'Devamını Oku'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Homepage;