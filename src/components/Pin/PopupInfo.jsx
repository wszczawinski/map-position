import React from "react";

export const PopupInfo = ({ objectData, fetchObjectData }) => {
  const {
    spots,
    freeSpots,
    batteryLevelPct,
    name,
    platesNumber,
    sideNumber,
    rangeKm,
    status,
    type,
  } = objectData;

  return (
    <>
      <h3>Name: {name}</h3>
      {status && (
        <p>
          <b>Status: </b>
          {status}
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
  );
};
