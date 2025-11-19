import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "/src/css/Refund.css";

const Payments = () => {
  const navigate = useNavigate();

  return (
    <div className="disclaimer-page">
      {/* Header Section */}
      <header className="disclaimer-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={22} />
        </button>
        <h2 className="header-title">Payments & Transactions Policy</h2>
      </header>

      {/* Content Section */}
      <div className="disclaimer-body">
        <p>
   At Rumaira, we ensure that all payment and transaction processes are secure and transparent for your convenience.
        </p>

        <h3>Accepted Payment Methods</h3>
        <p>We accept the following payment methods:</p>
<ul>
  <li>Credit Cards (Visa, MasterCard, American Express, etc.)</li>
  <li>Debit Cards</li>
  <li>Net Banking</li>
  <li>UPI Payments</li>
  <li>Digital Wallets (Google Pay, PhonePe, Paytm, etc.)</li>
  <li>Cash on Delivery (if applicable)</li>

</ul>

       

        <h3>Payment Security</h3>
        <p>
  All online transactions are processed through secure and encrypted payment gateways that comply with industry security standards (PCI-DSS).
        </p>
        <p>
 Your payment details are never stored or shared with any unauthorized parties.
        </p>

        <h3>Transaction Confirmation</h3>
        <p>Once payment is successfully processed, you will receive an order confirmation email or SMS with transaction details and an order number for tracking.</p>
       
        <h3>Failed Transactions</h3>
        <p>If your transaction fails but the amount is debited from your account, it will be automatically refunded to your original payment method within [5–7 business days] (depending on your bank).</p>
       
        <h3>Fraud Preventions</h3>
        <p>We reserve the right to verify the authenticity of any order or payment before processing. In cases of suspected fraud or unauthorized activity, we may cancel the transaction and notify the concerned authorities.</p>


      </div>
    </div>
  );
};

export default Payments;
