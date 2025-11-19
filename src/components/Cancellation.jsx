import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "/src/css/Cancellation.css";

const Cancellation = () => {
  const navigate = useNavigate();

  return (
    <div className="disclaimer-page">
      {/* Header Section */}
      <header className="disclaimer-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={22} />
        </button>
        <h2 className="header-title">cancellation Policy </h2>
      </header>

      {/* Content Section */}
      <div className="disclaimer-body">
        <p>
      At Rumaira, we aim to make your shopping experience seamless. However, we understand that plans can change.
        </p>

        <h3>Order Cancellation by Customer</h3>
<ul>
  <li>Orders can be canceled within [X] hours of placing the order.</li>
  <li>Once the order has been processed or shipped, it cannot be canceled.</li>
  <li>To cancel, please contact us immediately at [Your Email/Phone] with your order details.</li>
</ul>

        <h3>Order Cancellation by Company Name</h3>
      <ul>
  <li>Payment issues or non-receipt of payment</li>
  <li>Product unavailability or stock issues</li>
  <li>Fraudulent or suspicious transactions</li>
  <li>Send promotional offers (only if you’ve opted in)</li>
</ul>

        <p>
     If your order is canceled by us, the full amount will be refunded to your original payment method within [8] business days.
        </p>
      </div>
    </div>
  );
};

export default Cancellation;
