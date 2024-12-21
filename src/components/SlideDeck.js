import React, { useState, useEffect, useCallback } from "react";
import { useSwipeable } from "react-swipeable";
import { useParams, useNavigate } from "react-router-dom";
import Slide from "./Slide";
import DarkModeToggle from "./DarkModeToggle/DarkModeToggle";
import MonthSelector from "./MonthSelector/MonthSelector";
import availableMonths from "../data/available-months.json";

const SlideDeck = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [months] = useState(availableMonths.months || []);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(months[0] || "");
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Laad slides op basis van maand
  useEffect(() => {
    const loadSlides = async () => {
      try {
        const [year, month] = selectedMonth.split("-");
        const { slides: slidesForMonth } = await import(
          `../data/slides-${year}-${month}.json`
        );
        setSlides(slidesForMonth);

        // Zoek de juiste slide op basis van slug of fallback
        const slideIndex = slidesForMonth.findIndex((slide, index) => 
          slide.slug === slug || `slide-${index + 1}` === slug
        );

        if (slideIndex !== -1) {
          setCurrentSlide(slideIndex);
        } else {
          navigate("/slide/slide-1");  // Fallback als slug niet bestaat
        }
      } catch (error) {
        console.error(`Geen slides beschikbaar voor ${selectedMonth}:`, error);
        setSlides([]);
      }
    };

    if (selectedMonth) {
      loadSlides();
    }
  }, [selectedMonth, slug, navigate]);

  // Navigeren naar volgende of vorige slide
  const goToSlide = (newIndex) => {
    if (newIndex >= 0 && newIndex < slides.length) {
      const newSlug = slides[newIndex].slug || `slide-${newIndex + 1}`;
      setCurrentSlide(newIndex);
      navigate(`/slide/${newSlug}`);
    }
  };

  // Swipe functionaliteit
  const handlers = useSwipeable({
    onSwipedLeft: () => goToSlide(currentSlide + 1),
    onSwipedRight: () => goToSlide(currentSlide - 1),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  // Pijltjestoetsen navigatie
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
    <div {...handlers} className={`slide-deck ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <DarkModeToggle isDarkMode={isDarkMode} onToggle={() => setIsDarkMode((prev) => !prev)} />
      
      {slides.length > 0 ? (
        <Slide slide={slides[currentSlide]} isActive={true} />
      ) : (
        <div className="no-slides">Geen slides beschikbaar voor deze maand.</div>
      )}

      {slides.length > 0 && (
        <div className="slide-counter">
          <MonthSelector months={months} selectedMonth={selectedMonth} onSelect={setSelectedMonth} />
          <div className="counter-text">
            {slides.length - currentSlide - 1 > 0
              ? `Nog ${slides.length - currentSlide - 1} slides te gaan`
              : "Laatste slide!"}
          </div>
        </div>
      )}
    </div>
  );
};

export default SlideDeck;
