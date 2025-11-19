import React from 'react';
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../css/comscheme.css';

export default function Loyalty() {
    const navigate = useNavigate();
  return (
    <div className="golden-page">
      {/* Header */}
      <div className="jewel-header">
                          <span className="back-arrow" onClick={() => navigate(-1)}>
                            <FaArrowLeft className="back-icon" />
                          </span>
                          <h1 className="jewel-title">Loyalty</h1>
                        </div>

      {/* Plan Card */}
      <div className="plan-card">
        <div className="plan-title"> Loyalty Rewards </div>
        <div className="plan-detail">Earn points on every purchase</div>
        <div className="plan-detail">Redeem for discounts, gifts, or exclusive launches</div>
        <div className="plan-detail">Birthday & anniversary specials for members</div>
      </div>

      {/* Terms & Conditions */}
      <div className="terms-box">
        <FaCheckCircle className="check-icon" />
        <span>Terms & Conditions apply</span>
      </div>
    </div>
  );
}