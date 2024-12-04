import React, { useState, useEffect } from "react";
import Slide from "./Slide";
import slidesData from "../data/slides.json";
import "../styles/index.css";
import DarkModeToggle from "./DarkModeToggle/DarkModeToggle"; // Jouw component

const SlideDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark/Light mode state
  const slides = slidesData.slides;

  // Functie voor toetsenbordnavigatie
  const handleKeyDown = (e) => {
    if (
      (e.key === "ArrowRight" || e.key === "ArrowDown") &&
      currentSlide < slides.length - 1
    ) {
      setCurrentSlide((prev) => prev + 1);
    } else if (
      (e.key === "ArrowLeft" || e.key === "ArrowUp") &&
      currentSlide > 0
    ) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  // Initialiseren van YouTube API script
  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }, []);

  // Event listener voor toetsenbord
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide]);

  const slidesLeft = slides.length - currentSlide - 1;

  return (
    <div className={`slide-deck ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      {/* Dark Mode Toggle */}
      <DarkModeToggle
        isDarkMode={isDarkMode}
        onToggle={() => setIsDarkMode((prev) => !prev)}
      />

      {/* Render de huidige slide */}
      <Slide slide={slides[currentSlide]} isActive={true} />

      {/* Teller voor overgebleven slides */}
      <div className="slide-counter">
        {slidesLeft > 0
          ? `Nog ${slidesLeft} ${slidesLeft === 1 ? "slide" : "slides"} te gaan`
          : "Laatste slide!"}
      </div>
    </div>
  );
};

export default SlideDeck;
