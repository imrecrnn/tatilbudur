import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Menu, X, Phone, Mail, MapPin, Crown } from 'lucide-react';
import DiscountBanner from './DiscountBanner';
import Modal from './Modal';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeModal, setActiveModal] = useState(null);

  const handleMouseEnter = (dropdownName) => {
    setActiveDropdown(dropdownName);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
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
                title="Rezervasyon Kontrol"
                onClick={() => openModal('reservations')}
              >
                Rezervasyonlarım
              </button>
              <button 
                className="top-link framed-link" 
                title="Giriş Yap"
                onClick={() => openModal('login')}
              >
                Giriş Yapın
              </button>
            </div>
          </div>
        </div>
      </div>

      <DiscountBanner />

      <div className="header-main">
        <div className="container">
          <div className="header-main-content">
            <Link to="/" className="logo">
              <h1>TatilBudur</h1>
              <span>.com</span>
            </Link>

            <nav className={`main-nav ${isMenuOpen ? 'nav-open' : ''}`} onMouseLeave={handleMouseLeave}>
              <div 
                className={`nav-dropdown ${activeDropdown === 'hotels' ? 'active' : ''}`}
                onMouseEnter={() => handleMouseEnter('hotels')}
                onMouseLeave={handleMouseLeave}
              >
                <button 
                  className="nav-link dropdown-toggle"
                >
                  Otel <span className="dropdown-arrow">▼</span>
                </button>
                <div className="dropdown-menu mega-menu">
                  <div className="mega-menu-container">
                    <div className="mega-menu-left">
                      <div className="mega-menu-cards">
                        <Link to="/hotels/domestic" className="mega-card active" data-target="domestic">
                          <div className="mega-card-img">
                            <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=150&h=100&fit=crop" alt="Yurtiçi Oteller" />
                          </div>
                          <div className="mega-card-content">Yurtiçi Oteller</div>
                          <span className="mega-card-arrow">›</span>
                        </Link>
                        <Link to="/hotels/cyprus" className="mega-card" data-target="cyprus">
                          <div className="mega-card-img">
                            <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=150&h=100&fit=crop" alt="Kıbrıs Otelleri" />
                          </div>
                          <div className="mega-card-content">Kıbrıs Otelleri</div>
                          <span className="mega-card-arrow">›</span>
                        </Link>
                        <Link to="/hotels/thermal" className="mega-card" data-target="thermal">
                          <div className="mega-card-img">
                            <img src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=150&h=100&fit=crop" alt="Termal Oteller" />
                          </div>
                          <div className="mega-card-content">Termal Oteller</div>
                          <span className="mega-card-arrow">›</span>
                        </Link>
                        <Link to="/hotels/winter" className="mega-card" data-target="winter">
                          <div className="mega-card-img">
                            <img src="https://images.unsplash.com/photo-1551524164-687a55dd1126?w=150&h=100&fit=crop" alt="Kış Otelleri" />
                          </div>
                          <div className="mega-card-content">Kış Otelleri</div>
                          <span className="mega-card-arrow">›</span>
                        </Link>
                        <Link to="/hotels/city" className="mega-card" data-target="city">
                          <div className="mega-card-img">
                            <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=150&h=100&fit=crop" alt="Şehir Otelleri" />
                          </div>
                          <div className="mega-card-content">Şehir Otelleri</div>
                          <span className="mega-card-arrow">›</span>
                        </Link>
                        <Link to="/hotels/themes" className="mega-card" data-target="themes">
                          <div className="mega-card-img">
                            <img src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=150&h=100&fit=crop" alt="Otel Temaları" />
                          </div>
                          <div className="mega-card-content">Otel Temaları</div>
                          <span className="mega-card-arrow">›</span>
                        </Link>
                        <Link to="/hotels/popular" className="mega-card" data-target="popular">
                          <div className="mega-card-img">
                            <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=150&h=100&fit=crop" alt="Popüler Kategoriler" />
                          </div>
                          <div className="mega-card-content">Popüler Kategoriler</div>
                          <span className="mega-card-arrow">›</span>
                        </Link>
                      </div>
                    </div>
                    <div className="mega-menu-right">
                      <div className="mega-content" id="domestic-content">
                        <Link to="/hotels/antalya" className="mega-content-row">
                          <span className="mega-content-link">Antalya Otelleri</span>
                          <span className="mega-content-count">1099 Otel</span>
                        </Link>
                        <Link to="/hotels/bodrum" className="mega-content-row">
                          <span className="mega-content-link">Bodrum Otelleri</span>
                          <span className="mega-content-count">329 Otel</span>
                        </Link>
                        <Link to="/hotels/alanya" className="mega-content-row">
                          <span className="mega-content-link">Alanya Otelleri</span>
                          <span className="mega-content-count">196 Otel</span>
                        </Link>
                        <Link to="/hotels/marmaris" className="mega-content-row">
                          <span className="mega-content-link">Marmaris Otelleri</span>
                          <span className="mega-content-count">205 Otel</span>
                        </Link>
                        <Link to="/hotels/kusadasi" className="mega-content-row">
                          <span className="mega-content-link">Kuşadası Otelleri</span>
                          <span className="mega-content-count">113 Otel</span>
                        </Link>
                        <Link to="/hotels/fethiye" className="mega-content-row">
                          <span className="mega-content-link">Fethiye Otelleri</span>
                          <span className="mega-content-count">212 Otel</span>
                        </Link>
                        <Link to="/hotels/kemer" className="mega-content-row">
                          <span className="mega-content-link">Kemer Otelleri</span>
                          <span className="mega-content-count">201 Otel</span>
                        </Link>
                        <Link to="/hotels/cesme" className="mega-content-row">
                          <span className="mega-content-link">Çeşme Otelleri</span>
                          <span className="mega-content-count">362 Otel</span>
                        </Link>
                        <Link to="/hotels" className="mega-content-all">
                          Tümünü gör →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div 
                className={`nav-dropdown ${activeDropdown === 'tours' ? 'active' : ''}`}
                onMouseEnter={() => handleMouseEnter('tours')}
                onMouseLeave={handleMouseLeave}
              >
                <button 
                  className="nav-link dropdown-toggle"
                >
                  Tur <span className="dropdown-arrow">▼</span>
                </button>
                <div className="dropdown-menu mega-menu">
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
                >
                  Eylül Fırsatları <span className="dropdown-arrow">▼</span>
                </button>
                <div className="dropdown-menu mega-menu">
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
                >
                  Kampanyalar <span className="dropdown-arrow">▼</span>
                </button>
                <div className="dropdown-menu mega-menu">
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
            </nav>

            <div className="header-actions">
              <button 
                className="menu-btn"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
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
            <h2 style={{marginTop: 0}}>0 850 333 3 333</h2>
            <div style={{marginTop: 16}}>
              <label style={{fontSize: 12, color: '#666'}}>Talep Konusu</label>
              <select style={{width:'100%', padding:'12px 14px', border:'1px solid #dee2e6', borderRadius:8}}>
                <option>Yurtiçi Otel veya Paket Tur Rezervasyon Talebi</option>
                <option>Yurtdışı Tur Rezervasyon Talebi</option>
                <option>Uçak Bileti Talebi</option>
              </select>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'150px 1fr', gap:12, marginTop:12}}>
              <select style={{padding:'12px 14px', border:'1px solid #dee2e6', borderRadius:8}}>
                <option>+90</option>
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

      <Modal isOpen={activeModal === 'reservations'} onClose={closeModal}>
        <div className="container">
          <div className="form-container">
            <h2 style={{marginTop: 0}}>Rezervasyon Kontrol</h2>
            <p style={{color:'#666'}}>E-posta adresinize iletilen doğrulama kodunu giriniz.</p>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
              <div>
                <label style={{fontSize: 12, color: '#666'}}>E-Posta veya Kimlik No*</label>
                <input style={{width:'100%', padding:'12px 14px', border:'1px solid #dee2e6', borderRadius:8}} />
              </div>
              <div>
                <label style={{fontSize: 12, color: '#666'}}>Rezervasyon No*</label>
                <input style={{width:'100%', padding:'12px 14px', border:'1px solid #dee2e6', borderRadius:8}} />
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
            }}>Rezervasyonunu Kontrol Et</button>
          </div>
        </div>
      </Modal>
    </header>
  );
};

export default Header;