import React, { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { Map, Filters } from "./components";
import { fetchApi } from "./services/fetchApi";

import "./App.scss";
import { mockData } from "./constants/dataMock";

function App() {
  const [availability, setAvailability] = useState(false);
  const [minBattery, setMinBattery] = useState(20);
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const urlVehicles = "/map";

  useEffect(() => {
    fetchApi(urlVehicles)
      .then((results) => {
        setData(
          mockData
            ? Object.values(results.objects)
                .concat(mockData)
                .filter(
                  (object) =>
                    object.location.longitude && object.location.latitude
                )
            : Object.values(results.objects).filter(
                (object) =>
                  object.location.longitude && object.location.latitude
              )
        );

        setLoading(false);
      })
      .catch((err) => {
        //setFetchError(err.message); when backend returns proper error messages
        setFetchError("Failed to fetch data. Please try again.");
      });
  }, []);

  useEffect(() => {
    if (data) {
      let filteredData = [];
      availability
        ? (filteredData = data?.filter(
            (object) => object.status === "AVAILABLE"
          ))
        : (filteredData = data);

      setFilteredData(
        filteredData.filter(
          (object) =>
            !object.batteryLevelPct || object.batteryLevelPct >= minBattery
        )
      );
    }
  }, [data, minBattery, availability]);

  if (fetchError) {
    return <div className="App">Fetch error message: {fetchError}</div>;
  }

  if (!loading) {
    return (
      <>
        <header className="app__header">
          <h1 className="app__header--title">Map position vizualization</h1>
          <span className="app__header--description">
            <p>
              Check position of vehicles, parking and POI on this interactive
              map!
            </p>
            <p>
              You can also use filters to specify the appropriate search
              options.
            </p>
          </span>
        </header>

        <main className="app__main">
          <section className="filters__container">
            <Filters
              availability={availability}
              setAvailability={setAvailability}
              minBattery={minBattery}
              setMinBattery={setMinBattery}
            />
          </section>
          <section className="map__container">
            {filteredData.length ? (
              <Map mapObjects={filteredData} />
            ) : (
              <p>There are no results for these search criteria.</p>
            )}
          </section>
        </main>

        <footer className="app__footer">
          <a
            className="app__footer--link"
            href="https://github.com/wszczawinski/map-position"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub /> Repo Link
          </a>
        </footer>
      </>
    );
  } else {
    return <div className="App">Loading content...</div>;
  }
}

export default App;
