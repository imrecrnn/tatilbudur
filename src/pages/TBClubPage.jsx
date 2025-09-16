import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './TBClubPage.css';

const TBClubPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqData = [
    {
      category: "Üyelik",
      questions: [
        {
          question: "Programa Nasıl üye olabilirim?",
          answer: "TB Club'a üye olmak için web sitemizdeki üyelik formunu doldurarak veya mobil uygulamamız üzerinden kolayca kayıt olabilirsiniz. Üyelik tamamen ücretsizdir."
        },
        {
          question: "Üyelik doğrulamasını nasıl yapabilirim?",
          answer: "Üyelik doğrulaması için e-posta adresinize gönderilen doğrulama linkine tıklayarak veya telefon numaranıza gönderilen SMS kodunu girerek doğrulama işlemini tamamlayabilirsiniz."
        },
        {
          question: "Program üyelik sözleşmesini onaylamadan üye olabilir miyim?",
          answer: "Hayır, TB Club sadakat programına üye olabilmek için program üyelik sözleşmesini onaylamanız gerekmektedir."
        },
        {
          question: "Programa hangi kanallardan üye olabilirim?",
          answer: "Web sitemiz, mobil uygulamamız, çağrı merkezimiz ve yetkili acentelerimiz üzerinden TB Club'a üye olabilirsiniz."
        },
        {
          question: "Neden telefon doğrulaması yapmam gerekiyor?",
          answer: "Telefon doğrulaması, üyelik bilgilerinizin güvenliğini sağlamak ve önemli bildirimleri size ulaştırabilmek için gereklidir."
        },
        {
          question: "Üyelik bilgilerimde değişiklik yapabilir miyim?",
          answer: "Evet, TB Club hesabınızdan üyelik bilgilerinizi güncelleyebilirsiniz. Önemli değişiklikler için ek doğrulama gerekebilir."
        },
        {
          question: "İptal ettiğim üyeliğimi yeniden aktive edebilir miyim?",
          answer: "Evet, iptal ettiğiniz üyeliğinizi yeniden aktive edebilirsiniz. Bu işlem için müşteri hizmetlerimizle iletişime geçebilirsiniz."
        },
        {
          question: "Web Üyelik şifremi unuttum, ne yapmam gerekir?",
          answer: "Şifrenizi unuttuysanız, giriş sayfasındaki 'Şifremi Unuttum' linkini kullanarak yeni şifre oluşturabilirsiniz."
        },
        {
          question: "Şifremi nasıl değiştirebilirim?",
          answer: "Hesabınıza giriş yaptıktan sonra 'Hesap Ayarları' bölümünden şifrenizi değiştirebilirsiniz."
        },
        {
          question: "Üyelik süreçleriyle ilgili detaylı bilgiyi hangi kanallardan alabilirim?",
          answer: "Üyelik süreçleri hakkında detaylı bilgi için müşteri hizmetlerimizi arayabilir, web sitemizdeki yardım bölümünü inceleyebilir veya e-posta desteğimizden yararlanabilirsiniz."
        },
        {
          question: "Üyeliğimi nasıl iptal edebilirim?",
          answer: "Üyeliğinizi iptal etmek için hesap ayarlarınızdan veya müşteri hizmetlerimizle iletişime geçerek işlemi gerçekleştirebilirsiniz."
        },
        {
          question: "Neden üye olmalıyım?",
          answer: "TB Club üyeliği ile rezervasyonlarınızdan puan kazanır, kazandığınız puanları gelecek rezervasyonlarınızda kullanabilir ve özel kampanyalardan yararlanabilirsiniz."
        },
        {
          question: "Üyeliğimi bir başkasına devredebilir miyim?",
          answer: "Hayır, TB Club üyeliği kişiseldir ve başkasına devredilemez."
        },
        {
          question: "TatilBudur e-ticaret üyesiyim, bu programa da ayrıca üye olmalı mıyım?",
          answer: "Evet, TB Club sadakat programı ayrı bir üyelik gerektirir. Mevcut e-ticaret üyeliğinizle TB Club üyeliği farklıdır."
        },
        {
          question: "Üyelik Şartları nelerdir?",
          answer: "Üyelik şartları 18 yaşını doldurmuş olmak, geçerli bir e-posta adresi ve telefon numarası sağlamak, program şartlarını kabul etmek şeklindedir."
        }
      ]
    },
    {
      category: "Program Hakkında",
      questions: [
        {
          question: "TatilBudur TB Club Sadakat Programı nedir?",
          answer: "TB Club Sadakat Programı, üyelerin rezervasyonları üzerinden puan kazanabilecekleri ve bu puanları gelecek rezervasyonlarında kullanabilecekleri bir sadakat programıdır."
        },
        {
          question: "TB Club Sadakat Programının avantajları nedir?",
          answer: "Program avantajları arasında rezervasyonlardan puan kazanma, kazanılan puanları harcama, özel kampanyalar ve indirimlerden yararlanma bulunmaktadır."
        },
        {
          question: "TB Club Sadakat Programına üye olmak ücretli midir?",
          answer: "Hayır, TB Club sadakat programına üye olmak tamamen ücretsizdir."
        },
        {
          question: "TB Club Sadakat Programı hangi kanallarda geçerli?",
          answer: "Program web sitemiz, mobil uygulamamız, çağrı merkezimiz ve yetkili acentelerimiz üzerinden yapılan rezervasyonlarda geçerlidir."
        },
        {
          question: "Programa üye olduktan ne kadar zaman sonra puan kazanmaya başlayabilirim?",
          answer: "Üyelik onaylandıktan hemen sonra puan kazanmaya başlayabilirsiniz."
        },
        {
          question: "Kazandığım puanlarımı ne zaman ve nerede harcayabilirim?",
          answer: "Puanlarınızı bir sonraki rezervasyonunuzda hemen kullanabilirsiniz. Web sitemiz ve mobil uygulamamız üzerinden puan kullanımı yapabilirsiniz."
        },
        {
          question: "Puanlarımın ömrü var mı? Ne kadar zaman içinde harcamam lazım?",
          answer: "Puanlarınızın belirli bir kullanım süresi bulunmaktadır. Detaylar için program şartlarını inceleyebilirsiniz."
        },
        {
          question: "Puanlarımı yalnızca TatilBudur'da mı harcayabilirim?",
          answer: "Evet, TB Club puanları yalnızca TatilBudur kanallarında harcanabilir."
        },
        {
          question: "Aktif Puan ne demektir?",
          answer: "Aktif puan, kullanıma hazır olan ve rezervasyonlarınızda harcayabileceğiniz puanları ifade eder."
        },
        {
          question: "Satın alınan Otel/Tur Rezervasyonu İptal Olursa, Puanlarım ne olur?",
          answer: "Rezervasyon iptali durumunda, kullanılan puanlar hesabınıza geri iade edilir."
        },
        {
          question: "Puanlarımı nakit para olarak iade alabilir miyim?",
          answer: "Hayır, TB Club puanları nakit para olarak iade edilemez. Puanlar yalnızca rezervasyonlarda kullanılabilir."
        },
        {
          question: "Programa üye olmadan evvel yaptığım rezervasyonlarımdan bir kazancım olacak mı?",
          answer: "Hayır, üyelik öncesi yapılan rezervasyonlar için puan kazancı bulunmamaktadır."
        },
        {
          question: "Fiziksel bir kartım olacak mı?",
          answer: "TB Club dijital bir programdır ve fiziksel kart bulunmamaktadır. Üyelik bilgileriniz dijital olarak saklanır."
        },
        {
          question: "Puanlarımı nereden görebilirim?",
          answer: "Puanlarınızı TB Club hesabınızdan, web sitemiz ve mobil uygulamamız üzerinden takip edebilirsiniz."
        },
        {
          question: "Puanlarımı üye olan başka bir arkadaşıma aktarabilir miyim?",
          answer: "Hayır, TB Club puanları kişiseldir ve başkalarına aktarılamaz."
        },
        {
          question: "Bir başkasından kendime puan aktarımı yapabilir miyim?",
          answer: "Hayır, TB Club puanları aktarılamaz."
        },
        {
          question: "Puanlarımı kullanarak aldığım rezervasyonumu iptal edersem ya da tur programı iptal olursa harcadığım puanlarıma ne olur?",
          answer: "İptal durumunda kullanılan puanlar hesabınıza geri iade edilir."
        },
        {
          question: "TB Club'ın bana özel sunduğu fırsatlar ve kampanyalardan nasıl haberdar olabilirim?",
          answer: "Özel kampanyalar hakkında e-posta ve SMS ile bilgilendirilirsiniz. Ayrıca web sitemiz ve mobil uygulamamızı takip edebilirsiniz."
        },
        {
          question: "Program avantajları ve kampanyalardan sms ya da e-posta ile bilgilendirilmek istemiyorsam ne yapmalıyım?",
          answer: "Hesap ayarlarınızdan bildirim tercihlerinizi değiştirerek SMS ve e-posta bildirimlerini kapatabilirsiniz."
        },
        {
          question: "Puanlarımın ne zaman dolacağını nereden takip edebilirim?",
          answer: "Puan süreleri hakkında bilgiyi TB Club hesabınızdan takip edebilirsiniz."
        },
        {
          question: "KVKK kapsamında açık rızamı geri alırsam TB Club üyeliğim sona mı erecek?",
          answer: "KVKK kapsamında rızanızı geri almanız durumunda üyelik durumunuz etkilenebilir. Detaylar için müşteri hizmetlerimizle iletişime geçebilirsiniz."
        },
        {
          question: "Web üyeliği iptal edersem TB Club üyeliğim sona mı erecek?",
          answer: "Web üyeliğinizi iptal etmeniz TB Club üyeliğinizi etkilemez. TB Club ayrı bir sadakat programıdır."
        }
      ]
    }
  ];

  return (
    <div className="tbclub-page">
      {/* Hero Banner */}
      <section className="hero-banner">
        <img 
          src="/src/assets/tb-club-landing-banner-v3.png" 
          alt="TB Club - Ayrıcalık Budur"
          className="hero-banner-img"
        />
      </section>

      {/* Main Content */}
      <div className="container">
        {/* TB Club Description Section */}
        <section className="description-section">
          <div className="description-layout">
            <div className="description-text">
              <h1>TB Club Nedir?</h1>
              <p>
                TB Club Sadakat Programı, TB Club üyelerinin web sitemiz, uygulamamız, çağrı merkezimiz ve/veya yetkili acentelerimiz üzerinden yaptıkları otel ve tur rezervasyonları üzerinden puan kazanabilecekleri, kazandıkları puanları bir sonraki otel ve rezervasyonlarında kullanabilecekleri, ayrıcalıklar sunan ve harcadıkça kazandıran fırsatlar dünyasıdır.
              </p>
              <button className="join-btn">TB Club'a Üye Ol</button>
            </div>
            <div className="description-image">
              <img 
                src="/src/assets/tb-club-desc-banner.png" 
                alt="TB Club Açıklama"
                className="desc-banner-img"
              />
            </div>
          </div>
        </section>

        {/* How to Earn Points Section */}
        <section className="earn-points-section">
          <div className="earn-points-header">
            <h2>Nasıl Puan Kazanırım?</h2>
            <p>TB Club'a üye olarak rezervasyonlarınızdan TB Puan kazanabilirsiniz.</p>
        </div>

          <div className="earn-points-grid">
            <div className="join-card">
              <div className="join-card-content">
                <div className="join-card-visual">
                  <div className="credit-card-visual">
                    <div className="card-icon">💳</div>
                    <div className="coins">
                      <div className="coin">🪙</div>
                      <div className="coin">🪙</div>
                      <div className="coin">🪙</div>
                    </div>
                  </div>
                </div>
                <div className="join-card-text">TB Club'a Üye Ol</div>
              </div>
          </div>
            
            <div className="earn-cards">
              <div className="earn-card">
                <div className="earn-icon">🏨</div>
                <div className="earn-text">
                  Yurt içi otel rezervasyonundan %3 TB Puan kazan.
                </div>
              </div>
              
              <div className="earn-card">
                <div className="earn-icon">⛷️</div>
                <div className="earn-text">
                  Kayak veya termal otel rezervasyonundan %2 TB Puan kazan.
                </div>
          </div>
              
              <div className="earn-card">
                <div className="earn-icon">🏙️</div>
                <div className="earn-text">
                  Kıbrıs veya Şehir otelleri rezervasyonundan %1 TB Puan kazan.
            </div>
            </div>
              
              <div className="earn-card">
                <div className="earn-icon">🏛️</div>
                <div className="earn-text">
                  Kültür turu rezervasyonundan %2 TB Puan kazan.
            </div>
          </div>
              
              <div className="earn-card">
                <div className="earn-icon">🌍</div>
                <div className="earn-text">
                  Yurt dışı tur rezervasyonundan %1 TB Puan kazan.
            </div>
            </div>
            </div>
          </div>
          
          <div className="join-cta">
            <button className="join-btn-large">TB Club'a Üye Ol</button>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <h2>Sıkça Sorulan Sorular</h2>
          
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="faq-category">
              <h3 className="faq-category-title">{category.category}</h3>
              <div className="faq-list">
                {category.questions.map((faq, faqIndex) => {
                  const globalIndex = categoryIndex * 100 + faqIndex;
                  const isOpen = openFaq === globalIndex;
                  
                  return (
                    <div key={faqIndex} className="faq-item">
                      <button
                        className={`faq-question ${isOpen ? 'open' : ''}`}
                        onClick={() => toggleFaq(globalIndex)}
                      >
                        <span>{faq.question}</span>
                        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
                      <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default TBClubPage;