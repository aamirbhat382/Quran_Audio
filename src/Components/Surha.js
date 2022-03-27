import {useLocation} from 'react-router-dom';
import { useState,useEffect ,useContext} from "react";
import ReactAudioPlayer from 'react-audio-player';
import NavBar from './NavBar'
import {SettingsContext } from '../SettingsContext'

const Surah = ()=> {
const { settings, setSettings } = useContext(SettingsContext);
const location = useLocation();
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);

const [error, setError] = useState(null);
let limit = 4



useEffect(() => {
    const reciter =  JSON.parse(localStorage.getItem('settings')).reciter
     fetch(`https://api.alquran.cloud/v1/surah/${location.state}/editions/${reciter},en.asad,ur.jalandhry`)
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
        let audio_data = data.data[0];
        let en_translation = data.data[1];
        let ur_translation = data.data[2]
        setData([{"audio_data":audio_data,"en_translation":en_translation,"ur_translation":ur_translation}]);
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
    {data && data[0].audio_data.ayahs.map((element,index)=>{
        // console.log(element.audio)
        return(
            
        <div className="card text-center mb-3 ayahs-card " key={`key_${index}`}>
            <div className="card-header">
            <p  id={`ayahsNo${index}`}  className="card-title text-success " >{index + 1}</p> 
            </div>
            <div className="card-body card-body-bg" id={`ayah${index + 1}`}>
            <h5 className="card-title Quran-ayah " id={`text-${index}`}>{element.text}</h5>
            <p className="card-title Quran-ayah " >{data[0].en_translation.ayahs[index].text}</p>
            <p className="card-title Quran-ayah " >{data[0].ur_translation.ayahs[index].text}</p>

            <a  href="#" id={index}  className={`card-title  ayahs `} dataurl={element.audio}></a>
            </div>
            <div className="card-footer text-muted">
            Ruku - {element.ruku} | juz - {element.juz} | Page - {element.page} | Manzil - {element.manzil} - 
            </div>
        </div>
        
        )
    })

        }
        </>
    )
};

if( document.getElementsByClassName('ayahs').length>0){

    const ayahsArray = document.getElementsByClassName('ayahs')
        let i = 0
        // console.log(ayahsArray[i])
        let player = document.getElementById('player')
        // console.log(player)
        player.src = ayahsArray[i].getAttribute('dataurl')
        document.getElementById(`text-${i}`).style.color = 'green'

        player.addEventListener('ended', () => {
            
            document.getElementById(`text-${i}`).style.color = '#7081b9'

            i++;
            
            if (i < ayahsArray.length) {
                document.getElementById(`ayahsNo${i}`).scrollIntoView()     
                document.getElementById(`text-${i}`).style.color = 'green'
                player.src = ayahsArray[i].getAttribute('dataurl');
                
                    // ayahsArray[i]
                return;
            }
            i = 0;
            document.getElementById(`ayahsNo${i}`).scrollIntoView()
            player.src = ayahsArray[i].getAttribute('dataurl');
            document.getElementById(`text-${i}`).style.color = 'green'
            
        })

    const audioTag = document.querySelector('audio')
    const pause = document.getElementById("pause")


    pause.addEventListener('click', () => {

        audioTag.pause()

    })

    const play = document.getElementById("play")

    play.addEventListener('click', () => {
        audioTag.play()


    })

}
           
          
return(
    <NavBar>
        <div className="container py-3">
          <div className=" one-Surah  rounded p-1  ">
              {SurahDatiles()}
          </div>
            
            <div className="audio-player"  >
                <ReactAudioPlayer id="player" autoPlay  src=""/>
            </div>
            <div className="controls d-flex lign-content-center
    justify-content-center" id="controls">
                <button id="play" className="">
                    <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24"
                        fill="black" width="36px" height="36px">
                        <g>
                            <rect fill="none" height="24" width="24" />
                        </g>
                        <g>
                            <path
                                d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M9.5,14.67V9.33c0-0.79,0.88-1.27,1.54-0.84 l4.15,2.67c0.61,0.39,0.61,1.29,0,1.68l-4.15,2.67C10.38,15.94,9.5,15.46,9.5,14.67z" />
                        </g>
                    </svg></button>
                <button id="pause">
                    <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24"
                        fill="black" width="36px" height="36px">
                        <g>
                            <rect fill="none" height="24" width="24" />
                        </g>
                        <g>
                            <g>
                                <path
                                    d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M10,16L10,16c-0.55,0-1-0.45-1-1V9 c0-0.55,0.45-1,1-1l0,0c0.55,0,1,0.45,1,1v6C11,15.55,10.55,16,10,16z M14,16L14,16c-0.55,0-1-0.45-1-1V9c0-0.55,0.45-1,1-1l0,0 c0.55,0,1,0.45,1,1v6C15,15.55,14.55,16,14,16z" />
                            </g>
                        </g>
                    </svg></button>
            
            </div>
        </div>
    </NavBar>
            
            
        )
    }



export default Surah;