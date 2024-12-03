import { useState, useEffect } from "react";

export default function Home() {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Slides ophalen
    async function fetchSlides() {
      const response = await fetch("/slides.json");
      const data = await response.json();
      setSlides(data);
    }
    fetchSlides();

    // Eventlistener voor pijltjestoetsen
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
        <div style={slideStyle}>
          <h2 style={titleStyle}>{slides[currentSlide]?.title}</h2>
          <p style={contentStyle}>{slides[currentSlide]?.content}</p>
        </div>
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
  textAlign: "center",
  padding: "20px",
};

const slideStyle = {
  padding: "20px",
  maxWidth: "600px",
  borderRadius: "8px",
  backgroundColor: "#fff",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const titleStyle = {
  fontSize: "2rem",
  color: "#333",
  margin: "0 0 10px",
};

const contentStyle = {
  fontSize: "1.2rem",
  color: "#555",
};
