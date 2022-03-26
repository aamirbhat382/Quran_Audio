import adhan from 'adhan'
import moment  from "moment";
import { useState, useEffect } from "react";
import NavBar from "./NavBar";

function PrayerTimes() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [status, setStatus] = useState(null);
  const showTimes = ()=>{
    const date = new Date();
    let coordinates = new adhan.Coordinates(latitude,longitude )
    let params = adhan.CalculationMethod.Karachi()
    params.madhab = adhan.Madhab.Hanafi;
    const prayerTimes = new adhan.PrayerTimes(coordinates, date, params);
    const fajrTime = moment(prayerTimes.fajr).format('h:mm A');
    const sunriseTime = moment(prayerTimes.sunrise).format('h:mm A');
    const dhuhrTime = moment(prayerTimes.dhuhr).format('h:mm A');
    const asrTime = moment(prayerTimes.asr).format('h:mm A');
    const maghribTime = moment(prayerTimes.maghrib).format('h:mm A');
    const ishaTime = moment(prayerTimes.isha).format('h:mm A');
    const current = prayerTimes.currentPrayer();
    const next = prayerTimes.nextPrayer();
    const nextPrayerTime = prayerTimes.timeForPrayer(next);
    console.log(nextPrayerTime)
    return (
        <div className="container">
          <h1 className='text-light text-center'>Next Prayer <span className="badge  bg-primary">{next}</span></h1>
         
          <table class="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Time</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Fajr</th>
      <td>{fajrTime}</td>
    </tr>
    <tr>
      <th scope="row">Sun rise</th>
      <td>{sunriseTime}</td>
    </tr>
    <tr>
      <th scope="row">Dhuhr</th>
      <td>{dhuhrTime}</td>
    </tr>
    <tr>
      <th scope="row">Asr</th>
      <td>{asrTime}</td>
    </tr>
    <tr>
      <th scope="row">Maghrib</th>
      <td>{maghribTime}</td>
    </tr>
    <tr>
      <th scope="row">Isha</th>
      <td>{ishaTime}</td>
    </tr>
  </tbody>
</table>
        </div>
    )
  }
  
  if ('geolocation' in navigator) {
    window.navigator.geolocation.getCurrentPosition(showPosition);
    function showPosition(position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      setStatus("locationAvailable")
    }
    }else{
      setStatus("locationNotAvailable")
    }
  
  
  return (
    <>
    <NavBar>
    <div className='container py-3'>
      {status == 'locationAvailable' && 
      showTimes()
    }
    {status == 'locationNotAvailable' && 
      showTimes()
    }
    </div>
   </NavBar>
   </>
  );
 
}

export default PrayerTimes;
