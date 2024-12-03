import React, { useState } from "react";
import Slide from './Slide';
import slidesData from "../data/slides.json";

const SlideDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = slidesData.slides;

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight" && currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else if (e.key === "ArrowLeft" && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide]);

  return <Slide slide={slides[currentSlide]} />;
};

export default SlideDeck;
