import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from './NavBar'


function Home() {
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
function handleOnClick(id) {
		// console.log("Clicked")
     navigate('/suraha',{ state: id })
  }

const surhaList =()=>{
	return (
		<>
			{loading && (
          <div className="spinner-border spinner-center" role="status">
		  <span className="visually-hidden">Loading...</span>
		</div>
        )}
			{error && (
	       	<div className="alert alert-danger" role="alert">
					  Something went Wrong
					</div>
	        )}
			<div className="container py-5">
		        {data &&
		        	data.map((element) => {
		        		return(
					        <button onClick={() => handleOnClick(element.number)} key={element.number} id={element.number} className=" surah list-group-item list-group-item-action bg-light text-dark ">
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