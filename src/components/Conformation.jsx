import React from 'react';
import '../css/Conformation.css';

export default function OrderConfirmation() {
  return (
    <div className="confirmation-page">
      {/* Confirmation Icon and Message */}
      <div className="confirmation-body">
        <div className="check-circle">
          <span className="checkmark">✓</span>
        </div>
        <h2>Your Order is Confirmed!</h2>
        <p>Thank you for shopping!</p>
      </div>
    </div>
  );
}