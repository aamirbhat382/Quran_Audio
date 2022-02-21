import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Home from './Components/Home'
import Surah from './Components/Surha'


function AllRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/suraha" element={<Surah/>}/>
      </Routes>
    </Router>
  );
}


export default AllRoutes;
