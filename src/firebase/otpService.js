// OTP servisi - Gerçek uygulamada SMS/Email servisi ile entegre edilecek
class OTPService {
  constructor() {
    this.otpStorage = new Map(); // Geçici OTP depolama
  }

  // OTP kodu oluştur
  generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Email OTP gönder (simülasyon)
  async sendEmailOTP(email) {
    try {
      const otp = this.generateOTP();
      const expiry = Date.now() + (5 * 60 * 1000); // 5 dakika geçerli
      
      // OTP'yi depolaya kaydet
      this.otpStorage.set(`email_${email}`, {
        otp,
        expiry,
        attempts: 0
      });

      // Gerçek uygulamada burada email servisi çağrılır
      console.log(`Email OTP gönderildi: ${email} - Kod: ${otp}`);
      
      // Simülasyon için alert göster
      alert(`Doğrulama kodu ${email} adresine gönderildi!\nKod: ${otp}\n(Test amaçlı - gerçek uygulamada email ile gönderilir)`);
      
      return { success: true, otp }; // Test için OTP'yi döndür
    } catch (error) {
      console.error('Email OTP gönderme hatası:', error);
      return { success: false, error: error.message };
    }
  }

  // Telefon OTP gönder (simülasyon)
  async sendPhoneOTP(phone) {
    try {
      const otp = this.generateOTP();
      const expiry = Date.now() + (5 * 60 * 1000); // 5 dakika geçerli
      
      // OTP'yi depolaya kaydet
      this.otpStorage.set(`phone_${phone}`, {
        otp,
        expiry,
        attempts: 0
      });

      // Gerçek uygulamada burada SMS servisi çağrılır
      console.log(`SMS OTP gönderildi: ${phone} - Kod: ${otp}`);
      
      // Simülasyon için alert göster
      alert(`Doğrulama kodu ${phone} numarasına gönderildi!\nKod: ${otp}\n(Test amaçlı - gerçek uygulamada SMS ile gönderilir)`);
      
      return { success: true, otp }; // Test için OTP'yi döndür
    } catch (error) {
      console.error('SMS OTP gönderme hatası:', error);
      return { success: false, error: error.message };
    }
  }

  // OTP doğrula
  verifyOTP(type, identifier, inputOTP) {
    try {
      const key = `${type}_${identifier}`;
      const storedData = this.otpStorage.get(key);
      
      if (!storedData) {
        return { success: false, error: 'OTP bulunamadı' };
      }

      // Süre kontrolü
      if (Date.now() > storedData.expiry) {
        this.otpStorage.delete(key);
        return { success: false, error: 'OTP süresi dolmuş' };
      }

      // Deneme sayısı kontrolü
      if (storedData.attempts >= 3) {
        this.otpStorage.delete(key);
        return { success: false, error: 'Çok fazla yanlış deneme' };
      }

      // OTP kontrolü
      if (storedData.otp === inputOTP) {
        this.otpStorage.delete(key);
        return { success: true };
      } else {
        storedData.attempts++;
        this.otpStorage.set(key, storedData);
        return { 
          success: false, 
          error: `Yanlış kod. Kalan deneme: ${3 - storedData.attempts}` 
        };
      }
    } catch (error) {
      console.error('OTP doğrulama hatası:', error);
      return { success: false, error: error.message };
    }
  }

  // OTP temizle
  clearOTP(type, identifier) {
    const key = `${type}_${identifier}`;
    this.otpStorage.delete(key);
  }
}

// Singleton instance
export const otpService = new OTPService();
export default otpService;
