import React from 'react';
import { Crown } from 'lucide-react';
import './PremiumPage.css';

const PremiumPage = () => {

  return (
    <div className="premium-page">
      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="banner-image">
          <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop" alt="Premium Tatil" />
          <div className="banner-overlay">
            <div className="container">
              <div className="banner-content">
                <h1>
                  <Crown size={48} className="premium-crown" />
                  TatilBudur Premium
                </h1>
                <p className="banner-description">
                  TatilBudur Premium konseptimiz ile sizlere ayrıcalıklı bir tatil deneyiminin kapılarını aralıyoruz. 
                  Tamamen size özel ayrıcalıklı hizmetlerimizle tatilinizi planlarken ihtiyaç duyacağınız her konuda 
                  destek olacak özel seyahat danışmanınız, zevkinize ve tercihlerinize uygun yüzlerce konsept ve otel, 
                  ayrıca size her konuda yardımcı olacak özel whatsapp ekibimiz Premium'da sizi bekliyor!
                </p>
                <button className="premium-cta">
                  <Crown size={20} />
                  Premium'a Geç
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">

        {/* Premium Services Sections */}
        <section className="premium-services">
          {/* Personal Travel Consultant */}
          <div className="service-section">
            <div className="service-content">
              <div className="service-image">
                <img src="/src/assets/danisman-2.png" alt="Özel Seyahat Danışmanı" />
              </div>
              <div className="service-text">
                <h3>Özel Seyahat Danışmanı</h3>
                <p>
                  Tatilinizi planlarken ihtiyaç duyacağınız her konuda size destek olacak seyahat danışmanınızla 
                  hayallerinizdeki tatili güvenle planlayabilirsiniz.
                </p>
                <p>
                  Özel seyahat danışmanınız ile seyahatinizin kusursuz geçmesi için planladığımız size özel bu hizmet ile, 
                  zevkinize ve tercihlerinize uygun yüzlerce konsept ve otel arasından size en uygun olan seçeneği bularak 
                  kusursuz bir tatil yaşamanıza aracılık ediyoruz.
                </p>
              </div>
            </div>
          </div>

          {/* VIP Airport Transfer */}
          <div className="service-section reverse">
            <div className="service-content">
              <div className="service-text">
                <h3>Havalimanında VIP Karşılama & Transfer</h3>
                <p>
                  Uçak yolculuğu sonrası havalimanında kişiye özel VIP karşılama ve transfer hizmetinden ek bir ücret 
                  karşılığı yararlanarak otelinize konforlu bir şekilde ulaşım sağlayabilir ve ayrıcalıklı bir deneyim 
                  yaşayabilirsiniz.
                </p>
              </div>
              <div className="service-image">
                <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=500&h=400&fit=crop" alt="VIP Transfer" />
              </div>
            </div>
          </div>

          {/* WhatsApp Support */}
          <div className="service-section">
            <div className="service-content">
              <div className="service-image">
                <img src="/src/assets/whatsapp-call.png" alt="WhatsApp Destek" />
              </div>
              <div className="service-text">
                <h3>Whatsapp Chat Üzerinden Destek</h3>
                <p>
                  Tatiliniz boyunca size her konuda yardımcı olacak özel destek ekibimize whatsapp üzerinden ulaşım 
                  sağlayabilirsiniz. Sadece bir telefon uzağında olan özel destek ekibimize ihtiyaç duyacağınız her an 
                  sıra beklemeden ulaşarak istediğiniz her konuyu danışabilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Spacing */}
        <div className="bottom-spacing"></div>

      </div>
    </div>
  );
};

export default PremiumPage;
