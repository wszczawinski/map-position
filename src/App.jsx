import React, { useEffect, useState } from "react";
import { Map, Filters } from "./components";
import { fetchApi } from "./services/fetchApi";

import "./App.scss";

function App() {
  const [vehicles, setVehicles] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const urlVehicles = "/map";

  useEffect(() => {
    fetchApi(urlVehicles)
      .then((results) => {
        setVehicles(Object.values(results.objects));
        setLoading(false);
      })
      .catch((err) => {
        setFetchError(err.message);
      });
  }, []);

  if (!fetchError) {
    if (!loading) {
      return (
        <>
          <header>
            <h1>Hello World!</h1>
          </header>
          <main>
            <Filters />
            {vehicles.length ? (
              <Map vehicles={vehicles} />
            ) : (
              <p>Nie ma wyników odpowiadających kryteriom wyszukiwania</p>
            )}
          </main>
          <footer>copy</footer>
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
