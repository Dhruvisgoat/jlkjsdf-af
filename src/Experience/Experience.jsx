import React from 'react'
import { Sky, PointerLockControls, OrbitControls, DeviceOrientationControls } from "@react-three/drei"
import { Physics, Debug } from "@react-three/rapier"
import { Ground } from "./SceneObjects/Ground"
import { Player } from "../MobileApp/Player"
import MobilePlayer from '../MobileApp/MobilePlayer'
import { isBrowser, isMobile } from 'react-device-detect';
import AnimateAudio from '../Controls/AnimateAudio'
import { Garden } from './SceneObjects/Garden'
import { Perf } from 'r3f-perf'
import PositionalSound from '../Controls/PositionalSound'
import { Suspense } from 'react'
import { useContext, useEffect } from 'react'
import { RefContext } from '../context/context'
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import Town1 from '../Experience/Town1/Town1'
import { RigidBody } from '@react-three/rapier'
import { TorusKnot } from '@react-three/drei'
import { SpotLight } from '@react-three/drei'
import { Stars } from '@react-three/drei'
import { Town2 } from './Town2/Town2'


const Experience = React.memo(() => {

    const { showButton, isMuted, setIsMuted ,showSettings} = useContext(RefContext);

    useEffect(() => {

        const handleFocus = () => {
                setIsMuted(false)
        };
        const handleBlur = () => setIsMuted(true);

        window.addEventListener('focus', handleFocus);
        window.addEventListener('blur', handleBlur);

        return () => {
            window.removeEventListener('focus', handleFocus);
            window.removeEventListener('blur', handleBlur);
        };
    }, [isMuted]);

    console.log("RERENDING")
    // const texture = useVideoTexture("https://www.w3schools.com/html/mov_bbb.mp4")

    return (
        <>
            {/* <perspectiveCamera makeDefault fov={75} aspect={window.innerWidth / window.innerHeight} far={15} /> */}
            {/* conditionally render first person controls if showButton is false  */}
            {/* {!showButton && <FirstPersonControls />} */}
            {/* <FirstPersonControls /> */}
            {/* <PointerLockControls /> */}

            {/* <Sky sunPosition={[-100, 100, -100]} /> */}

            {/* <meshBasicMaterial map={texture} toneMapped={false} /> */}
            {/* <perspectiveCamera makeDefault fov={75} aspect={window.innerWidth / window.innerHeight} far={15} /> */}

            <Stars radius={500} depth={1} count={5000} factor={20} saturation={0} fade speed={1} />
            <ambientLight intensity={1} />

            {/* attach pink background  */}
            {/* <color attach="background" args={['#59D0FF']} /> */}
            <color attach="background" args={['black']} />
            {/* <color attach="background" args={['#243363']} /> */}
            {/* <fog attach="fog" args={["#59D0FF", 10, 100]} /> */}

            <pointLight castShadow intensity={1} position={[100, 100, 100]} color={'purple'} />

            {/* add a cube mesh  */}
            {showSettings && <Perf position="top-left" minimal={true}/>}
            {/* <Perf position="top-left" /> */}

            <Physics gravity={[0, -9.8, 0]}>
                {/* <Debug />  */}
                <Ground />
                {isBrowser &&
                    <Player />
                }
                {isMobile &&
                    <MobilePlayer />
                }

                {/* <Cube position={[0, 0.5, -10]} /> */}


                {/* <Cubes /> */}
                {/* <House position={[10, 3.7, 30]} /> */}
                {/* <Instances >
                    <Solar_panel position={[10,0,-10]} />
                    <Solar_panel position={[-10,0,10]} />
                    <Solar_panel position={[-10,0,-10]}/>
                    <Solar_panel position={[10,0,10]}/>
                </Instances> */}

                {/* <SolarPanelInstances/> */}

                {/* <CoffeShop /> */}
                {/* <Tv /> */}
                {/* <Model/> */}

                {/* <JapaneseBus position={[0, 0, 10]} /> */}
                {/* <Scene  position={[0, 0, 100]} /> */}
                {/* <Garden position={[10, -5, 0]} /> */}
                {/* <Town1 /> */}
                <Town2/>
                {/* <Low_poly_forest position={[-200, 4.5, -50]} /> */}
                {/* <Industry position={[250, 0.05, 0]} scale={[0.6,0.6,0.6]}/> */}
            </Physics>

            {/* <Instances>
                {new Array(100).fill().map((_, i) => (
                    <Tree
                        key={i}
                        position={[Math.random() * 100 - 50, 0, Math.random() * 100 - 50]}
                        scale={0.5}
                    />
                ))}
                
            </Instances> */}

            {/* <Hut position={[0, 0, 4]} /> */}
            {/* <GameMap position={[10,0,10]} scale={[0.001,0.001,0.001]}/> */}
            <AnimateAudio />

            <Suspense fallback={null}>
                {!showButton &&
                    <>
                        <mesh position={[25, 2, 35]} >
                            <PositionalSound distance={15} url="/audio/bank.mp3" isMuted={isMuted} />
                        </mesh>
                        <mesh position={[55, 1, -7]} >
                            <PositionalSound distance={15} url="/audio/ice-cream.mp3" isMuted={isMuted} />
                        </mesh>
                        <mesh position={[53, 1, 16]} >
                            <PositionalSound distance={15} url="/audio/school.mp3" isMuted={isMuted} />
                        </mesh>
                        <mesh position={[1, 1, -6]} >
                            <PositionalSound distance={15} url="/audio/beer.mp3" isMuted={isMuted} />
                        </mesh>
                        <mesh position={[3, 1, -27]} >
                            <PositionalSound distance={15} url="/audio/petrol.mp3" isMuted={isMuted} />
                        </mesh>
                        <mesh position={[27, 2, 2]} >
                            <PositionalSound distance={15} url="/audio/birds.mp3" isMuted={isMuted} />
                        </mesh>
                        <mesh position={[22, 1, -28]} >
                            <PositionalSound distance={15} url="/audio/shopping.mp3" isMuted={isMuted} />
                        </mesh>
                        <mesh position={[57, 1.7, -8.5]} >
                            <PositionalSound url="/audio/dog.mp3" distance={10} isMuted={isMuted} />
                        </mesh>
                        <mesh position={[-10, 1, 0]} >
                            <PositionalSound url="/audio/disco.mp3" distance={15} isMuted={isMuted} />
                        </mesh>
                    </>
                }
            </Suspense>

            {/* 25,1,-28 */}

            {/* <EffectComposer>
                <Bloom luminanceThreshold={0.5} luminanceSmoothing={9} height={300} />
                <Noise opacity={0.01} />s
                <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer> */}
        </>
    )
}
)

export default Experience