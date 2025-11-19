import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "/src/css/PrivacyPolicy.css";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="disclaimer-page">
      {/* Header Section */}
      <header className="disclaimer-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={22} />
        </button>
        <h2 className="header-title">Privacy Policy</h2>
      </header>

      {/* Content Section */}
      <div className="disclaimer-body">
        <p>
       At Rumaira, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and protect the information you provide when using our website 
        </p>

        <h3>Information We Collect</h3>
<ul>
  <li>Personal details (name, email, phone number, address, etc.)</li>
  <li>Payment information (processed securely via trusted payment gateways)</li>
  <li>Usage data (browser type, IP address, pages visited, etc.)</li>
</ul>

        <h3>How We Use Your Information</h3>
      <ul>
  <li>Process and fulfill your orders</li>
  <li>Communicate order updates and respond to queries</li>
  <li>Improve our products, services, and website experience</li>
  <li>Send promotional offers (only if you’ve opted in)</li>
</ul>

        <h3>Data Protection</h3>
        <p>
       We implement appropriate data collection, storage, and processing practices, as well as security measures, to protect your data against unauthorized access, alteration, disclosure, or destruction.
        </p>

        <h3>Sharing Information</h3>
        <p>
   We do not sell, trade, or rent users’ personal identification information. We may share limited data with trusted partners who help us operate our business or provide services, under strict confidentiality agreements.
        </p>
        <h3>Cookies</h3>
        <p>
  Our website may use cookies to enhance user experience and analyze website traffic. You may choose to disable cookies through your browser settings.
        </p>

        <h3>Your Rights</h3>
        <p>
      You may request to access, correct, or delete your personal information by contacting us.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
