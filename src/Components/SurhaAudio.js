import { useState, useEffect, useContext, } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from './NavBar'
import { SettingsContext } from "../SettingsContext";
import ReactAudioPlayer from "react-audio-player";


function SurhaAudio() {
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

    function handleOnClick(id) {
        setLoading(true);
        let player = document.getElementById("player");
        // console.log(player)
        player.src = `https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${id}.mp3`;
       
    }
const audioTag = document.querySelector('audio')
const currentTimeTag = document.querySelector('.current')
const durationTag = document.querySelector('.total')
const fillDuration = document.querySelector('.fill-duration')

const startTimer = () => {
    setLoading(false);
    const duration = parseInt(audioTag.duration)
    const strTime = (currentTime) => {
        let hour = undefined
        let minutes = undefined
        let seconds = undefined
        seconds = (currentTime % 60)
        minutes = parseInt(currentTime / 60)
        if (minutes >= 60) {
            hour = (minutes / 60)
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        const returningTime = `${hour ? hour + ":" : ""}${minutes ? minutes + ":" : "00:"}${seconds}`
            // console.log(returningTime);
        return returningTime
    }
    durationTag.innerText = strTime(duration)
    setInterval(() => {
        const duration = parseInt(audioTag.duration)
        const currentTime = parseInt(audioTag.currentTime)
        const time = (currentTime / duration) * 100
        const currentTimeInStr = strTime(currentTime)
        currentTimeTag.innerText = currentTimeInStr
        fillDuration.style.width = `${time}%`

    }, 1000)
}

if(audioTag){
    audioTag.addEventListener('loadeddata', startTimer)
    let controls = document.getElementById("controls")


    const pause = document.getElementById("pause")
    
    
    pause.addEventListener('click', () => {
    
        audioTag.pause()
    
    })
    
    const play = document.getElementById("play")
    
    play.addEventListener('click', () => {
        audioTag.play()
    
    
    })
}



    const surhaList = () => {
        return (

            <>

                {loading && (
                    <div className="spinner-border text-warning spinner-center " role="status">
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
                            return (

                                <button key={element.number} id={element.number} onClick={() => handleOnClick(element.number)} className=" surah list-group-item list-group-item-action rounded ">


                                    <div className="d-flex w-100 justify-content-between">
                                        <small className="text-muted"> <span className="badge bg-success badge-pill ">{element.number}</span> Number Of Ayahs {element.numberOfAyahs}</small>
                                        <h5 className="mb-1 Quran-surha">{element.name}</h5>
                                    </div>
                                    <p className="mb-1 surhaEnglishName">{element.englishName}</p>
                                    <small className="text-muted">{element.englishNameTranslation}</small>
                                    <div
                                        className="controls d-flex align-content-center
          justify-content-center"
                                    >



                                    </div>
                                </button>
                            )
                        })
                    }
                </div>
            </>
        )
    }



    return (
        <>
            {/* style={{marginRight: spacing + 'em'}} */}
            <NavBar>
                {surhaList()}
                <div className="audio-player" id="mainAudioPlayer">
                    <div className="fill-duration" style={{ width: 0 }}></div>
                    {/* <audio id="player" autoPlay></audio> */}
                    <ReactAudioPlayer id="player" autoPlay src="" />
                    <div className="fill-duration"></div>
                    <div className="duration">
                        <p className="current">0:00</p>
                        <span className="currentAndtotal"></span>
                        <p className="total"></p>
                    </div>


                    <div className="controls" id="controls">
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

        </>
    );
}

export default SurhaAudio