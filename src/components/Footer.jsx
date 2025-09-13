import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Globe, 
  Instagram, 
  Twitter, 
  Facebook, 
  Youtube, 
  Linkedin, 
  Bed, 
  Plane, 
  Briefcase, 
  Megaphone 
} from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      {/* Combined Section with Same Background */}
      <div className="footer-unified-section">
        <div className="container">
          {/* Top Row with Logo, Slogan and Register */}
          <div className="footer-top-row">
            <div className="footer-top-content">
              <h3 className="footer-titles-row">
                <span className="title-logo">TatilBudur</span>
                <span className="title-slogan">#dahafazlatatil</span>
                <span className="title-register">Tesisinizi Kaydedin</span>
              </h3>
            </div>
          </div>

          <div className="footer-main">
            <div className="footer-content">
            {/* Search Links */}
            <div className="footer-section search-links">
              <h4>TatilBudur</h4>
              <ul>
                <li><Link to="/hotels">Otel Ara</Link></li>
                <li><Link to="/flights">Uçuş Ara</Link></li>
                <li><Link to="/tours">Tur Ara</Link></li>
                <li><Link to="/campaigns">Kampanyalar</Link></li>
              </ul>
            </div>

            {/* Featured Categories */}
            <div className="footer-section">
              <h4>Öne Çıkan Kategoriler</h4>
              <ul>
                <li><Link to="/early-booking">Erken Rezervasyon</Link></li>
                <li><Link to="/winter-hotels">Kış Otelleri</Link></li>
                <li><Link to="/free-night-campaign">Ücretsiz Gece Kampanyası</Link></li>
                <li><Link to="/new-year-hotels">Yılbaşı Otelleri</Link></li>
                <li><Link to="/weekend-hotels">Hafta Sonu Otelleri</Link></li>
              </ul>
            </div>

            {/* Register Your Facility */}
            <div className="footer-section">
              <h4>Tesisinizi Kaydedin</h4>
              <ul>
                <li><Link to="/hotels/izmir">İzmir Otelleri</Link></li>
                <li><Link to="/hotels/istanbul">İstanbul Otelleri</Link></li>
                <li><Link to="/hotels/ankara">Ankara Otelleri</Link></li>
                <li><Link to="/hotels/thermal">Termal Oteller</Link></li>
                <li><Link to="/hotels/cyprus">Kıbrıs Otelleri</Link></li>
                <li><Link to="/tours/international">Yurtdışı Turları</Link></li>
                <li><Link to="/hotels/ski">Kayak Otelleri</Link></li>
                <li><Link to="/tours/weekend">Haftasonu Turları</Link></li>
                <li><Link to="/holiday-token">Tatil Token</Link></li>
                <li><Link to="/holiday-campaigns">Tatil Kampanyaları</Link></li>
              </ul>
            </div>

            {/* Reservation */}
            <div className="footer-section">
              <h4>Rezervasyon</h4>
              <ul>
                <li><Link to="/reservations">Rezervasyon Kontrol</Link></li>
                <li><Link to="/how-to-book">Nasıl Rezervasyon Yapılır?</Link></li>
                <li><Link to="/group-booking">Grup Rezervasyon Talebi</Link></li>
              </ul>
            </div>

            {/* TatilBudur */}
            <div className="footer-section">
              <h4>TatilBudur</h4>
              <ul>
                <li><Link to="/about">Hakkımızda</Link></li>
                <li><Link to="/contact">İletişim</Link></li>
                <li><Link to="/careers">İnsan Kaynakları</Link></li>
                <li><Link to="/customer-relations">Müşteri İlişkileri</Link></li>
                <li><Link to="/branches">Şubelerimiz</Link></li>
                <li><Link to="/branch-application">Şube Başvuru Formu</Link></li>
                <li><Link to="/bank-accounts">Banka Hesaplarımız</Link></li>
                <li><Link to="/kutahya-schedule">Kütahya Çizelgesi</Link></li>
                <li><Link to="/information-society">Bilgi Toplumu Hizmetleri</Link></li>
              </ul>
            </div>

            {/* ETBİS */}
            <div className="footer-section etbis-section">
              <h4>ETBİS</h4>
              <div className="etbis-content">
                <img 
                  src="/src/assets/etbis.png" 
                  alt="ETBİS Logo" 
                  className="etbis-logo"
                  loading="lazy"
                />
                <p>ETBİS'e Kayıtlıdır</p>
                <div className="etbis-info">
                  <span>Belge No: 3073</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call Center Section */}
        <div className="call-center-section">
          <div className="container">
            <div className="call-center-content">
              <div className="call-center-left">
                <div className="follow-us">
                  <div className="follow-us-header">
                    <h4>Bizi Takip Edin</h4>
                    <div className="social-follow" role="list" aria-label="Sosyal medya hesapları">
                      <a href="https://instagram.com/tatilbudur" className="social-follow-link instagram" target="_blank" rel="noopener noreferrer" aria-label="Instagram hesabımızı takip edin" role="listitem">
                        <Instagram size={20} aria-hidden="true" />
                      </a>
                      <a href="https://twitter.com/tatilbudur" className="social-follow-link twitter" target="_blank" rel="noopener noreferrer" aria-label="Twitter hesabımızı takip edin" role="listitem">
                        <Twitter size={20} aria-hidden="true" />
                      </a>
                      <a href="https://facebook.com/tatilbudur" className="social-follow-link facebook" target="_blank" rel="noopener noreferrer" aria-label="Facebook sayfamızı takip edin" role="listitem">
                        <Facebook size={20} aria-hidden="true" />
                      </a>
                      <a href="https://vimeo.com/tatilbudur" className="social-follow-link vimeo" target="_blank" rel="noopener noreferrer" aria-label="Vimeo kanalımızı takip edin" role="listitem">
                        <Globe size={20} aria-hidden="true" />
                      </a>
                      <a href="https://youtube.com/tatilbudur" className="social-follow-link youtube" target="_blank" rel="noopener noreferrer" aria-label="YouTube kanalımızı takip edin" role="listitem">
                        <Youtube size={20} aria-hidden="true" />
                      </a>
                      <a href="https://linkedin.com/company/tatilbudur" className="social-follow-link linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn sayfamızı takip edin" role="listitem">
                        <Linkedin size={20} aria-hidden="true" />
                      </a>
                      <a href="https://blog.tatilbudur.com" className="social-follow-link blog" target="_blank" rel="noopener noreferrer" aria-label="Blog sayfamızı ziyaret edin" role="listitem">
                        <Globe size={20} aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="company-license">
                  <p><strong>Mika Turizm Belge No: 3073</strong></p>
                </div>
              </div>
              <div className="call-center-right">
                <div className="call-info">
                  <div className="call-center-header">
                    <div className="call-center-title">
                      <Phone size={20} aria-hidden="true" />
                      <span>Çağrı Merkezi</span>
                    </div>
                    <div className="call-divider"></div>
                    <div className="call-actions">
                      <div className="call-number">
                        <span className="call-label">Bizi arayın</span>
                        <a href="tel:+908503333333" className="phone-large" aria-label="Çağrı merkezini ara: 0 850 333 3 333">
                          0 850 333 3 333
                        </a>
                      </div>
                      <div className="callback-text">
                        <span>Sizi Arayalım</span>
                        <span>VEYA</span>
                        <span>Biz Sizi Arayalım</span>
                      </div>
                    </div>
                    <div className="call-divider"></div>
                    <div className="operator-image">
                      <img 
                        src="/src/assets/call-center.png" 
                        alt="Müşteri Temsilcisi" 
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer Section */}
          <div className="disclaimer-section">
            <p>
              Afişe edilen tüm fiyatlar, ilgili üründe kontenjan olması durumunda geçerli olup seçeceğiniz döneme göre fiyatlar değişkenlik gösterebilir.
            </p>
          </div>
        </div>
      </div>

      {/* Legal & Certification Section */}
      <div className="legal-certification-section">
        <div className="container">
          <div className="legal-certification-content">
            <div className="legal-links-section">
              <h5>Sözleşmeler & KVKK</h5>
              <nav className="legal-links" aria-label="Yasal belgeler">
                <Link to="/user-agreement">Kullanıcı Sözleşmesi</Link>
                <Link to="/privacy-policy">Gizlilik Sözleşmesi</Link>
                <Link to="/sales-agreement">Tur/Otel Satış Sözleşmesi</Link>
                <Link to="/privacy-protection">Kişisel Verilerin Korunması</Link>
              </nav>
            </div>
            <div className="certification-section">
              <div className="tursab-info">
                <div className="tursab-text">
                  <img 
                    src="/src/assets/tursab.png" 
                    alt="TÜRSAB Digital Doğrulama Sistemi" 
                    loading="lazy"
                    className="tursab-logo-img"
                  />
                </div>
              </div>
              <div className="payment-certification-logos">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png" 
                  alt="Visa" 
                  className="payment-logo" 
                  loading="lazy"
                />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png" 
                  alt="Mastercard" 
                  className="payment-logo" 
                  loading="lazy"
                />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/200px-American_Express_logo_%282018%29.svg.png" 
                  alt="American Express" 
                  className="payment-logo" 
                  loading="lazy"
                />
                <div className="troy-logo">Troy</div>
                <div className="tursab-logo">TÜRSAB</div>
                <div className="iso-logo">ISO</div>
                <div className="iata-logo">IATA</div>
                <div className="gtc-logo">GTC</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="copyright-section">
        <div className="container">
          <div className="copyright-content">
            <p className="copyright-subtitle">Copyright © 1997-2025 TatilBudur.com. Tüm hakları saklıdır. TatilBudur.com bir TatilBudur Seyahat Acenteliği ve Turizm A.Ş ürünüdür. #61</p>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;