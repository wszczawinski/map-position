import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Pin } from "../";
import { calculateAvgPosition } from "../../helpers/calculateAvgPosition";

import "./Map.scss";

export const Map = ({ mapObjects }) => {
  const initialLatitude = calculateAvgPosition(mapObjects, "latitude");
  const initialLongitude = calculateAvgPosition(mapObjects, "longitude");
  const initialPosition = [initialLatitude, initialLongitude];

  return (
    <>
      <MapContainer
        center={initialPosition}
        zoom={17}
        className="leaflet__container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerClusterGroup
          showCoverageOnHover={true}
          disableClusteringAtZoom={17}
        >
          {mapObjects?.map((mapObject) => (
            <Pin objectData={mapObject} key={mapObject.id} />
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </>
  );
};
