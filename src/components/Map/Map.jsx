import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Pin } from "../";

import "./Map.scss";

export const calculateAvarage = (mapObjects, direction) => {
  return (
    mapObjects?.reduce((a, b) => {
      return a + b?.location[`${direction}`];
    }, 0) / mapObjects.length
  );
};

export const Map = ({ mapObjects }) => {
  const initialLatitude = calculateAvarage(mapObjects, "latitude");
  const initialLongitude = calculateAvarage(mapObjects, "longitude");
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
