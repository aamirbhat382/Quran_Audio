import React, { useState, useEffect, useContext } from "react";
import NavBar from "./NavBar";
import { SettingsContext } from "../SettingsContext";

function Test() {
  const { settings, setSettings } = useContext(SettingsContext);
  const [values, setValues] = useState({
    reciters: null,
    loading: false,
    error: "",
  });
  const { reciters, loading, error } = values;

  const preload = () => {
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
        setValues({ ...values, reciters: data.data });
      })
      .catch((err) => {
        setValues({ ...values, error: err, reciters:null, loading:false});
      })
      .finally(() => {
        setValues({ ...values, loading: false });
      });
  };
  useEffect(() => {
    preload();
  },[]);
  const handleChangeReciters = (name) => (event) => {
    const value = event.target.value;
    const _settings = {...settings};
    _settings.reciter = value;
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
            <option defaultValue="ar.alafasy">Alafasy</option>
            {reciters &&
              reciters.map((reciter, index) => (
                <option key={index} value={reciter.identifier}>
                  {" "}
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
