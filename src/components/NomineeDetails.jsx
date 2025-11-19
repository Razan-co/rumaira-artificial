import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "../css/NomineeDetails.css";

export default function NomineeDetails() {
  const navigate = useNavigate();
  const [nationality, setNationality] = useState("Indian");

  return (
    <div className="nominee-wrapper">
      {/* Header */}
      <div className="nominee-header">
        <span className="back-icon" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </span>
        <h2 className="header-title">Nominee Details</h2>
      </div>

      {/* Form Card */}
      <div className="form-card">
        <p className="form-desc">
         Enter details of the persostances.mn who can redeem the scheme benefits in case of unforeseen circumstances.
        </p>
        <input type="text" className="input-field" placeholder="Nominee Name" />
        <select className="input-field">
          <option value="">Relationship</option>
          <option value="Parent">Parent</option>
          <option value="Spouse">Spouse</option>
          <option value="Sibling">Sibling</option>
          <option value="Friend">Friend</option>
        </select>

        <p className="nationality-label">Nationality</p>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="nationality"
              checked={nationality === "Indian"}
              onChange={() => setNationality("Indian")}
            />
            <span className="radio-custom" /> Indian
          </label>
          <label>
            <input
              type="radio"
              name="nationality"
              checked={nationality === "Others"}
              onChange={() => setNationality("Others")}
            />
            <span className="radio-custom" /> Others
          </label>
        </div>
      </div>

      {/* Acknowledgement */}
      <p className="ack-text">
        By clicking Next, I hereby acknowledge that I am above 18 year old
        and I am resident of India.
      </p>

      {/* Next Button */}
      <div className="bottom-bar">
        <button className="next-button">NEXT</button>
      </div>
    </div>
  );
}
