import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Pin } from "../";

import "./Map.scss";

export const Map = ({ mapObjects }) => {
  const initialLatitude =
    mapObjects?.reduce((a, b) => {
      return a + b?.location.latitude;
    }, 0) / mapObjects.length;

  const initialLongitude =
    mapObjects?.reduce((a, b) => {
      return a + b?.location.longitude;
    }, 0) / mapObjects.length;

  const initialPosition = [initialLatitude, initialLongitude];

  return (
    <>
      <MapContainer
        center={initialPosition}
        zoom={16}
        className="leaflet__container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {mapObjects?.map((mapObject) => (
          <Pin objectData={mapObject} key={mapObject.id} />
        ))}
      </MapContainer>
    </>
  );
};
