import React, { useState, useEffect } from "react";
import Slide from "./Slide";
import slidesData from "../data/slides.json"; // Voor de huidige maand
import DarkModeToggle from "./DarkModeToggle/DarkModeToggle";
import MonthSelector from "./MonthSelector/MonthSelector";


const SlideDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [slides, setSlides] = useState([]);

  const months = generateMonthList();

  // Laad slides op basis van de geselecteerde maand
  useEffect(() => {
    const loadSlides = async () => {
      try {
        const { slides } = await import(`../data/slides-${selectedMonth}.json`);
        setSlides(slides);
        setCurrentSlide(0); // Reset naar de eerste slide
      } catch (error) {
        console.error(`Geen slides beschikbaar voor ${selectedMonth}`, error);
        setSlides([]);
      }
    };

    loadSlides();
  }, [selectedMonth]);

  const handleKeyDown = (e) => {
    if ((e.key === "ArrowRight" || e.key === "ArrowDown") && currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else if ((e.key === "ArrowLeft" || e.key === "ArrowUp") && currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };  

  useEffect(() => {
    const keyDownHandler = (e) => handleKeyDown(e);
  
    window.addEventListener("keydown", keyDownHandler);
  
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, [slides, currentSlide]);
  

  return (
    <div className={`slide-deck ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      {/* Dark Mode Toggle */}
      <DarkModeToggle
        isDarkMode={isDarkMode}
        onToggle={() => setIsDarkMode((prev) => !prev)}
      />

      {/* Month Selector */}
      <MonthSelector
        months={months}
        selectedMonth={selectedMonth}
        onSelect={setSelectedMonth}
      />

      {/* Render alleen de huidige slide */}
      {slides.length > 0 ? (
        <Slide slide={slides[currentSlide]} isActive={true} />
      ) : (
        <div className="no-slides">Geen slides beschikbaar voor deze maand.</div>
      )}

      {/* Teller */}
      {slides.length > 0 && (
        <div className="slide-counter">
          {slides.length - currentSlide - 1 > 0
            ? `Nog ${slides.length - currentSlide - 1} slides te gaan`
            : "Laatste slide!"}
        </div>
      )}
    </div>
  );
};

// Helpers
function getCurrentMonth() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

function generateMonthList() {
  const now = new Date();
  const year = now.getFullYear();
  const months = [];

  for (let i = 0; i < 12; i++) {
    const date = new Date(year, i, 1);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    months.push(`${year}-${month}`);
  }

  return months.reverse(); // Laat nieuwste maand eerst zien
}

export default SlideDeck;
