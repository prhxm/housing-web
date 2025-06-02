// مسیر: src/pages/SignupPage.jsx
import React, { useState, useEffect } from "react";
import { useSignUp, useSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaLinkedin, FaEye, FaEyeSlash } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";
import "../styles/signupPage.css";

export default function CustomAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const { isLoaded: isSignUpLoaded, signUp } = useSignUp();
  const { isLoaded: isSignInLoaded, signIn } = useSignIn();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("tenant");
  const [error, setError] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [titleText, setTitleText] = useState("");
    
  useEffect(() => {
    let fullText = isLogin ? "LLogin to RoofGarden" : "SSignup to RoofGarden";
    let i = 0;
    setTitleText("");
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setTitleText((prev) => prev + fullText.charAt(i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 70);
    return () => clearInterval(interval);
  }, [isLogin]);

  const handleCaptcha = (value) => setCaptchaVerified(!!value);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!isSignUpLoaded || !captchaVerified) return;
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await signUp.create({
        emailAddress: email,
        password,
        firstName: username,
      });
      await signUp.update({ publicMetadata: { role } });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      navigate("/verify-email");
    } catch (err) {
      setError(err.errors[0]?.message || "Signup failed");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isSignInLoaded) return;
    try {
      const result = await signIn.create({ identifier: email, password });
      if (result.status === "complete") navigate("/");
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <div className="signup-container">
      <div className="tab-toggle">
        <button className={isLogin ? "active" : ""} onClick={() => setIsLogin(true)}>
          Login
        </button>
        <button className={!isLogin ? "active" : ""} onClick={() => setIsLogin(false)}>
          Signup
        </button>
      </div>

      <form onSubmit={isLogin ? handleLogin : handleSignUp} className="signup-form">
        <h2 style={{ color: "#DCD7C9" }}>
          {titleText}
          <span className="cursor">|</span>
        </h2>

        {!isLogin && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className="password-toggle" onClick={() => setShowPassword((p) => !p)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {!isLogin && (
          <div className="password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span className="password-toggle" onClick={() => setShowConfirmPassword((p) => !p)}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        )}

        {!isLogin && (
          <div className="role-select">
            <label>
              <input
                type="radio"
                value="tenant"
                checked={role === "tenant"}
                onChange={() => setRole("tenant")}
              />
              Tenant
            </label>
            <label>
              <input
                type="radio"
                value="landlord"
                checked={role === "landlord"}
                onChange={() => setRole("landlord")}
              />
              Landlord
            </label>
          </div>
        )}

        {!isLogin && (
          <div className="captcha-box">
            <ReCAPTCHA
              sitekey='6LfWNFMrAAAAAGQUn5jBB1qsT0-ZHMfZmSOu5piT'
              onChange={handleCaptcha}
            />
          </div>
        )}

        {error && <p className="error">{error}</p>}
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>

        <div className="oauth-buttons">
          <button className="oauth-btn google">
            <FaGoogle /> Continue with Google
          </button>
          <button className="oauth-btn linkedin">
            <FaLinkedin /> Continue with LinkedIn
          </button>
        </div>
      </form>
    </div>
  );
}
