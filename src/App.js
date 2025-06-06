// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import SignupPage from "./pages/SignupPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import DashboardPage from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<IntroPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
}

export default App;
