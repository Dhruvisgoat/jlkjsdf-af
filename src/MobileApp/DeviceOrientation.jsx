import React from 'react'
import { useState, useContext, useRef,useEffect } from 'react'
import { RefContext } from '../context/context';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

function DeviceOrientation() {

    let { isDeviceView, setIsDeviceView, setIsPersonView, isPersonView } = useContext(RefContext);

    const viewButton = useRef();

    const audioRef = useRef();
    useEffect(() => {
        audioRef.current = new Audio('/audio/button.mp3');
    }, []);

    const ToggleView = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
        setIsDeviceView(!isDeviceView)
        viewButton.current.blur();
    }
    

    const buttonStyle = {
        position: 'absolute',
        top: '65%',
        zIndex: '2',
        background: 'white',
        opacity: '0.8',
        color: 'black',
        border: 'none',
        borderRadius: '10%',
        border: 'none',
        cursor: 'pointer',
        userSelect: 'none', // Prevent text selection
        outline: 'none', // Prevent the default blue outline on button press
        WebkitTapHighlightColor: 'transparent', // Prevent the tap highlight color on WebKit browsers
    };


    return (
        <>

            <div 
            
            >
                <button onTouchStart={ToggleView} 
                 style={{
                    margin: '1%',
                    border: 'none',
                    position: 'absolute',
                    right: '0vh',
                    top: '30vh',
                    zIndex: '2',
                    // backgroundColor:'transparent',
                    // height: '30px',
                    // backgroundColor:'white',
                    opacity:'0.8',
                    // set blur effect
                    // backdropFilter: 'blur(6px)',
                    backgroundColor: 'white',
                    width:'18vh'

                }}
                ref={viewButton} >
                    {isDeviceView ? "GYRO" : "TOUCH"}
                </button>
            </div>

        </>

    )
}

export default DeviceOrientation