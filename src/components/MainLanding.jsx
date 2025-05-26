import { useState } from "react";
import SlideIntro from "./SlideIntro";
import Slide1SignupCTA from "./Slide1SignupCTA";
import Slide2Wandering from "./Slide2Wandering";
import SlideNavigationButton from "./SlideNavigationButton";

const slides = [
  SlideIntro,
  Slide1SignupCTA,
  Slide2Wandering,
];

export default function MainLanding() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const CurrentSlide = slides[currentIndex];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1 < slides.length ? prev + 1 : 0));
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-black text-white font-console relative">
      <div className="h-full w-full flex items-center justify-center transition-all duration-700 ease-in-out">
        <CurrentSlide />
      </div>
      <SlideNavigationButton onClick={nextSlide} />
    </div>
  );
}
