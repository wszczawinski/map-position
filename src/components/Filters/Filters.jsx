import React, { useState } from "react";
import "./Filters.scss";

export const Filters = ({
  availability,
  setAvailability,
  minBattery,
  setMinBattery,
}) => {
  const [filtersVisibitity, setFiltersVisibitity] = useState(false);

  const showFilters = () => {
    setFiltersVisibitity(!filtersVisibitity);
  };

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
              checked={availability}
              onChange={() => setAvailability(!availability)}
            />
          </span>

          <span className="range">
            Minimum battery {minBattery}%
            <input
              name="battery"
              type="range"
              defaultValue={minBattery}
              onChange={(e) => setMinBattery(e.target.value)}
            />
          </span>
        </div>
      ) : null}
    </section>
  );
};
