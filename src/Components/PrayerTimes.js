import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "./NavBar";

function PrayerTimes() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let todaysDate = new Date().getDate();
  let month = new Date().getMonth() + 1;
  let year = new Date().getFullYear();

  const loadData = (url) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.data);

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
  };

  useEffect(() => {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(showPosition);

      function showPosition(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        let URL = `https://api.aladhan.com/timings/${todaysDate}-${month}-${year}?latitude=${latitude}&longitude=${longitude}&method=1`;
        loadData(URL);
      }
    }
  }, []);
  function ConvertTime(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }

  return (
    <NavBar>
      <div className="container py-5">
        {loading && (
          <div className="spinner-border spinner-center" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        <table className="table   table-hover rounded-1">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Time</th>
              <th scope="col">Date</th>
              <th scope="col">Timezone</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              Object.entries(data.timings).map(([key, value]) => {
                return (
                  <tr key={key}>
                    <th scope="row">{key}</th>
                    <td>{ConvertTime(value)}</td>
                    <td>{data.date.readable}</td>
                    <td>{data.meta.timezone}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </NavBar>
  );
}

export default PrayerTimes;
