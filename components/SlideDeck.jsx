import React, { useEffect, useState } from "react";
import Reveal from "reveal.js";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/black.css";

const SlideDeck = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    fetch("./slides.json")
      .then((response) => {
        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);
        return response.text(); // Haal de inhoud op als tekst
      })
      .then((text) => {
        console.log("Raw response body:", text);
        try {
          const data = JSON.parse(text); // Probeer de JSON te parsen
          console.log("Parsed JSON data:", data);
          setSlides(data); // Als succesvol, stel de slides in
        } catch (error) {
          console.error("Error parsing JSON:", error.message);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error.message);
      });
  }, []);
  

  return (
    <div className="reveal">
      <div className="slides">
        {slides.map((slide, index) => (
          <section key={index} data-title={slide.title}>
            <div dangerouslySetInnerHTML={{ __html: slide.content }} />
          </section>
        ))}
      </div>
    </div>
  );
};

export default SlideDeck;