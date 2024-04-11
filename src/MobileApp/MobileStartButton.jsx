import React, { useContext, useState, useEffect, useRef } from 'react';
import { RefContext } from '../context/context';
import FullscreenButton from '../Controls/FullscreenButton';
import Tickers from './Ui/Tickers';
import ReactNipple from 'react-nipple';
import JumpButton from './Ui/JumpButton';
import SprintButton from './Ui/SprintButton';
import TogglePersonView from './TogglePersonView';
import DeviceOrientation from './DeviceOrientation';
import RunButton from './Ui/RunButton';
import AudioControls from '../Controls/AudioControls';
import DprSlider from '../Controls/DprSlider';
import DistanceBasedUi from '../Controls/DistanceBasedUi';
import RandomAnimation from './Ui/RandomAnimation'
import JoystickButton from './Ui/JoystickButton';
import ToggleJoystick from './ToggleJoystick';
import Settings from './Settings';
import SettingsIconComponent from './Ui/SettingsIcon';
import { isMobile } from 'react-device-detect';


function MobileStartButton() {
    const { showButton, setIsShowButton, isPersonView, isPressingAnimating } = useContext(RefContext);

    // const [isFullscreen, setIsFullscreen] = useState(false);
    const { isFullscreen, setIsFullscreen } = useContext(RefContext);

    const audioRef = useRef();

    const screen = window.screen;

    // useEffect(() => {
    //     if (!isFullscreen) {
    //         alert("The screen is not in fullscreen mode!");
    //     }
    // }, [isFullscreen]);

    useEffect(() => {
        audioRef.current = new Audio('/audio/interface.mp3');

        const lockScreenOrientation = () => {
            // Lock the screen orientation to landscape
            if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                // Apply CSS to force landscape orientation on iOS devices
                document.documentElement.style.setProperty('orientation', 'landscape');
            } else if (screen.orientation && screen.orientation.lock) {
                // For other devices supporting screen.orientation.lock()
                screen.orientation.lock('landscape').catch(error => {
                    console.error('Error locking screen orientation:', error);
                });
            }
        };

        const handleFullscreenChange = () => {
            if (document.fullscreenElement) {
                setIsFullscreen(true);
                lockScreenOrientation();
            } else {
                setIsFullscreen(false);
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    const handleButtonClick = () => {
        setIsShowButton(false);
        if (audioRef.current) {
            audioRef.current.play();
        }

        const element = document.documentElement;

        // if (document.fullscreenElement) {
        //     setIsFullscreen(false);
        //     document.exitFullscreen();
        // } else {
        //     setIsFullscreen(true);
        //     element.requestFullscreen();
        // }
        if (element.requestFullscreen) {
            // Standard fullscreen API
            if (document.fullscreenElement) {
                setIsFullscreen(false);
                document.exitFullscreen();
            } else {
                setIsFullscreen(true);
                element.requestFullscreen();
            }
        }
        else if (element.webkitRequestFullscreen) {
            // Safari on iOS
            if (document.webkitFullscreenElement) {
                setIsFullscreen(false);
                document.webkitExitFullscreen();
            } else {
                setIsFullscreen(true);
                element.webkitRequestFullscreen();
            }
        }

    };

    const centeredStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'black',
        zIndex: '3',
    };

    const audioRef2 = useRef();
    useEffect(() => {
        audioRef2.current = new Audio('/audio/button.mp3');
    }, []);

    function callFullScreen() {

        if (audioRef2.current) {
            audioRef2.current.play();
        }

        const element = document.documentElement;

        if (element.requestFullscreen) {
            // Standard fullscreen API
            if (document.fullscreenElement) {
                setIsFullscreen(false);
                document.exitFullscreen();
            } else {
                setIsFullscreen(true);
                element.requestFullscreen();
            }
        }
        else if (element.webkitRequestFullscreen) {
            // Safari on iOS
            if (document.webkitFullscreenElement) {
                setIsFullscreen(false);
                document.webkitExitFullscreen();
            } else {
                setIsFullscreen(true);
                element.webkitRequestFullscreen();
            }
        }
    }

    const { setJoystickState, getJoystickState, isJoystickView, showSettings } = useContext(RefContext);

    const handleJoystickMove = (evt, data) => {
        setJoystickState(data);
    };

    return (
        <>
            {showButton && (
                <div style={centeredStyle}>
                    <button style={{ color: 'PINK', backgroundColor: 'transparent', fontSize: '3rem', border: 'none', fontFamily: 'Press Start 2P' }} onClick={handleButtonClick}>TOUCH TO START</button>
                </div>
            )}


            {isFullscreen ?
                <>
                    {!isPressingAnimating && (
                        <>
                            {!showButton && (
                                <>
                                    {/* {!isPersonView && <RunButton />} */}

                                    {isMobile && <>
                                        <SprintButton top={"65%"} right={"10vw"} color="blue" />
                                        <JumpButton top={"65%"} right={"25vw"} color="yellow" />
                                        <RandomAnimation top={"65%"} right={"65vw"} color="pink" />
                                        {isJoystickView ? <JoystickButton /> : <RunButton top={"65%"} right={"80vw"} color="green" />}
                                        {/* <TogglePersonView /> */}
                                        {isPersonView &&
                                            <DeviceOrientation />
                                        }
                                    </>}


                                    <DistanceBasedUi />
                                    {/* <AudioControls /> */}
                                    {/* <SwitchCharacter /> */}
                                    {/* <ToggleJoystick/> */}
                                    {showSettings &&
                                        <Settings />}


                                    <SettingsIconComponent />
                                    <FullscreenButton />
                                    {/* <Tickers /> */}
                                    {/* <DprSlider /> */}
                                    {/* <AudioControls /> */}

                                    {/* <TouchArea/> */}
                                    {/* Additional components to render after the button is clicked */}
                                </>
                            )}
                        </>
                    )}
                </>

                :
                <>
                    {!showButton && (
                        <>
                            <div
                                onClick={callFullScreen}
                                style={{ opacity: '0.85', textAlign: 'center', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', zIndex: '5' }}>
                                SWITCH BACK TO FULLSCREEN
                            </div>
                            <Tickers />

                        </>
                    )
                    }
                </>

            }
        </>
    );
};


export default MobileStartButton;






