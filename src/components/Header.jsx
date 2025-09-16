import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Menu, X, Phone, Mail, MapPin, Crown, LogOut, Settings, Heart, Star } from 'lucide-react';
import DiscountBanner from './DiscountBanner';
import Modal from './Modal';
import { auth } from '../firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { directLogin } from '../firebase/authService';
import { getReservationsByEmail, getReservationByCode } from '../firebase/reservationService';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1236);
  const [user, setUser] = useState(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [reservationSearch, setReservationSearch] = useState({
    email: '',
    reservationCode: ''
  });
  const [reservations, setReservations] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [searchSuccess, setSearchSuccess] = useState('');
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [hotels, setHotels] = useState([]);
  const [isLoadingHotels, setIsLoadingHotels] = useState(false);

  // Dinamik menü verileri - hotels state'ine göre oluşturulacak
  const generateMenuData = () => {
    // Şehirlere göre otel sayılarını hesapla
    const cityGroups = hotels.reduce((acc, hotel) => {
      const city = hotel.location.split(',')[0].trim(); // "İstanbul, Taksim" -> "İstanbul"
      if (!acc[city]) {
        acc[city] = [];
      }
      acc[city].push(hotel);
      return acc;
    }, {});

    // Şehir listesini oluştur
    const destinations = Object.entries(cityGroups).map(([city, cityHotels]) => ({
      name: `${city} Otelleri`,
      count: `${cityHotels.length} Otel`,
      link: city.toLowerCase() === 'antalya' ? '/yurtici-oteller/antalya-otelleri' : `/hotels/${city.toLowerCase()}`
    }));

    return {
      hotels: {
        categories: [
          { id: 'domestic', name: 'Yurtiçi Oteller', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=150&h=100&fit=crop' },
          { id: 'thermal', name: 'Termal Oteller', image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=150&h=100&fit=crop' },
          { id: 'resort', name: 'Resort Oteller', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=150&h=100&fit=crop' },
          { id: 'city', name: 'Şehir Otelleri', image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=150&h=100&fit=crop' },
          { id: 'luxury', name: 'Lüks Oteller', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=150&h=100&fit=crop' }
        ],
        content: {
          domestic: {
            title: 'Yurtiçi Oteller',
            destinations: destinations.length > 0 ? destinations : [
              { name: 'Antalya Otelleri', count: '8 Otel', link: '/yurtici-oteller/antalya-otelleri' },
              { name: 'İstanbul Otelleri', count: '0 Otel', link: '/hotels/istanbul' },
              { name: 'Bodrum Otelleri', count: '0 Otel', link: '/hotels/bodrum' }
            ]
          },
          thermal: {
            title: 'Termal Oteller',
            destinations: hotels.filter(h => h.features?.some(f => f.toLowerCase().includes('thermal') || f.toLowerCase().includes('termal'))).map(hotel => ({
              name: hotel.name,
              count: `${hotel.rating} ⭐`,
              link: `/hotels/${hotel.id}`
            }))
          },
          resort: {
            title: 'Resort Oteller',
            destinations: hotels.filter(h => h.features?.some(f => f.toLowerCase().includes('resort') || f.toLowerCase().includes('beach'))).map(hotel => ({
              name: hotel.name,
              count: `${hotel.rating} ⭐`,
              link: `/hotels/${hotel.id}`
            }))
          },
          city: {
            title: 'Şehir Otelleri',
            destinations: hotels.filter(h => h.location.includes('İstanbul') || h.features?.some(f => f.toLowerCase().includes('city'))).map(hotel => ({
              name: hotel.name,
              count: `${hotel.price}`,
              link: `/hotels/${hotel.id}`
            }))
          },
          luxury: {
            title: 'Lüks Oteller',
            destinations: hotels.filter(h => h.stars >= 5 || h.rating >= 4.5).map(hotel => ({
              name: hotel.name,
              count: `${hotel.stars} ⭐`,
              link: `/hotels/${hotel.id}`
            }))
          }
        }
      },
      tours: {
        categories: [
          { id: 'culture', name: 'Kültür Turları', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=100&fit=crop' },
          { id: 'international', name: 'Yurt Dışı Turları', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=150&h=100&fit=crop' },
          { id: 'cruise', name: 'Gemi Turları', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=150&h=100&fit=crop' }
        ],
        content: {
          culture: {
            title: 'Kültür Turları',
            destinations: [
              { name: 'Kapadokya Turları', count: '15 Tur', link: '/tours/cappadocia' },
              { name: 'İstanbul Turları', count: '25 Tur', link: '/tours/istanbul' },
              { name: 'Efes Turları', count: '8 Tur', link: '/tours/ephesus' },
              { name: 'Pamukkale Turları', count: '12 Tur', link: '/tours/pamukkale' }
            ]
          }
        }
      }
    };
  };

  useEffect(() => {
    const handleResize = () => {
      const wasMobile = isMobile;
      const nowMobile = window.innerWidth <= 1236;
      setIsMobile(nowMobile);
      
      // Close mobile menu when switching from mobile to desktop
      if (wasMobile && !nowMobile) {
        setIsMenuOpen(false);
        setActiveDropdown(null);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  // Navbar yüksekliğini hesapla
  useEffect(() => {
    const calculateNavbarHeight = () => {
      const header = document.querySelector('.header-main');
      if (header) {
        const rect = header.getBoundingClientRect();
        setNavbarHeight(rect.bottom);
      }
    };

    calculateNavbarHeight();
    window.addEventListener('resize', calculateNavbarHeight);
    window.addEventListener('scroll', calculateNavbarHeight);
    
    return () => {
      window.removeEventListener('resize', calculateNavbarHeight);
      window.removeEventListener('scroll', calculateNavbarHeight);
    };
  }, []);

  // API'den otel verilerini çek
  const fetchHotels = async () => {
    try {
      setIsLoadingHotels(true);
      const response = await fetch('http://localhost:3002/api/hotels');

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setHotels(data.data);
        }
      }
    } catch (error) {
      console.error('Hotels fetch error:', error);
    } finally {
      setIsLoadingHotels(false);
    }
  };

  // Otel verilerini yükle
  useEffect(() => {
    fetchHotels();
  }, []);

  // Firebase auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleMouseEnter = (dropdownName) => {
    if (!isMobile) {
      setActiveDropdown(dropdownName);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setActiveDropdown(null);
    }
  };

  const handleDropdownClick = (dropdownName) => {
    if (isMobile) {
      setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
    }
  };

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
  };

  // Dinamik menü render fonksiyonu
  const renderMegaMenu = (menuType) => {
    const menuData = generateMenuData();
    const menu = menuData[menuType];
    if (!menu) return null;

    const currentCategory = activeCategory || menu.categories[0]?.id;
    const categoryContent = menu.content[currentCategory];

    return (
      <div className="mega-menu-container">
        <div className="mega-menu-left">
          <div className="mega-menu-cards">
            {menu.categories.map((category) => (
              <div
                key={category.id}
                className={`mega-card ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="mega-card-img">
                  <img src={category.image} alt={category.name} />
                </div>
                <div className="mega-card-content">{category.name}</div>
                <span className="mega-card-arrow">›</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mega-menu-right">
          {categoryContent && (
            <div className="mega-content">
              <div className="mega-content-destinations">
                {categoryContent.destinations.map((destination, index) => (
                  <Link key={index} to={destination.link} className="mega-content-row">
                    <span className="mega-content-link">{destination.name}</span>
                    <span className="mega-content-count">{destination.count}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const handleMobileMenuClose = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUserDropdownOpen(false);
      console.log('Kullanıcı çıkış yaptı');
    } catch (error) {
      console.error('Çıkış hatası:', error);
    }
  };

  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
    setLoginForm({ email: '', password: '' });
    setLoginError('');
  };

  const openReservationSearch = () => {
    setActiveModal('reservations');
  };

  const closeReservationSearch = () => {
    setActiveModal(null);
    setReservationSearch({ email: '', reservationCode: '' });
    setReservations([]);
    setSearchError('');
    setSearchSuccess('');
  };

  const handleReservationSearch = async (e) => {
    e.preventDefault();
    
    if (!reservationSearch.email.trim() && !reservationSearch.reservationCode.trim()) {
      setSearchError('Lütfen e-posta adresi veya rezervasyon kodu girin.');
      return;
    }

    setIsSearching(true);
    setSearchError('');
    setSearchSuccess('');
    setReservations([]);

    try {
      if (reservationSearch.email.trim()) {
        // E-posta ile arama
        const result = await getReservationsByEmail(reservationSearch.email.trim());
        
        if (result.success) {
          if (result.reservations.length > 0) {
            setReservations(result.reservations);
            setSearchSuccess(`${result.reservations.length} rezervasyon bulundu!`);
          } else {
            setSearchError('Bu e-posta adresine ait rezervasyon bulunamadı.');
          }
        } else {
          setSearchError(result.error || 'Rezervasyon arama sırasında bir hata oluştu.');
        }
      } else {
        // Rezervasyon kodu ile arama
        const result = await getReservationByCode(reservationSearch.reservationCode.trim());
        
        if (result.success) {
          setReservations([result.reservation]);
          setSearchSuccess('Rezervasyon bulundu!');
        } else {
          setSearchError(result.error || 'Rezervasyon bulunamadı.');
        }
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchError('Arama sırasında bir hata oluştu.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (loginError) {
      setLoginError('');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    if (!loginForm.email || !loginForm.password) {
      setLoginError('Lütfen e-posta ve şifre alanlarını doldurun.');
      return;
    }

    setIsLoggingIn(true);
    setLoginError('');

    try {
      const result = await directLogin(loginForm.email, loginForm.password);
      
      if (result.success) {
        // Başarılı giriş - modal kapanacak ve kullanıcı state'i güncellenecek
        closeModal();
      } else {
        setLoginError(result.error);
      }
    } catch (error) {
      setLoginError('Giriş yapılırken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <div className="header-top-content">
            <div className="company-info">
              <span className="tourism-license">Mika Turizm Belge No: 3073</span>
            </div>
            <div className="header-top-actions">
              <Link to="/sales-offices" className="top-link framed-link" id="sales-office" title="Satış Ofislerimiz">
                <MapPin size={14} />
                Satış Ofislerimiz
              </Link>
              <button 
                className="top-link framed-link phone-link" 
                id="header-phone" 
                title="0 850 333 3 333"
                onClick={() => openModal('callback')}
              >
                <Phone size={14} />
                <span className="phone-number">0 850 333 3 333</span>
              </button>
              <button 
                className="top-link framed-link" 
                title="Rezervasyonlarım"
                onClick={() => openModal('reservations')}
              >
                Rezervasyonlarım
              </button>
              
              {/* Kullanıcı Dropdown veya Giriş Butonu */}
              {user ? (
                <div className="user-dropdown-container">
                  <button 
                    className="user-button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    onMouseEnter={() => !isMobile && setUserDropdownOpen(true)}
                    onMouseLeave={() => !isMobile && setUserDropdownOpen(false)}
                  >
                    <span className="user-email">{user.email}</span>
                    <User size={16} />
                  </button>
                  
                  {userDropdownOpen && (
                    <div 
                      className="user-dropdown"
                      onMouseEnter={() => !isMobile && setUserDropdownOpen(true)}
                      onMouseLeave={() => !isMobile && setUserDropdownOpen(false)}
                    >
                      <div className="user-dropdown-header">
                        <div className="user-greeting">Merhaba, {user.displayName || user.email.split('@')[0]}</div>
                        <div className="user-points">
                          <Crown size={14} />
                          Harcanabilir TB Club Puanı 0.00
                        </div>
                      </div>
                      
                      <div className="user-dropdown-divider"></div>
                      
                      <div className="user-dropdown-menu">
                        <Link to="/user/account?tab=account" className="dropdown-item">
                          <Settings size={16} />
                          Hesap Bilgilerim
                        </Link>
                        <Link to="/user/account?tab=reservations" className="dropdown-item">
                          <User size={16} />
                          Rezervasyonlarım
                        </Link>
                        <Link to="/user/account?tab=reviews" className="dropdown-item">
                          <Star size={16} />
                          Değerlendirmelerim
                        </Link>
                        <Link to="/user/account?tab=club" className="dropdown-item">
                          <Crown size={16} />
                          TB Club
                        </Link>
                        <Link to="/user/account?tab=favorites" className="dropdown-item">
                          <Heart size={16} />
                          Favorilerim
                        </Link>
                        <div className="user-dropdown-divider"></div>
                        <button className="dropdown-item logout" onClick={handleLogout}>
                          <LogOut size={16} />
                          Çıkış
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link 
                    to="/login"
                    className="top-link framed-link" 
                    title="Üye Ol"
                  >
                    Üye Ol
                  </Link>
                  <button 
                    className="top-link framed-link" 
                    title="Giriş Yap"
                    onClick={() => openModal('member')}
                  >
                    Giriş Yapın
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <DiscountBanner />

      <div className="header-main">
        <div className="container">
          <div className="header-main-content">
            {/* Mobile Hamburger Button */}
            <div className="mobile-menu-trigger">
              <button 
                className="menu-btn"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            <Link to="/" className="logo">
              <h1>TatilBudur</h1>
              <span>.com</span>
            </Link>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && isMobile && (
              <div
                className="mobile-menu-overlay"
                onClick={handleMobileMenuClose}
              />
            )}

            <nav className={`main-nav ${isMenuOpen ? 'nav-open' : ''}`} onMouseLeave={handleMouseLeave}>
              {/* Mobile Menu Content */}
              {isMobile && isMenuOpen && (
                <>
                  {/* Mobile Menu Header */}
                  <div className="mobile-menu-header">
                    <div className="mobile-menu-logo">
                      <h3>TatilBudur.com</h3>
                    </div>
                    <button
                      className="mobile-menu-close"
                      onClick={handleMobileMenuClose}
                      aria-label="Menüyü Kapat"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Mobile Menu Categories */}
                  <div className={`mobile-menu-category ${activeDropdown === 'hotels' ? 'active' : ''}`}>
                    <button
                      className="mobile-category-header"
                      onClick={() => handleDropdownClick('hotels')}
                    >
                      <div className="mobile-category-title">
                        <svg className="mobile-category-icon" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z"/>
                        </svg>
                        Otel
                      </div>
                      <span className="mobile-category-arrow">▼</span>
                    </button>
                    <div className="mobile-category-content">
                      {isLoadingHotels ? (
                        <div className="mobile-category-item">
                          <span>Yükleniyor...</span>
                        </div>
                      ) : (
                        <>
                          {generateMenuData().hotels.content.domestic.destinations.slice(0, 8).map((destination, index) => (
                            <Link key={index} to={destination.link} className="mobile-category-item">
                              <span>{destination.name}</span>
                              <span className="mobile-item-count">{destination.count}</span>
                            </Link>
                          ))}
                          <Link to="/hotels" className="mobile-category-item">
                            <span>Tüm Oteller</span>
                            <span className="mobile-item-count">{hotels.length}</span>
                          </Link>
                        </>
                      )}
                    </div>
                  </div>

                  <div className={`mobile-menu-category ${activeDropdown === 'tours' ? 'active' : ''}`}>
                    <button
                      className="mobile-category-header"
                      onClick={() => handleDropdownClick('tours')}
                    >
                      <div className="mobile-category-title">
                        <svg className="mobile-category-icon" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 2L3 7v11a1 1 0 001 1h3v-6h6v6h3a1 1 0 001-1V7l-7-5z"/>
                        </svg>
                        Tur
                      </div>
                      <span className="mobile-category-arrow">▼</span>
                    </button>
                    <div className="mobile-category-content">
                      <Link to="/tours/cappadocia" className="mobile-category-item">
                        <span>Kapadokya Turları</span>
                        <span className="mobile-item-count">45</span>
                      </Link>
                      <Link to="/tours/pamukkale" className="mobile-category-item">
                        <span>Pamukkale Turları</span>
                        <span className="mobile-item-count">28</span>
                      </Link>
                      <Link to="/tours/istanbul" className="mobile-category-item">
                        <span>İstanbul Turları</span>
                        <span className="mobile-item-count">67</span>
                      </Link>
                      <Link to="/tours/ephesus" className="mobile-category-item">
                        <span>Efes Turları</span>
                        <span className="mobile-item-count">23</span>
                      </Link>
                    </div>
                  </div>

                  <div className={`mobile-menu-category ${activeDropdown === 'campaigns' ? 'active' : ''}`}>
                    <button
                      className="mobile-category-header"
                      onClick={() => handleDropdownClick('campaigns')}
                    >
                      <div className="mobile-category-title">
                        <svg className="mobile-category-icon" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        Kampanyalar
                      </div>
                      <span className="mobile-category-arrow">▼</span>
                    </button>
                    <div className="mobile-category-content">
                      <Link to="/campaigns/early-bird" className="mobile-category-item">
                        <span>Erken Rezervasyon</span>
                        <span className="mobile-item-count">%30</span>
                      </Link>
                      <Link to="/campaigns/last-minute" className="mobile-category-item">
                        <span>Son Dakika</span>
                        <span className="mobile-item-count">%25</span>
                      </Link>
                      <Link to="/campaigns/family" className="mobile-category-item">
                        <span>Aile Kampanyaları</span>
                        <span className="mobile-item-count">%20</span>
                      </Link>
                    </div>
                  </div>

                  {/* Special Items */}
                  <div className="mobile-special-items">
                    <Link to="/september-deals" className="mobile-special-item deals">
                      <Crown size={16} style={{ marginRight: '8px' }} />
                      Eylül Fırsatları
                    </Link>
                    <Link to="/premium" className="mobile-special-item premium">
                      <Crown size={16} style={{ marginRight: '8px' }} />
                      Premium
                    </Link>
                    <Link to="/tbclub" className="mobile-special-item tbclub">
                      <Crown size={16} style={{ marginRight: '8px' }} />
                      TBClub
                    </Link>
                  </div>
                </>
              )}

              {/* Desktop Menu Content */}
              {!isMobile && (
                <>
                  <div
                    className={`nav-dropdown ${activeDropdown === 'hotels' ? 'active' : ''}`}
                    onMouseEnter={() => handleMouseEnter('hotels')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      className="nav-link dropdown-toggle"
                      onClick={() => handleDropdownClick('hotels')}
                    >
                      Otel <span className="dropdown-arrow">▼</span>
                    </button>
        <div
          className="dropdown-menu mega-menu"
          style={{ top: `${navbarHeight}px` }}
        >
          {renderMegaMenu('hotels')}
                </div>
              </div>

              <div 
                className={`nav-dropdown ${activeDropdown === 'tours' ? 'active' : ''}`}
                onMouseEnter={() => handleMouseEnter('tours')}
                onMouseLeave={handleMouseLeave}
              >
                <button 
                  className="nav-link dropdown-toggle"
                  onClick={() => handleDropdownClick('tours')}
                >
                  Tur <span className="dropdown-arrow">▼</span>
                </button>
                <div 
                  className="dropdown-menu mega-menu"
                  style={{ top: `${navbarHeight}px` }}
                >
                  <div className="mega-menu-container">
                    <div className="mega-menu-left">
                      <div className="mega-menu-cards">
                        <Link to="/tours/domestic" className="mega-card active" data-target="domestic">
                          <div className="mega-card-img">
                            <img src="https://picsum.photos/150/100?random=1" alt="Yurtiçi Turlar" loading="eager" />
                          </div>
                          <div className="mega-card-content">Yurtiçi Turlar</div>
                          <span className="mega-card-arrow">›</span>
                        </Link>
                        <Link to="/tours/international" className="mega-card" data-target="international">
                          <div className="mega-card-img">
                            <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=150&h=100&fit=crop" alt="Yurtdışı Turlar" />
                          </div>
                          <div className="mega-card-content">Yurtdışı Turlar</div>
                          <span className="mega-card-arrow">›</span>
                        </Link>
                        <Link to="/tours/cultural" className="mega-card" data-target="cultural">
                          <div className="mega-card-img">
                            <img src="https://images.unsplash.com/photo-1549144511-f099e773c147?w=150&h=100&fit=crop" alt="Kültür Turları" />
                          </div>
                          <div className="mega-card-content">Kültür Turları</div>
                          <span className="mega-card-arrow">›</span>
                        </Link>
                        <Link to="/tours/adventure" className="mega-card" data-target="adventure">
                          <div className="mega-card-img">
                            <img src="https://picsum.photos/150/100?random=2" alt="Macera Turları" loading="eager" />
                          </div>
                          <div className="mega-card-content">Macera Turları</div>
                          <span className="mega-card-arrow">›</span>
                        </Link>
                        <Link to="/tours/cruise" className="mega-card" data-target="cruise">
                          <div className="mega-card-img">
                            <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=150&h=100&fit=crop" alt="Cruise Turları" />
                          </div>
                          <div className="mega-card-content">Cruise Turları</div>
                          <span className="mega-card-arrow">›</span>
                        </Link>
                        <Link to="/tours/group" className="mega-card" data-target="group">
                          <div className="mega-card-img">
                            <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=150&h=100&fit=crop" alt="Grup Turları" />
                          </div>
                          <div className="mega-card-content">Grup Turları</div>
                          <span className="mega-card-arrow">›</span>
                        </Link>
                      </div>
                    </div>
                    <div className="mega-menu-right">
                      <div className="mega-content" id="domestic-tours-content">
                        <Link to="/tours/cappadocia" className="mega-content-row">
                          <span className="mega-content-link">Kapadokya Turları</span>
                          <span className="mega-content-count">45 Tur</span>
                        </Link>
                        <Link to="/tours/pamukkale" className="mega-content-row">
                          <span className="mega-content-link">Pamukkale Turları</span>
                          <span className="mega-content-count">28 Tur</span>
                        </Link>
                        <Link to="/tours/istanbul" className="mega-content-row">
                          <span className="mega-content-link">İstanbul Turları</span>
                          <span className="mega-content-count">67 Tur</span>
                        </Link>
                        <Link to="/tours/ephesus" className="mega-content-row">
                          <span className="mega-content-link">Efes Turları</span>
                          <span className="mega-content-count">23 Tur</span>
                        </Link>
                        <Link to="/tours/antalya" className="mega-content-row">
                          <span className="mega-content-link">Antalya Turları</span>
                          <span className="mega-content-count">34 Tur</span>
                        </Link>
                        <Link to="/tours/trabzon" className="mega-content-row">
                          <span className="mega-content-link">Trabzon Turları</span>
                          <span className="mega-content-count">18 Tur</span>
                        </Link>
                        <Link to="/tours/bursa" className="mega-content-row">
                          <span className="mega-content-link">Bursa Turları</span>
                          <span className="mega-content-count">12 Tur</span>
                        </Link>
                        <Link to="/tours/konya" className="mega-content-row">
                          <span className="mega-content-link">Konya Turları</span>
                          <span className="mega-content-count">15 Tur</span>
                        </Link>
                        <Link to="/tours" className="mega-content-all">
                          Tümünü gör →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div 
                className={`nav-dropdown ${activeDropdown === 'september' ? 'active' : ''}`}
                onMouseEnter={() => handleMouseEnter('september')}
                onMouseLeave={handleMouseLeave}
              >
                <button 
                  className="nav-link dropdown-toggle special-offer"
                  onClick={() => handleDropdownClick('september')}
                >
                  Eylül Fırsatları <span className="dropdown-arrow">▼</span>
                </button>
                <div 
                  className="dropdown-menu mega-menu"
                  style={{ top: `${navbarHeight}px` }}
                >
                  <div className="mega-menu-container">
                    <div className="mega-menu-left">
                      <div className="mega-menu-cards">
                        <Link to="/september-deals/hotels" className="mega-card active" data-target="hotels">
                          <div className="mega-card-img">
                            <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=150&h=100&fit=crop" alt="Eylül Otel Fırsatları" />
                          </div>
                          <div className="mega-card-content">Otel Fırsatları</div>
                          <span className="mega-card-arrow">›</span>
                        </Link>
                        <Link to="/september-deals/tours" className="mega-card" data-target="tours">
                          <div className="mega-card-img">
                            <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=150&h=100&fit=crop" alt="Eylül Tur Fırsatları" />
                          </div>
                          <div className="mega-card-content">Tur Fırsatları</div>
                          <span className="mega-card-arrow">›</span>
                        </Link>
                        <Link to="/september-deals/flights" className="mega-card" data-target="flights">
                          <div className="mega-card-img">
                            <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=150&h=100&fit=crop" alt="Eylül Uçak Fırsatları" />
                          </div>
                          <div className="mega-card-content">Uçak Fırsatları</div>
                          <span className="mega-card-arrow">›</span>
                        </Link>
                        <Link to="/september-deals/packages" className="mega-card" data-target="packages">
                          <div className="mega-card-img">
                            <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=150&h=100&fit=crop" alt="Eylül Paket Fırsatları" />
                          </div>
                          <div className="mega-card-content">Paket Fırsatları</div>
                          <span className="mega-card-arrow">›</span>
                        </Link>
                        <Link to="/september-deals/last-minute" className="mega-card" data-target="last-minute">
                          <div className="mega-card-img">
                            <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=150&h=100&fit=crop" alt="Son Dakika" />
                          </div>
                          <div className="mega-card-content">Son Dakika</div>
                          <span className="mega-card-arrow">›</span>
                        </Link>
                        <Link to="/september-deals/exclusive" className="mega-card" data-target="exclusive">
                          <div className="mega-card-img">
                            <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=150&h=100&fit=crop" alt="Özel Fırsatlar" />
                          </div>
                          <div className="mega-card-content">Özel Fırsatlar</div>
                          <span className="mega-card-arrow">›</span>
                        </Link>
                      </div>
                    </div>
                    <div className="mega-menu-right">
                      <div className="mega-content" id="september-hotels-content">
                        <Link to="/september-deals/antalya" className="mega-content-row">
                          <span className="mega-content-link">Antalya Fırsatları</span>
                          <span className="mega-content-count">%40 İndirim</span>
                        </Link>
                        <Link to="/september-deals/bodrum" className="mega-content-row">
                          <span className="mega-content-link">Bodrum Fırsatları</span>
                          <span className="mega-content-count">%35 İndirim</span>
                        </Link>
                        <Link to="/september-deals/marmaris" className="mega-content-row">
                          <span className="mega-content-link">Marmaris Fırsatları</span>
                          <span className="mega-content-count">%30 İndirim</span>
                        </Link>
                        <Link to="/september-deals/alanya" className="mega-content-row">
                          <span className="mega-content-link">Alanya Fırsatları</span>
                          <span className="mega-content-count">%25 İndirim</span>
                        </Link>
                        <Link to="/september-deals/kusadasi" className="mega-content-row">
                          <span className="mega-content-link">Kuşadası Fırsatları</span>
                          <span className="mega-content-count">%38 İndirim</span>
                        </Link>
                        <Link to="/september-deals/fethiye" className="mega-content-row">
                          <span className="mega-content-link">Fethiye Fırsatları</span>
                          <span className="mega-content-count">%32 İndirim</span>
                        </Link>
                        <Link to="/september-deals/istanbul" className="mega-content-row">
                          <span className="mega-content-link">İstanbul Fırsatları</span>
                          <span className="mega-content-count">%28 İndirim</span>
                        </Link>
                        <Link to="/september-deals/cappadocia" className="mega-content-row">
                          <span className="mega-content-link">Kapadokya Fırsatları</span>
                          <span className="mega-content-count">%45 İndirim</span>
                        </Link>
                        <Link to="/september-deals" className="mega-content-all">
                          Tüm Fırsatları Gör →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div 
                className={`nav-dropdown ${activeDropdown === 'campaigns' ? 'active' : ''}`}
                onMouseEnter={() => handleMouseEnter('campaigns')}
                onMouseLeave={handleMouseLeave}
              >
                <button 
                  className="nav-link dropdown-toggle"
                  onClick={() => handleDropdownClick('campaigns')}
                >
                  Kampanyalar <span className="dropdown-arrow">▼</span>
                </button>
                <div 
                  className="dropdown-menu mega-menu"
                  style={{ top: `${navbarHeight}px` }}
                >
                  <div className="mega-menu-container">
                    <div className="mega-menu-left">
                      <div className="mega-menu-cards">
                        <Link to="/campaigns/early-bird" className="mega-card active" data-target="early-bird">
                          <div className="mega-card-img">
                            <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=150&h=100&fit=crop" alt="Erken Rezervasyon" />
                          </div>
                          <div className="mega-card-content">Erken Rezervasyon</div>
                          <span className="mega-card-arrow">›</span>
                        </Link>
                        <Link to="/campaigns/last-minute" className="mega-card" data-target="last-minute">
                          <div className="mega-card-img">
                            <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=150&h=100&fit=crop" alt="Son Dakika" />
                          </div>
                          <div className="mega-card-content">Son Dakika Fırsatları</div>
                          <span className="mega-card-arrow">›</span>
                        </Link>
                        <Link to="/campaigns/family" className="mega-card" data-target="family">
                          <div className="mega-card-img">
                            <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=150&h=100&fit=crop" alt="Aile Kampanyaları" />
                          </div>
                          <div className="mega-card-content">Aile Kampanyaları</div>
                          <span className="mega-card-arrow">›</span>
                        </Link>
                        <Link to="/campaigns/honeymoon" className="mega-card" data-target="honeymoon">
                          <div className="mega-card-img">
                            <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=150&h=100&fit=crop" alt="Balayı" />
                          </div>
                          <div className="mega-card-content">Balayı Kampanyaları</div>
                          <span className="mega-card-arrow">›</span>
                        </Link>
                        <Link to="/campaigns/spa" className="mega-card" data-target="spa">
                          <div className="mega-card-img">
                            <img src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=150&h=100&fit=crop" alt="Spa & Wellness" />
                          </div>
                          <div className="mega-card-content">Spa & Wellness</div>
                          <span className="mega-card-arrow">›</span>
                        </Link>
                      </div>
                    </div>
                    <div className="mega-menu-right">
                      <div className="mega-content" id="early-bird-content">
                        <Link to="/campaigns/early-bird-hotels" className="mega-content-row">
                          <span className="mega-content-link">Erken Rezervasyon Otelleri</span>
                          <span className="mega-content-count">%30 İndirim</span>
                        </Link>
                        <Link to="/campaigns/early-bird-tours" className="mega-content-row">
                          <span className="mega-content-link">Erken Rezervasyon Turları</span>
                          <span className="mega-content-count">%25 İndirim</span>
                        </Link>
                        <Link to="/campaigns/early-bird-flights" className="mega-content-row">
                          <span className="mega-content-link">Erken Rezervasyon Uçaklar</span>
                          <span className="mega-content-count">%20 İndirim</span>
                        </Link>
                        <Link to="/campaigns/early-bird-packages" className="mega-content-row">
                          <span className="mega-content-link">Paket Kampanyalar</span>
                          <span className="mega-content-count">%40 İndirim</span>
                        </Link>
                        <Link to="/campaigns" className="mega-content-all">
                          Tüm Kampanyaları Gör →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

                  <Link to="/premium" className="nav-link premium">
                    <Crown size={16} className="premium-icon" />
                    PREMIUM
                  </Link>

                  <Link to="/tbclub" className="nav-link tbclub">
                    <Crown size={16} className="tbclub-icon" />
                    TBClub
                  </Link>
                </>
              )}
            </nav>

            <div className="header-actions">
              {/* Desktop actions can go here if needed */}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal isOpen={activeModal === 'login'} onClose={closeModal}>
        <div className="container">
          <div className="form-container">
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
              <div style={{padding: 28}}>
                <h2 style={{margin: 0, fontSize: 20}}>TatilBudur'a Hoş Geldiniz.</h2>
                <p style={{color: '#666', fontSize: 13, marginTop: 8}}>
                  E-posta adresini girerek hesabına giriş yapabilir veya üye olabilirsin.
                </p>
                <input type="email" placeholder="E-Posta adresi *" style={{
                  width: '100%', padding: '12px 14px', border: '1px solid #dee2e6',
                  borderRadius: 8, fontSize: 14
                }} />
                <button style={{
                  marginTop: 16, width: '100%', padding: '12px 14px', background: '#0b5ed7',
                  color: 'white', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer'
                }}>Devam Et</button>
                <p style={{color: '#666', fontSize: 12, marginTop: 12}}>
                  Kişisel Verileriniz, 6698 sayılı yasa ve Aydınlatma metni kapsamında işlenmektedir.
                </p>
              </div>
              <div style={{background: '#0b5ed7', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28}}>
                <div>
                  <img src="https://images.unsplash.com/photo-1606761568499-6d2451b23c56?w=320&h=220&fit=crop" alt="Travel" style={{borderRadius:8}} />
                  <div style={{marginTop:12,fontWeight:700}}>Hemen Üye Ol, Tatilini Planlamaya Başla!</div>
                  <ul style={{marginTop:8, paddingLeft:18}}>
                    <li>Rezervasyonlarını Kolayca Yönet</li>
                    <li>Kampanya ve Fırsatları Takip Et</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'callback'} onClose={closeModal}>
        <div className="container">
          <div className="form-container">
            <h2 style={{marginTop: 0}}>Sizi Arayalım</h2>
            <div style={{marginTop: 16}}>
              <label style={{fontSize: 12, color: '#666'}}>Talep Konusu</label>
              <select style={{width:'100%', padding:'12px 14px', border:'1px solid #dee2e6', borderRadius:8}}>
                <option>Yurtiçi Otel veya Paket Tur Rezervasyon Talebi</option>
                <option>Yurtdışı Tur Rezervasyon Talebi</option>
                <option>Uçak Bileti Talebi</option>
              </select>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'150px 1fr', gap:12, marginTop:12}}>
              <select style={{padding:'12px 14px', border:'1px solid #dee2e6', borderRadius:8, maxHeight:'200px', overflowY:'auto'}}>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+49">🇩🇪 +49</option>
                <option value="+33">🇫🇷 +33</option>
                <option value="+39">🇮🇹 +39</option>
                <option value="+34">🇪🇸 +34</option>
                <option value="+31">🇳🇱 +31</option>
                <option value="+41">🇨🇭 +41</option>
                <option value="+43">🇦🇹 +43</option>
                <option value="+32">🇧🇪 +32</option>
                <option value="+45">🇩🇰 +45</option>
                <option value="+46">🇸🇪 +46</option>
                <option value="+47">🇳🇴 +47</option>
                <option value="+358">🇫🇮 +358</option>
                <option value="+353">🇮🇪 +353</option>
                <option value="+351">🇵🇹 +351</option>
                <option value="+30">🇬🇷 +30</option>
                <option value="+420">🇨🇿 +420</option>
                <option value="+48">🇵🇱 +48</option>
                <option value="+36">🇭🇺 +36</option>
                <option value="+421">🇸🇰 +421</option>
                <option value="+386">🇸🇮 +386</option>
                <option value="+385">🇭🇷 +385</option>
                <option value="+381">🇷🇸 +381</option>
                <option value="+359">🇧🇬 +359</option>
                <option value="+40">🇷🇴 +40</option>
                <option value="+370">🇱🇹 +370</option>
                <option value="+371">🇱🇻 +371</option>
                <option value="+372">🇪🇪 +372</option>
                <option value="+7">🇷🇺 +7</option>
                <option value="+380">🇺🇦 +380</option>
                <option value="+375">🇧🇾 +375</option>
                <option value="+355">🇦🇱 +355</option>
                <option value="+389">🇲🇰 +389</option>
                <option value="+382">🇲🇪 +382</option>
                <option value="+387">🇧🇦 +387</option>
                <option value="+383">🇽🇰 +383</option>
                <option value="+377">🇲🇨 +377</option>
                <option value="+378">🇸🇲 +378</option>
                <option value="+376">🇦🇩 +376</option>
                <option value="+423">🇱🇮 +423</option>
                <option value="+352">🇱🇺 +352</option>
                <option value="+356">🇲🇹 +356</option>
                <option value="+357">🇨🇾 +357</option>
                <option value="+81">🇯🇵 +81</option>
                <option value="+82">🇰🇷 +82</option>
                <option value="+86">🇨🇳 +86</option>
                <option value="+852">🇭🇰 +852</option>
                <option value="+886">🇹🇼 +886</option>
                <option value="+65">🇸🇬 +65</option>
                <option value="+60">🇲🇾 +60</option>
                <option value="+66">🇹🇭 +66</option>
                <option value="+84">🇻🇳 +84</option>
                <option value="+63">🇵🇭 +63</option>
                <option value="+62">🇮🇩 +62</option>
                <option value="+91">🇮🇳 +91</option>
                <option value="+92">🇵🇰 +92</option>
                <option value="+880">🇧🇩 +880</option>
                <option value="+94">🇱🇰 +94</option>
                <option value="+977">🇳🇵 +977</option>
                <option value="+975">🇧🇹 +975</option>
                <option value="+960">🇲🇻 +960</option>
                <option value="+61">🇦🇺 +61</option>
                <option value="+64">🇳🇿 +64</option>
                <option value="+55">🇧🇷 +55</option>
                <option value="+54">🇦🇷 +54</option>
                <option value="+56">🇨🇱 +56</option>
                <option value="+57">🇨🇴 +57</option>
                <option value="+51">🇵🇪 +51</option>
                <option value="+58">🇻🇪 +58</option>
                <option value="+52">🇲🇽 +52</option>
                <option value="+1">🇨🇦 +1</option>
                <option value="+966">🇸🇦 +966</option>
                <option value="+971">🇦🇪 +971</option>
                <option value="+974">🇶🇦 +974</option>
                <option value="+965">🇰🇼 +965</option>
                <option value="+973">🇧🇭 +973</option>
                <option value="+968">🇴🇲 +968</option>
                <option value="+962">🇯🇴 +962</option>
                <option value="+961">🇱🇧 +961</option>
                <option value="+972">🇮🇱 +972</option>
                <option value="+20">🇪🇬 +20</option>
                <option value="+212">🇲🇦 +212</option>
                <option value="+213">🇩🇿 +213</option>
                <option value="+216">🇹🇳 +216</option>
                <option value="+218">🇱🇾 +218</option>
                <option value="+249">🇸🇩 +249</option>
                <option value="+27">🇿🇦 +27</option>
                <option value="+234">🇳🇬 +234</option>
                <option value="+254">🇰🇪 +254</option>
                <option value="+233">🇬🇭 +233</option>
                <option value="+225">🇨🇮 +225</option>
                <option value="+221">🇸🇳 +221</option>
                <option value="+226">🇧🇫 +226</option>
                <option value="+223">🇲🇱 +223</option>
                <option value="+227">🇳🇪 +227</option>
                <option value="+228">🇹🇬 +228</option>
                <option value="+229">🇧🇯 +229</option>
                <option value="+224">🇬🇳 +224</option>
                <option value="+245">🇬🇼 +245</option>
                <option value="+238">🇨🇻 +238</option>
                <option value="+220">🇬🇲 +220</option>
                <option value="+232">🇸🇱 +232</option>
                <option value="+231">🇱🇷 +231</option>
              </select>
              <input placeholder="( ___ ) ________" style={{padding:'12px 14px', border:'1px solid #dee2e6', borderRadius:8}} />
            </div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:12}}>
              <input placeholder="Adınız *" style={{padding:'12px 14px', border:'1px solid #dee2e6', borderRadius:8}} />
              <input placeholder="Soyadınız *" style={{padding:'12px 14px', border:'1px solid #dee2e6', borderRadius:8}} />
            </div>
            <div style={{marginTop:12, color:'#444', fontSize:12}}>
              Kişisel Verileriniz, 6698 sayılı yasa ve Aydınlatma metni kapsamında işlenmektedir.
            </div>
            <div style={{marginTop:12, display:'grid', gap:8}}>
              <label><input type="checkbox" /> KVKK kapsamında hazırlanan Açık Rıza Metni'ni onaylıyorum.</label>
              <label><input type="checkbox" /> Ticari elektronik ileti gönderimine onay veriyorum.</label>
              <div style={{display:'flex', gap:12}}>
                <label><input type="checkbox" /> Telefon</label>
                <label><input type="checkbox" /> SMS</label>
              </div>
            </div>
            <button style={{
              marginTop: 16,
              padding: '12px 18px',
              background: '#0b5ed7',
              color: 'white',
              border: 'none',
              borderRadius: 12,
              fontWeight: 700
            }}>Gönder</button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'member'} onClose={closeModal}>
        <div className="container">
          <div className="form-container">
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
              <div style={{padding: 28}}>
                <h2 style={{margin: 0, fontSize: 20}}>Giriş Yapın</h2>
                <p style={{color: '#666', fontSize: 13, marginTop: 8}}>
                  E-posta adresiniz ve şifreniz ile giriş yapabilirsiniz.
                </p>
                
                {loginError && (
                  <div style={{
                    background: '#f8d7da',
                    color: '#721c24',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    marginBottom: '12px',
                    border: '1px solid #f5c6cb'
                  }}>
                    {loginError}
                  </div>
                )}
                
                <form onSubmit={handleLoginSubmit}>
                  <input 
                    type="email" 
                    name="email"
                    value={loginForm.email}
                    onChange={handleLoginInputChange}
                    placeholder="E-Posta adresi *" 
                    required
                    disabled={isLoggingIn}
                    style={{
                      width: '100%', padding: '12px 14px', border: '1px solid #dee2e6',
                      borderRadius: 8, fontSize: 14, marginBottom: 12
                    }} 
                  />
                  <input 
                    type="password" 
                    name="password"
                    value={loginForm.password}
                    onChange={handleLoginInputChange}
                    placeholder="Şifre *" 
                    required
                    disabled={isLoggingIn}
                    style={{
                      width: '100%', padding: '12px 14px', border: '1px solid #dee2e6',
                      borderRadius: 8, fontSize: 14, marginBottom: 16
                    }} 
                  />
                  <button 
                    type="submit"
                    disabled={isLoggingIn}
                    style={{
                      width: '100%', padding: '12px 14px', background: isLoggingIn ? '#6c757d' : '#0b5ed7',
                      color: 'white', border: 'none', borderRadius: 10, fontWeight: 700, cursor: isLoggingIn ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {isLoggingIn ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                  </button>
                </form>
                
                <div style={{marginTop: 12, textAlign: 'center'}}>
                  <a href="#" style={{color: '#0b5ed7', fontSize: 12, textDecoration: 'none'}}>Şifremi Unuttum</a>
                </div>
                <p style={{color: '#666', fontSize: 12, marginTop: 12}}>
                  Kişisel Verileriniz, 6698 sayılı yasa ve Aydınlatma metni kapsamında işlenmektedir.
                </p>
              </div>
              <div style={{background: '#0b5ed7', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28}}>
                <div>
                  <img src="https://images.unsplash.com/photo-1606761568499-6d2451b23c56?w=320&h=220&fit=crop" alt="Travel" style={{borderRadius:8}} />
                  <div style={{marginTop:12,fontWeight:700}}>Hemen Üye Ol, Tatilini Planlamaya Başla!</div>
                  <ul style={{marginTop:8, paddingLeft:18}}>
                    <li>Rezervasyonlarını Kolayca Yönet</li>
                    <li>Kampanya ve Fırsatları Takip Et</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'reservations'} onClose={closeReservationSearch}>
        <div className="container">
          <div className="form-container">
            <h2 style={{marginTop: 0}}>Rezervasyon Kontrol</h2>
            <p style={{color:'#666'}}>E-posta adresinizi veya rezervasyon kodunuzu girerek rezervasyon detaylarınızı görüntüleyebilirsiniz.</p>
            
            <form onSubmit={handleReservationSearch}>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
                <div>
                  <label style={{fontSize: 12, color: '#666'}}>E-Posta Adresi*</label>
                  <input 
                    type="email"
                    value={reservationSearch.email}
                    onChange={(e) => setReservationSearch(prev => ({...prev, email: e.target.value}))}
                    placeholder="ornek@email.com"
                    style={{width:'100%', padding:'12px 14px', border:'1px solid #dee2e6', borderRadius:8}} 
                  />
                </div>
                <div>
                  <label style={{fontSize: 12, color: '#666'}}>Rezervasyon Kodu*</label>
                  <input 
                    type="text"
                    value={reservationSearch.reservationCode}
                    onChange={(e) => setReservationSearch(prev => ({...prev, reservationCode: e.target.value}))}
                    placeholder="1234567890123456"
                    style={{width:'100%', padding:'12px 14px', border:'1px solid #dee2e6', borderRadius:8}} 
                  />
                </div>
              </div>
              
              {/* Error Message */}
              {searchError && (
                <div style={{
                  marginTop: 16,
                  padding: '12px 16px',
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: 8,
                  color: '#dc2626',
                  fontSize: 14
                }}>
                  {searchError}
                </div>
              )}

              {/* Success Message */}
              {searchSuccess && (
                <div style={{
                  marginTop: 16,
                  padding: '12px 16px',
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: 8,
                  color: '#16a34a',
                  fontSize: 14
                }}>
                  {searchSuccess}
                </div>
              )}

              <button 
                type="submit"
                disabled={isSearching}
                style={{
                  marginTop: 16,
                  padding: '12px 18px',
                  background: isSearching ? '#6b7280' : '#0b5ed7',
                  color: 'white',
                  border: 'none',
                  borderRadius: 12,
                  fontWeight: 700,
                  cursor: isSearching ? 'not-allowed' : 'pointer',
                  width: '100%'
                }}
              >
                {isSearching ? 'Aranıyor...' : 'Rezervasyonunu Kontrol Et'}
              </button>
            </form>

            {/* Rezervasyon Listesi */}
            {reservations.length > 0 && (
              <div style={{marginTop: 24}}>
                <h3 style={{marginBottom: 16, color: '#374151'}}>
                  Bulunan Rezervasyonlar ({reservations.length})
                </h3>
                {reservations.map((reservation, index) => (
                  <div key={reservation.id || reservation.reservationCode || index} style={{
                    background: 'white',
                    border: '1px solid #dee2e6',
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 12,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px'}}>
                      <div>
                        <h4 style={{margin: '0 0 4px 0', color: '#374151', fontSize: '16px'}}>
                          {reservation.hotel.name}
                        </h4>
                        <div style={{color: '#6b7280', fontSize: '14px', marginBottom: '4px'}}>
                          {reservation.hotel.location}
                        </div>
                        <div style={{color: '#0b5ed7', fontSize: '12px', fontWeight: '600'}}>
                          Rezervasyon No: {reservation.reservationCode || reservation.reservationNumber}
                        </div>
                      </div>
                      <div style={{
                        padding: '4px 8px',
                        borderRadius: '12px',
                        background: reservation.status === 'confirmed' ? '#dcfce7' : '#fef3c7',
                        color: reservation.status === 'confirmed' ? '#166534' : '#92400e',
                        fontSize: '10px',
                        fontWeight: '600'
                      }}>
                        {reservation.status === 'confirmed' ? 'Onaylandı' : 'Beklemede'}
                      </div>
                    </div>
                    
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px'}}>
                      <div>
                        <div style={{fontSize: '10px', color: '#6b7280', marginBottom: '2px'}}>Giriş Tarihi</div>
                        <div style={{fontSize: '12px', color: '#374151', fontWeight: '500'}}>
                          {new Date(reservation.bookingData.checkIn).toLocaleDateString('tr-TR')}
                        </div>
                      </div>
                      <div>
                        <div style={{fontSize: '10px', color: '#6b7280', marginBottom: '2px'}}>Çıkış Tarihi</div>
                        <div style={{fontSize: '12px', color: '#374151', fontWeight: '500'}}>
                          {new Date(reservation.bookingData.checkOut).toLocaleDateString('tr-TR')}
                        </div>
                      </div>
                      <div>
                        <div style={{fontSize: '10px', color: '#6b7280', marginBottom: '2px'}}>Misafir Sayısı</div>
                        <div style={{fontSize: '12px', color: '#374151', fontWeight: '500'}}>
                          {reservation.bookingData.adults} Yetişkin
                          {reservation.bookingData.children > 0 && `, ${reservation.bookingData.children} Çocuk`}
                        </div>
                      </div>
                      <div>
                        <div style={{fontSize: '10px', color: '#6b7280', marginBottom: '2px'}}>Toplam Tutar</div>
                        <div style={{fontSize: '12px', color: '#374151', fontWeight: '700'}}>
                          {reservation.totalPrice.toLocaleString('tr-TR', { 
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2 
                          })} ₺
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Modal>

    </header>
  );
};

export default Header;