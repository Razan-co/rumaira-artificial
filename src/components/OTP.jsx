// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuthStore } from "../store/useAuthStore";
// import "../css/OTP.css";

// export default function OTP() {
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [timer, setTimer] = useState(0);
//   const navigate = useNavigate();

//   const { mobile, verifyLoginOtp, loading, error } = useAuthStore();

//     useEffect(() => {
//     const expiry = localStorage.getItem("otp_expiry");
//     if (expiry) {
//       const remaining = Math.max(Math.floor((expiry - Date.now()) / 1000), 0);
//       setTimer(remaining);
//     }
//   }, []);

//   // ✅ Countdown effect
//   useEffect(() => {
//     if (timer <= 0) return;
//     const countdown = setTimeout(() => setTimer(timer - 1), 1000);
//     return () => clearTimeout(countdown);
//   }, [timer]);

//   const handleChange = (e, index) => {
//     const value = e.target.value.replace(/\D/, "");
//     if (value.length > 1) return;
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < 5) {
//       document.getElementById(`otp-${index + 1}`)?.focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       document.getElementById(`otp-${index - 1}`)?.focus();
//     }
//   };

//   const handleSubmit = async () => {
//     const enteredOtp = otp.join("");
//     if (enteredOtp.length !== 6) {
//       alert("Please enter a valid 6-digit OTP.");
//       return;
//     }

//     const res = await verifyLoginOtp(enteredOtp);
//     if (res?.verified) {
//       navigate("/home");
//     }
//   };


//   return (
//     <div className="otp-container">
//       <div className="otp-image-container">
//         <img src="/assets/Login.jpg" alt="Jewellery" className="otp-image" />
//         <svg className="wave" viewBox="0 0 500 150" preserveAspectRatio="none">
//           <path
//             d="M0.00,49.98 C150.00,150.00 350.00,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
//             style={{ stroke: "none", fill: "#fff" }}
//           ></path>
//         </svg>
//       </div>

//       <div className="otp-form-section">
//         <h2>Enter OTP</h2>
//         <p>6 digit OTP sent to {mobile ? `+91-${mobile}` : "your number"}</p>

//         <div className="otp-boxes">
//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               id={`otp-${index}`}
//               type="text"
//               maxLength="1"
//               value={digit}
//               onChange={(e) => handleChange(e, index)}
//               onKeyDown={(e) => handleKeyDown(e, index)}
//             />
//           ))}
//         </div>

//         {error && <p style={{ color: "red" }}>{error}</p>}

//         <div className="timer">
//           {String(Math.floor(timer / 60)).padStart(2, "0")}:
//           {String(timer % 60).padStart(2, "0")}
//         </div>

//         <button
//           className="verify-btn"
//           onClick={handleSubmit}
//           disabled={loading || timer <= 0}
//         >
//           {loading ? "Verifying..." : "Verify OTP"}
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import "../css/OTP.css";

export default function OTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

  const { identifier, verifyLoginOtp, loading, error } = useAuthStore();

  // ✅ Set countdown timer from localStorage expiry
  useEffect(() => {
    const expiry = localStorage.getItem("otp_expiry");
    if (expiry) {
      const remaining = Math.max(
        Math.floor((expiry - Date.now()) / 1000),
        0
      );
      setTimer(remaining);
    }
  }, []);

  useEffect(() => {
    if (timer <= 0) return;
    const countdown = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(countdown);
  }, [timer]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, ""); // only digits
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleSubmit = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }

    const res = await verifyLoginOtp(enteredOtp);
    if (res?.status) {
      navigate("/home");
    }
  };

  return (
    <div className="otp-container">
      <div className="otp-image-container">
        <img src="/assets/Login.jpg" alt="Jewellery" className="otp-image" />
        <svg className="wave" viewBox="0 0 500 150" preserveAspectRatio="none">
          <path
            d="M0.00,49.98 C150.00,150.00 350.00,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
            style={{ stroke: "none", fill: "#fff" }}
          ></path>
        </svg>
      </div>

      <div className="otp-form-section">
        <h2>Enter OTP</h2>
        <p>6 digit OTP sent to {identifier || "your email"}</p>

        <div className="otp-boxes">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="timer">
          {String(Math.floor(timer / 60)).padStart(2, "0")}:
          {String(timer % 60).padStart(2, "0")}
        </div>

        <button
          className="verify-btn"
          onClick={handleSubmit}
          disabled={loading || timer <= 0}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
}

