import { render, screen, fireEvent } from "@testing-library/react";
import MonthSelector from "../components/MonthSelector";

test("MonthSelector renders and selects a month", () => {
  const months = ["2024-12", "2024-10"];
  const onSelect = jest.fn();

  render(
    <MonthSelector
      months={months}
      selectedMonth="2024-12"
      onSelect={onSelect}
    />,
  );

  // Controleer of de huidige geselecteerde maand in de lijst staat
  expect(screen.getByDisplayValue("2024-12")).toBeInTheDocument();

  // Selecteer een andere maand
  fireEvent.change(screen.getByRole("combobox"), {
    target: { value: "2024-10" },
  });

  // Controleer of de onSelect-functie is aangeroepen
  expect(onSelect).toHaveBeenCalledWith("2024-10");
});
