import React, { useState } from 'react';
import { X } from 'lucide-react';
import './DiscountBanner.css';

const DiscountBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="discount-banner">
      <div className="container">
        <div className="discount-content">
          <span className="discount-text">
            Eylül Fırsatlarıyla Tatil Devam Ediyor
          </span>
          <button 
            className="discount-close"
            onClick={() => setIsVisible(false)}
            aria-label="Banneri kapat"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscountBanner;