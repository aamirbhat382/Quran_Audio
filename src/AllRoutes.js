import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Home from './Components/Home'
import Surah from './Components/Surha'
import TajweedSurha from './Components/TajweedSurha'
import Clander from './Components/Clander'


function AllRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/suraha" element={<Surah/>}/>
        <Route path="suraha/tajweed" element={<TajweedSurha/>}/>
        <Route path="clander" element={<Clander/>}/>
      </Routes>
    </Router>
  );
}


export default AllRoutes;
