import React, { useState } from "react";
import Slide from "./Slide";
import slidesData from "../data/slides.json";
import "../styles/index.css";

const SlideDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = slidesData.slides;

  const handleKeyDown = (e) => {
    if (
      (e.key === "ArrowRight" || e.key === "ArrowDown") &&
      currentSlide < slides.length - 1
    ) {
      setCurrentSlide(currentSlide + 1);
    } else if (
      (e.key === "ArrowLeft" || e.key === "ArrowUp") &&
      currentSlide > 0
    ) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide]);

  const slidesLeft = slides.length - currentSlide - 1;

  return (
    <div className="slide-deck">
      <Slide slide={slides[currentSlide]} />
      <div className="slide-counter">
        {slidesLeft > 0
          ? `Nog ${slidesLeft} ${slidesLeft === 1 ? "slide" : "slides"} te gaan`
          : "Laatste slide!"}
      </div>
    </div>
  );
};

export default SlideDeck;