import React from 'react'
import { useState, useContext, useRef } from 'react'
import { RefContext } from '../../context/context';
import { GiMouse } from "react-icons/gi";
import { TbPointerOff } from "react-icons/tb";
import { TbPointer } from "react-icons/tb";


function TogglePointer() {

    let { isStandardPointer, setIsStandardPointer } = useContext(RefContext);

    const viewButton = useRef()

    const ToggleView = () => {
        setIsStandardPointer(!isStandardPointer)
        viewButton.current.blur();

        //request pointer lock

        // if(isStandardPointer)
        //     window.alert("Click on screen to lock pointer,and press esc to unlock pointer");

    }

    return (
        <div 
        style={{
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
        }}
        >
            POINTER :
            <button onClick={ToggleView} ref={viewButton} 
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
                {isStandardPointer ?
                    "STANDARD"
                    :
                    "LOCK"
                }
            </button>
        </div>
    )
}

export default TogglePointer