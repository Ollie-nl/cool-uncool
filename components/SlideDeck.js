import React, { useEffect, useState } from 'react';

export default function SlideDeck() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    fetch('/slides.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch slides: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setSlides(data))
      .catch((error) => console.error('Error loading slides:', error));
  }, []);

  return (
    <div className="reveal">
      <div className="slides">
        {slides.map((slide, index) => (
          <section key={index}>
            <div dangerouslySetInnerHTML={{ __html: slide.content }} />
          </section>
        ))}
      </div>
    </div>
  );
}
