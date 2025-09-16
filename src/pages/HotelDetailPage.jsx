import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, MapPin, Wifi, Car, Coffee, Utensils, Waves, 
  Users, Phone, Mail, Globe, Calendar, User, 
  ChevronLeft, ChevronRight, Heart, Share2, 
  Clock, CreditCard, Shield, Award
} from 'lucide-react';
import './HotelDetailPage.css';

const HotelDetailPage = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [activeTab, setActiveTab] = useState('rooms');
  const [showImageModal, setShowImageModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    nights: 0
  });
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);

  // Sample hotel data - in real app, this would come from API
  const sampleHotels = {
    1: {
      id: 1,
      name: "Rixos Premium Belek",
      location: "Belek, Antalya",
      district: "Belek",
      rating: 4.8,
      reviewCount: 2547,
      price: 1250,
      oldPrice: 1500,
      stars: 5,
      concept: "Ultra Her Şey Dahil",
      amenities: ["wifi", "parking", "pool", "restaurant", "spa", "gym", "beach", "kids-club"],
      description: "Akdeniz'in muhteşem manzarasında ultra lüks tatil deneyimi. Özel plajı ve geniş bahçesi ile unutulmaz anlar yaşayın.",
      features: ["Özel Plaj", "Spa Merkezi", "Aquapark", "Golf Sahası", "Kids Club", "Su Sporları"],
      discountPercentage: 17,
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop"
      ],
      rooms: [
        {
          id: 1,
          name: "Deluxe Sea View Room",
          type: "Deluxe Oda",
          size: "35 m²",
          capacity: "2-3 Kişi",
          bedType: "Double Bed",
          view: "Deniz Manzaralı",
          price: 1250,
          images: [
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=600&h=400&fit=crop"
          ],
          amenities: ["Minibar", "Klima", "WiFi", "Balkon", "Deniz Manzarası", "TV", "Telefon"],
          description: "Deniz manzaralı geniş deluxe odamız. Modern dekorasyon ve lüks mobilyalarla donatılmıştır."
        },
        {
          id: 2,
          name: "Family Suite",
          type: "Aile Süiti",
          size: "65 m²",
          capacity: "4-6 Kişi",
          bedType: "Double + 2 Single",
          view: "Bahçe Manzaralı",
          price: 1850,
          images: [
            "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop"
          ],
          amenities: ["Minibar", "Klima", "WiFi", "Balkon", "Bahçe Manzarası", "TV", "Telefon", "Sofa"],
          description: "Aileler için ideal geniş süit. Çocuklar için ayrı yatak odası ve geniş oturma alanı."
        },
        {
          id: 3,
          name: "Presidential Suite",
          type: "Başkan Süiti",
          size: "120 m²",
          capacity: "2-4 Kişi",
          bedType: "King Size",
          view: "Deniz Manzaralı",
          price: 3200,
          images: [
            "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop"
          ],
          amenities: ["Minibar", "Klima", "WiFi", "Geniş Balkon", "Deniz Manzarası", "TV", "Telefon", "Jakuzi", "Bar"],
          description: "Ultra lüks başkan süiti. Özel jakuzi, bar ve panoramik deniz manzarası ile unutulmaz bir deneyim."
        }
      ],
      facilities: [
        { name: "Özel Plaj", icon: "🏖️", description: "500m uzunluğunda özel plaj" },
        { name: "Aquapark", icon: "🎢", description: "Çocuk ve yetişkin havuzları" },
        { name: "Spa Merkezi", icon: "🧘", description: "Tam donanımlı spa ve wellness merkezi" },
        { name: "Golf Sahası", icon: "⛳", description: "18 delikli golf sahası" },
        { name: "Kids Club", icon: "👶", description: "3-12 yaş çocuklar için özel alan" },
        { name: "Fitness Center", icon: "💪", description: "Modern fitness ekipmanları" },
        { name: "Restoranlar", icon: "🍽️", description: "5 farklı restoran ve bar" },
        { name: "Su Sporları", icon: "🏄", description: "Dalış, yelken ve su kayağı" }
      ],
      policies: {
        checkIn: "14:00",
        checkOut: "12:00",
        cancellation: "Ücretsiz iptal 24 saat öncesine kadar",
        children: "0-2 yaş ücretsiz, 3-12 yaş %30-50 indirim",
        pets: "Evcil hayvan kabul edilmez"
      },
      contact: {
        phone: "+90 242 737 25 48",
        email: "info@rixospremiumbelek.com",
        website: "https://www.rixospremiumbelek.com",
        address: "Belek Mahallesi, Atatürk Bulvarı No: 1, Antalya"
      }
    },
    3: {
      id: 3,
      name: "Calista Luxury Resort",
      location: "Belek, Antalya",
      district: "Belek",
      rating: 4.7,
      reviewCount: 1923,
      price: 1800,
      oldPrice: 2200,
      stars: 5,
      concept: "Her Şey Dahil",
      amenities: ["wifi", "parking", "pool", "restaurant", "spa", "beach", "kids-club"],
      description: "Belek'te aile dostu lüks tatil. Geniş aquapark ve çocuk aktiviteleri ile aileler için ideal bir tatil deneyimi sunar.",
      features: ["Aquapark", "Kids Club", "Mini Golf", "Tenis Kortu", "Spa", "Özel Plaj"],
      discountPercentage: 18,
      images: [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop"
      ],
      rooms: [
        {
          id: 1,
          name: "Superior Garden View Room",
          type: "Süperior Oda",
          size: "28 m²",
          capacity: "2-3 Kişi",
          bedType: "Double Bed",
          view: "Bahçe Manzaralı",
          price: 1800,
          images: [
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=600&h=400&fit=crop"
          ],
          amenities: ["Minibar", "Klima", "WiFi", "Balkon", "Bahçe Manzarası", "TV", "Telefon", "Kasa"],
          description: "Bahçe manzaralı süperior odamız. Aileler için ideal konforlu konaklama."
        },
        {
          id: 2,
          name: "Family Room with Bunk Beds",
          type: "Aile Odası",
          size: "40 m²",
          capacity: "4-5 Kişi",
          bedType: "Double + Bunk Bed",
          view: "Bahçe Manzaralı",
          price: 2200,
          images: [
            "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop"
          ],
          amenities: ["Minibar", "Klima", "WiFi", "Balkon", "Bahçe Manzarası", "TV", "Telefon", "Kasa", "Çocuk Yatakları"],
          description: "Çocuklu aileler için özel tasarlanmış oda. Çocuk yatakları ve güvenlik önlemleri mevcuttur."
        },
        {
          id: 3,
          name: "Deluxe Sea View Room",
          type: "Deluxe Deniz Manzaralı",
          size: "32 m²",
          capacity: "2-3 Kişi",
          bedType: "Double Bed",
          view: "Deniz Manzaralı",
          price: 2500,
          images: [
            "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop"
          ],
          amenities: ["Minibar", "Klima", "WiFi", "Balkon", "Deniz Manzarası", "TV", "Telefon", "Kasa", "Jakuzi"],
          description: "Deniz manzaralı deluxe odamız. Özel jakuzi ile lüks konaklama deneyimi."
        }
      ],
      facilities: [
        { name: "Aquapark", icon: "🎢", description: "Çocuklar için özel aquapark" },
        { name: "Kids Club", icon: "👶", description: "4-12 yaş çocuklar için eğlenceli aktiviteler" },
        { name: "Mini Golf", icon: "⛳", description: "Aileler için mini golf sahası" },
        { name: "Tenis Kortu", icon: "🎾", description: "2 adet tenis kortu" },
        { name: "Spa Merkezi", icon: "🧘", description: "Relaxing spa ve masaj hizmetleri" },
        { name: "Özel Plaj", icon: "🏖️", description: "Temiz ve güvenli özel plaj" },
        { name: "Restoranlar", icon: "🍽️", description: "4 farklı restoran ve snack bar" },
        { name: "Animation", icon: "🎭", description: "Günlük eğlence programları" }
      ],
      policies: {
        checkIn: "14:00",
        checkOut: "12:00",
        cancellation: "Ücretsiz iptal 24 saat öncesine kadar",
        children: "0-2 yaş ücretsiz, 3-12 yaş %30-50 indirim",
        pets: "Evcil hayvan kabul edilmez"
      },
      contact: {
        phone: "+90 242 682 71 84",
        email: "info@calistaluxuryresort.com",
        website: "https://www.calistaluxuryresort.com",
        address: "Belek Mahallesi, Atatürk Bulvarı No: 3, Antalya"
      }
    }
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const hotelData = sampleHotels[parseInt(hotelId)];
      if (hotelData) {
        setHotel(hotelData);
        setSelectedRoom(hotelData.rooms[0]);
        // Set initial booking data with today and tomorrow
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        setBookingData({
          checkIn: today.toISOString().split('T')[0],
          checkOut: tomorrow.toISOString().split('T')[0],
          adults: 2,
          children: 0,
          nights: 1
        });
      }
      setLoading(false);
    }, 1000);
  }, [hotelId]);

  // Calculate nights between dates
  const calculateNights = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Calculate total price
  const calculatePrice = () => {
    if (!hotel || !selectedRoom || !bookingData.checkIn || !bookingData.checkOut) {
      return 0;
    }

    const nights = calculateNights(bookingData.checkIn, bookingData.checkOut);
    const basePrice = selectedRoom.price;
    
    // Apply seasonal pricing (example: summer premium)
    const currentMonth = new Date().getMonth();
    let seasonalMultiplier = 1;
    
    if (currentMonth >= 5 && currentMonth <= 8) { // June to September
      seasonalMultiplier = 1.3; // 30% summer premium
    } else if (currentMonth >= 11 || currentMonth <= 1) { // December to February
      seasonalMultiplier = 0.8; // 20% winter discount
    }
    
    // Apply occupancy pricing
    const totalGuests = bookingData.adults + bookingData.children;
    let occupancyMultiplier = 1;
    
    if (totalGuests > 2) {
      occupancyMultiplier = 1.2; // 20% extra for more than 2 guests
    }
    
    const totalPrice = basePrice * nights * seasonalMultiplier * occupancyMultiplier;
    
    return Math.round(totalPrice);
  };

  // Update booking data and recalculate price
  const updateBookingData = (field, value) => {
    setIsCalculating(true);
    
    setBookingData(prev => {
      const newData = { ...prev, [field]: value };
      
      // If dates changed, recalculate nights
      if (field === 'checkIn' || field === 'checkOut') {
        const nights = calculateNights(newData.checkIn, newData.checkOut);
        newData.nights = nights;
      }
      
      return newData;
    });
    
    // Simulate API delay for price calculation
    setTimeout(() => {
      const newPrice = calculatePrice();
      setCalculatedPrice(newPrice);
      setIsCalculating(false);
    }, 500);
  };

  // Update calculated price when dependencies change
  useEffect(() => {
    if (hotel && selectedRoom && bookingData.checkIn && bookingData.checkOut) {
      const newPrice = calculatePrice();
      setCalculatedPrice(newPrice);
    }
  }, [hotel, selectedRoom, bookingData]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === hotel.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? hotel.images.length - 1 : prev - 1
    );
  };

  const amenityIcons = {
    wifi: <Wifi size={16} />,
    parking: <Car size={16} />,
    pool: <Waves size={16} />,
    restaurant: <Utensils size={16} />,
    spa: <Coffee size={16} />,
    gym: <Users size={16} />,
    beach: <Waves size={16} />,
    'kids-club': <Users size={16} />
  };

  const amenityNames = {
    wifi: "WiFi",
    parking: "Otopark",
    pool: "Havuz",
    restaurant: "Restoran",
    spa: "Spa",
    gym: "Fitness",
    beach: "Plaj",
    'kids-club': "Kids Club"
  };

  if (loading) {
    return (
      <div className="hotel-detail-loading">
        <div className="loading-spinner"></div>
        <p>Otel detayları yükleniyor...</p>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="hotel-detail-error">
        <h2>Otel bulunamadı</h2>
        <button onClick={() => navigate(-1)} className="btn btn-primary">
          Geri Dön
        </button>
      </div>
    );
  }

  return (
    <div className="hotel-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <button onClick={() => navigate(-1)} className="breadcrumb-back">
            <ChevronLeft size={16} />
            Geri
          </button>
          <span>/</span>
          <span>Antalya Otelleri</span>
          <span>/</span>
          <span>{hotel.name}</span>
        </div>

        {/* Hotel Header */}
        <div className="hotel-header">
          <div className="hotel-title-section">
            <h1>{hotel.name}</h1>
            <div className="hotel-location">
              <MapPin size={16} />
              <span>{hotel.location}</span>
            </div>
            <div className="hotel-stars">
              {Array.from({length: hotel.stars}, (_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
          </div>
          
          <div className="hotel-rating-section">
            <div className="rating-score">{hotel.rating}</div>
            <div className="rating-text">
              <span>
                {hotel.rating >= 4.7 ? 'Mükemmel' :
                 hotel.rating >= 4.5 ? 'Çok İyi' :
                 hotel.rating >= 4.0 ? 'İyi' : 'Ortalama'}
              </span>
              <small>{hotel.reviewCount} değerlendirme</small>
            </div>
          </div>

          <div className="hotel-actions">
            <button className="action-btn">
              <Heart size={20} />
            </button>
            <button className="action-btn">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="image-gallery">
          <div className="main-image">
            <img 
              src={hotel.images[currentImageIndex]} 
              alt={hotel.name}
              onClick={() => setShowImageModal(true)}
            />
            <div className="image-controls">
              <button onClick={prevImage} className="image-btn">
                <ChevronLeft size={20} />
              </button>
              <button onClick={nextImage} className="image-btn">
                <ChevronRight size={20} />
              </button>
            </div>
            <div className="image-counter">
              {currentImageIndex + 1} / {hotel.images.length}
            </div>
          </div>
          
          <div className="image-thumbnails">
            {hotel.images.slice(0, 4).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${hotel.name} ${index + 1}`}
                className={index === currentImageIndex ? 'active' : ''}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Hotel Info Tabs */}
        <div className="hotel-tabs">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Genel Bilgiler
          </button>
          <button 
            className={`tab-btn ${activeTab === 'rooms' ? 'active' : ''}`}
            onClick={() => setActiveTab('rooms')}
          >
            Oda Tipleri
          </button>
          <button 
            className={`tab-btn ${activeTab === 'facilities' ? 'active' : ''}`}
            onClick={() => setActiveTab('facilities')}
          >
            Olanaklar
          </button>
          <button 
            className={`tab-btn ${activeTab === 'policies' ? 'active' : ''}`}
            onClick={() => setActiveTab('policies')}
          >
            Politikalar
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="overview-content">
              <div className="hotel-description">
                <h3>Açıklama</h3>
                <p>{hotel.description}</p>
              </div>
              
              <div className="hotel-features">
                <h3>Öne Çıkan Özellikler</h3>
                <div className="features-grid">
                  {hotel.features.map((feature, index) => (
                    <div key={index} className="feature-item">
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hotel-amenities">
                <h3>Otel Olanakları</h3>
                <div className="amenities-grid">
                  {hotel.amenities.map((amenity) => (
                    <div key={amenity} className="amenity-item">
                      {amenityIcons[amenity]}
                      <span>{amenityNames[amenity]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rooms' && (
            <div className="rooms-content">
              <h3>Oda Tipleri</h3>
              
              {/* Date Selection Above Rooms */}
              <div className="room-date-selection">
                <div className="date-selection-header">
                  <h4>Konaklama Tarihleri</h4>
                </div>
                <div className="date-selection-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Giriş Tarihi</label>
                      <input 
                        type="date" 
                        value={bookingData.checkIn}
                        onChange={(e) => updateBookingData('checkIn', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div className="form-group">
                      <label>Çıkış Tarihi</label>
                      <input 
                        type="date" 
                        value={bookingData.checkOut}
                        onChange={(e) => updateBookingData('checkOut', e.target.value)}
                        min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div className="form-group">
                      <label>Misafir Sayısı</label>
                      <select 
                        value={`${bookingData.adults}-${bookingData.children}`}
                        onChange={(e) => {
                          const [adults, children] = e.target.value.split('-').map(Number);
                          updateBookingData('adults', adults);
                          updateBookingData('children', children);
                        }}
                      >
                        <option value="1-0">1 Yetişkin</option>
                        <option value="2-0">2 Yetişkin</option>
                        <option value="2-1">2 Yetişkin, 1 Çocuk</option>
                        <option value="2-2">2 Yetişkin, 2 Çocuk</option>
                        <option value="3-0">3 Yetişkin</option>
                        <option value="4-0">4 Yetişkin</option>
                      </select>
                    </div>
                    <button 
                      className="btn btn-primary"
                      disabled={!bookingData.checkIn || !bookingData.checkOut}
                      onClick={() => {
                        // Trigger price calculation and force re-render
                        if (bookingData.checkIn && bookingData.checkOut) {
                          calculatePrice();
                          // Force re-render by updating a dummy state
                          setBookingData(prev => ({ ...prev }));
                        }
                      }}
                    >
                      <Calendar size={16} />
                      Güncelle
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="rooms-grid">
                {hotel.rooms.map((room) => (
                  <div 
                    key={room.id} 
                    className={`room-card ${selectedRoom?.id === room.id ? 'selected' : ''}`}
                    onClick={() => setSelectedRoom(room)}
                  >
                    <div className="room-image">
                      <img src={room.images[0]} alt={room.name} />
                    </div>
                    <div className="room-info">
                      <h4>{room.name}</h4>
                      <div className="room-details">
                        <span className="room-type">{room.type}</span>
                        <span className="room-size">{room.size}</span>
                        <span className="room-capacity">{room.capacity}</span>
                      </div>
                      <p className="room-description">{room.description}</p>
                      <div className="room-amenities">
                        {room.amenities.slice(0, 3).map((amenity, index) => (
                          <span key={index} className="amenity-tag">{amenity}</span>
                        ))}
                      </div>
                      <div className="room-price">
                        {bookingData.checkIn && bookingData.checkOut && bookingData.nights > 0 ? (
                          <>
                            <span className="price">
                              {Math.round(room.price * bookingData.nights * (1 - hotel.discountPercentage / 100)).toLocaleString()} TL
                            </span>
                            <span className="per-night">
                              / {bookingData.nights} gece ({bookingData.adults + bookingData.children} kişi)
                            </span>
                            <div className="price-breakdown">
                              <small>
                                {room.price.toLocaleString()} TL × {bookingData.nights} gece
                                {hotel.discountPercentage > 0 && (
                                  <span className="discount-text"> (%{hotel.discountPercentage} indirim)</span>
                                )}
                              </small>
                            </div>
                            <button 
                              className="btn btn-primary btn-small room-reservation-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedRoom(room);
                                navigate(`/checkout/${hotelId}`, {
                                  state: {
                                    hotel,
                                    bookingData: {
                                      ...bookingData,
                                      totalPrice: Math.round(room.price * bookingData.nights * (1 - hotel.discountPercentage / 100))
                                    },
                                    selectedRoom: room
                                  }
                                });
                              }}
                            >
                              <Calendar size={14} />
                              Rezervasyon Yap
                            </button>
                          </>
                        ) : (
                          <>
                            <span className="price">{room.price.toLocaleString()} TL</span>
                            <span className="per-night">/ gece</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Selected Room Details */}
              {selectedRoom && (
                <div className="selected-room-details">
                  <h4>{selectedRoom.name} Detayları</h4>
                  <div className="room-detail-grid">
                    <div className="room-images">
                      <img src={selectedRoom.images[0]} alt={selectedRoom.name} />
                      {selectedRoom.images[1] && (
                        <img src={selectedRoom.images[1]} alt={selectedRoom.name} />
                      )}
                    </div>
                    <div className="room-specs">
                      <div className="spec-item">
                        <strong>Oda Tipi:</strong> {selectedRoom.type}
                      </div>
                      <div className="spec-item">
                        <strong>Alan:</strong> {selectedRoom.size}
                      </div>
                      <div className="spec-item">
                        <strong>Kapasite:</strong> {selectedRoom.capacity}
                      </div>
                      <div className="spec-item">
                        <strong>Yatak:</strong> {selectedRoom.bedType}
                      </div>
                      <div className="spec-item">
                        <strong>Manzara:</strong> {selectedRoom.view}
                      </div>
                      <div className="spec-item">
                        <strong>Fiyat:</strong> {selectedRoom.price.toLocaleString()} TL / gece
                      </div>
                    </div>
                  </div>
                  <div className="room-amenities-detail">
                    <h5>Oda Olanakları</h5>
                    <div className="amenities-list">
                      {selectedRoom.amenities.map((amenity, index) => (
                        <span key={index} className="amenity-badge">{amenity}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'facilities' && (
            <div className="facilities-content">
              <h3>Otel Olanakları</h3>
              <div className="facilities-grid">
                {hotel.facilities.map((facility, index) => (
                  <div key={index} className="facility-card">
                    <div className="facility-icon">{facility.icon}</div>
                    <h4>{facility.name}</h4>
                    <p>{facility.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'policies' && (
            <div className="policies-content">
              <h3>Otel Politikaları</h3>
              <div className="policies-grid">
                <div className="policy-item">
                  <Clock size={20} />
                  <div>
                    <h4>Giriş - Çıkış</h4>
                    <p>Giriş: {hotel.policies.checkIn}</p>
                    <p>Çıkış: {hotel.policies.checkOut}</p>
                  </div>
                </div>
                <div className="policy-item">
                  <CreditCard size={20} />
                  <div>
                    <h4>İptal Politikası</h4>
                    <p>{hotel.policies.cancellation}</p>
                  </div>
                </div>
                <div className="policy-item">
                  <User size={20} />
                  <div>
                    <h4>Çocuk Politikası</h4>
                    <p>{hotel.policies.children}</p>
                  </div>
                </div>
                <div className="policy-item">
                  <Shield size={20} />
                  <div>
                    <h4>Evcil Hayvan</h4>
                    <p>{hotel.policies.pets}</p>
                  </div>
                </div>
              </div>

              <div className="contact-info">
                <h4>İletişim Bilgileri</h4>
                <div className="contact-grid">
                  <div className="contact-item">
                    <Phone size={16} />
                    <span>{hotel.contact.phone}</span>
                  </div>
                  <div className="contact-item">
                    <Mail size={16} />
                    <span>{hotel.contact.email}</span>
                  </div>
                  <div className="contact-item">
                    <Globe size={16} />
                    <a href={hotel.contact.website} target="_blank" rel="noopener noreferrer">
                      {hotel.contact.website}
                    </a>
                  </div>
                  <div className="contact-item">
                    <MapPin size={16} />
                    <span>{hotel.contact.address}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="image-modal" onClick={() => setShowImageModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setShowImageModal(false)}
            >
              ✕
            </button>
            <img src={hotel.images[currentImageIndex]} alt={hotel.name} />
            <div className="modal-controls">
              <button onClick={prevImage}>
                <ChevronLeft size={24} />
              </button>
              <button onClick={nextImage}>
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelDetailPage;
