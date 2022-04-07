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
    <div>
      <Marker position={[location.latitude, location.longitude]}>
        <Popup>
          <>
            <h4>Name: {name}</h4>
            <h5>Status: {status}</h5>
            <p>Battery: {batteryLevelPct}%</p>
            <p>Range: {rangeKm}km</p>
            <p>Type: {type}</p>
            <p>Plater: {platesNumber}</p>
            <p>Number: {sideNumber}</p>
          </>
        </Popup>
      </Marker>
    </div>
  );
};
