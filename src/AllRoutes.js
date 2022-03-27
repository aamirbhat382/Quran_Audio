import React , {useState, useEffect} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Home from './Components/Home'
import Surah from './Components/Surha'
import TajweedSurha from './Components/TajweedSurha'
import Clander from './Components/Clander'
import PrayerTimes from './Components/PrayerTimes'
import Hadith from  './Components/Hadith'
import Download from './Components/Download'
import Test from "./Components/Test";
import { SettingsContext } from "./SettingsContext";
import { getSettings, storeSettings } from "./helper";
import Settings from "./Components/Settings";



function AllRoutes() {
  const [settings, setSettings] = useState({});
  useEffect(() => {
    getSettings().then((settings) => {
      setSettings(JSON.parse(settings));
    });
  }, []);

  useEffect(() => {
    storeSettings(settings);
  }, [settings]);
  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
    <Router>
      <Routes>
      <Route path="/test" element={<Test/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="suraha" element={<Surah/>}/>
        <Route path="suraha/tajweed" element={<TajweedSurha/>}/>
        <Route path="prayer" element={<PrayerTimes/>}/>
        <Route path="clander" element={<Clander/>}/>
        <Route path="hadith" element={<Hadith/>}/>
        <Route path="downloadapp" element={<Download/>}/>
        <Route path="settings" element={<Settings/>}/>
      </Routes>
    </Router>
    </SettingsContext.Provider>
  );
}


export default AllRoutes;
