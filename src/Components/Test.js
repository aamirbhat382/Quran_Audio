import React, { useState, useEffect, useContext } from "react";
import NavBar from "./NavBar";
import { SettingsContext } from "../SettingsContext";

function Test() {
  const { settings, setSettings } = useContext(SettingsContext);
  const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://api.alquran.cloud/v1/edition?format=audio&type=versebyverse`)
      .then((response) => {
        if (!response.ok) {
          console.log(response)

          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((data) => {
        setData(data.data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  },[]);
  // console.log(data)
  const handleChangeReciters = (name) => (event) => {
    console.log(name.toString())
    const value = event.target.value;
    const _settings = {...settings};
    _settings[name.toString()] = value;
    setSettings(_settings)
  };

  return (
    <NavBar>
      <div className="container py-3">
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1" className="text-light">
            Select Reciter
          </label>
          <select
            onChange={handleChangeReciters("reciter")}
            className="form-control"
            id="exampleFormControlSelect1"
          >
            <option value="ar.alafasy">Alafasy</option>
            {data &&
              data.map((reciter, index) => (
                <option key={index} value={reciter.identifier}>
                  {reciter.englishName}
                </option>
              ))}
          </select>
        </div>
      </div>
    </NavBar>
  );
}

export default Test;
