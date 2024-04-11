import React, { useState, useEffect, useRef } from 'react';
import { useContext } from 'react';
import { RefContext } from '../../context/context';
import { HeightfieldCollider } from '@react-three/rapier';

function JumpButton({top,right,color}) {
    const { isJumping, setIsJumping, actionsRef } = useContext(RefContext);
    const [isTouching, setIsTouching] = useState(false);

    const audioRef = useRef();
    useEffect(() => {
        audioRef.current = new Audio('/audio/jumpAudio.mp3');
    }, []);

    // if (audioRef.current) {
    //     audioRef.current.play();
    // }



    const handleTouchStart = (e) => {
        // if (audioRef.current) {
        //     audioRef.current.play();
        // }
        e.stopPropagation();
        e.preventDefault();

        // if (navigator.vibrate) {
        //     navigator.vibrate(50); // Vibrate for 100 milliseconds
        // }

        setIsJumping(true);
        setIsTouching(true);
    };

    const handleTouchEnd = (e) => {
        e.stopPropagation();
        e.preventDefault();

        setIsJumping(false);
        setIsTouching(false);
    };

    const handleTouchMove = (e) => {
        e.stopPropagation();
        e.preventDefault();

        setIsJumping(true);
        // You can choose whether you want to set isTouching to true when moving
    };

    const buttonStyle = {
        position: 'absolute',
        top: top,
        right: right,
        zIndex: '3',
        width: '5rem', // Adjust the size as needed
        height: '5rem',
        borderRadius: '50%', // This makes it circular
        background: isTouching ? color : 'black',
        // Change the opacity to 1 when isTouching is true
        opacity: isTouching ? '1' : '0.8',
        color: 'white',
        fontSize: '2rem',
        border: 'none',
        cursor: 'pointer',
        userSelect: 'none', // Prevent text selection
        outline: 'none', // Prevent the default blue outline on button press
        WebkitTapHighlightColor: 'transparent', // Prevent the tap highlight color on WebKit browsers
};

    return (
        <button
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={buttonStyle}
        >
            🦘
        </button>
    );
}

export default JumpButton;





