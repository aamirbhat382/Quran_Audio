import { useState,useEffect } from "react";
import {Tajweed} from 'tajweed'
import NavBar from './NavBar'


const TajweedSurha = ()=>{
let parseTajweed = new Tajweed()
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

const loadData = (number)=>{
    fetch(`https://api.alquran.cloud/v1/surah/${number}/quran-tajweed`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((data) => {
        //   console.log(data)
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
     loadData(1)

  }, []);
const SurahDatiles = ()=>{
    return(
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
    {data && data.ayahs.map((element,index)=>{
        // console.log(element.audio)
        return(
            <>
            <ul>
        <div className="py-3 text-center" key={`key_${index}`}>
            
            <div className="" id={`ayah${index + 1}`}>
            <h1 className=" Quran-ayah py-3 lh-lg" dangerouslySetInnerHTML={{__html:`<span> ۞ </span>  ${parseTajweed.parse(element.text)}`}} id={`text-${index}`}></h1>
            </div>
            
        </div>
        </ul>
        </>
        )
    })

        }
        </>
    )
};
const handleChange = (event)=>{
  setLoading(true)
   loadData(event.target.value)

}
const options = ()=>{  
    let Arr = []
  for (let i = 0;i<114;i++){
            Arr.push(i+1)
        }
    return Arr
}

let SurahList = options()

  
    return(
        <>
        <NavBar>
          <section className="py-3">
        <div className="container SurhaContainer rounded-1  bg-light">
        <select onChange = {handleChange} className="form-select mb-3" aria-label="Default select example">
            {SurahList.map((element=>{
                return(<option value={element} key={element}>{element}</option>)
            }))}
        </select>
        {SurahDatiles()}
        </div>
        </section>
        </NavBar>
        
        </>
        )

}

export default TajweedSurha;
