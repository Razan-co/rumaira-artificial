import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "/src/css/Disclaimer.css";

const Disclaimer = () => {
  const navigate = useNavigate();

  return (
    <div className="disclaimer-page">
      {/* Header Section */}
      <header className="disclaimer-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={22} />
        </button>
        <h2 className="header-title">Disclaimer</h2>
      </header>

      {/* Content Section */}
      <div className="disclaimer-body">
        <p>
          The information provided on <strong>[YourWebsite.com]</strong> is for
          general informational purposes only. While we strive to keep
          information accurate and up to date, we make no warranties or
          representations regarding completeness, accuracy, or reliability.
        </p>

        <h3>Product Information</h3>
        <p>
          Product images, descriptions, and colors are for illustrative
          purposes. Actual products may vary slightly due to manufacturing
          variations or monitor settings.
        </p>

        <h3>Liability</h3>
        <p>
          Under no circumstance shall <strong>[Your Company Name]</strong> be
          liable for any direct, indirect, incidental, or consequential damages
          resulting from the use or inability to use our website or products.
        </p>

        <h3>External Links</h3>
        <p>
          Our website may contain links to external websites. We are not
          responsible for the content, policies, or practices of any third-party
          websites.
        </p>
      </div>
    </div>
  );
};

export default Disclaimer;
