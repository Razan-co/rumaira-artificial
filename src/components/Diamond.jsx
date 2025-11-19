import React from 'react';
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../css/comscheme.css';

export default function Diamond() {
    const navigate = useNavigate();
  return (
    <div className="golden-page">
      {/* Header */}
     <div className="jewel-header">
                         <span className="back-arrow" onClick={() => navigate(-1)}>
                           <FaArrowLeft className="back-icon" />
                         </span>
                         <h1 className="jewel-title">Diamond</h1>
                       </div>

      {/* Plan Card */}
      <div className="plan-card">
        <div className="plan-title">Diamond EMI Plan</div>
        <div className="plan-detail">Invest as little as ₹5,000/month</div>
        <div className="plan-detail">S0% interest EMI on selected Diamond jewelry,Available on purchases above Rs.20,000</div>
        <div className="plan-detail">Easy 3-9 months plan</div>
      </div>

      {/* Terms & Conditions */}
      <div className="terms-box">
        <FaCheckCircle className="check-icon" />
        <span>Terms & Conditions apply</span>
      </div>
    </div>
  );
}