import React from "react";

const DarkModeToggle = ({ isDarkMode, onToggle }) => {
  return (
    <button
      className={`dark-mode-toggle ${isDarkMode ? "dark" : "light"}`}
      onClick={onToggle}
    >
      {isDarkMode ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon"
        >
          <path d="M21.72 13a9 9 0 01-10.94-10 9 9 0 1010.94 10z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon"
        >
          <path d="M12 3v1M12 20v1M4.22 4.22l.71.71M19.07 19.07l.71.71M1 12h1M22 12h1M4.22 19.78l.71-.71M19.07 4.93l.71-.71" />
          <circle cx="12" cy="12" r="5" />
        </svg>
      )}
      <span className="label">{isDarkMode ? "Dark" : "Light"}</span>
    </button>
  );
};

export default DarkModeToggle;
