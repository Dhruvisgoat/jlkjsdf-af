import React from 'react'
import { useContext } from 'react'
import { RefContext } from '../context/context'

function CharacterAudio() {

    const { audioRef,currentSource,setCurrentSource } = useContext(RefContext);
    // audio/runningAudio.mp3

    return (
        <audio ref={audioRef}>
            <source src={currentSource} type="audio/mp3" />
            Your browser does not support the audio element.
        </audio>)
}

export default CharacterAudio


// import React, { useRef, useState,useContext } from "react";
// import { RefContext } from './context/context'

// const App = () => {
// //   const audioRef = useRef(null);
//     const { audioRef } = useContext(RefContext);

//   const [currentSource, setCurrentSource] = useState("audio1.mp3");

//   const togglePlay = () => {
//     if (audioRef.current.paused || audioRef.current.ended) {
//       audioRef.current.play().catch(error => {
//         console.error("Error playing audio:", error);
//       });
//     } else {
//       audioRef.current.pause();
//     }
//   };

//   const changeSource = (newSource) => {
//     setCurrentSource(newSource);
//     // Pause and reset the audio
//     audioRef.current.pause();
//     audioRef.current.currentTime = 0;
//     // Load the new source
//     audioRef.current.load();
//   };

//   return (
//     <div style={{zIndex:'3',position:'absolute',top:"50%"}}>
//       <button onClick={togglePlay}>
//         {audioRef.current && !audioRef.current.paused && !audioRef.current.ended ? "Pause" : "Play"}
//       </button>
//       <button onClick={() => changeSource("audio/dancing_dhruv.mp3")}>
//         Change to Source 1
//       </button>
//       <button onClick={() => changeSource("audio/runningAudio.mp3")}>
//         Change to Source 2
//       </button>
//       <audio ref={audioRef} loop>
//         <source src={currentSource} type="audio/mp3" />
//         Your browser does not support the audio element.
//       </audio>
//     </div>
//   );
// };

// export default App;
