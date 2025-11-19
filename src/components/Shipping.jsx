import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "/src/css/Shipping.css";

const Shipping = () => {
  const navigate = useNavigate();

  return (
    <div className="disclaimer-page">
      {/* Header Section */}
      <header className="disclaimer-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={22} />
        </button>
        <h2 className="header-title">Shipping Policy</h2>
      </header>

      {/* Content Section */}
      <div className="disclaimer-body">
        <p>
     At Rumaira, we aim to deliver your orders quickly and safely.
        </p>

        <h3>Processing Time</h3>
<ul>
  <li>Orders are processed within [7-10 business days] after payment confirmation (excluding weekends and holidays).</li>
</ul>

        <h3>Shipping Methods & Delivery</h3>
        <p>We partner with reliable courier services to ensure timely delivery. Estimated delivery time:</p>
      <ul>
  <li>Domestic Orders: [7-10 business days]</li>
  <li>International Orders: [12–15 business days]</li>
</ul>

        <h3>Shipping Charges</h3>
        <p>
      Shipping charges (if any) are displayed at checkout. Free shipping may be available on eligible orders as per ongoing offers.
        </p>

        <h3>Order Tracking</h3>
        <p>
   Once your order is shipped, a tracking number will be shared via email/SMS.
        </p>
        <h3>Damaged or Lost Packages</h3>
        <p>
  If your package is damaged or lost in transit, please contact us within [7 days] of delivery with photos or order details.
        </p>

      </div>
    </div>
  );
};

export default Shipping;
