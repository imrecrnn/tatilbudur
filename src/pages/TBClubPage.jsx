import React from 'react';
import { Star, Gift, Crown, Users, Calendar, Award, Shield, Heart } from 'lucide-react';
import './TBClubPage.css';

const TBClubPage = () => {
  const benefits = [
    {
      icon: <Star className="benefit-icon" />,
      title: "Özel İndirimler",
      description: "Tüm rezervasyonlarda %15'e varan özel indirimler"
    },
    {
      icon: <Gift className="benefit-icon" />,
      title: "Hediye Puanlar",
      description: "Her rezervasyonda puan kazan, hediyelerle değiştir"
    },
    {
      icon: <Crown className="benefit-icon" />,
      title: "VIP Hizmet",
      description: "Öncelikli müşteri hizmetleri ve özel destek hattı"
    },
    {
      icon: <Calendar className="benefit-icon" />,
      title: "Erken Rezervasyon",
      description: "Kampanyalardan ilk siz haberdar olun"
    },
    {
      icon: <Award className="benefit-icon" />,
      title: "Sadakat Ödülleri",
      description: "Üyelik seviyeniz arttıkça daha fazla ayrıcalık"
    },
    {
      icon: <Shield className="benefit-icon" />,
      title: "Ücretsiz İptal",
      description: "Esnek iptal koşulları ve sigorta seçenekleri"
    }
  ];

  const membershipLevels = [
    {
      level: "Bronze",
      color: "#CD7F32",
      minPoints: "0",
      benefits: ["5% indirim", "Temel destek", "Standart iptal koşulları"]
    },
    {
      level: "Silver", 
      color: "#C0C0C0",
      minPoints: "1.000",
      benefits: ["10% indirim", "Öncelikli destek", "Esnek iptal koşulları"]
    },
    {
      level: "Gold",
      color: "#FFD700",
      minPoints: "5.000", 
      benefits: ["15% indirim", "VIP destek hattı", "Ücretsiz iptal", "Özel kampanyalar"]
    },
    {
      level: "Platinum",
      color: "#E5E4E2",
      minPoints: "15.000",
      benefits: ["20% indirim", "Kişisel danışman", "Tüm hizmetlerde öncelik", "Özel etkinlikler"]
    }
  ];

  return (
    <div className="tbclub-page">
      <div className="container">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h1>
                <span className="club-icon">🎯</span>
                TBClub
              </h1>
              <p className="hero-description">
                Tatil deneyiminizi bir üst seviyeye taşıyacak özel ayrıcalıklar ve 
                sadakat programımızla tanışın. Üyeliğiniz arttıkça ayrıcalıklarınız da artar!
              </p>
              <button className="cta-button">
                <Heart size={20} />
                Hemen Üye Ol
              </button>
            </div>
            <div className="hero-image">
              <img 
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop" 
                alt="TBClub"
              />
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <section className="benefits-section">
          <h2>TBClub Ayrıcalıkları</h2>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                {benefit.icon}
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Membership Levels */}
        <section className="membership-section">
          <h2>Üyelik Seviyeleri</h2>
          <div className="membership-grid">
            {membershipLevels.map((level, index) => (
              <div 
                key={index} 
                className={`membership-card ${level.level.toLowerCase()}`}
                style={{ '--level-color': level.color }}
              >
                <div className="membership-header">
                  <Crown size={32} style={{ color: level.color }} />
                  <h3>{level.level}</h3>
                  <p className="min-points">{level.minPoints}+ puan</p>
                </div>
                <ul className="membership-benefits">
                  {level.benefits.map((benefit, idx) => (
                    <li key={idx}>
                      <Star size={16} style={{ color: level.color }} />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* How it Works */}
        <section className="how-it-works">
          <h2>Nasıl Çalışır?</h2>
          <div className="steps-grid">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Üye Olun</h3>
              <p>TBClub'a ücretsiz üye olun ve Bronze seviyede başlayın</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Rezervasyon Yapın</h3>
              <p>Her rezervasyonda puan kazanın ve seviyenizi yükseltin</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Ayrıcalıklardan Faydalanın</h3>
              <p>Özel indirimler ve VIP hizmetlerden yararlanın</p>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-item">
              <Users size={48} className="stat-icon" />
              <h3>250.000+</h3>
              <p>Mutlu Üye</p>
            </div>
            <div className="stat-item">
              <Award size={48} className="stat-icon" />
              <h3>₺50M+</h3>
              <p>Toplam Tasarruf</p>
            </div>
            <div className="stat-item">
              <Star size={48} className="stat-icon" />
              <h3>4.9/5</h3>
              <p>Üye Memnuniyeti</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="final-cta">
          <div className="cta-content">
            <h2>Hemen TBClub'a Katılın!</h2>
            <p>Özel ayrıcalıklar ve indirimlerden yararlanmak için bugün üye olun.</p>
            <div className="cta-buttons">
              <button className="btn-primary">
                Ücretsiz Üye Ol
              </button>
              <button className="btn-secondary">
                Daha Fazla Bilgi
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TBClubPage;