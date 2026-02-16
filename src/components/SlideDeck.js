import React, { useState, useEffect, useCallback } from "react";
import { useSwipeable } from "react-swipeable";
import { useParams, useNavigate } from "react-router-dom";
import Slide from "./Slide";
import DarkModeToggle from "./DarkModeToggle/DarkModeToggle";
import MonthSelector from "./MonthSelector/MonthSelector";

const SlideDeck = () => {
  const { year, month, slug } = useParams();
  const navigate = useNavigate();
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [themeShift, setThemeShift] = useState("");
  const [months, setMonths] = useState([]);

  const getBasePath = () => {
    return process.env.NODE_ENV === "production" ? "/cool-uncool" : "";
  };

  // Maand selecteren en redirecten
  const handleMonthSelect = (selectedMonth) => {
    const [selectedYear, selectedMonthNum] = selectedMonth.split("-");
    navigate(`/slides/${selectedYear}/${selectedMonthNum}/start`);
  };


  const loadAllSlides = async () => {
    try {
      const response = await fetch(`${getBasePath()}/data/available-months.json`);
      if (!response.ok) throw new Error("available-months.json niet gevonden");
      const { months } = await response.json();
  
      let allSlides = [];
  
      // Loop door alle maanden en laad de slides
      for (const month of months) {
        const slidesPath = `${getBasePath()}/data/slides-${month}.json`;
        const slideResponse = await fetch(slidesPath);
        if (slideResponse.ok) {
          const { slides } = await slideResponse.json();
          // Filter de eerste slide eruit
          const filteredSlides = slides.slice(1);
          allSlides = [...allSlides, ...filteredSlides.map(slide => ({
            ...slide,
            month,
          }))];
        }
      }
  
      return allSlides;
      
    } catch (error) {
      console.error("Fout bij laden van alle slides:", error);
      return [];
    }
  };

  // Random slide
  const goToRandomSlideFromAll = async () => {
    const allSlides = await loadAllSlides();
    
    if (allSlides.length > 0) {
      const randomIndex = Math.floor(Math.random() * allSlides.length);
      const randomSlide = allSlides[randomIndex];
  
      const [year, month] = randomSlide.month.split('-');
      navigate(`/slides/${year}/${month}/${randomSlide.slug}`);
    } else {
      console.log("Geen geldige slides gevonden.");
    }
  };
  

  // Laad de beschikbare maanden uit public/data
  useEffect(() => {
    const fetchMonths = async () => {
      try {
        const response = await fetch(
          `${getBasePath()}/data/available-months.json`,
        );
        if (!response.ok)
          throw new Error("available-months.json niet gevonden");
        const data = await response.json();
        const sortedMonths = (data.months || []).slice().sort((a, b) => b.localeCompare(a));
        setMonths(sortedMonths);
      } catch (error) {
        console.error("Fout bij laden van maanden:", error);
        setMonths([]);
      }
    };

    fetchMonths();
  }, []);

  // Laad slides op basis van maand en jaar
  useEffect(() => {
    const loadSlides = async () => {
      try {
        const slidesPath = `${getBasePath()}/data/slides-${year}-${month}.json`;
        console.log("Fetching slides:", slidesPath);

        const response = await fetch(slidesPath);
        if (!response.ok) {
          throw new Error(
            `Slidebestand niet gevonden: slides-${year}-${month}.json`,
          );
        }

        const { slides: slidesForMonth } = await response.json();
        setSlides(slidesForMonth);

        // Zoek de juiste slide op basis van slug of index
        const slideIndex = slidesForMonth.findIndex(
          (slide, index) =>
            slide.slug === slug || `slide-${index + 1}` === slug,
        );

        if (slideIndex !== -1) {
          setCurrentSlide(slideIndex);
        } else {
          navigate(`/slides/${year}/${month}/slide-1`, { replace: true });
        }
      } catch (error) {
        console.error(`Slides niet gevonden voor ${year}/${month}:`, error);
        setSlides([]);
      }
    };

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
    [currentSlide, slides.length],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (!themeShift) return;
    const timeoutId = setTimeout(() => setThemeShift(""), 1200);
    return () => clearTimeout(timeoutId);
  }, [themeShift]);


  const renderSlideCounter = () => {
    const remainingSlides = slides.length - (currentSlide + 1);
    return remainingSlides > 0
    ? `Nog ${remainingSlides} slide${remainingSlides !== 1 ? "s" : ""} te gaan`
    : "Dit is de laatste slide";
  };

  return (
    <div
      {...handlers} // Swipe-functionaliteit wordt hier toegevoegd
      className={`slide-deck ${isDarkMode ? "dark-mode" : "light-mode"} ${themeShift}`}
    >
      {" "}
      <DarkModeToggle
        isDarkMode={isDarkMode}
        onToggle={() => {
          setIsDarkMode((prev) => {
            const nextIsDark = !prev;
            setThemeShift(nextIsDark ? "theme-shift-down" : "theme-shift-up");
            return nextIsDark;
          });
        }}
      />
      {slides.length > 0 ? (
        <Slide slide={slides[currentSlide]} isActive={true} />
      ) : (
        <div className="no-slides">Geen slides beschikbaar.</div>
      )}
      {slides.length > 0 && (
        <div className="slide-counter">
          <div className="footer-controls">
            <div className="month-selector">
              <MonthSelector
                months={months}
                selectedMonth={`${year}-${month}`}
                onSelect={handleMonthSelect}
              />
            </div>
            <button className="footer-button" onClick={goToRandomSlideFromAll}>
              🎲 Random Slide
            </button>
          </div>
          <div className="counter-text">
          {renderSlideCounter()}
          </div>
        </div>
      )}
    </div>
  );
};
export default SlideDeck;
