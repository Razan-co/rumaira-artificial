import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "/src/css/Refund.css";

const RefundCancle = () => {
  const navigate = useNavigate();

  return (
    <div className="disclaimer-page">
      {/* Header Section */}
      <header className="disclaimer-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={22} />
        </button>
        <h2 className="header-title">Returns & Cancellations Policy</h2>
      </header>

      {/* Content Section */}
      <div className="disclaimer-body">
        <p>
  At Rumaira, we want you to be satisfied with your purchase. Our Returns and Cancellations Policy makes the process simple and transparent.
        </p>

        <h3>Returns</h3>
       
<ul>
  <li>You may request a return within [X days] of receiving your order if the product is defective, damaged, or incorrect.</li>
  <li>Returned items must be unused, in their original packaging, and accompanied by proof of purchase.</li>
  <li>To initiate a return, please contact us at [Your Email/Phone] with your order ID and reason for return.</li>
  <li>Once approved, we will arrange for pickup or ask you to ship the item back to us.</li>
</ul>

       

        <h3>Non-Returnable Items</h3>
        <p>
    Certain items are not eligible for return, including:
        </p>
       <ul>
  <li>Perishable goods</li>
  <li>Personalized or customized items</li>
  <li>Gift cards and downloadable software.</li>
</ul>

        <h3>Order Cancellations</h3>
       
<ul>
  <li>Orders can be canceled within [X hours] of placing them, provided they have not yet been processed or shipped.</li>
  <li>Once shipped, cancellations are not possible.</li>
  <li>To cancel, contact us at [Your Email] immediately with your order number.</li>
</ul>
        <h3>Order Cancellations by [Your Company Name]</h3>
        <p>We reserve the right to cancel an order due to:</p>
       
<ul>
  <li>Unavailability of product</li>
  <li>Payment or verification issues.</li>
  <li>Incomplete or invalid address.</li>
  <li>Suspected fraudulent transactions.</li>   
</ul>
<p>If your order is canceled by us, you will receive a full refund to your original payment methods</p>
      </div>
    </div>
  );
};

export default RefundCancle;
