import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../styles/IntroPage.css";
import background from "../icons/back.png";
import MapSlide from "./MapSlide";
import portalImage from "../icons/portal.png";

export default function IntroPage() {
  const [atMap, setAtMap] = useState(false);
  const navigate = useNavigate();
  const [teleporting, setTeleporting] = useState(false);
  const [direction, setDirection] = useState("down");

  const handleScrollDown = () => {
    setDirection("down");
    setAtMap(true);
  };

  const handleGoBack = () => {
    setDirection("up");
    setAtMap(false);
  };

  const slideVariants = {
    initial: (direction) => ({
      y: direction === "down" ? "100vh" : "-100vh",
    }),
    animate: {
      y: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
    exit: (direction) => ({
      y: direction === "down" ? "-100vh" : "100vh",
      transition: { duration: 0.6, ease: "easeInOut" },
    }),
  };

  return (
    <motion.div
      className="full-screen-container"
      initial={{ x: 0, opacity: 1 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -1000, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence mode="wait" custom={direction}>
        {!atMap ? (
          <motion.div
            key="intro"
            className="intro-container"
            custom={direction}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              backgroundImage: `url(${background})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100vh",
              color: "white",
              fontFamily: "console",
              position: "absolute",
              top: 0,
              width: "100%",
            }}
          >
            <div className="intro-content">
              <TypewriterTitle text="wlc to RoofGarden"/>

              <motion.p
                className="intro-text"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              >
                Transparent, fast, and real – this map shows rental listings
                scraped directly from active Telegram groups. We extract prices,
                types, and locations, and show them live on the map. 📍 No
                middlemen. No fluff. Just raw housing data.
              </motion.p>

              <motion.button
                className="intro-button"
                onClick={() => navigate("/signup")}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
              >
                Get Home →
              </motion.button>

              <motion.div
                className="intro-scroll"
                onClick={handleScrollDown}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
              >
                <span>|__|</span>
                <span>|__|</span>
                <span>|__|</span>
                <span>|__|</span>
              </motion.div>
            </div>

            <motion.img
              src={portalImage}
              alt="portal"
              className="portal"
              onClick={() => {
                setTeleporting(true);
                setTimeout(() => {
                  navigate("/signup");
                  setTeleporting(false);
                }, 1200);
              }}
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="map"
            className="map-slide-container"
            custom={direction}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              height: "100vh",
              width: "100vw",
              position: "absolute",
              top: 0,
            }}
          >
            <MapSlide />
            <div className="back-to-top" onClick={handleGoBack}>
              ↑ Go back
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {teleporting && (
        <motion.div
          className="teleport-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      )}
    </motion.div>
  );
}


function TypewriterTitle({ text }) {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + text[index]);
        setIndex((i) => i + 1);
      }, 110);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  // جمله رو به تیکه‌های خاص مثل "RoofGarden" تقسیم کن
  const parts = displayed.split(/(RoofGarden)/i);

  return (
    <motion.h1
      className="intro-title"
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      style={{ display: "inline-block" }}
    >
      {parts.map((part, i) => (
        <span
          key={i}
          style={{
            color: part.toLowerCase() === "roofgarden" ? "#A27B5C" : "#DCD7C9",
          }}
        >
          {part}
        </span>
      ))}
      <span className="cursor">|</span>
    </motion.h1>
  );
}
