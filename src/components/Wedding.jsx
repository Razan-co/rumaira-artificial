import React from 'react';
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../css/comscheme.css';

export default function Wedding() {
  const navigate = useNavigate();
  return (
    <div className="golden-page">
      {/* Header */}
     <div className="jewel-header">
                               <span className="back-arrow" onClick={() => navigate(-1)}>
                                 <FaArrowLeft className="back-icon" />
                               </span>
                               <h1 className="jewel-title">Wedding</h1>
                             </div>

      {/* Plan Card */}
      <div className="plan-card">
        <div className="plan-title">Wedding Jewellry Package</div>
        <div className="plan-detail">Invest as little as ₹5,000/month</div>
        <div className="plan-detail">Custom bridal sets with exclusive discounts! Pre-book in advance with token amount</div>
        <div className="plan-detail">Free delivery + insurance coverage</div>
      </div>

      {/* Terms & Conditions */}
      <div className="terms-box">
        <FaCheckCircle className="check-icon" />
        <span>Terms & Conditions apply</span>
      </div>
    </div>
  );
}