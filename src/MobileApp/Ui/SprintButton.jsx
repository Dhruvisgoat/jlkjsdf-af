import React from 'react';
import { useContext } from 'react';
import { RefContext } from '../../context/context';

import { HeightfieldCollider } from '@react-three/rapier';
import { useState } from 'react';

function SprintButton({top,right,color}) {
    const {  setIsSprinting } = useContext(RefContext);
    const [isTouching, setIsTouching] = useState(false);

    const handleTouchStart = () => {
        setIsSprinting(true);
        setIsTouching(true);
        console.log('sprinting')
    };

    const handleTouchEnd = () => {
        setIsSprinting(false);
        setIsTouching(false);
        console.log('not sprinting')
    };

    const handleTouchMove = () => {
        setIsSprinting(true);
        console.log('sprinting');
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

            <button onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} style={buttonStyle}>
                ⚡️
            </button>

    );
}

export default SprintButton;
