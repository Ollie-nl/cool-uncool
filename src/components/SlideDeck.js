import React, { useState, useEffect } from "react";
import Slide from "./Slide";
import slidesData from "../data/slides.json";
import "../styles/index.css";

const SlideDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = slidesData.slides;

  // Keydown event voor navigatie
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

  // Laad de YouTube IFrame API
  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }, []);

  // Event listener voor toetsenbordnavigatie
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide]);

  // Berekening van resterende slides
  const slidesLeft = slides.length - currentSlide - 1;

  return (
    <div className="slide-deck">
      {/* Render alleen de huidige slide */}
      <Slide
        slide={slides[currentSlide]}
        isActive={true} // Geef aan dat deze slide actief is
      />
      <div className="slide-counter">
        {slidesLeft > 0
          ? `Nog ${slidesLeft} ${slidesLeft === 1 ? "slide" : "slides"} te gaan`
          : "Laatste slide!"}
      </div>
    </div>
  );
};

export default SlideDeck;
