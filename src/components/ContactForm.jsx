import React, { useRef, useState } from "react"; 
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import "/src/css/ContactForm.css";

const ContactForm = () => {
  const form = useRef();
  const [sent, setSent] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "YOUR_SERVICE_ID",      // replace with your EmailJS service ID
        "YOUR_TEMPLATE_ID",     // replace with your template ID
        form.current,
        "YOUR_PUBLIC_KEY"       // replace with your public key
      )
      .then(
        () => {
          setSent(true);
          form.current.reset();
          setTimeout(() => setSent(false), 3000);
        },
        (error) => {
          console.error("FAILED...", error.text);
        }
      );
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        <div className="contact-header">
          <button className="back-btn" onClick={handleBack}>←</button>
          <h2>Contact Us</h2>
        </div>
        <form ref={form} onSubmit={sendEmail}>
          <div className="name-fields">
            <div>
              <label>First Name</label>
              <input type="text" name="first_name" required />
            </div>
            <div>
              <label>Last Name</label>
              <input type="text" name="last_name" required />
            </div>
          </div>

          <label>Email</label>
          <input type="email" name="email" required />

          <label>Your Message</label>
          <textarea name="message" rows="4" required />

          <button type="submit" className="send-btn">
            Send message
          </button>

          {sent && <p className="success">Message sent successfully!</p>}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
