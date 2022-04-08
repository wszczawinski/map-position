import React, { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { Map, Filters } from "./components";
import { fetchApi } from "./services/fetchApi";

import "./App.scss";
import { mockData } from "./dataMock";

function App() {
  const [filters, setFilters] = useState({
    avaliable: false,
    minPercentage: 20,
  });
  const [data, setData] = useState(null);
  const [vehicles, setVehicles] = useState(null);
  const [parkings, setParkings] = useState(null);
  const [poi, setPoi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const urlVehicles = "/map";

  useEffect(() => {
    fetchApi(urlVehicles)
      .then((results) => {
        if (mockData) {
          setData(Object.values(results.objects).concat(mockData));
        } else {
          setData(Object.values(results.objects));
        }
        setLoading(false);
      })
      .catch((err) => {
        setFetchError(err.message);
      });
  }, []);

  useEffect(() => {}, [data]);

  if (!fetchError) {
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
              <Filters />
            </section>
            <section className="map__container">
              {data.length ? (
                <Map vehicles={data} />
              ) : (
                <p>Nie ma wyników odpowiadających kryteriom wyszukiwania.</p>
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
  } else {
    return <div className="App">Fetch error message: '{fetchError}'</div>;
  }
}

export default App;
