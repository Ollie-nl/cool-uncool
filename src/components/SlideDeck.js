import React, { useState, useEffect, useCallback } from "react";
import { useSwipeable } from "react-swipeable"; // Swipeable library
import Slide from "./Slide";
import DarkModeToggle from "./DarkModeToggle/DarkModeToggle";
import MonthSelector from "./MonthSelector/MonthSelector";
import availableMonths from "../data/available-months.json"; // Voor maanden

const SlideDeck = () => {
  const [months] = useState(availableMonths.months || []);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(months[0] || "");
  const [slides, setSlides] = useState([]);

  // Laad slides op basis van de geselecteerde maand
  useEffect(() => {
    const loadSlides = async () => {
      try {
        const [year, month] = selectedMonth.split("-");
        const { slides: slidesForMonth } = await import(
          `../data/slides-${year}-${month}.json`
        );
        setSlides(slidesForMonth);
        setCurrentSlide(0);
      } catch (error) {
        console.error(`Geen slides beschikbaar voor ${selectedMonth}:`, error);
        setSlides([]);
      }
    };

    if (selectedMonth) {
      loadSlides();
    }
  }, [selectedMonth]);

  // Pijltjestoetsen-navigatie
  const handleKeyDown = useCallback(
    (e) => {
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
    },
    [currentSlide, slides.length],
  );

  // Event listener voor toetsenbord
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  // Swipe functionaliteit
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentSlide < slides.length - 1) {
        setCurrentSlide((prev) => prev + 1);
      }
    },
    onSwipedRight: () => {
      if (currentSlide > 0) {
        setCurrentSlide((prev) => prev - 1);
      }
    },
    preventDefaultTouchmoveEvent: true, // Voorkom standaard swipe gedrag
    trackMouse: true, // Voor desktop ondersteuning
  });

  return (
    <div
      {...handlers} // Voeg swipe-functionaliteit toe
      className={`slide-deck ${isDarkMode ? "dark-mode" : "light-mode"}`}
    >
      {/* Dark Mode Toggle */}
      <DarkModeToggle
        isDarkMode={isDarkMode}
        onToggle={() => setIsDarkMode((prev) => !prev)}
      />

      {/* Render alleen de huidige slide */}
      {slides.length > 0 ? (
        <Slide slide={slides[currentSlide]} isActive={true} />
      ) : (
        <div className="no-slides">
          Geen slides beschikbaar voor deze maand.
        </div>
      )}

      {/* Slide counter en maandselector */}
      {slides.length > 0 && (
        <div className="slide-counter">
          <MonthSelector
            months={months}
            selectedMonth={selectedMonth}
            onSelect={setSelectedMonth}
          />
          <div className="counter-text">
            {slides.length - currentSlide - 1 > 0
              ? `Nog ${slides.length - currentSlide - 1} ${
                  slides.length - currentSlide - 1 === 1 ? "slide" : "slides"
                } te gaan`
              : "Laatste slide!"}
          </div>
        </div>
      )}
    </div>
  );
};

export default SlideDeck;
