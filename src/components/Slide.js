import React from "react";

const Slide = ({ slide }) => {
  switch (slide.type) {
    case "heading":
      return <h1>{slide.content}</h1>;
    case "paragraph":
      return <p>{slide.content}</p>;
    case "youtube":
      return (
        <iframe
          width="560"
          height="315"
          src={slide.url}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube video"
        ></iframe>
      );
    default:
      return null;
  }
};

export default Slide;
