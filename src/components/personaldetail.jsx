import React from 'react';
import '../PersonalDetails.css';
import { FaArrowLeft } from 'react-icons/fa';

export default function PersonalDetails() {
  return (
    <div className="personal-details-page">
      {/* Header */}
      <div className="header">
        <FaArrowLeft className="back-icon" />
        <h2>Personal Details</h2>
      </div>

      {/* Form */}
      <div className="form">
        <p className="form-title">Kindly enter your personal details for the fields mentioned below</p>
        <form className="details-form">
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Gmail" />
          <input type="tel" placeholder="Mobile Number" />
          <input type="text" placeholder="Apartment/House/Flat No." />
          <input type="text" placeholder="Street/Colony/Area Name" />
          <input type="text" placeholder="Locality/Town" />
          <input type="text" placeholder="Landmark (Optional)" />
          <input type="text" placeholder="City/District" />
          <input type="text" placeholder="State" />
        </form>
        <p className="disclaimer">
          By clicking Next, I hereby acknowledge that I am above 18 years old and I am a resident of India.
        </p>
      </div>

      {/* Footer */}
      <div className="next-button">
        <button>NEXT</button>
      </div>
    </div>
  );
}