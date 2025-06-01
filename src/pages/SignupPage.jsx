// src/pages/SignupPage.jsx

import React from "react";
import "../styles/SignupPage.css";

export default function SignupPage() {
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="typewriter-heading">Sign up to RoofGarden...</h2>
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Sign Up</button>
      </div>
    </div>
  );
}
