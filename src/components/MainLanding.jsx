import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import SlideIntro from "./SlideIntro";

export default function MainLanding() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key="intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <SlideIntro />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
