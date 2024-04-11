import React ,{useContext} from 'react'
import { useLoader, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useRef, useState } from 'react'
import { useEffect } from 'react'
import { RefContext } from '../context/context'


function PositionalSound({ url,distance,isMuted}) {
    const sound = useRef()
    const { camera } = useThree()
    const {playerRef}=useContext(RefContext);
    const [listener] = useState(() => new THREE.AudioListener())
    const buffer = useLoader(THREE.AudioLoader, url)

      
    useEffect(() => {
        sound.current.setBuffer(buffer)
        sound.current.setRefDistance(1)
        sound.current.setLoop(true)
        if(isMuted){
            sound.current.pause()
        }
        else{
            sound.current.play()
        }
        // sound.current.play()

        sound.current.setVolume(0.5);
        // Set the reference distance for reducing volume
        sound.current.setMaxDistance(distance);

        // Set the rolloff factor to control volume reduction with distance
        // sound.current.setRolloffFactor(10); // You can adjust this value based on your preference

        // Set the distance model to control volume reduction algorithm
        sound.current.setDistanceModel("linear"); // You can experiment with "linear", "inverse", or "exponential"

        camera.add(listener)
        return () => camera.remove(listener)
      
    }, [isMuted])
    return <positionalAudio ref={sound} args={[listener]} />
}

// function PositionalSound({ url, isMuted }) {
//     const sound = useRef();
//     const { camera } = useThree();
//     const [listener] = useState(() => new THREE.AudioListener());
//     const buffer = useLoader(THREE.AudioLoader, url);

//     useEffect(() => {
//       if (!isMuted) {
//         sound.current.setBuffer(buffer);
//         sound.current.setRefDistance(1);
//         sound.current.setLoop(true);
//         sound.current.play();

//         sound.current.setVolume(0.5);
//         sound.current.setMaxDistance(50);
//         sound.current.setRolloffFactor(10);
//         sound.current.setDistanceModel("linear");

//         camera.add(listener);
//       }
//     else {
//         // If muted, stop and disconnect the audio
//         sound.current.stop();
//       }



//       return () => {
//         if (!isMuted) {
//           camera.remove(listener);
//         }
//       };
//     }, [isMuted]);

//     return <positionalAudio ref={sound} args={[listener]} />;
//   }


export default PositionalSound