import React from "react";

const Slide = ({ slide }) => {
  return (
    <div className="slide">
      {slide.icon && (
        <div className="slide-icon">
          <span role="img" aria-label="Slide icon">{slide.icon}</span>
        </div>
      )}
      {slide.type === "heading" && <h1>{slide.content}</h1>}
      {slide.type === "paragraph" && <p>{slide.content}</p>}
      {slide.type === "youtube" && (
        <div>
          {slide.title && <h2>{slide.title}</h2>}
          <iframe
            width="560"
            height="315"
            src={slide.url}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={slide.title || "YouTube video"}
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Slide;
