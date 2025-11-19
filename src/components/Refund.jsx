import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "/src/css/Refund.css";

const Refund = () => {
  const navigate = useNavigate();

  return (
    <div className="disclaimer-page">
      {/* Header Section */}
      <header className="disclaimer-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={22} />
        </button>
        <h2 className="header-title">Refund</h2>
      </header>

      {/* Content Section */}
      <div className="disclaimer-body">
        <p>
   We strive to ensure customer satisfaction. If your order qualifies for a refund, we’ll process it promptly as per the terms below.
        </p>

        <h3> Refund Eligibility</h3>
        <p>Refunds are applicable in the following cases:</p>
<ul>
  <li>You canceled your order within the allowed cancellation window.</li>
  <li>The product you received is defective, damaged, or incorrect and is eligible for return.</li>
  <li>The order was canceled by [Your Company Name] due to unforeseen circumstances.</li>
</ul>

       

        <h3>Refund Process</h3>
        <p>
     Once your return is received and inspected, we will notify you of the approval or rejection of your refund.
        </p>
        <p>
    Approved refunds will be credited to your original payment method within [5–10 business days].
Refund processing time may vary depending on your bank or payment provider.
        </p>

        <h3>Partial Refunds</h3>
        <p>In some cases, only partial refunds may be granted (if applicable):</p>
<ul>
  <li>Items returned not in original condition</li>
  <li>Items returned after the allowed return period</li>
</ul>

      </div>
    </div>
  );
};

export default Refund;
