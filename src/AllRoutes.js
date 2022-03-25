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



function AllRoutes() {
  return (
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
      </Routes>
    </Router>
  );
}


export default AllRoutes;
