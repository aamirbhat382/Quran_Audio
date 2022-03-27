import React, { useState, useEffect, useContext } from "react";
import NavBar from "./NavBar";
import { SettingsContext } from "../SettingsContext";

function  Settings() {
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
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1" className="text-light">
            Select Calculation Method
          </label>
          <select
            onChange={handleChangeReciters("CalculationMethod")}
            className="form-control"
            id="exampleFormControlSelect1"
          >
            
            <option value="1">Muslim World League</option>
            <option value="2">Islamic Society of North America</option>
            <option value="3">Egyptian General Authority of Survey</option>
            <option value="4">Umm Al-Qura University, Makkah</option>
            <option value="5">University of Islamic Sciences, Karachi</option>
            <option value="6">Institute of Geophysics, University of Tehran</option>
            <option value="7">Shia Ithna-Ashari, Leva Institute, Qum</option>
            <option value="8">Gulf Region</option>
            <option value="9">Kuwait</option>
            <option value="10">Qatar</option>
            <option value="11">Majlis Ugama Islam Singapura, Singapore</option>
            <option value="12">Union Organization islamic de France</option>
            <option value="13">Diyanet İşleri Başkanlığı, Turkey</option>
            <option value="14">Spiritual Administration of Muslims of Russia</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1" className="text-light">
            Select Madhab
          </label>
          <select
             onChange={handleChangeReciters("madhab")}
            className="form-control"
            id="exampleFormControlSelect1"
          >
            <option value="Hanafi">Hanafi</option>
            <option value="Shafi">Shafi</option>
            
           
          </select>
        </div>
      </div>
    </NavBar>
  );
}

export default Settings;
