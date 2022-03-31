import { useState,useEffect,useContext, } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from './NavBar'
import { SettingsContext } from "../SettingsContext";


function Home() {
const { settings, setSettings } = useContext(SettingsContext);
const navigate = useNavigate();
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

 
useEffect(() => {
  
    fetch(`https://api.alquran.cloud/v1/surah`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((data) => {
      	// console.log(data)
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
  }, []);
  useEffect(()=>{
    if (!settings) {
    const _settings = {...settings};
    _settings.reciter ="ar.alafasy";
    _settings.madhab ="Hanafi";
    _settings.CalculationMethod = 5
    _settings.Translation = 'en.asad'
    setSettings(_settings)
    }
  },[settings])
  
function handleOnClick(id) {
		// console.log("Clicked")
     navigate(`/suraha/${id}`,{ state: id }, {replace: true})
    
  }

const surhaList =()=>{
	return (
    
		<>
    
			{loading && (
          <div className="spinner-border text-warning spinner-center" role="status">
		  <span className="visually-hidden">Loading...</span>
		</div>
        )}
			{error && (
	       	<div className="alert alert-danger w-75 mx-auto" role="alert">
           Something went Wrong
         </div>
	        )}
			<div className="container py-5">
		        {data &&
		        	data.map((element) => {
		        		return(
					        <button onClick={() => handleOnClick(element.number)} key={element.number} id={element.number} className=" surah list-group-item list-group-item-action rounded ">
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
      </>
      )
}



  return (
    <NavBar>
    	{surhaList()}
    </NavBar>
  );
}

export default Home