import React from 'react';
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../css/comscheme.css';

export default function Golden() {
    const navigate = useNavigate();
  return (
    <div className="golden-page">
      {/* Header */}
      <div className="jewel-header">
                          <span className="back-arrow" onClick={() => navigate(-1)}>
                            <FaArrowLeft className="back-icon" />
                          </span>
                          <h1 className="jewel-title">Golden</h1>
                        </div>

      {/* Plan Card */}
      <div className="plan-card">
        <div className="plan-title">Golden Grace Plan</div>
        <div className="plan-detail">Invest as little as ₹2,000/month</div>
        <div className="plan-detail">Save for 11 months, get the 12th installment free</div>
        <div className="plan-detail">Redeem for any gold jewelry at maturity</div>
      </div>

      {/* Terms & Conditions */}
      <div className="terms-box">
        <FaCheckCircle className="check-icon" />
        <span>Terms & Conditions apply</span>
      </div>
    </div>
  );
}