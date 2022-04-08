import React, { useState, useEffect } from "react";
import "./Filters.scss";

export const Filters = () => {
  const [filtersVisibitity, setFiltersVisibitity] = useState(false);
  const [avaliable, setAvaliable] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(20);
  const showFilters = () => {
    setFiltersVisibitity(!filtersVisibitity);
  };

  useEffect(() => {
    console.log(avaliable);
    console.log(batteryLevel);
  }, [batteryLevel, avaliable]);

  return (
    <section className="filter__container">
      <button
        className={`filter__container--btn ${filtersVisibitity && "active"}`}
        onClick={showFilters}
      >
        Show filters
      </button>
      {filtersVisibitity ? (
        <div className="filter__container--filters">
          <span>
            Only avaliable
            <input
              name="avaliability"
              type="checkbox"
              checked={avaliable}
              onChange={() => setAvaliable(!avaliable)}
            />
          </span>

          <span className="range">
            Minimum battery {batteryLevel}%
            <input
              name="battery"
              type="range"
              defaultValue={batteryLevel}
              onChange={(e) => setBatteryLevel(e.target.value)}
            />
          </span>
        </div>
      ) : null}
    </section>
  );
};
