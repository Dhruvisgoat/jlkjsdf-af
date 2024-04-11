import React, { Suspense } from "react"
import ReactNipple from 'react-nipple'
import { Canvas } from "@react-three/fiber"
import { DeviceOrientationControls, KeyboardControls, OrbitControls } from "@react-three/drei"
import { Loader, useProgress } from "@react-three/drei";
import { RefContext } from "../context/context";
import { useContext, useState } from "react";
import Experience from "../Experience/Experience"
import MobileStartButton from "./MobileStartButton";
import FirstPersonControls from "../Controls/FirstPersonControls";
import { Preload } from '@react-three/drei'
import { Environment } from "@react-three/drei";
import MobilePlayer from "./MobilePlayer";
import CharacterAudio from "../Controls/CharacterAudio";
import { WebGPUCanvas } from "../Controls/WebGpuCanvas";


function Loading() {
    const { active, progress, errors, item, loaded, total } = useProgress();

    const loaderStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '999',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: '20px',
        borderRadius: '8px',
        color: 'white',
        textAlign: 'center',
    };

    return active ? (
        <div style={loaderStyle}>
            {/* <div>Loading...</div> */}
            <div style={{fontSize:'3rem'}}>{parseInt(progress)} % loaded</div>
            {/* <Lottie animationData={animation}  /> */}
        </div>
    ) : null;
}

function MobileApp() {

    const { progress } = useProgress();
    const errors = useProgress((state) => state.errors)
    const { showButton, dpr, isFullscreen } = useContext(RefContext);

    const map = [
        { name: "forward", keys: ["ArrowUp", "w", "W"] },
        { name: "backward", keys: ["ArrowDown", "s", "S"] },
        { name: "left", keys: ["ArrowLeft", "a", "A"] },
        { name: "right", keys: ["ArrowRight", "d", "D"] },
        { name: "jump", keys: ["Space"] },
    ];

    const { setJoystickState, getJoystickState, isAnimating } = useContext(RefContext);

    const handleJoystickMove = (evt, data) => {
        setJoystickState(data);
    };
    const [forceWebGL, setForceWebGL] = useState(false); // You can toggle this state based on your requirements

    return (
        <>
            {progress === 100 && <MobileStartButton />}
            {/* {isAnimating.current && <><div> </div>
                <div> </div></>} */}
            {/* if is fullscreen thenn show canvas else show a div with a button to enter fullscreen */}
            <>

                <KeyboardControls map={map}>
                    <Suspense fallback={<Loading />}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                            <Canvas style={{ height: isAnimating.current ? '80vh' : '100vh', width: '100vw' }}
                                dpr={window.devicePixelRatio * dpr / 100}
                            >
                                {/* <WebGPUCanvas forceWebGL={true} style={{ height: '100vh', width: '100vw' }}   dpr={window.devicePixelRatio * dpr / 100}> */}

                                {/* <OrbitControls  enableZoom={false} enablePan={false}       /> */}
                                {/* {!showButton && <FirstPersonControls />} */}
                                {/* <FirstPersonControls /> */}
                                {/* <Environment files="/sp.hdr" background={true} /> */}
                                <Experience />
                                <Preload all />
                                {/* </WebGPUCanvas> */}
                            </Canvas>
                        </div>
                    </Suspense>
                    {/* <Loader /> */}
                </KeyboardControls>
            </>

            <CharacterAudio />

        </>
    )
}

export default MobileApp



