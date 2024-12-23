import { render, screen } from "@testing-library/react";
import App from "../App";

test("Renders the App without crashing", () => {
  render(<App />);
  expect(screen.getByText(/Geen slides beschikbaar/i)).toBeInTheDocument();
});
