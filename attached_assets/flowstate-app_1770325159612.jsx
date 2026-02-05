import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Camera, MapPin, Star, Zap, Shield, ChevronRight, Menu, X, Utensils, Dumbbell, ShoppingCart, ScanLine, Award } from 'lucide-react';

// Lazy load the scanner modal for code splitting
const FoodScannerModal = lazy(() => import('./FoodScannerModal'));

const SCHOOL_COLORS = {
  fgcu: {
    primary: '#0A3D62',
    secondary: '#00A651',
    accent: '#FFB81C',
    name: 'Florida Gulf Coast University',
    shortName: 'FGCU'
  }
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [userEmail, setUserEmail] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('fgcu');
  const [location, setLocation] = useState('');
  const [schoolColors, setSchoolColors] = useState(SCHOOL_COLORS.fgcu);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scannerActive, setScannerActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const nearbyPlaces = [
    { id: 1, name: "Fresh Kitchen", type: 'restaurant', category: 'Healthy Eating', distance: '0.3 mi', discount: '15% off with student ID', rating: 4.7, price: '$$', features: ['Organic', 'Vegan Options', 'Gluten-Free'], emoji: '🥗' },
    { id: 2, name: "FGCU Fitness Center", type: 'gym', category: 'Fitness', distance: '0.1 mi', discount: 'Free for students', rating: 4.9, price: 'Free', features: ['24/7 Access', 'Personal Training', 'Group Classes'], emoji: '🏋️' },
    { id: 3, name: "SoulCycle Fort Myers", type: 'studio', category: 'Fitness', distance: '2.1 mi', discount: '20% off first month', rating: 4.8, price: '$$$', features: ['Indoor Cycling', 'Music-Based', 'Community'], emoji: '🚴' },
    { id: 4, name: "Whole Foods Market", type: 'grocery', category: 'Grocery', distance: '1.8 mi', discount: '10% off Amazon Prime', rating: 4.6, price: '$$$', features: ['Organic', 'Local', 'Prepared Foods'], emoji: '🛒' },
    { id: 5, name: "Tropical Smoothie Cafe", type: 'restaurant', category: 'Healthy Eating', distance: '0.5 mi', discount: 'Free boost with student ID', rating: 4.5, price: '$', features: ['Smoothies', 'Quick Bites', 'Fresh Ingredients'], emoji: '🥤' },
    { id: 6, name: "Planet Fitness", type: 'gym', category: 'Fitness', distance: '1.2 mi', discount: '$10/month student rate', rating: 4.4, price: '$', features: ['No Commitment', 'Judgement Free', 'Cardio & Weights'], emoji: '💪' }
  ];

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', schoolColors.primary);
    root.style.setProperty('--secondary-color', schoolColors.secondary);
    root.style.setProperty('--accent-color', schoolColors.accent);
  }, [schoolColors]);

  const filteredPlaces = selectedCategory === 'all' ? nearbyPlaces : nearbyPlaces.filter(p => p.category === selectedCategory);

  const LoadingSpinner = () => <div className="loading-spinner"><div className="spinner" /></div>;

  const WelcomePage = () => (
    <div className="welcome-page">
      <div className="floating-bg-1" />
      <div className="floating-bg-2" />
      <div className="welcome-container">
        <div className="welcome-header">
          <h1 className="app-title">Flowstate</h1>
          <p className="app-subtitle">Your campus health companion</p>
        </div>
        <div className="welcome-card">
          <div className="form-group">
            <label className="form-label">Student Email</label>
            <input type="email" placeholder="yourname@eagle.fgcu.edu" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Select Your School</label>
            <select value={selectedSchool} onChange={(e) => { setSelectedSchool(e.target.value); setSchoolColors(SCHOOL_COLORS[e.target.value]); }} className="form-select">
              <option value="fgcu">Florida Gulf Coast University</option>
            </select>
          </div>
          <button onClick={() => setCurrentPage('location')} disabled={!userEmail.includes('@eagle.fgcu.edu')} className={`btn-primary ${!userEmail.includes('@eagle.fgcu.edu') ? 'disabled' : ''}`}>
            Get Started<ChevronRight size={20} />
          </button>
          <div className="trust-badge">
            <div className="trust-header"><Shield size={20} /><span className="trust-title">Verified & Trustworthy</span></div>
            <p className="trust-text">All health information is fact-checked and curated specifically for college students</p>
          </div>
        </div>
      </div>
    </div>
  );

  const LocationPage = () => (
    <div className="location-page">
      <div className="location-container">
        <div className="location-header">
          <div className="icon-circle"><MapPin size={40} color="white" /></div>
          <h1 className="page-title">Where are you?</h1>
          <p className="page-subtitle">We'll find healthy options nearby</p>
        </div>
        <div className="location-card">
          <input type="text" placeholder="Enter your location or zip code" value={location} onChange={(e) => setLocation(e.target.value)} className="form-input" />
          <button onClick={() => setCurrentPage('dashboard')} disabled={!location} className={`btn-primary ${!location ? 'disabled' : ''}`}>Continue</button>
          <button onClick={() => { setLocation('Fort Myers, FL 33965'); setCurrentPage('dashboard'); }} className="btn-secondary">
            <MapPin size={18} />Use Current Location
          </button>
        </div>
      </div>
    </div>
  );

  const DashboardPage = () => (
    <div className="dashboard">
      <header className="header">
        <div className="header-content">
          <div className="app-title-small">Flowstate</div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="menu-btn">{menuOpen ? <X size={24} /> : <Menu size={24} />}</button>
        </div>
      </header>
      <div className="hero">
        <div className="hero-content">
          <div className="location-badge"><MapPin size={20} /><span>{location || 'Fort Myers, FL'}</span></div>
          <h1 className="hero-title">Hey Eagle! 🦅</h1>
          <p className="hero-subtitle">{filteredPlaces.length} healthy spots found near you</p>
        </div>
      </div>
      <div className="content-wrapper">
        <div className="quick-actions">
          <QuickActionCard icon={<ScanLine size={24} />} title="Food Scanner" onClick={() => setScannerActive(true)} color={schoolColors.accent} />
          <QuickActionCard icon={<Utensils size={24} />} title="Healthy Eats" onClick={() => setSelectedCategory('Healthy Eating')} color={schoolColors.secondary} />
          <QuickActionCard icon={<Dumbbell size={24} />} title="Fitness" onClick={() => setSelectedCategory('Fitness')} color={schoolColors.primary} />
          <QuickActionCard icon={<ShoppingCart size={24} />} title="Grocery" onClick={() => setSelectedCategory('Grocery')} color="#F59E0B" />
        </div>
        <div className="category-filters">
          {['all', 'Healthy Eating', 'Fitness', 'Grocery'].map(cat => (
            <button key={cat} onClick={() => setSelectedCategory(cat)} className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}>
              {cat === 'all' ? 'All' : cat}
            </button>
          ))}
        </div>
        <div className="places-grid">
          {filteredPlaces.map(place => <PlaceCard key={place.id} place={place} />)}
        </div>
      </div>
      {scannerActive && <Suspense fallback={<LoadingSpinner />}><FoodScannerModal onClose={() => setScannerActive(false)} schoolColors={schoolColors} /></Suspense>}
    </div>
  );

  const QuickActionCard = ({ icon, title, onClick, color }) => (
    <button onClick={onClick} className="quick-action-card">
      <div className="quick-action-icon" style={{ background: `${color}20`, color }}>{icon}</div>
      <span className="quick-action-title">{title}</span>
    </button>
  );

  const PlaceCard = ({ place }) => (
    <div className="place-card">
      <div className="place-image"><span className="place-emoji">{place.emoji}</span></div>
      <div className="place-content">
        <div className="place-header">
          <div>
            <h3 className="place-name">{place.name}</h3>
            <div className="place-meta"><MapPin size={14} />{place.distance}<span>•</span>{place.price}</div>
          </div>
          <div className="rating-badge"><Star size={14} fill="#F59E0B" color="#F59E0B" /><span>{place.rating}</span></div>
        </div>
        <div className="discount-badge"><Award size={16} />{place.discount}</div>
        <div className="features">{place.features.map((f, i) => <span key={i} className="feature-tag">{f}</span>)}</div>
      </div>
    </div>
  );

  return <>{currentPage === 'welcome' && <WelcomePage />}{currentPage === 'location' && <LocationPage />}{currentPage === 'dashboard' && <DashboardPage />}</>;
};

export default App;
