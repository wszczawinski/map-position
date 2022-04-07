import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Pin } from "../";

export const Map = ({ vehicles }) => {
  const initialLatitude =
    vehicles?.reduce((a, b) => {
      return a + b?.location.latitude;
    }, 0) / vehicles.length;

  const initialLongitude =
    vehicles?.reduce((a, b) => {
      return a + b?.location.longitude;
    }, 0) / vehicles.length;

  const initialPosition = [initialLatitude, initialLongitude];

  return (
    <div>
      <MapContainer
        center={initialPosition}
        zoom={13}
        className="leaflet__container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {vehicles?.map((vehicle) => (
          <Pin vehicleData={vehicle} key={vehicle.id} />
        ))}
      </MapContainer>
    </div>
  );
};
