// Homepage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/main.css';

const slides = [
  { title: 'Elegance that Tells Your Story', type: 'rings' },
  { title: 'Rumaira, Your Jewellery Destination', img: '/assets/Homeimage1.jpeg', type: 'normal' },
  { title: 'Find the Perfect Sparkle for You', img: '/assets/Homeimage2.png', type: 'normal' },
];

export default function Homepage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate('/LoginSignup');
    }
  };

  const handleSkip = () => {
    navigate('/LoginSignup');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-full-wrapper">
      <div className="carousel-image">
        {slides[currentIndex].type === 'rings' ? (
          <div className="ring-slide">
             <div className="white-light-ray"></div>
            {[...Array(11)].map((_, i) => (
    <img
      key={i}
      src={`/assets/Homeimage3-${i + 1}.png`}
      alt={`ring ${i + 1}`}
      className={`ring ring-${i + 1}`}
    />
  ))}

  {/* Center Logo */}
  <div className="center-logo-wrapper">
    <img src="/assets/Logo.png" alt="Rumaira Logo" className="center-logo" />
  </div>
          </div>
        ) : (
          <img src={slides[currentIndex].img} alt="carousel" className="carousel-img" />
        )}
      </div>

      <div className="carousel-bottom-card">
        <h2>{slides[currentIndex].title}</h2>
        <div className="carousel-dots">
          {slides.map((_, idx) => (
            <span key={idx} className={`dot ${idx === currentIndex ? 'active' : ''}`}></span>
          ))}
        </div>
        <div className="carousel-buttons">
          <button className="skip-btn" onClick={handleSkip}>Skip</button>
          <button className="next-btn" onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
}