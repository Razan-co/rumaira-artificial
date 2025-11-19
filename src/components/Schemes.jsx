import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import '../css/scheme.css';
import { useNavigate } from 'react-router-dom';

export default function Schemes() {
  const navigate = useNavigate();

  const handleSchemeClick = (scheme) => {
    switch (scheme) {
      case 'Golden Grace Plan':
        navigate('/golden');
        break;
      case 'Diamond EMI Plan':
        navigate('/diamond');
        break;
      case 'Wedding Jewellery Plan':
        navigate('/wedding');
        break;
      case 'Loyalty Rewards':
        navigate('/loyalty');
        break;
      default:
        break;
    }
  };

  const schemes = [
    'Golden Grace Plan',
    'Diamond EMI Plan',
    'Wedding Jewellery Plan',
    'Loyalty Rewards',
  ];

  return (
    <div className="schemes-page">
      {/* Header */}
      <div className="schemes-header">
        <FaArrowLeft className="back-icon" onClick={() => navigate(-1)} />
        <h2>Schemes</h2>
      </div>

      {/* Scheme Grid */}
      <div className="scheme-grid">
        {schemes.map((scheme, index) => (
          <div className="scheme-wrapper" key={index}>
            <button className="scheme-button" onClick={() => handleSchemeClick(scheme)}>
              {scheme}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
