import React, { useRef, useEffect, useState } from 'react';
import { GoScreenFull, GoScreenNormal } from "react-icons/go";
import { isMobile } from 'react-device-detect';
import { RefContext } from '../context/context';
import { useContext } from 'react';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import IconButton from '@mui/material/IconButton';

const FullscreenButton = () => {

    const audioRef = useRef();
    useEffect(() => {
        audioRef.current = new Audio('/audio/button.mp3');
    }, []);

    // if (audioRef.current) {
    //     audioRef.current.play();
    // }






    const fullscreenButtonRef = useRef();
    const { isFullscreen, setIsFullscreen } = useContext(RefContext);

    // Function to toggle fullscreen mode
    const toggleFullscreen = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
        const element = document.documentElement;

        if (element.requestFullscreen) {
            // Standard fullscreen API
            if (document.fullscreenElement) {
                setIsFullscreen(false);
                document.exitFullscreen();
            } else {
                setIsFullscreen(true);
                element.requestFullscreen().catch((err) => {
                    console.error('Error attempting to enable fullscreen:', err.message);
                });
            }
        } else if (element.webkitRequestFullscreen) {
            // Safari on iOS
            if (document.webkitFullscreenElement) {
                setIsFullscreen(false);
                document.webkitExitFullscreen();
            } else {
                setIsFullscreen(true);
                element.webkitRequestFullscreen();
            }
        }
        // Remove focus from the button after it's pressed
        fullscreenButtonRef.current.blur();
    };

    // Add event listener for fullscreen change
    useEffect(() => {

        const handleFullscreenChange = () => {
            // Update the state based on fullscreen change
            setIsFullscreen(document.fullscreenElement !== null);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    // useEffect(() => {
    //     if (isMobile && !isFullscreen) {
    //         alert("The screen is not in fullscreen mode!");
    //     }
    // }, [isFullscreen]);



    return (
        <div>
            <button
                ref={fullscreenButtonRef}
                onClick={toggleFullscreen}
                style={{
                    margin: '1%',
                    border: 'none',
                    position: 'absolute',
                    right: '0vh',
                    top: '0vh',
                    zIndex: '2',
                    // backgroundColor:'transparent',
                    // height: '30px',
                    // backgroundColor:'white',
                    opacity:'0.8',
                    // set blur effect
                    // backdropFilter: 'blur(6px)',
                    backgroundColor: 'white',
                }}
            >
                    {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </button>
        </div>
    );
};

export default FullscreenButton;
