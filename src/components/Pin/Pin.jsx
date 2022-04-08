import React from "react";
import { Marker, Popup } from "react-leaflet";

export const Pin = ({ vehicleData }) => {
  const {
    batteryLevelPct,
    name,
    platesNumber,
    sideNumber,
    rangeKm,
    status,
    location,
    type,
  } = vehicleData;

  return (
    <article>
      <Marker position={[location.latitude, location.longitude]}>
        <Popup>
          <>
            <h3>Name: {name}</h3>
            {status && <h5>Status: {status}</h5>}
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
