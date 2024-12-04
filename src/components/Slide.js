import React, { useEffect, useRef } from "react";

const Slide = ({ slide, isActive }) => {
  const iframeRef = useRef(null);
  const playerRef = useRef(null);

  // Dynamisch de embed-URL maken
  const getEmbedUrl = (url) => {
    if (url.includes("/shorts/")) {
      return url.replace("/shorts/", "/embed/");
    }
    return url;
  };

  useEffect(() => {
    if (slide.type === "youtube" && iframeRef.current) {
      const initializePlayer = () => {
        if (!playerRef.current && window.YT && window.YT.Player) {
          playerRef.current = new window.YT.Player(iframeRef.current, {
            events: {
              onReady: (event) => {
                if (!isActive) {
                  event.target.pauseVideo();
                }
              },
            },
          });
        } else if (playerRef.current && !isActive) {
          playerRef.current.pauseVideo();
        }
      };

      if (window.YT && window.YT.Player) {
        initializePlayer();
      } else {
        // Wacht op de YouTube API om geladen te worden
        window.onYouTubeIframeAPIReady = initializePlayer;
      }
    }
  }, [isActive, slide.type]);

  return (
    <div className={`slide ${isActive ? "active" : "inactive"}`}>
      {slide.type === "heading" && <h1>{slide.content}</h1>}
      {slide.type === "paragraph" && <p>{slide.content}</p>}
      {slide.type === "youtube" && (
        <div>
          {slide.title && <h2>{slide.title}</h2>}
          <iframe
            ref={iframeRef}
            id={`youtube-player-${slide.url}`}
            width="560"
            height="315"
            src={`${getEmbedUrl(slide.url)}?enablejsapi=1`}
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
