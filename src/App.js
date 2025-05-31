// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import IntroPage from "./pages/IntroPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<IntroPage />} />
    </Routes>
  );
}

export default App;
