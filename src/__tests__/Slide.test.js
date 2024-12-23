import { render, screen } from "@testing-library/react";
import Slide from "../components/Slide";

test("Renders Slide component with content", () => {
  const slideData = {
    type: "heading",
    content: "🚀 Cool Uncool Test Slide",
    slug: "test-slide",
  };

  render(<Slide slide={slideData} isActive={true} />);

  expect(screen.getByText(/Cool Uncool Test Slide/i)).toBeInTheDocument();
});
