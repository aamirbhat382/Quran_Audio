import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faForward, faBackward, faList } from '@fortawesome/free-solid-svg-icons';

function AudioPlayer() {
    const [playing, setPlaying] = useState(false);
    const [error, setError] = useState(null);
    const audioRef = useRef(null);

    const [surahList, setSurahList] = useState([]);
    const [trackList, setTrackList] = useState([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

    useEffect(() => {
        async function fetchSurahList() {
            const response = await axios.get("https://api.alquran.cloud/v1/surah");
            setSurahList(response.data.data);
        }

        fetchSurahList();
    }, []);

    async function fetchTrackData(trackNumber) {
        const response = await axios.get(`https://api.alquran.cloud/v1/surah/${trackNumber}`);
        return {
            id: response.data.data.number,
            title: response.data.data.englishName,
            url: response.data.data.audio,
        };
    }

    useEffect(() => {
        async function fetchTrackList() {
            const trackList = [];

            for (let i = 0; i < surahList.length; i++) {
                const trackData = await fetchTrackData(surahList[i].number);
                trackList.push(trackData);
            }

            setTrackList(trackList);
        }

        fetchTrackList();
    }, [surahList]);

    function playAudio() {
        setPlaying(true);
        setError(null);
        audioRef.current.play();
    }

    function pauseAudio() {
        setPlaying(false);
        audioRef.current.pause();
    }

    function handlePlayError(error) {
        setPlaying(false);
        setError(error);
    }

    function playNextTrack() {
        const nextTrackIndex = (currentTrackIndex + 1) % trackList.length;
        setCurrentTrackIndex(nextTrackIndex);
        audioRef.current.src = trackList[nextTrackIndex].url;
        playAudio();
    }

    function playPreviousTrack() {
        const previousTrackIndex = (currentTrackIndex + trackList.length - 1) % trackList.length;
        setCurrentTrackIndex(previousTrackIndex);
        audioRef.current.src = trackList[previousTrackIndex].url;
        playAudio();
    }

    function handleTrackListClick() {
        const trackListModal = document.getElementById("trackListModal");
        trackListModal.style.display = "block";
    }

    function handleModalClose() {
        const trackListModal = document.getElementById("trackListModal");
        trackListModal.style.display = "none";
    }

    return (
        <div className="container">
            <h1 className="text-center my-4">Quran Audio Player</h1>

            <div className="row">
                <div className="col-md-4">
                    <h4>Surah List</h4>
                    <div className="list-group">
                        {surahList.map((surah) => (
                            <button
                                key={surah.number}
                                type="button"
                                className={`list-group-item list-group-item-action ${currentTrackIndex === surah.number - 1 ? 'active' : ''}`}
                                onClick={() => handleSurahClick(surah.number)}
                            >
                                {surah.englishName} ({surah.number})
                            </button>
                        ))}
                    </div>
                </div>

                <div className="col-md-8">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h4 className="card-title">{trackList[currentTrackIndex] ? trackList[currentTrackIndex].name : ''}</h4>

                            <audio ref={audioRef} onEnded={pauseAudio} onError={handlePlayError}>
                                <source src="htt" type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>

                            <div className="text-center">
                                <button type="button" className="btn btn-link" onClick={playAudio}>
                                    <FontAwesomeIcon icon={playing ? faPause : faPlay} size="2x" />
                                </button>
                                <button type="button" className="btn btn-link" onClick={playPreviousTrack}>
                                    <FontAwesomeIcon icon={faBackward} size="2x" />
                                </button>
                                <button type="button" className="btn btn-link" onClick={playNextTrack}>
                                    <FontAwesomeIcon icon={faForward} size="2x" />
                                </button>
                                <button type="button" className="btn btn-link" onClick={handleTrackListClick}>
                                </button>
                            </div>

                            {error && (
                                <div className="alert alert-danger mt-4" role="alert">
                                    {error}
                                </div>
                            )}
                        </div>

                        {trackList && (
                            <div className="card-footer">
                                <ul className="list-group">
                                    {trackList.map((track, index) => (
                                        <li key={track.id} className={`list-group-item ${index === currentTrackIndex ? 'active' : ''}`}>
                                            <button type="button" className="btn btn-link p-0" onClick={() => handleTrackListClick(index)}>
                                                {track.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AudioPlayer

