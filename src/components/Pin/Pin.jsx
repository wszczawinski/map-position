import React, { useState, useEffect } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { fetchApi } from "../../services/fetchApi";
import { PopupInfo } from "./PopupInfo";

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
    popupAnchor: [5, -30],
    iconSize: (20, 35),
    className: "leaflet-div-icon",
  });
};

export const Pin = ({ objectData }) => {
  const { discriminator, id, status, location } = objectData;
  const [iconType, setIconType] = useState(objectIcon(default_icon));
  const [fetchObjectData, setFetchObjectData] = useState(null);

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
        console.warn(err);
      });
  }, [discriminator, status, id]);

  return (
    <article>
      <Marker
        icon={iconType}
        position={[location.latitude, location.longitude]}
      >
        <Popup>
          <PopupInfo
            objectData={objectData}
            fetchObjectData={fetchObjectData}
          />
        </Popup>
      </Marker>
    </article>
  );
};
