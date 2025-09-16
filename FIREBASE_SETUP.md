# Firebase Kurulum Rehberi

## 1. Firebase Projesi Oluşturma

1. [Firebase Console](https://console.firebase.google.com/) adresine gidin
2. "Create a project" butonuna tıklayın
3. Proje adını girin (örn: "tatilbudur-app")
4. Google Analytics'i etkinleştirin (isteğe bağlı)
5. "Create project" butonuna tıklayın

## 2. Web Uygulaması Ekleme

1. Firebase Console'da projenizi seçin
2. Sol menüden "Project settings" (⚙️) tıklayın
3. "Your apps" bölümünde "Web" (</>) ikonuna tıklayın
4. App nickname girin (örn: "tatilbudur-web")
5. "Register app" butonuna tıklayın
6. Firebase SDK yapılandırmasını kopyalayın

## 3. Firebase Yapılandırması

`src/firebase/config.js` dosyasındaki `firebaseConfig` objesini güncelleyin:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

## 4. Authentication Ayarları

1. Firebase Console'da "Authentication" sekmesine gidin
2. "Get started" butonuna tıklayın
3. "Sign-in method" sekmesine gidin
4. "Email/Password" provider'ını etkinleştirin
5. "Save" butonuna tıklayın

## 5. Firestore Database Ayarları

1. Firebase Console'da "Firestore Database" sekmesine gidin
2. "Create database" butonuna tıklayın
3. "Start in test mode" seçin (geliştirme için)
4. Location seçin (örn: "europe-west1")
5. "Done" butonuna tıklayın

## 6. Güvenlik Kuralları (Firestore)

Firestore Rules sekmesinde aşağıdaki kuralları ekleyin:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Kullanıcılar sadece kendi verilerini okuyabilir/yazabilir
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 7. Test Etme

1. Development server'ı başlatın: `npm run dev`
2. `http://localhost:5175/login` adresine gidin
3. Kayıt formunu doldurun
4. Firebase Console'da "Authentication" ve "Firestore Database" bölümlerinde verilerinizi kontrol edin

## 8. Production Ayarları

Production'a geçerken:

1. Firestore Rules'u production için güncelleyin
2. Firebase Hosting kullanarak deploy edin
3. Custom domain ayarlayın
4. SSL sertifikasını kontrol edin

## Önemli Notlar

- API anahtarlarınızı asla public repository'de paylaşmayın
- `.env` dosyası kullanarak environment variables tanımlayın
- Firebase Security Rules'u dikkatli bir şekilde yapılandırın
- Rate limiting ve validation ekleyin
