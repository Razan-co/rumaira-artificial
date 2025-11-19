import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import emailjs from "emailjs-com";
import "/src/css/Feedback.css";

const Feedback = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    arrivalExperience: "",
    issueEncountered: "",
    issueDetails: "",
    improvement: "",
    rating: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "your_service_id", // 🔹 Replace with your EmailJS service ID
        "your_template_id", // 🔹 Replace with your EmailJS template ID
        formData,
        "your_public_key"   // 🔹 Replace with your EmailJS public key
      )
      .then(
        (response) => {
          alert("Feedback submitted successfully!");
          setFormData({
            arrivalExperience: "",
            issueEncountered: "",
            issueDetails: "",
            improvement: "",
            rating: "",
          });
        },
        (error) => {
          alert("Failed to send feedback. Please try again later.");
        }
      );
  };

  return (
    <div className="feedback-page">
      {/* Header */}
      <header className="feedback-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={22} />
        </button>
        <h2 className="header-title">Feedback</h2>
      </header>

      {/* Form */}
      <form className="feedback-form" onSubmit={handleSubmit}>
        <label>Was the jewellery nice to you upon your arrival?</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="arrivalExperience"
              value="Yes"
              checked={formData.arrivalExperience === "Yes"}
              onChange={handleChange}
            />{" "}
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="arrivalExperience"
              value="No"
              checked={formData.arrivalExperience === "No"}
              onChange={handleChange}
            />{" "}
            No
          </label>
        </div>

        <label>
          Have you encountered issues when searching for the jewelry you want?
        </label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="issueEncountered"
              value="Yes"
              checked={formData.issueEncountered === "Yes"}
              onChange={handleChange}
            />{" "}
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="issueEncountered"
              value="No"
              checked={formData.issueEncountered === "No"}
              onChange={handleChange}
            />{" "}
            No
          </label>
        </div>

        {formData.issueEncountered === "Yes" && (
          <>
            <label>If yes, please let us know what issue:</label>
            <textarea
              name="issueDetails"
              value={formData.issueDetails}
              onChange={handleChange}
              placeholder="Describe your issue..."
            />
          </>
        )}

        <label>How would you improve our JEWELLERY experience?</label>
        <textarea
          name="improvement"
          value={formData.improvement}
          onChange={handleChange}
          placeholder="Your suggestions..."
        />

        <label>How would you rate the JEWELLERY?</label>
        <div className="rating-group">
          {[1, 2, 3, 4, 5].map((num) => (
            <label key={num}>
              <input
                type="radio"
                name="rating"
                value={num}
                checked={formData.rating === String(num)}
                onChange={handleChange}
              />{" "}
              {num}
            </label>
          ))}
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Feedback;
