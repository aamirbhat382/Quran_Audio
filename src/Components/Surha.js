import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import ReactAudioPlayer from "react-audio-player";
import NavBar from "./NavBar";
import { SettingsContext } from "../SettingsContext";

const Surah = () => {
  const { settings, setSettings } = useContext(SettingsContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const SurhaNumber = location.state;
  const [error, setError] = useState(null);
  let limit = 4;
  useEffect(() => {
    fetchData(SurhaNumber);
  }, []);
  const fetchData = (SurhaNumber) => {
    const reciter = JSON.parse(localStorage.getItem("settings")).reciter;
    fetch(
      `https://api.alquran.cloud/v1/surah/${SurhaNumber}/editions/${reciter},en.asad,ur.jalandhry`
    )
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
        let ur_translation = data.data[2];
        setData([
          {
            audio_data: audio_data,
            en_translation: en_translation,
            ur_translation: ur_translation,
          },
        ]);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const SurahDatiles = () => {
    return (
      <>
        {loading && (
          <div
            className="spinner-border text-warning spinner-center"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        {error && (
          <div className="alert alert-danger w-75 mx-auto" role="alert">
            Something went Wrong
          </div>
        )}
        {data &&
          data[0].audio_data.ayahs.map((element, index) => {
            // console.log(element.audio)
            return (
              <div
                className="card text-center mb-3 ayahs-card "
                key={`key_${index}`}
              >
                <div className="card-header">
                  <p
                    id={`ayahsNo${index}`}
                    className="card-title text-success "
                  >
                    {index + 1}
                  </p>
                </div>
                <div className="card-body card-body-bg" id={`ayah${index + 1}`}>
                  <h5 className="card-title Quran-ayah " id={`text-${index}`}>
                    {element.text}
                  </h5>
                  <p className="card-title Quran-ayah ">
                    {data[0].en_translation.ayahs[index].text}
                  </p>
                  <p className="card-title Quran-ayah ">
                    {data[0].ur_translation.ayahs[index].text}
                  </p>

                  <a
                    href="#"
                    id={index}
                    className={`card-title  ayahs `}
                    dataurl={element.audio}
                  ></a>
                </div>
                <div className="card-footer text-muted">
                  Ruku - {element.ruku} | juz - {element.juz} | Page -{" "}
                  {element.page} | Manzil - {element.manzil} -
                </div>
              </div>
            );
          })}
      </>
    );
  };

  if (document.getElementsByClassName("ayahs").length > 0) {
    const ayahsArray = document.getElementsByClassName("ayahs");
    let i = 0;
    // console.log(ayahsArray[i])
    let player = document.getElementById("player");
    // console.log(player)
    player.src = ayahsArray[i].getAttribute("dataurl");
    document.getElementById(`text-${i}`).style.color = "green";
  

    player.addEventListener("ended", () => {
      document.getElementById(`text-${i}`).style.color = "#7081b9";

      i++;

      if (i < ayahsArray.length) {
        document.getElementById(`ayahsNo${i}`).scrollIntoView();
        document.getElementById(`text-${i}`).style.color = "green";
        player.src = ayahsArray[i].getAttribute("dataurl");

        // ayahsArray[i]
        return;
      }
      i = 0;
      document.getElementById(`ayahsNo${i}`).scrollIntoView();
      player.src = ayahsArray[i].getAttribute("dataurl");
      document.getElementById(`text-${i}`).style.color = "green";
    });
  }

  const handlePlayPause = () => {
    const audioTag = document.querySelector("audio");
    const controls = document.getElementById("controls");
    if (audioTag.paused) {
      audioTag.play();
      
      controls.innerHTML = `<button id="pause">
        <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24"
            fill="white" width="36px" height="36px">
            <g>
                <rect fill="none" height="24" width="24" />
            </g>
            <g>
                <g>
                    <path
                        d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M10,16L10,16c-0.55,0-1-0.45-1-1V9 c0-0.55,0.45-1,1-1l0,0c0.55,0,1,0.45,1,1v6C11,15.55,10.55,16,10,16z M14,16L14,16c-0.55,0-1-0.45-1-1V9c0-0.55,0.45-1,1-1l0,0 c0.55,0,1,0.45,1,1v6C15,15.55,14.55,16,14,16z" />
                </g>
            </g>
        </svg></button>`;
    } else {
      audioTag.pause();
      controls.innerHTML = `<button id="play" className="">
        <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24"
           fill="white" width="36px" height="36px">
           <g>
               <rect fill="none" height="24" width="24" />
           </g>
           <g>
               <path
                   d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M9.5,14.67V9.33c0-0.79,0.88-1.27,1.54-0.84 l4.15,2.67c0.61,0.39,0.61,1.29,0,1.68l-4.15,2.67C10.38,15.94,9.5,15.46,9.5,14.67z" />
           </g>
       </svg>
      </button>`;
    }
  };
  //   console.log(location.state)
  const handleNext = () => {
    if (location.state == 114) {
      return;
    }
    const audioTag = document.querySelector("audio");
    // console.log(audioTag)
    audioTag.pause();
    const _state = location.state + 1;
    navigate(`/suraha/${_state}`, { state: _state }, { replace: true });
    window.location.reload();
  };
  const handleBack = () => {
    if (location.state == 1) {
      return;
    }
    const audioTag = document.querySelector("audio");
    audioTag.pause();
    const _state = location.state - 1;
    navigate(`/suraha/${_state}`, { state: _state }, { replace: true });
    window.location.reload();
  };

  return (
    <NavBar>
      <div className="container py-3">
        <div className=" one-Surah  rounded p-1  ">{SurahDatiles()}</div>

        <div className="audio-player">
          <ReactAudioPlayer id="player" autoPlay src="" />
        </div>
        <div
          className="controls d-flex align-content-center
            justify-content-center"
        >
          <button onClick={handleBack}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              fill="white"
              className="bi bi-skip-backward"
              viewBox="0 0 16 16"
            >
              <path d="M.5 3.5A.5.5 0 0 1 1 4v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v2.94l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L8.5 8.752v2.94c0 .653-.713.998-1.233.696L1 8.752V12a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm7 1.133L1.696 8 7.5 11.367V4.633zm7.5 0L9.196 8 15 11.367V4.633z" />
            </svg>
          </button>
          <div id="controls" onClick={handlePlayPause}>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                enableBackground="new 0 0 24 24"
                viewBox="0 0 24 24"
                fill="white"
                width="36px"
                height="36px"
              >
                <g>
                  <rect fill="none" height="24" width="24" />
                </g>
                <g>
                  <g>
                    <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M10,16L10,16c-0.55,0-1-0.45-1-1V9 c0-0.55,0.45-1,1-1l0,0c0.55,0,1,0.45,1,1v6C11,15.55,10.55,16,10,16z M14,16L14,16c-0.55,0-1-0.45-1-1V9c0-0.55,0.45-1,1-1l0,0 c0.55,0,1,0.45,1,1v6C15,15.55,14.55,16,14,16z" />
                  </g>
                </g>
              </svg>
            </button>
          </div>
          <button onClick={handleNext}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              fill="white"
              className="bi bi-skip-forward"
              viewBox="0 0 16 16"
            >
              <path d="M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V8.752l-6.267 3.636c-.52.302-1.233-.043-1.233-.696v-2.94l-6.267 3.636C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696L7.5 7.248v-2.94c0-.653.713-.998 1.233-.696L15 7.248V4a.5.5 0 0 1 .5-.5zM1 4.633v6.734L6.804 8 1 4.633zm7.5 0v6.734L14.304 8 8.5 4.633z" />
            </svg>
          </button>
        </div>
      </div>
    </NavBar>
  );
};

export default Surah;
