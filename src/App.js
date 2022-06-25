import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [route, setRoute] = useState({
    route: "",
    stations: [],
  });

  const enabled =
    route.route &&
    route.stations.every((station) =>
      Object.entries(station).every(([key, value]) =>
        key === "errors" ? Object.values(value).length === 0 : value
      )
    );

  function handleRoute(e) {
    setRoute((route) => ({
      ...route,
      route: e.target.value,
    }));
  }

  function addStation() {
    setRoute((route) => ({
      ...route,
      stations: [
        ...route.stations,
        {
          name: "",
          lat: "",
          lon: "",
          errors: {},
        },
      ],
    }));
  }

  function handleStation(value, name, key) {
    setRoute((route) => ({
      ...route,
      stations: route.stations.map((station, i) => {
        if (key === i) {
          station[name] = value;
          let current = route.stations.find(
            (r, index) => r[name] === value && key !== index
          );
          if (current)
            station.errors[
              name
            ] = `${name} degeri baska bir alanda ${value} degeriyle zaten tanimlanmis!`;
          else delete station.errors[name];
        }
        return station;
      }),
    }));
  }

  return (
    <div className="App">
      <div className="first">
        <input
          type="text"
          value={route.route}
          onChange={(e) => handleRoute(e)}
          placeholder="Guzergah"
        />
        <button onClick={addStation}>Yeni Durak Ekle</button>
      </div>
      <hr />
      <div className="second">
        {route.stations.map((station, idx) => {
          return (
            <div key={idx} className="inputs">
              <input
                type="text"
                onChange={(e) => handleStation(e.target.value, "name", idx)}
                placeholder="Enlem"
              />
              <input
                type="text"
                onChange={(e) => handleStation(e.target.value, "lat", idx)}
                placeholder="Durak Adi"
              />
              <input
                type="text"
                onChange={(e) => handleStation(e.target.value, "lon", idx)}
                placeholder="Boylam"
              />
            </div>
          );
        })}
      </div>
      <hr />
      <button disabled={!enabled}>KAYDET</button>
      <br />
      <pre>{JSON.stringify(route, null, 2)}</pre>
    </div>
  );
}
