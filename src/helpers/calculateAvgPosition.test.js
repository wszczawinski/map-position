import { calculateAvgPosition } from "./calculateAvgPosition";
import { mockData } from "../constants/dataMock";

const positionMock = [
  {
    name: "position 1",
    location: {
      latitude: 2,
      longitude: 1,
    },
  },
  {
    name: "position 2",
    location: {
      latitude: 4,
      longitude: 3,
    },
  },
  {
    name: "position 3",
    location: {
      latitude: 6,
      longitude: 5,
    },
  },
  {
    name: "position 4",
    location: {
      latitude: 8,
      longitude: 7,
    },
  },
  {
    name: "position 5",
    location: {
      latitude: 10,
      longitude: 9,
    },
  },
];

describe("calculate average position", () => {
  test("calculate average latitude", () => {
    const averageLatitude =
      mockData.map((item) => item.location.latitude).reduce((x, y) => x + y) /
      mockData.length;
    expect(calculateAvgPosition(mockData, "latitude")).toEqual(averageLatitude);
    expect(calculateAvgPosition(positionMock, "latitude")).toEqual(6);
  });

  test("calculate average longitude", () => {
    const averageLongitude =
      mockData.map((item) => item.location.longitude).reduce((x, y) => x + y) /
      mockData.length;
    expect(calculateAvgPosition(mockData, "longitude")).toEqual(
      averageLongitude
    );
    expect(calculateAvgPosition(positionMock, "longitude")).toEqual(5);
  });
});
