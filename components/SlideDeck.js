import React, { useEffect, useState } from "react";
import styles from "./SlideDeck.module.css";
import Reveal from "reveal.js";
//import "reveal.js/dist/reveal.css";
//import "reveal.js/dist/theme/beige.css";

export default function SlideDeck() {
  const [slides, setSlides] = useState([]);

  // JSON ophalen
  useEffect(() => {
    async function fetchSlides() {
      try {
        const response = await fetch("/slides.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Slides data:", data); // Log de opgehaalde data
        setSlides(data);
      } catch (error) {
        console.error("Error fetching slides:", error);
      }
    }

    fetchSlides();
  }, []);

  // Reveal.js initialiseren
  useEffect(() => {
    if (slides.length > 0) {
      console.log("Initializing Reveal.js"); // Controleer of dit wordt aangeroepen
      Reveal.initialize({
        controls: true,
        progress: true,
        slideNumber: true,
        transition: "slide",
        width: 960,
        height: 700,
      });
    }
  }, [slides]);

  return (
    <div className="reveal">
      <div className="slides">
        {slides.map((slide, index) => (
          <section key={index}>
            <h1>{slide.title}</h1>
            <p>{slide.content}</p>
          </section>
        ))}
      </div>
    </div>
  );
}