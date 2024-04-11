import React from 'react'
import { useState, useContext, useRef } from 'react'
import { RefContext } from '../context/context';

function ToggleMute() {

    let { isPersonView, setIsPersonView, setIsDeviceView } = useContext(RefContext);

    const viewButton = useRef();

    const ToggleView = () => {
        setIsPersonView(!isPersonView)
        if (isPersonView) {
            setIsDeviceView(false);
        }
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
        cursor: 'pointer',
        userSelect: 'none', // Prevent text selection
        outline: 'none', // Prevent the default blue outline on button press
        WebkitTapHighlightColor: 'transparent', // Prevent the tap highlight color on WebKit browsers
    };


    return (
        <div
        style={{  padding:'1%',
        backgroundColor:'white',
        color:'black',
        border:'none',
        cursor:'pointer',
        userSelect:'none',
        outline:'none',
        WebkitTapHighlightColor:'transparent',
        textAlign:'center',
        margin:'1%',
        display: 'flex',
        backgroundColor: 'white',
        alignItems: 'center', // Center items vertically
        justifyContent: 'center', // Center items horizontally
    }}        //  style={{ zIndex: 2, position: "absolute", top: "3rem",right:'10%' }}
        >
            CHANGE CAMERA VIEW : 
            <button onClick={ToggleView} ref={viewButton} style={{display:'inline',backgroundColor:'grey',color:'white',border:'none',cursor:'pointer',userSelect:'none',outline:'none',WebkitTapHighlightColor:'transparent',margin:'1%'}}
            // style={buttonStyle}
            >
                {isPersonView ? "FIRST PERSON" : "THIRD PERSON"}
            </button>
        </div>
    )
}

export default ToggleMute