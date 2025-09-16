// Test rezervasyonu oluşturmak için browser console'da çalıştırın
// Bu kodu browser console'da çalıştırarak test rezervasyonu oluşturabilirsiniz

const createTestReservation = async () => {
  try {
    // Firebase import'ları (browser'da çalıştırırken gerekli)
    const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
    const { getFirestore, collection, addDoc, serverTimestamp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');

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

    // Rezervasyon kodu ve numarası oluştur
    const generateReservationCode = () => {
      const timestamp = Date.now().toString(36).toUpperCase();
      const random = Math.random().toString(36).substr(2, 4).toUpperCase();
      return `TB${timestamp}${random}`;
    };

    const generateReservationNumber = () => {
      const timestamp = Date.now().toString().slice(-8);
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      return `TB${timestamp}${random}`;
    };

    const reservationCode = generateReservationCode();
    const reservationNumber = generateReservationNumber();
    
    const reservationData = {
      reservationCode,
      reservationNumber,
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'Kullanıcı',
      phone: '+90 555 123 45 67',
      hotel: {
        id: 'test-hotel-1',
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
        transactionId: 'TEST_' + Date.now(),
        cardNumber: '****1234',
        paymentDate: new Date().toISOString()
      },
      status: 'confirmed',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, 'reservations'), reservationData);
    
    console.log('✅ Test rezervasyonu oluşturuldu!');
    console.log('📋 Rezervasyon Kodu:', reservationCode);
    console.log('🔢 Rezervasyon No:', reservationNumber);
    console.log('🆔 Rezervasyon ID:', docRef.id);
    
    return { 
      success: true, 
      reservationCode, 
      reservationNumber, 
      reservationId: docRef.id 
    };
  } catch (error) {
    console.error('❌ Test rezervasyonu oluşturma hatası:', error);
    return { success: false, error: error.message };
  }
};

// Test fonksiyonunu çalıştır
createTestReservation();
