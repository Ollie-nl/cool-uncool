import React, { useState, useEffect, useCallback } from "react";
import { useSwipeable } from "react-swipeable";
import { useParams, useNavigate } from "react-router-dom";
import Slide from "./Slide";
import DarkModeToggle from "./DarkModeToggle/DarkModeToggle";
import MonthSelector from "./MonthSelector/MonthSelector";  // Importeer de selector
import availableMonths from "../data/available-months.json"; // Laad beschikbare maanden


const SlideDeck = () => {
  const { year, month, slug } = useParams();  // Haal year, month en slug uit de URL
  const navigate = useNavigate();
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [months] = useState(availableMonths.months || []);

  // Maand selecteren en redirecten
  const handleMonthSelect = (selectedMonth) => {
    const [selectedYear, selectedMonthNum] = selectedMonth.split("-");
    navigate(`/slides/${selectedYear}/${selectedMonthNum}/start`);
  };

  // Log params voor debugging
  console.log("Params ontvangen:", { year, month, slug });

  useEffect(() => {
    const loadSlides = async () => {
      try {
        // Pad naar JSON-bestand bouwen
        const slidesPath = `/data/slides-${year}-${month}.json`;
        console.log("Fetching slides:", slidesPath);

        const response = await fetch(slidesPath);
        
        if (!response.ok) {
          throw new Error(`Slidebestand niet gevonden: slides-${year}-${month}.json`);
        }

        const { slides: slidesForMonth } = await response.json();
        setSlides(slidesForMonth);

        // Zoek de juiste slide op basis van slug of index
        const slideIndex = slidesForMonth.findIndex((slide, index) =>
          slide.slug === slug || `slide-${index + 1}` === slug
        );

        if (slideIndex !== -1) {
          setCurrentSlide(slideIndex);
        } else {
          // Fallback naar slide-1 als slug niet bestaat
          navigate(`/slides/${year}/${month}/slide-1`, { replace: true });
        }
      } catch (error) {
        console.error(`Slides niet gevonden voor ${year}-${month}:`, error);
        setSlides([]);
      }
    };

    // Alleen laden als year en month beschikbaar zijn
    if (year && month) {
      loadSlides();
    }
  }, [year, month, slug, navigate]);

  // Swipe functionaliteit
  const goToSlide = (newIndex) => {
    if (newIndex >= 0 && newIndex < slides.length) {
      const newSlug = slides[newIndex].slug || `slide-${newIndex + 1}`;
      setCurrentSlide(newIndex);
      navigate(`/slides/${year}/${month}/${newSlug}`);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => goToSlide(currentSlide + 1),
    onSwipedRight: () => goToSlide(currentSlide - 1),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  // Pijltjesnavigatie (keyboard)
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        goToSlide(currentSlide + 1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        goToSlide(currentSlide - 1);
      }
    },
    [currentSlide, slides.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className={`slide-deck ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <DarkModeToggle
        isDarkMode={isDarkMode}
        onToggle={() => setIsDarkMode((prev) => !prev)}
      />

     {/* Month Selector in Footer */}
 

      {slides.length > 0 ? (
        <Slide slide={slides[currentSlide]} isActive={true} />
      ) : (
        <div className="no-slides">Geen slides beschikbaar.</div>
      )}

      {/* Slide counter en maandselector */}
      {slides.length > 0 && (
        <div className="slide-counter">
          <MonthSelector
          months={months}
          selectedMonth={`${year}-${month}`}
          onSelect={handleMonthSelect}
        />
          <div className="counter-text">
            Slide {currentSlide + 1} van {slides.length}
          </div>
        </div>
      )}

    </div>
  );
};

export default SlideDeck;
