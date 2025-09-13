import React from 'react';
import { Crown, Star, Shield, Zap, Phone, Clock, Gift, Award, CheckCircle } from 'lucide-react';
import './PremiumPage.css';

const PremiumPage = () => {
  const premiumFeatures = [
    {
      icon: <Crown className="feature-icon" />,
      title: "VIP Müşteri Hizmetleri",
      description: "7/24 özel danışman desteği ve öncelikli hizmet",
      highlight: true
    },
    {
      icon: <Zap className="feature-icon" />,
      title: "Hızlı Rezervasyon",
      description: "Tek tıkla rezervasyon ve anında onay",
      highlight: true
    },
    {
      icon: <Shield className="feature-icon" />,
      title: "Premium Güvence",
      description: "Ücretsiz iptal ve değişiklik hakkı",
      highlight: true
    },
    {
      icon: <Phone className="feature-icon" />,
      title: "Kişisel Danışman",
      description: "Size özel tatil danışmanı ataması",
      highlight: false
    },
    {
      icon: <Clock className="feature-icon" />,
      title: "Erken Check-in",
      description: "Otellerde erken giriş ve geç çıkış ayrıcalığı",
      highlight: false
    },
    {
      icon: <Gift className="feature-icon" />,
      title: "Özel Hediyeler",
      description: "Doğum günü ve özel günlerde sürpriz hediyeler",
      highlight: false
    }
  ];

  const comparisonData = [
    {
      feature: "Müşteri Hizmetleri",
      standard: "Mesai saatleri içinde",
      premium: "7/24 VIP destek"
    },
    {
      feature: "İptal Koşulları", 
      standard: "Standart şartlar",
      premium: "Esnek iptal hakları"
    },
    {
      feature: "Rezervasyon Hızı",
      standard: "Normal süreç",
      premium: "Anında onay"
    },
    {
      feature: "Otel Ayrıcalıkları",
      standard: "Yok",
      premium: "Room upgrade, late check-out"
    },
    {
      feature: "Özel Kampanyalar",
      standard: "Genel kampanyalar",
      premium: "Sadece Premium üyeler"
    },
    {
      feature: "Kişisel Danışman",
      standard: "Yok",
      premium: "Atanmış danışman"
    }
  ];

  const testimonials = [
    {
      name: "Ayşe Kaya",
      role: "Premium Üye",
      comment: "Premium hizmeti sayesinde tatil planlama sürecim çok kolaylaştı. Kişisel danışmanım her konuda yardımcı oluyor.",
      rating: 5
    },
    {
      name: "Mehmet Demir", 
      role: "Premium Üye",
      comment: "VIP müşteri hizmetleri gerçekten fark yaratıyor. 7/24 destek alabilmek çok değerli.",
      rating: 5
    },
    {
      name: "Zeynep Özkan",
      role: "Premium Üye", 
      comment: "Otellerdeki ayrıcalıklar ve erken check-in imkanı tatil deneyimimi mükemmelleştirdi.",
      rating: 5
    }
  ];

  return (
    <div className="premium-page">
      <div className="container">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h1>
                <Crown size={48} className="premium-crown" />
                TatilBudur Premium
              </h1>
              <p className="hero-description">
                Tatil deneyiminizi lüks seviyeye taşıyan özel hizmetler ve ayrıcalıklar. 
                Premium üyelikle her anınız değerli, her detay kusursuz.
              </p>
              <div className="hero-stats">
                <div className="stat">
                  <Award className="stat-icon" />
                  <div>
                    <strong>50.000+</strong>
                    <span>Premium Üye</span>
                  </div>
                </div>
                <div className="stat">
                  <Star className="stat-icon" />
                  <div>
                    <strong>4.9/5</strong>
                    <span>Memnuniyet</span>
                  </div>
                </div>
              </div>
              <button className="premium-cta">
                <Crown size={20} />
                Premium'a Geç
              </button>
            </div>
            <div className="hero-visual">
              <div className="premium-card">
                <div className="card-header">
                  <Crown className="card-crown" />
                  <span>PREMIUM</span>
                </div>
                <div className="card-content">
                  <h3>John Doe</h3>
                  <p>Premium Üye</p>
                  <div className="card-benefits">
                    <div className="benefit">
                      <CheckCircle size={16} />
                      <span>VIP Destek</span>
                    </div>
                    <div className="benefit">
                      <CheckCircle size={16} />
                      <span>Özel İndirimler</span>
                    </div>
                    <div className="benefit">
                      <CheckCircle size={16} />
                      <span>Kişisel Danışman</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="features-section">
          <h2>Premium Ayrıcalıkları</h2>
          <div className="features-grid">
            {premiumFeatures.map((feature, index) => (
              <div 
                key={index} 
                className={`feature-card ${feature.highlight ? 'highlighted' : ''}`}
              >
                {feature.icon}
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                {feature.highlight && <div className="highlight-badge">Popüler</div>}
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Section */}
        <section className="comparison-section">
          <h2>Standart vs Premium Karşılaştırma</h2>
          <div className="comparison-table">
            <div className="comparison-header">
              <div className="header-item">Özellik</div>
              <div className="header-item">Standart</div>
              <div className="header-item premium-header">
                <Crown size={20} />
                Premium
              </div>
            </div>
            {comparisonData.map((item, index) => (
              <div key={index} className="comparison-row">
                <div className="feature-name">{item.feature}</div>
                <div className="standard-value">{item.standard}</div>
                <div className="premium-value">
                  <CheckCircle size={16} className="check-icon" />
                  {item.premium}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="testimonials-section">
          <h2>Premium Üyelerimiz Neler Söylüyor?</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-content">
                  <div className="rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" className="star" />
                    ))}
                  </div>
                  <p>"{testimonial.comment}"</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-info">
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.role}</span>
                  </div>
                  <Crown className="author-crown" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section className="pricing-section">
          <h2>Premium Üyelik Planları</h2>
          <div className="pricing-cards">
            <div className="pricing-card">
              <div className="card-header">
                <h3>Aylık Premium</h3>
                <div className="price">
                  <span className="amount">₺49</span>
                  <span className="period">/ay</span>
                </div>
              </div>
              <ul className="features-list">
                <li><CheckCircle size={16} /> Tüm Premium özellikler</li>
                <li><CheckCircle size={16} /> VIP müşteri hizmetleri</li>
                <li><CheckCircle size={16} /> Esnek iptal koşulları</li>
                <li><CheckCircle size={16} /> Kişisel danışman</li>
              </ul>
              <button className="plan-button">Hemen Başla</button>
            </div>
            
            <div className="pricing-card featured">
              <div className="popular-badge">En Popüler</div>
              <div className="card-header">
                <h3>Yıllık Premium</h3>
                <div className="price">
                  <span className="amount">₺399</span>
                  <span className="period">/yıl</span>
                </div>
                <div className="save-info">2 ay ücretsiz!</div>
              </div>
              <ul className="features-list">
                <li><CheckCircle size={16} /> Tüm Premium özellikler</li>
                <li><CheckCircle size={16} /> VIP müşteri hizmetleri</li>
                <li><CheckCircle size={16} /> Esnek iptal koşulları</li>
                <li><CheckCircle size={16} /> Kişisel danışman</li>
                <li><CheckCircle size={16} /> Özel hediyeler</li>
                <li><CheckCircle size={16} /> Bonus puan kazanımı</li>
              </ul>
              <button className="plan-button featured-button">
                <Crown size={16} />
                Premium'a Geç
              </button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <h2>Sıkça Sorulan Sorular</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>Premium üyelik nasıl çalışır?</h4>
              <p>Premium üyeliğiniz aktif olduktan sonra tüm ayrıcalıklardan anında yararlanmaya başlarsınız.</p>
            </div>
            <div className="faq-item">
              <h4>İstediğim zaman iptal edebilir miyim?</h4>
              <p>Evet, Premium üyeliğinizi istediğiniz zaman iptal edebilirsiniz. İptal sonrası mevcut dönem sonuna kadar hizmet alırsınız.</p>
            </div>
            <div className="faq-item">
              <h4>Kişisel danışman nedir?</h4>
              <p>Size özel atanmış deneyimli tatil uzmanı, tüm rezervasyon ve tatil planlamanızda size yardımcı olur.</p>
            </div>
            <div className="faq-item">
              <h4>Premium üyeler hangi otellerde ayrıcalık alır?</h4>
              <p>Tüm partner otellerimizde room upgrade, erken check-in ve geç check-out gibi ayrıcalıklardan yararlanırsınız.</p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="final-cta">
          <div className="cta-content">
            <Crown size={64} className="cta-crown" />
            <h2>Premium Deneyimi Başlasın!</h2>
            <p>Bugün Premium'a geçin ve tatil deneyiminizi lüks seviyeye taşıyın.</p>
            <div className="cta-actions">
              <button className="btn-premium">
                <Crown size={20} />
                Hemen Premium Ol
              </button>
              <button className="btn-demo">
                Ücretsiz Deneme
              </button>
            </div>
            <p className="guarantee">30 gün para iade garantisi</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PremiumPage;