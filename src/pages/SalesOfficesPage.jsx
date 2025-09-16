import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const offices = [
  {
    id: 'antalya-center',
    city: 'Antalya',
    group: 'Merkez Satış Ofisleri',
    title: 'Antalya Merkez Ofis',
    address:
      'Altınova Sinan Mah. Çığdaş Sk. No:5 Agora AVM Karşısı / Antalya',
    phone: '(0850) 280 02 80',
  },
  {
    id: 'istanbul-hq',
    city: 'İstanbul',
    group: 'Merkez Satış Ofisleri',
    title: 'İstanbul Genel Müdürlük – Merkez Ofis',
    address:
      'Saray Mah. Dr. Adnan Büyükdeniz Cad. 2 Blok No:4/24 Ümraniye / İstanbul',
    phone: '(0850) 280 02 80',
  },
  {
    id: 'istanbul-ic-kuleler',
    city: 'İstanbul',
    group: 'Merkez Satış Ofisleri',
    title: 'İç Kuleler Merkez Ofis',
    address: 'Levent Mahallesi Meltem Sokak No:4/A İç Kuleler / İstanbul',
    phone: '(0212) 446 00 58',
  },
  {
    id: 'izmir-cs-travel',
    city: 'İzmir',
    group: 'İzmir',
    title: 'CS Travel',
    address:
      'Alsancak Mah.Şair Eşref Bulv. Çelebi İşhanı 1206 Movenpick Hotel Yanı Konak / İzmir',
    phone: '(0232) 463 05 22',
  },
];

const cities = ['İstanbul', 'Antalya', 'İzmir'];

const cityDistricts = {
  'İstanbul': ['Hepsini Seç', 'Ümraniye', 'Levent'],
  'Antalya': ['Hepsini Seç', 'Merkez'],
  'İzmir': ['Hepsini Seç', 'Konak']
};

const SalesOfficesPage = () => {
  const mapSrc =
    'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6019.496811930023!2d29.111664000000005!3d41.03076!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac9d43f9f5f79%3A0x3766d1cfb3c6fb8d!2sTatilBudur!5e0!3m2!1str!2str!4v1757671423977!5m2!1str!2str';

  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('Hepsini Seç');

  const filtered = useMemo(() => {
    // If no city selected, show all offices
    if (!selectedCity) {
      return offices;
    }
    
    // Filter by city first
    let cityFiltered = offices.filter((o) => o.city === selectedCity);
    
    // If no district selected or "Hepsini Seç" selected, return city filtered results
    if (!selectedDistrict || selectedDistrict === 'Hepsini Seç') {
      return cityFiltered;
    }
    
    // Filter by district based on office addresses
    return cityFiltered.filter((o) => {
      const address = o.address.toLowerCase();
      switch (selectedDistrict) {
        case 'Ümraniye':
          return address.includes('ümraniye');
        case 'Levent':
          return address.includes('levent');
        case 'Merkez':
          return address.includes('antalya') && address.includes('merkez');
        case 'Konak':
          return address.includes('konak');
        default:
          return true;
      }
    });
  }, [selectedCity, selectedDistrict]);

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setSelectedDistrict('Hepsini Seç'); // Reset district selection when city is selected
  };

  const handleDistrictChange = (district) => {
    setSelectedDistrict(district);
  };

  return (
    <div className="container" style={{ padding: '24px 0 40px' }}>
 
      <h2 style={{ margin: '0 0 16px 0' }}>Satış Ofislerimiz</h2>
     {/* Breadcrumb Navigation */}
     <div style={{ 
        marginBottom: '16px', 
        fontSize: '14px', 
        color: '#6b7280',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <Link 
          to="/" 
          style={{ 
            color: '#0b5ed7', 
            textDecoration: 'none',
            fontWeight: '500'
          }}
        >
          Tatilbudur
        </Link>
        <span style={{ color: '#d1d5db' }}>›</span>
        <span style={{ color: '#374151' }}>Satış Ofislerimiz</span>
      </div>
      <div
        style={{
          border: '1px solid var(--border-color)',
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: '0 10px 24px rgba(0,0,0,0.06)',
        }}
      >
        <iframe
          title="TatilBudur Satış Ofisi Harita"
          src={mapSrc}
          width="100%"
          height="420"
          style={{ border: 0, display: 'block' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div style={{
        marginTop: 12,
        color: '#4b5563',
        fontSize: 14,
        textAlign: 'center'
      }}>
        <p>Size en yakın satış ofisimize şehir, semt / ilçe seçimi yaparak
        ulaşabilirsiniz.</p>
        <p>Satış ofislerimizin adres ve telefon bilgilerine
        ulaşabilir, dilerseniz satış ofislerimizi harita üzerinden
        inceleyebilirsiniz.</p>
      </div>
      
      <div
        style={{
          marginTop: 12,
          display: 'flex',
          gap: 12,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <select
          value={selectedCity}
          onChange={(e) => handleCityChange(e.target.value)}
          style={{
            padding: '10px 12px',
            border: '1px solid var(--border-color)',
            borderRadius: 8,
            minWidth: 180,
          }}
        >
          <option value="">Şehir Seçin</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        <select
          value={selectedDistrict}
          onChange={(e) => handleDistrictChange(e.target.value)}
          disabled={!selectedCity}
          style={{
            padding: '10px 12px',
            border: '1px solid var(--border-color)',
            borderRadius: 8,
            minWidth: 180,
            backgroundColor: !selectedCity ? '#f9fafb' : '#fff',
            color: !selectedCity ? '#9ca3af' : '#111827',
            cursor: !selectedCity ? 'not-allowed' : 'pointer',
          }}
        >
          <option value="Hepsini Seç">
            {selectedCity ? 'Hepsini Seç' : 'Önce İl Seçin'}
          </option>
          {selectedCity && cityDistricts[selectedCity]?.slice(1).map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
      </div>

      <div
        style={{
          marginTop: 20,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
        }}
      >
        {filtered.map((o) => (
          <div
            key={o.id}
            style={{
              border: '1px solid var(--border-color)',
              borderRadius: 12,
              background: '#fff',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: 16 }}>
              <h3 style={{ margin: '0 0 4px 0', fontSize: 16 }}>{o.title}</h3>
              <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 12 }}>{o.city}</div>
              <div style={{ fontSize: 13, color: '#111827' }}>
                <strong>Adres:</strong> {o.address}
              </div>
              <div style={{ fontSize: 13, color: '#111827', marginTop: 6 }}>
                <strong>Telefon:</strong> {o.phone}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesOfficesPage;

