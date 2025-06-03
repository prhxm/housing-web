// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import SignupPage from "./pages/SignupPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<IntroPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
    </Routes>
  );
}

export default App;
