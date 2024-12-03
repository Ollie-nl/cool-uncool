import { useState, useEffect } from "react";

export default function Home() {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    async function fetchSlides() {
      const response = await fetch("/slides.json");
      const data = await response.json();
      setSlides(data);
    }
    fetchSlides();
  }, []);

  function nextSlide() {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }

  function prevSlide() {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {slides.length > 0 && (
        <div>
          <h2>{slides[currentSlide].title}</h2>
          <p>{slides[currentSlide].content}</p>
          <div style={{ marginTop: "20px" }}>
            <button onClick={prevSlide} style={buttonStyle}>Vorige</button>
            <button onClick={nextSlide} style={buttonStyle}>Volgende</button>
          </div>
        </div>
      )}
    </div>
  );
}

const buttonStyle = {
  margin: "0 10px",
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
};