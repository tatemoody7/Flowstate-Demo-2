import React, { useState } from 'react';
import { Camera, X, Zap, DollarSign, ScanLine } from 'lucide-react';

const FoodScannerModal = ({ onClose, schoolColors }) => {
  const [scanned, setScanned] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const handleScan = () => {
    setTimeout(() => {
      setScanResult({
        name: 'Organic Quinoa Bowl',
        calories: 420,
        protein: '18g',
        healthScore: 92,
        ingredients: ['Quinoa', 'Avocado', 'Black Beans', 'Kale', 'Lime'],
        priceComparison: [
          { store: 'Whole Foods', price: '$8.99', distance: '1.8 mi' },
          { store: 'Publix', price: '$7.49', distance: '0.9 mi' },
          { store: 'Target', price: '$6.99', distance: '2.3 mi' }
        ]
      });
      setScanned(true);
    }, 2000);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close"><X size={20} /></button>
        <div className="modal-body">
          {!scanned ? (
            <>
              <div className="scanner-header">
                <div className="scanner-icon"><Camera size={40} color="white" /></div>
                <h2 className="scanner-title">Scan Your Food</h2>
                <p className="scanner-subtitle">Get instant nutrition info and price comparisons</p>
              </div>
              <div className="camera-placeholder">
                <div className="scan-frame"><ScanLine size={48} color={schoolColors.primary} /></div>
              </div>
              <button onClick={handleScan} className="btn-primary full-width">Start Scanning</button>
            </>
          ) : (
            <>
              <div className="results-header">
                <div className="success-icon"><Zap size={30} color="white" /></div>
                <h3 className="result-name">{scanResult.name}</h3>
                <div className="health-score">{scanResult.healthScore}/100</div>
                <p className="score-label">Health Score</p>
              </div>
              <div className="nutrition-box">
                <h4 className="nutrition-title">Nutrition Facts</h4>
                <div className="nutrition-grid">
                  <div><div className="nutrition-value">{scanResult.calories}</div><div className="nutrition-label">Calories</div></div>
                  <div><div className="nutrition-value protein">{scanResult.protein}</div><div className="nutrition-label">Protein</div></div>
                </div>
              </div>
              <div className="price-section">
                <h4 className="price-title"><DollarSign size={16} />Price Comparison</h4>
                {scanResult.priceComparison.map((store, i) => (
                  <div key={i} className={`price-row ${i === 0 ? 'best-price' : ''}`}>
                    <div><div className="store-name">{store.store}</div><div className="store-distance">{store.distance} away</div></div>
                    <div className="store-price">{store.price}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => { setScanned(false); setScanResult(null); }} className="btn-secondary full-width">Scan Another Item</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodScannerModal;
