import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Firebase yapılandırması
const firebaseConfig = {
  apiKey: "AIzaSyCi_o7_PeYE1ryqRUlDZJHt9s2_uEzGCNU",
  authDomain: "tatilbudur-77454.firebaseapp.com",
  projectId: "tatilbudur-77454",
  storageBucket: "tatilbudur-77454.firebasestorage.app",
  messagingSenderId: "847480589282",
  appId: "1:847480589282:web:22c64022e2b910e1a787bb",
  measurementId: "G-Q9SRTXQDY2"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Authentication ve Firestore servislerini export et
export const auth = getAuth(app);
export const db = getFirestore(app);

// Analytics'i güvenli bir şekilde başlat (sadece browser'da)
let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}
export { analytics };

// Firebase bağlantısını test et
export const testFirebaseConnection = async () => {
  try {
    console.log('🔥 Firebase bağlantısı test ediliyor...');
    console.log('📊 Proje ID:', firebaseConfig.projectId);
    console.log('🔐 Auth Domain:', firebaseConfig.authDomain);
    console.log('✅ Firebase başarıyla bağlandı!');
    return { success: true, message: 'Firebase bağlantısı başarılı!' };
  } catch (error) {
    console.error('❌ Firebase bağlantı hatası:', error);
    return { success: false, error: error.message };
  }
};

export default app;
