import React, { useState, useEffect } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

import car from "../../images/car_icon.svg";
import un_car from "../../images/un_car_icon.svg";
import parking from "../../images/parking_icon.svg";
import un_parking from "../../images/un_parking_icon.svg";
import poi from "../../images/poi_icon.svg";
import un_poi from "../../images/un_poi_icon.svg";
import default_icon from "../../images/default_icon.svg";

import "./Pin.scss";

export const objectIcon = (icon) => {
  return new L.Icon({
    iconUrl: icon,
    iconRetinaUrl: icon,
    iconAnchor: [15, 35],
    popupAnchor: [12, -25],
    iconSize: (20, 35),
    className: "leaflet-div-icon",
  });
};

export const Pin = ({ objectData }) => {
  const [iconType, setIconType] = useState(objectIcon(default_icon));

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

  useEffect(() => {
    if (discriminator === "vehicle") {
      status === "AVAILABLE"
        ? setIconType(objectIcon(car))
        : setIconType(objectIcon(un_car));
    } else if (discriminator === "poi") {
      status === "AVAILABLE"
        ? setIconType(objectIcon(poi))
        : setIconType(objectIcon(un_poi));
    } else if (discriminator === "parking") {
      status === "AVAILABLE"
        ? setIconType(objectIcon(parking))
        : setIconType(objectIcon(un_parking));
    }
  }, [discriminator, status]);

  return (
    <article>
      <Marker
        icon={iconType}
        position={[location.latitude, location.longitude]}
      >
        <Popup>
          <>
            <h3>Name: {name}</h3>
            {status && (
              <p>
                <b>Status: </b> {status}
              </p>
            )}
            {spots && (
              <p>
                <b>Free spots: </b> {freeSpots}/{spots}
              </p>
            )}
            {batteryLevelPct && (
              <p>
                <b>Battery: </b> {batteryLevelPct}%
              </p>
            )}
            {rangeKm && (
              <p>
                <b>Range: </b> {rangeKm}km
              </p>
            )}
            {type && <p>Type: {type}</p>}
            {platesNumber && <p>Plater: {platesNumber}</p>}
            {sideNumber && <p>Number: {sideNumber}</p>}
          </>
        </Popup>
      </Marker>
    </article>
  );
};
