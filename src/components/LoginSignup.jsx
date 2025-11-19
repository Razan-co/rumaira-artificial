import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "react-hot-toast";
import "../css/LoginSignup.css";

export default function LoginSignup() {
  const navigate = useNavigate();
  const { isLoggingIn, isCreatingUser, error, login, createUser,clearError } = useAuthStore();

  const [tab, setTab] = useState("login");

  // State objects for login and signup data
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const loading = tab === "login" ? isLoggingIn : isCreatingUser;

 const handleSwitchMode = (activeTab) => {
  setTab(activeTab);
  setLoginData({ email: "", password: "" });
  setSignUpData({ name: "", email: "", password: "" });
  clearError();
};

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!loginData.email || !loginData.password) {
      toast.error("Please enter email and password.");
      return;
    }
    const res = await login(loginData);
    if (res?.success) {
      navigate("/");
    }
  };

  useEffect(() => {
  console.log("TAB CHANGED →", tab);
}, [tab]);

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!signUpData.name || !signUpData.email || !signUpData.password) {
      toast.error("Please enter your name, email, and password.");
      return;
    }
    const res = await createUser(signUpData);
    if (res?.success) {
      navigate("/");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-image-container">
        <img src="/assets/Login.jpg" alt="Jewellery" className="login-image" />
        <svg className="wave" viewBox="0 0 500 150" preserveAspectRatio="none">
          <path
            d="M0.00,49.98 C150.00,150.00 350.00,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
            style={{ stroke: "none", fill: "#fff" }}
          ></path>
        </svg>
      </div>

      <div className="login-form">
        <div className="tab-container">
          <button
            type="button"
            className={`tab-button ${tab === "login" ? "active" : ""}`}
            onClick={() => handleSwitchMode("login")}
          >
            Login
          </button>

          <button
            type="button"
            className={`tab-button ${tab === "signUp" ? "active" : ""}`}
            onClick={() => handleSwitchMode("signUp")}
          >
            Sign Up
          </button>
        </div>

        {tab === "login" && (
          <>
            <h2>Login</h2>
            <p>Enter your email and password to log in</p>

            <form onSubmit={handleLoginSubmit}>
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              {error && (
                <p style={{ color: "red", fontSize: "13px", margin: "5px 0" }}>{error}</p>
              )}

              <p className="terms">
                By continuing, I agree to <strong>Terms of use</strong> & <br />
                <strong>Privacy Policy</strong>
              </p>

              <button type="submit" className="otp-button" disabled={loading}>
                {loading ? "Logging In..." : "Login"}
              </button>
            </form>
          </>
        )}

        {tab === "signUp" && (
          <>
            <h2>Sign Up</h2>
            <p>Enter your details to create an account</p>
            <form onSubmit={handleSignUpSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={signUpData.name}
                  onChange={handleSignUpChange}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={signUpData.email}
                  onChange={handleSignUpChange}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={signUpData.password}
                  onChange={handleSignUpChange}
                  required
                />
              </div>
              {error && (
                <p style={{ color: "red", fontSize: "13px", margin: "5px 0" }}>{error}</p>
              )}

              <p className="terms">
                By continuing, I agree to <strong>Terms of use</strong> & <br />
                <strong>Privacy Policy</strong>
              </p>

              <button type="submit" className="otp-button" disabled={loading}>
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
