import React, { useState, useEffect, useContext } from 'react';
import { RefContext } from '../../context/context';


function RunButton({top,right,color}) {
    const { setIsRunning, isAnimating, isPressingAnimating } = useContext(RefContext);
    const [isTouching, setIsTouching] = useState(false);

    const handleTouchStart = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setIsRunning(true);
        setIsTouching(true);
    };

    const handleTouchEnd = () => {
        setIsRunning(false);
        setIsTouching(false);
    };

    const handleTouchMove = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsRunning(true);
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
        <>
            {!isPressingAnimating && ( // Render the button only if showButton is true
                <button 
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    style={buttonStyle}
                >
                    🏃🏻‍♂️
                </button>
            )}
        </>
    );
}

export default RunButton;
