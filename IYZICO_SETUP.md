# Iyzico Payment Integration Setup

Bu doküman, TatilBudur projesine Iyzico ödeme sistemi entegrasyonunun nasıl kurulacağını açıklar.

## Kurulum Adımları

### 1. Iyzico Hesabı Oluşturma

1. [Iyzico Developer Portal](https://dev.iyzipay.com/) üzerinden hesap oluşturun
2. Sandbox (test) ve Production ortamları için API anahtarlarınızı alın
3. Webhook URL'lerinizi yapılandırın

### 2. Ortam Değişkenlerini Ayarlama

Proje kök dizininde `.env` dosyası oluşturun:

```env
# Iyzico Configuration
# Sandbox credentials for testing
REACT_APP_IYZICO_API_KEY=sandbox-API_KEY
REACT_APP_IYZICO_SECRET_KEY=sandbox-SECRET_KEY
REACT_APP_IYZICO_URI=https://sandbox-api.iyzipay.com

# Production credentials (uncomment when ready for production)
# REACT_APP_IYZICO_API_KEY=production-API_KEY
# REACT_APP_IYZICO_SECRET_KEY=production-SECRET_KEY
# REACT_APP_IYZICO_URI=https://api.iyzipay.com
```

### 3. Test Kartları

Iyzico sandbox ortamında kullanabileceğiniz test kartları:

#### Başarılı Ödemeler
- **Visa**: 4543600000000006
- **MasterCard**: 5400010000000004
- **Troy**: 9792000000000001

#### Başarısız Ödemeler
- **Yetersiz Bakiye**: 4543600000000007
- **Kart Sahibi Reddetti**: 4543600000000008
- **Banka Reddetti**: 4543600000000009

**Test Kart Bilgileri:**
- **CVC**: Herhangi bir 3 haneli sayı (örn: 123)
- **Son Kullanma Tarihi**: Gelecek bir tarih (örn: 12/25)
- **Kart Sahibi**: Herhangi bir isim

### 4. Proje Yapısı

```
src/
├── services/
│   └── iyzicoService.js          # Iyzico API servisleri
├── config/
│   └── iyzicoConfig.js           # Iyzico yapılandırması
├── pages/
│   ├── PaymentPage.jsx           # Ödeme sayfası (güncellenmiş)
│   ├── PaymentPage.css           # Ödeme sayfası stilleri
│   ├── PaymentCallbackPage.jsx   # Ödeme geri dönüş sayfası
│   └── PaymentCallbackPage.css   # Geri dönüş sayfası stilleri
└── App.jsx                       # Ana uygulama (güncellenmiş)
```

## Özellikler

### ✅ Tamamlanan Özellikler

1. **Iyzico SDK Entegrasyonu**
   - Sandbox ve Production ortam desteği
   - Güvenli API anahtarı yönetimi

2. **Ödeme İşlemleri**
   - Kredi kartı ile ödeme
   - Taksit seçenekleri (Iyzico'dan dinamik yükleme)
   - Ödeme doğrulama

3. **Kullanıcı Arayüzü**
   - Gerçek zamanlı form validasyonu
   - Yükleme durumu göstergeleri
   - Hata ve başarı mesajları
   - Responsive tasarım

4. **Güvenlik**
   - Kart bilgileri güvenli şekilde işlenir
   - Sadece son 4 hane saklanır
   - HTTPS zorunluluğu

### 🔄 Ödeme Akışı

1. Kullanıcı ödeme sayfasına gelir
2. Kart bilgilerini girer
3. Taksit seçeneğini seçer
4. "Ödemeyi Tamamla" butonuna tıklar
5. Iyzico API'si ile ödeme işlemi başlatılır
6. Başarılı ödeme sonrası rezervasyon oluşturulur
7. Kullanıcı rezervasyonlar sayfasına yönlendirilir

## API Servisleri

### `createPayment(paymentData)`
Ödeme işlemini başlatır.

**Parametreler:**
```javascript
{
  cardHolder: "KART SAHİBİ",
  cardNumber: "4543600000000006",
  expiryMonth: "12",
  expiryYear: "25",
  cvc: "123",
  price: 195003.90,
  installment: 1,
  conversationId: "TB_1234567890",
  basketId: "BASKET_1234567890"
}
```

### `getInstallmentOptions(price, binNumber)`
Kart için taksit seçeneklerini getirir.

### `verifyPayment(token)`
Ödeme doğrulaması yapar.

### `cancelPayment(paymentId, reason)`
Ödeme iptal eder.

### `refundPayment(paymentId, amount)`
Ödeme iadesi yapar.

## Hata Yönetimi

Sistem aşağıdaki hataları yakalar ve kullanıcıya uygun mesajlar gösterir:

- Kart bilgileri eksik
- Kart numarası geçersiz
- CVC kodu geçersiz
- Iyzico API hataları
- Ağ bağlantı hataları

## Test Etme

1. Projeyi başlatın:
   ```bash
   npm run dev
   ```

2. Bir otel rezervasyonu yapın ve ödeme sayfasına gidin

3. Test kartı bilgilerini girin:
   - Kart Numarası: `4543600000000006`
   - CVC: `123`
   - Son Kullanma: `12/25`

4. Ödeme işlemini test edin

## Production'a Geçiş

1. Iyzico production hesabınızı aktifleştirin
2. Production API anahtarlarınızı alın
3. `.env` dosyasında production değerlerini kullanın
4. Webhook URL'lerinizi production domain'inize güncelleyin
5. SSL sertifikasının aktif olduğundan emin olun

## Güvenlik Notları

- API anahtarlarınızı asla public repository'de paylaşmayın
- Production'da HTTPS kullanın
- Kart bilgilerini asla local storage'da saklamayın
- Iyzico'nun güvenlik önerilerini takip edin

## Destek

- [Iyzico Dokümantasyonu](https://dev.iyzipay.com/tr)
- [Iyzico Destek](https://dev.iyzipay.com/tr/support)
- [Test Kartları Listesi](https://dev.iyzipay.com/tr/test-kartlari)

## Lisans

Bu entegrasyon Iyzico'nun kullanım şartlarına tabidir.
