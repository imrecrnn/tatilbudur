import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  signOut,
  updateEmail,
  updatePhoneNumber,
  fetchSignInMethodsForEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from './config';

// Kullanıcı kaydı
export const registerUser = async (userData) => {
  try {
    // Firebase Authentication ile kullanıcı oluştur
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      userData.email, 
      userData.password
    );
    
    const user = userCredential.user;
    
    // Kullanıcı profilini güncelle
    await updateProfile(user, {
      displayName: `${userData.firstName} ${userData.lastName}`
    });
    
    // Email doğrulama gönder
    await sendEmailVerification(user);
    
    // Firestore'a kullanıcı bilgilerini kaydet
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      tcNumber: userData.tcNumber,
      isTcCitizen: userData.isTcCitizen,
      birthDate: {
        day: userData.birthDay,
        month: userData.birthMonth,
        year: userData.birthYear
      },
      agreements: userData.agreements,
      createdAt: new Date(),
      updatedAt: new Date(),
      isEmailVerified: false,
      isPhoneVerified: false
    });
    
    return { success: true, user };
  } catch (error) {
    console.error('Kayıt hatası:', error);
    return { success: false, error: error.message };
  }
};

// Kullanıcı girişi
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Giriş hatası:', error);
    return { success: false, error: error.message };
  }
};

// Kullanıcı çıkışı
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Çıkış hatası:', error);
    return { success: false, error: error.message };
  }
};

// Kullanıcı bilgilerini getir
export const getUserData = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return { success: true, data: userDoc.data() };
    } else {
      return { success: false, error: 'Kullanıcı bulunamadı' };
    }
  } catch (error) {
    console.error('Kullanıcı verisi getirme hatası:', error);
    return { success: false, error: error.message };
  }
};

// Email doğrulama gönder
export const sendVerificationEmail = async () => {
  try {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
      return { success: true };
    }
    return { success: false, error: 'Kullanıcı giriş yapmamış' };
  } catch (error) {
    console.error('Email doğrulama gönderme hatası:', error);
    return { success: false, error: error.message };
  }
};

// Şifre sıfırlama emaili gönder
export const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    console.error('Şifre sıfırlama hatası:', error);
    return { success: false, error: error.message };
  }
};

// Kullanıcı doğrulama durumunu güncelle
export const updateUserVerificationStatus = async (uid, verificationData) => {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      ...verificationData,
      updatedAt: new Date()
    });
    return { success: true };
  } catch (error) {
    console.error('Doğrulama durumu güncelleme hatası:', error);
    return { success: false, error: error.message };
  }
};

// Tam üyelik tamamlama (email ve telefon doğrulandıktan sonra)
export const completeUserRegistration = async (userData) => {
  try {
    // Firebase Authentication ile kullanıcı oluştur
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      userData.email, 
      userData.password
    );
    
    const user = userCredential.user;
    
    // Kullanıcı profilini güncelle
    await updateProfile(user, {
      displayName: `${userData.firstName} ${userData.lastName}`
    });
    
    // Email doğrulama gönder
    await sendEmailVerification(user);
    
    // Firestore'a kullanıcı bilgilerini kaydet (doğrulama durumları ile birlikte)
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      tcNumber: userData.tcNumber,
      isTcCitizen: userData.isTcCitizen,
      birthDate: {
        day: userData.birthDay,
        month: userData.birthMonth,
        year: userData.birthYear
      },
      agreements: userData.agreements,
      createdAt: new Date(),
      updatedAt: new Date(),
      isEmailVerified: true, // OTP ile doğrulandı
      isPhoneVerified: true, // OTP ile doğrulandı
      isEmailVerifiedByFirebase: false, // Firebase email doğrulaması henüz yapılmadı
      registrationCompleted: true
    });
    
    return { success: true, user };
  } catch (error) {
    console.error('Üyelik tamamlama hatası:', error);
    
    // E-posta zaten kullanımda hatası için özel mesaj
    if (error.code === 'auth/email-already-in-use') {
      return { 
        success: false, 
        error: 'Bu e-posta adresi zaten kullanımda. Lütfen farklı bir e-posta adresi deneyin.' 
      };
    }
    
    // Diğer hatalar için genel mesaj
    return { success: false, error: error.message };
  }
};

// Email doğrulama durumunu kontrol et
export const checkEmailVerificationStatus = async (user) => {
  try {
    await user.reload();
    return user.emailVerified;
  } catch (error) {
    console.error('Email doğrulama durumu kontrol hatası:', error);
    return false;
  }
};

// Kullanıcı verilerini güncelle
export const updateUserData = async (uid, updateData) => {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      ...updateData,
      updatedAt: new Date()
    });
    return { success: true };
  } catch (error) {
    console.error('Kullanıcı verisi güncelleme hatası:', error);
    return { success: false, error: error.message };
  }
};

// E-posta adresinin kayıtlı olup olmadığını kontrol et (Firebase Auth ile)
export const checkEmailExists = async (email) => {
  try {
    console.log('🔍 E-posta kontrol ediliyor (Firebase Auth):', email);
    
    // Firebase Auth'un fetchSignInMethodsForEmail metodunu kullan
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    
    const exists = signInMethods && signInMethods.length > 0;
    console.log('📧 Firebase Auth e-posta kontrol sonucu:', exists);
    console.log('📧 Mevcut giriş yöntemleri:', signInMethods);
    
    return { 
      success: true, 
      exists: exists,
      methods: signInMethods || []
    };
  } catch (error) {
    console.error('❌ Firebase Auth e-posta kontrol hatası:', error);
    return { success: false, error: error.message };
  }
};

// E-posta adresinin kayıtlı olup olmadığını kontrol et (Firestore ile)
export const checkEmailExistsInFirestore = async (email) => {
  try {
    console.log('🔍 E-posta kontrol ediliyor (Firestore):', email);
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    
    const exists = !querySnapshot.empty;
    console.log('📧 Firestore e-posta kontrol sonucu:', exists);
    
    return { 
      success: true, 
      exists: exists,
      methods: exists ? ['password'] : []
    };
  } catch (error) {
    console.error('❌ Firestore e-posta kontrol hatası:', error);
    return { success: false, error: error.message };
  }
};

// Mevcut kullanıcı için direkt giriş (şifre ile)
export const directLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Direkt giriş hatası:', error);
    
    // Şifre yanlış hatası
    if (error.code === 'auth/wrong-password') {
      return { 
        success: false, 
        error: 'Şifre yanlış. Lütfen doğru şifrenizi girin.' 
      };
    }
    
    // Kullanıcı devre dışı hatası
    if (error.code === 'auth/user-disabled') {
      return { 
        success: false, 
        error: 'Hesabınız devre dışı bırakılmış. Lütfen destek ekibi ile iletişime geçin.' 
      };
    }
    
    // Diğer hatalar
    return { success: false, error: error.message };
  }
};
