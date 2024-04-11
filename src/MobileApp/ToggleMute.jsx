import React, { useState, useContext, useRef, useEffect } from 'react';
import { RefContext } from '../context/context';
import { getMouse, getKeyboard, getBrowser } from '@manapotion/r3f' 

function ToggleMute() {

    const { isMuted, setIsMuted } = useContext(RefContext);

    const viewButton = useRef();

    const toggleView = () => {
        setIsMuted(!isMuted);
        viewButton.current.blur();
    };

    return (
        <div style={{
            padding: '1%',
            backgroundColor: 'white',
            color: 'black',
            border: 'none',
            cursor: 'pointer',
            userSelect: 'none',
            outline: 'none',
            WebkitTapHighlightColor: 'transparent',
            textAlign: 'center',
            margin: '1%',
            display: 'flex',
            backgroundColor: 'white',
            alignItems: 'center', // Center items vertically
            justifyContent: 'center', // Center items horizontally
        }}>
            3D AUDIO  : 
            <button
                onClick={toggleView}
                ref={viewButton}
                style={{
                    display: 'inline',
                    backgroundColor: 'grey',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    userSelect: 'none',
                    outline: 'none',
                    WebkitTapHighlightColor: 'transparent',
                    margin: '1%'
                }}
            >
                {isMuted ? "ON" : "OFF"}
            </button>
        </div>
    );
}

export default ToggleMute;

