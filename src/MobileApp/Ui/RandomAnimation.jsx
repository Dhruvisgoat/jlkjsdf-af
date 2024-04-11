import React from 'react';
import { useContext } from 'react';
import { RefContext } from '../../context/context';
import { HeightfieldCollider } from '@react-three/rapier';
import { useState } from 'react';
import { useFrame } from '@react-three/fiber';

function RandomAnimation({ top, right,color }){
    const [isTouching, setIsTouching] = useState(false);

    const buttonStyle = {
        position: 'absolute',
        top: top,
        right: right,
        zIndex: '1',
        width: '5rem', // Adjust the size as needed
        height: '5rem',
        borderRadius: '50%', // This makes it circular
        color: 'white',
        background: 'black',
        // Change the opacity to 1 when isTouching is true
        opacity: '0.8',
        fontSize: '2rem',
        border: 'none',
        cursor: 'pointer',
        userSelect: 'none', // Prevent text selection
        outline: 'none', // Prevent the default blue outline on button press
        WebkitTapHighlightColor: 'transparent', // Prevent the tap highlight color on WebKit browsers
    };

    // Dancing, Defeated, Dying, GrabAndSlam, Idle, Jumping, LeftStrafeWalking, RightStrafeWalking, Running, Victory, Walking, mixamo.com
    const { isAnimating, setIsAnimating, isPressingAnimating, setIsPressingAnimating, isPersonView } = useContext(RefContext);



    const handleTouchStart = (event) => {
        // Check if only one touch is detected
        if (event.touches.length === 1) {
            setIsPressingAnimating(true);
            setIsAnimating(true);
            setIsTouching(true);

            setTimeout(() => {
                setIsPressingAnimating(false);
                setIsAnimating(false);
                setIsTouching(false);
            }, 4000); // Set timeout for 5 seconds
        }
    };


    const handleTouchEnd = () => {
        setIsAnimating(false);
        // setIsPressingAnimating(false);
    };


    const handleTouchMove = () => {
        // setIsAnimating(true);
        // setIsPressingAnimating(true);
        // You can choose whether you want to set isTouching to true when moving
    };

    return (
        <>
            {!isPersonView &&
                <button onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} style={buttonStyle}>
                    💃🏼
                </button>
            }

        </>
    );
}

export default RandomAnimation;
