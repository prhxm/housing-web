// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import SignupPage from "./pages/SignupPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<IntroPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;
