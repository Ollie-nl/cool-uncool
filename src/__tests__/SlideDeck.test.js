import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SlideDeck from "../components/SlideDeck";

test("Navigates to next slide on right arrow key press", () => {
  const slides = [
    { slug: "start", content: "Start Slide" },
    { slug: "next", content: "Next Slide" },
  ];

  render(
    <MemoryRouter initialEntries={["/slides/2024/12/start"]}>
      <SlideDeck slides={slides} />
    </MemoryRouter>,
  );

  // Controleer of de eerste slide zichtbaar is
  expect(screen.getByText(/Start Slide/i)).toBeInTheDocument();

  // Simuleer pijltje naar rechts
  fireEvent.keyDown(window, { key: "ArrowRight" });

  // Controleer of de volgende slide verschijnt
  expect(screen.getByText(/Next Slide/i)).toBeInTheDocument();
});
