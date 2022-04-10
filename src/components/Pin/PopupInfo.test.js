import { render, screen } from "@testing-library/react";
import { PopupInfo } from "./PopupInfo";

const objectMock = {
  discriminator: "poi",
  status: "UNAVAILABLE",
  locationDescription: null,
  address: null,
  mapColor: {
    rgb: "ffffff",
    alpha: 0.5,
  },
  promotion: null,
  id: "00000000-0000-0000-0005-0000000000013",
  name: "Enigma POI II",
  description: null,
  location: {
    latitude: 52.1937,
    longitude: 20.928,
  },
  metadata: null,
};

test("renders popupInfo", () => {
  render(<PopupInfo objectData={objectMock} />);

  const objectName = screen.getByText(/Name: Enigma POI II/i);
  expect(objectName).toBeInTheDocument();
  const objectStatus = screen.getByText(/UNAVAILABLE/i);
  expect(objectStatus).toBeInTheDocument();
});
