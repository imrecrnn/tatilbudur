// Firestore index oluşturma scripti
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';

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
const db = getFirestore(app);

// Index oluşturmak için test sorguları çalıştır
async function createIndexes() {
  try {
    console.log('🔥 Firestore index oluşturuluyor...');
    
    // Email ile arama için index oluştur
    const emailQuery = query(
      collection(db, 'reservations'),
      where('email', '==', 'test@example.com'),
      orderBy('createdAt', 'desc')
    );
    
    console.log('📧 Email index sorgusu çalıştırılıyor...');
    await getDocs(emailQuery);
    console.log('✅ Email index oluşturuldu!');
    
    // Rezervasyon kodu ile arama için index oluştur
    const codeQuery = query(
      collection(db, 'reservations'),
      where('reservationCode', '==', 'test123')
    );
    
    console.log('🔢 Rezervasyon kodu index sorgusu çalıştırılıyor...');
    await getDocs(codeQuery);
    console.log('✅ Rezervasyon kodu index oluşturuldu!');
    
    console.log('🎉 Tüm indexler başarıyla oluşturuldu!');
    
  } catch (error) {
    if (error.code === 'failed-precondition') {
      console.log('⚠️  Index oluşturma gerekli. Firebase Console\'dan manuel olarak oluşturun:');
      console.log('🔗 https://console.firebase.google.com/v1/r/project/tatilbudur-77454/firestore');
      console.log('📋 Gerekli indexler:');
      console.log('   - Collection: reservations');
      console.log('   - Fields: email (Ascending), createdAt (Descending)');
      console.log('   - Fields: reservationCode (Ascending)');
    } else {
      console.error('❌ Hata:', error.message);
    }
  }
}

// Scripti çalıştır
createIndexes();
