import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import LazyLoad from 'react-lazyload';

const Slide = ({ slide, isActive }) => {
  const iframeRef = useRef(null);
  const playerRef = useRef(null);

  const getYouTubeEmbedUrl = (rawUrl) => {
    try {
      const cleanedUrl = typeof rawUrl === "string" ? rawUrl.trim() : "";
      const url = new URL(cleanedUrl);
      let videoId = "";
      let playlistId = url.searchParams.get("list") || "";

      if (url.hostname === "youtu.be") {
        videoId = url.pathname.replace("/", "");
      } else if (url.pathname.startsWith("/watch")) {
        videoId = url.searchParams.get("v") || "";
      } else if (url.pathname.startsWith("/shorts/")) {
        videoId = url.pathname.split("/shorts/")[1] || "";
      } else if (url.pathname.startsWith("/embed/")) {
        videoId = url.pathname.split("/embed/")[1] || "";
      }

      const cleanVideoId = videoId.split("?")[0].split("&")[0];
      const cleanPlaylistId = playlistId.split("?")[0].split("&")[0];
      const embedBase = "https://www.youtube-nocookie.com/embed";

      const params = new URLSearchParams({
        enablejsapi: "1",
        origin: window.location.origin,
        playsinline: "1",
        mute: "1",
        modestbranding: "1",
        rel: "0",
      });

      if (cleanPlaylistId) {
        params.set("list", cleanPlaylistId);
      }

      if (cleanVideoId) {
        params.set("playlist", cleanVideoId);
        return `${embedBase}/${cleanVideoId}?${params.toString()}`;
      }

      return cleanedUrl || rawUrl;
    } catch (error) {
      return rawUrl;
    }
  };

  const getImagePath = (path) => {
    return process.env.NODE_ENV === "production" ? `/cool-uncool${path}` : path;
  };

  useEffect(() => {
    const initializePlayer = () => {
      if (slide.type === "youtube" && iframeRef.current) {
        if (!playerRef.current && window.YT && window.YT.Player) {
          playerRef.current = new window.YT.Player(iframeRef.current, {
            events: {
              onReady: (event) => {
                if (isActive) {
                  event.target.playVideo();
                } else {
                  event.target.pauseVideo();
                }
              },
              onStateChange: (event) => {
                if (
                  isActive &&
                  slide.repeat &&
                  event.data === window.YT.PlayerState.ENDED
                ) {
                  event.target.seekTo(0);
                  event.target.playVideo();
                }
              },
            },
          });
        } else if (playerRef.current) {
          if (isActive) {
            playerRef.current.playVideo();
          } else {
            playerRef.current.pauseVideo();
          }
        }
      }
    };

    if (window.YT && window.YT.Player) {
      initializePlayer();
    } else {
      window.onYouTubeIframeAPIReady = initializePlayer;
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.pauseVideo();
      }
    };
  }, [isActive, slide.type, slide.repeat]);

  return (
    <div className={`slide ${isActive ? "active" : "inactive"}`}>
      {/* Heading */}
      {slide.type === "heading" && (
        <h1>
          {slide.icon && <span className="slide-icon">{slide.icon}</span>}
          {slide.content}
        </h1>
      )}

      {/* Paragraph with Markdown */}
      {slide.type === "paragraph" && (
        <LazyLoad 
          height={9000} 
          offset={100} 
          once 
          placeholder={<div className="skeleton"></div>}
        >
          <div>
            <h1>
              {slide.icon && <span className="slide-icon">{slide.icon}</span>}
              {slide.title}
            </h1>
            <ReactMarkdown>
              {slide.content.replace("/images", getImagePath("/images"))}
            </ReactMarkdown>
          </div>
        </LazyLoad>
      )}

    {/* YouTube */}
    {slide.type === "youtube" && (
      <LazyLoad 
        height={315} 
        offset={100} 
        once 
        placeholder={<div className="skeleton"></div>}
      >
        <div className="video-container">
          {slide.title && (
            <h1>
              {slide.icon && <span className="slide-icon">{slide.icon}</span>}
              {slide.title}
            </h1>
          )}
          <iframe
            ref={iframeRef}
            id={`youtube-player-${slide.url}`}
            src={getYouTubeEmbedUrl(slide.url)}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            sandbox="allow-scripts allow-same-origin allow-presentation"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            title={slide.title || "YouTube video"}
          ></iframe>
        </div>
      </LazyLoad>
    )}
    </div>
  );
};

export default Slide;
