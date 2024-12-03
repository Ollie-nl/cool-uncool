import React, { useEffect, useState } from "react";
import Reveal from "reveal.js";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/beige.css";

export default function SlideDeck() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    // JSON ophalen en loggen
    async function fetchSlides() {
      try {
        const response = await fetch("/slides.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Slides data:", data); // Log de data
        setSlides(data);
      } catch (error) {
        console.error("Error fetching slides:", error);
      }
    }
    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length > 0) {
      console.log("Initializing Reveal.js"); // Controleer of dit wordt aangeroepen
      Reveal.initialize({
        controls: true,
        progress: true,
        slideNumber: true,
        transition: "slide",
      });
    }
  }, [slides]);

  return (
    <div className="reveal">
      <div className="slides">
        {slides.map((slide, index) => {
          console.log("Rendering slide:", slide); // Controleer wat er wordt gerenderd
          return (
            <section key={index}>
              <h2>{slide.title}</h2>
              <p>{slide.content}</p>
            </section>
          );
        })}
      </div>
    </div>
  );
}