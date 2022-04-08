import React from "react";
import { Marker, Popup } from "react-leaflet";

import "./Pin.scss";

export const Pin = ({ objectData }) => {
  const {
    discriminator,
    spots,
    freeSpots,
    batteryLevelPct,
    name,
    platesNumber,
    sideNumber,
    rangeKm,
    status,
    location,
    type,
  } = objectData;

  return (
    <article>
      <Marker position={[location.latitude, location.longitude]}>
        <Popup>
          <>
            <h3>Name: {name}</h3>
            {status && <p>Status: {status}</p>}
            {spots && (
              <p>
                Free spots: {freeSpots}/{spots}
              </p>
            )}
            {batteryLevelPct && <p>Battery: {batteryLevelPct}%</p>}
            {rangeKm && <p>Range: {rangeKm}km</p>}
            {type && <p>Type: {type}</p>}
            {platesNumber && <p>Plater: {platesNumber}</p>}
            {sideNumber && <p>Number: {sideNumber}</p>}
          </>
        </Popup>
      </Marker>
    </article>
  );
};
