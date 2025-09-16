// Demo rezervasyon testi için JavaScript kodu
// Bu kodu browser console'da çalıştırabilirsiniz

// Firebase import'ları (browser'da çalıştırırken gerekli)
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

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

// Demo rezervasyon oluştur
const createDemoReservation = async () => {
  try {
    const reservationCode = 'TB' + Date.now().toString(36).toUpperCase();
    
    const reservationData = {
      reservationCode,
      email: 'demo@example.com',
      firstName: 'Demo',
      lastName: 'Kullanıcı',
      phone: '+90 555 123 45 67',
      hotel: {
        id: 'demo-hotel-1',
        name: 'Calista Luxury Resort',
        location: 'Belek, Antalya',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
        rating: 5
      },
      bookingData: {
        checkIn: '2025-09-14',
        checkOut: '2025-09-17',
        adults: 2,
        children: 1,
        nights: 3
      },
      totalPrice: 15000.00,
      paymentInfo: {
        method: 'card',
        transactionId: 'DEMO_' + Date.now(),
        cardNumber: '****1234',
        paymentDate: new Date().toISOString()
      },
      status: 'confirmed',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, 'reservations'), reservationData);
    
    console.log('✅ Demo rezervasyon oluşturuldu!');
    console.log('📋 Rezervasyon Kodu:', reservationCode);
    console.log('🆔 Rezervasyon ID:', docRef.id);
    
    return { success: true, reservationCode, reservationId: docRef.id };
  } catch (error) {
    console.error('❌ Demo rezervasyon oluşturma hatası:', error);
    return { success: false, error: error.message };
  }
};

// Test fonksiyonunu çalıştır
createDemoReservation();
