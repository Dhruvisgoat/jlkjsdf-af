import React, { useContext, useRef, useState } from 'react';
import ReactNipple from 'react-nipple';
import { RefContext } from '../../context/context';

function JoystickButton() {
    const { setJoystickState } = useContext(RefContext);
    const joystickRef = useRef(null);

    const [isTouching, setIsTouching] = useState(false);

    const handleJoystickMove = (evt, data) => {
        setJoystickState(data);
        setIsTouching(true);
    };

    const handleTouchEnd = () => {
        // Trigger the end event manually when a touch ends
        setJoystickState(null);
        setIsTouching(false);
    };

    return (
        <ReactNipple
            ref={joystickRef}
            
            options={{
                mode: 'static',
                position: { top: '70%', right: '85%' },
                multitouch: true // Enable multi-touch
            }}
            onMove={handleJoystickMove}
            onEnd={handleTouchEnd}
        />
    );
}

export default JoystickButton;


