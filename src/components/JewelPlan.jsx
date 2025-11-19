 import React from "react"; 
import { useNavigate } from "react-router-dom";
import "../css/JewelPlan.css";
import { FaArrowLeft } from 'react-icons/fa';


export default function JewelPlan() {
  const navigate = useNavigate();

  return (
    <div className="jewel-wrapper">
      {/* Header */}
      <div className="jewel-header">
        <span className="back-arrow" onClick={() => navigate(-1)}>
          <FaArrowLeft className="back-icon" />
        </span>
        <h1 className="jewel-title">Jewel Plan</h1>
      </div>

      {/* Top Section */}
      <div className="top-section">
        <div className="left-box">
          <img
            src="/assets/JewelPlan-1.jpg"
            alt="Gem Box"
            className="gem-image"
          />
        </div>
        <div className="right-box">
          <input
            type="text"
            placeholder="Enter Monthly Amount"
            className="input-box"
          />
          <input
            type="text"
            placeholder="Enter Mobile Number"
            className="input-box"
          />
          <button className="start-button">START NOW</button>
          <p className="help-text">For any enquiries, call us at 9876543210</p>
        </div>
      </div>

      {/* Why Gem Box Plan */}
      <div className="info-section">
        <h3>Why Gem Box Plan?</h3>

        <div className="plan-row">
          <img src="/assets/JewelPlan-2.jpg" alt="Icon" className="plan-icon" />
          <p>
            <strong>Future Focus:</strong> Subscribe to secure gems for large
            purchases.
          </p>
        </div>

        <div className="plan-row">
          <img src="/assets/JewelPlan-3.jpg" alt="Icon" className="plan-icon" />
          <p>
            <strong>Special Moments:</strong> Plan for gifts on birthdays,
            weddings, etc.
          </p>
        </div>

        <div className="plan-row">
          <img src="/assets/JewelPlan-4.jpg" alt="Icon" className="plan-icon" />
          <p>
            <strong>Big Savings:</strong> Pay in 12 installments and enjoy a 50%
            discount on the final payment.
          </p>
        </div>
      </div>

      {/* How it works */}
      <div className="info-section">
        <h3>How does it work?</h3>
        <div className="steps">
          <div className="step-item">
            <div className="step-icon">
              <img src="/assets/JewelPlan-5.jpg" alt="Icon" className="plan-icon" />
            </div>
            <div className="content">Monthly payments</div>
          </div>
          <div className="step-item">
            <div className="step-icon">
              <img src="/assets/JewelPlan-6.jpg" alt="Icon" className="plan-icon" />
            </div>
            <div className="content">Special offers</div>
          </div>
          <div className="step-item">
            <div className="step-icon">
              <img src="/assets/JewelPlan-7.jpg" alt="Icon" className="plan-icon" />
            </div>
            <div className="content">Shop with joy</div>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="footer-links">
        <p>View all Terms & Conditions</p>
        <p>View all FAQ</p>
      </div>

      {/* Bottom Nav */}
      <div className="bottom-nav">
        <div className="nav-item">
          <div>🏠</div>
          <p>Home</p>
        </div>
        <div className="nav-item">
          <div>📋</div>
          <p>Categories</p>
        </div>
        <div className="nav-item active">
          <div>💎</div>
          <p>Jewel Plan</p>
        </div>
        <div className="nav-item">
          <div>❤️</div>
          <p>Wishlist</p>
        </div>
        <div className="nav-item">
          <div>🛒</div>
          <p>Cart</p>
        </div>
      </div>
    </div>
  );
}