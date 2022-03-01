import {useLocation} from 'react-router-dom';
import { useState,useEffect } from "react";
import NavBar from './NavBar'




function PrayerTimes() {
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);



const loadData = (url)=>{
    let myHeaders = new Headers();
myHeaders.append("x-api-key", "o5pWkEiDCQ9WSRPoSN75Rgaf6eYe19e345qwhi13");

let requestOptions = {
  method: 'GET',
  credentials: 'include',
  mode : "no-cors",
  headers: myHeaders,
  redirect: 'follow'
};
    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.data)
        
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
    
}

useEffect(() => {
  loadData("https://api.sunnah.com/v1/collections?limit=50&page=1")
  }, []);






  return (
    <NavBar>
            	<div className="container py-5">
		        {data &&
		        	data.map((element) => {
		        		return(
					        <button key={element.number} id={element.number} className=" surah list-group-item list-group-item-action bg-light text-dark ">
					        <div className="d-flex w-100 justify-content-between">
					          
					          <small className="text-muted"> <span className="badge bg-success badge-pill ">{element.number}</span> Number Of Ayahs {element.numberOfAyahs}</small>
					          <h5 className="mb-1 Quran-surha">{element.name}</h5>
					        </div>
					        <p className="mb-1 surhaEnglishName">{element.englishName}</p>
					        <small className="text-muted">{element.englishNameTranslation}</small>
					        </button>
				        )
		    		})
		        }
	     </div>
    </NavBar>
  );
}

export default PrayerTimes