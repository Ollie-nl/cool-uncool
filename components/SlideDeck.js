import { useState, useEffect } from "react";
import Slide from "./Slide";

export default function SlideDeck() {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Fetch slides from JSON
    async function fetchSlides() {
      const response = await fetch("/slides.json");
      const data = await response.json();
      setSlides(data);
    }
    fetchSlides();

    // Add keyboard navigation
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        nextSlide();
      } else if (event.key === "ArrowLeft") {
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [slides]);

  function nextSlide() {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }

  function prevSlide() {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }

  return (
    <div style={containerStyle}>
      {slides.length > 0 && (
        <Slide title={slides[currentSlide]?.title} content={slides[currentSlide]?.content} />
      )}
    </div>
  );
}

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f4f4f9",
};
