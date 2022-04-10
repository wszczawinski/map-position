import { fireEvent, render, screen } from "@testing-library/react";
import { Filters } from "./Filters";

test("renders popupInfo", () => {
  render(<Filters minBattery={20} />);

  const filtersButton = screen.getByText(/Show filters/i);
  expect(filtersButton).toBeInTheDocument();

  fireEvent.click(filtersButton);
  expect(screen.getByText(/Only available/i)).toBeInTheDocument();
  expect(screen.getByText(/Minimum battery 20%/i)).toBeInTheDocument();
});
