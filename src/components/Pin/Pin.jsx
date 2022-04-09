import React, { useState, useEffect } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { fetchApi } from "../../services/fetchApi";

import car_icon from "../../images/car_icon.svg";
import un_car_icon from "../../images/un_car_icon.svg";
import parking_icon from "../../images/parking_icon.svg";
import un_parking_icon from "../../images/un_parking_icon.svg";
import poi_icon from "../../images/poi_icon.svg";
import un_poi_icon from "../../images/un_poi_icon.svg";
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
  const [fetchObjectData, setFetchObjectData] = useState(null);

  const {
    discriminator,
    spots,
    freeSpots,
    batteryLevelPct,
    name,
    id,
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
        ? setIconType(objectIcon(car_icon))
        : setIconType(objectIcon(un_car_icon));
    } else if (discriminator === "poi") {
      status === "AVAILABLE"
        ? setIconType(objectIcon(poi_icon))
        : setIconType(objectIcon(un_poi_icon));
    } else if (discriminator === "parking") {
      status === "AVAILABLE"
        ? setIconType(objectIcon(parking_icon))
        : setIconType(objectIcon(un_parking_icon));
    }

    const objectUrl = `/${discriminator}s/${id}`;
    fetchApi(objectUrl)
      .then((results) => {
        setFetchObjectData(results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [discriminator, status, id]);

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
            {/* display only few properties from single object api, based on lack of most ids */}
            {fetchObjectData?.picture && (
              <img
                src={`https://android.jrotor.com/api/attachments/${fetchObjectData.picture.id}`}
                alt="name"
              />
            )}
            {fetchObjectData?.driverLicenceCategory && (
              <p>
                <b>Driving licens category: </b>
                {fetchObjectData.driverLicenceCategory}
              </p>
            )}
            {fetchObjectData?.batteryLevelPct ? (
              <p>
                <b>Battery: </b> {fetchObjectData.batteryLevelPct}%
              </p>
            ) : (
              batteryLevelPct && (
                <p>
                  <b>Battery: </b> {batteryLevelPct}%
                </p>
              )
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
