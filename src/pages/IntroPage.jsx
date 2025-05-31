import React, { useState } from "react";
import "../styles/IntroPage.css";
import background from "../icons/back.png";
import MapSlide from "./MapSlide";

export default function IntroPage() {
  const [atMap, setAtMap] = useState(false);

  return (
    <div className="full-screen-container">
      {!atMap ? (
        <div
          className="intro-container"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
            color: "white",
            fontFamily: "console",
          }}
        >
          <div className="intro-content">
            <h1 className="intro-title">RoofGarden</h1>
            <p className="intro-text">
              Transparent, fast, and real – this map shows rental listings scraped
              directly from active Telegram groups. We extract prices, types, and
              locations, and show them live on the map. 📍 No middlemen. No fluff.
              Just raw housing data.
            </p>
            <button className="intro-button">Get Home →</button>
            <div className="intro-scroll" onClick={() => setAtMap(true)}>
              <span>|__|</span>
              <span>|__|</span>
              <span>|__|</span>
              <span>|__|</span>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
          <MapSlide />
          <div
            className="back-to-top"
            onClick={() => setAtMap(false)}
          >
            ↑ Go back
          </div>
        </div>
      )}
    </div>
  );
}
