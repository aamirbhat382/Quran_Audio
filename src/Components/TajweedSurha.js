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
    {data && data.ayahs.map((element,index)=>{
        // console.log(element.audio)
        return(
            
        <div className="py-3 text-center" key={`key_${index}`}>
            
            <div className="" id={`ayah${index + 1}`}>
            <h1 className=" Quran-ayah " dangerouslySetInnerHTML={{__html:`<span> ۞ </span>  ${parseTajweed.parse(element.text)}`}} id={`text-${index}`}></h1>
            </div>
            
        </div>
        
        )
    })

        }
        </>
    )
};
const handleChange = (event)=>{
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
        <div className="container SurhaContainer">
        <select onChange = {handleChange} className="form-select mb-3" aria-label="Default select example">
            {SurahList.map((element=>{
                return(<option value={element} key={element}>{element}</option>)
            }))}
        </select>
        {SurahDatiles()}
        </div>
        </NavBar>
        
        </>
        )

}

export default TajweedSurha;
