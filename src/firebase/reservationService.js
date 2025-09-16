import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  doc, 
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './config';

// Rezervasyon kodu oluştur (sadece sayılar)
export const generateReservationCode = () => {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${timestamp}${random}`;
};

// Rezervasyon numarası oluştur (sadece sayılar)
export const generateReservationNumber = () => {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${timestamp}${random}`;
};

// Rezervasyon oluştur
export const createReservation = async (reservationData) => {
  try {
    console.log('🏨 Rezervasyon oluşturuluyor:', reservationData);
    
    // Rezervasyon kodu ve numarası oluştur
    const reservationCode = generateReservationCode();
    const reservationNumber = generateReservationNumber();
    
    // Rezervasyon verisini hazırla
    const reservation = {
      reservationCode,
      reservationNumber,
      email: reservationData.email,
      firstName: reservationData.firstName,
      lastName: reservationData.lastName,
      phone: reservationData.phone,
      hotel: {
        id: reservationData.hotel.id,
        name: reservationData.hotel.name,
        location: reservationData.hotel.location,
        image: reservationData.hotel.image,
        rating: reservationData.hotel.rating
      },
      bookingData: {
        checkIn: reservationData.bookingData.checkIn,
        checkOut: reservationData.bookingData.checkOut,
        adults: reservationData.bookingData.adults,
        children: reservationData.bookingData.children,
        nights: reservationData.bookingData.nights
      },
      totalPrice: reservationData.totalPrice,
      paymentInfo: {
        method: reservationData.paymentInfo.method,
        transactionId: reservationData.paymentInfo.transactionId,
        cardNumber: reservationData.paymentInfo.cardNumber,
        paymentDate: reservationData.paymentInfo.paymentDate
      },
      status: 'confirmed', // Onaylandı
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    // Firestore'a kaydet
    const docRef = await addDoc(collection(db, 'reservations'), reservation);
    
    console.log('✅ Rezervasyon başarıyla oluşturuldu:', docRef.id);
    console.log('📋 Rezervasyon Kodu:', reservationCode);
    
    return { 
      success: true, 
      reservationId: docRef.id,
      reservationCode,
      reservationNumber,
      data: reservation
    };
  } catch (error) {
    console.error('❌ Rezervasyon oluşturma hatası:', error);
    
    // Firebase izin hatası için özel mesaj
    if (error.code === 'permission-denied') {
      return { 
        success: false, 
        error: 'Firebase izin hatası. Lütfen Firebase güvenlik kurallarını kontrol edin.' 
      };
    }
    
    // Diğer hatalar için genel mesaj
    return { 
      success: false, 
      error: error.message || 'Rezervasyon oluşturma sırasında bir hata oluştu.' 
    };
  }
};

// Email ile rezervasyonları getir
export const getReservationsByEmail = async (email) => {
  try {
    console.log('🔍 Email ile rezervasyonlar aranıyor:', email);
    
    const reservationsRef = collection(db, 'reservations');
    const q = query(
      reservationsRef, 
      where('email', '==', email),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const reservations = [];
    
    querySnapshot.forEach((doc) => {
      reservations.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    console.log('📋 Bulunan rezervasyon sayısı:', reservations.length);
    return { success: true, reservations };
  } catch (error) {
    console.error('❌ Rezervasyon arama hatası:', error);
    return { success: false, error: error.message };
  }
};

// Rezervasyon koduna göre rezervasyon getir
export const getReservationByCode = async (reservationCode) => {
  try {
    console.log('🔍 Rezervasyon kodu ile aranıyor:', reservationCode);
    
    const reservationsRef = collection(db, 'reservations');
    const q = query(reservationsRef, where('reservationCode', '==', reservationCode));
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return { success: false, error: 'Rezervasyon bulunamadı' };
    }
    
    const doc = querySnapshot.docs[0];
    const reservation = {
      id: doc.id,
      ...doc.data()
    };
    
    console.log('✅ Rezervasyon bulundu:', reservation.reservationCode);
    return { success: true, reservation };
  } catch (error) {
    console.error('❌ Rezervasyon kodu arama hatası:', error);
    return { success: false, error: error.message };
  }
};

// Tüm rezervasyonları getir (admin için)
export const getAllReservations = async () => {
  try {
    console.log('🔍 Tüm rezervasyonlar getiriliyor...');
    
    const reservationsRef = collection(db, 'reservations');
    const q = query(reservationsRef, orderBy('createdAt', 'desc'));
    
    const querySnapshot = await getDocs(q);
    const reservations = [];
    
    querySnapshot.forEach((doc) => {
      reservations.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    console.log('📋 Toplam rezervasyon sayısı:', reservations.length);
    return { success: true, reservations };
  } catch (error) {
    console.error('❌ Tüm rezervasyonları getirme hatası:', error);
    return { success: false, error: error.message };
  }
};

// Rezervasyon durumunu güncelle
export const updateReservationStatus = async (reservationId, status) => {
  try {
    console.log('🔄 Rezervasyon durumu güncelleniyor:', reservationId, status);
    
    const reservationRef = doc(db, 'reservations', reservationId);
    await updateDoc(reservationRef, {
      status,
      updatedAt: serverTimestamp()
    });
    
    console.log('✅ Rezervasyon durumu güncellendi');
    return { success: true };
  } catch (error) {
    console.error('❌ Rezervasyon durumu güncelleme hatası:', error);
    return { success: false, error: error.message };
  }
};

// Rezervasyonu sil
export const deleteReservation = async (reservationId) => {
  try {
    console.log('🗑️ Rezervasyon siliniyor:', reservationId);
    
    await deleteDoc(doc(db, 'reservations', reservationId));
    
    console.log('✅ Rezervasyon silindi');
    return { success: true };
  } catch (error) {
    console.error('❌ Rezervasyon silme hatası:', error);
    return { success: false, error: error.message };
  }
};

// Rezervasyon istatistikleri
export const getReservationStats = async () => {
  try {
    const reservationsRef = collection(db, 'reservations');
    const querySnapshot = await getDocs(reservationsRef);
    
    const stats = {
      total: 0,
      confirmed: 0,
      pending: 0,
      cancelled: 0,
      totalRevenue: 0
    };
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      stats.total++;
      
      if (data.status === 'confirmed') {
        stats.confirmed++;
        stats.totalRevenue += data.totalPrice || 0;
      } else if (data.status === 'pending') {
        stats.pending++;
      } else if (data.status === 'cancelled') {
        stats.cancelled++;
      }
    });
    
    return { success: true, stats };
  } catch (error) {
    console.error('❌ Rezervasyon istatistikleri hatası:', error);
    return { success: false, error: error.message };
  }
};
