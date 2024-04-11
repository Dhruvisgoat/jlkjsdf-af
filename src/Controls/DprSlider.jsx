import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { RefContext } from './../context/context';

function valuetext(value) {
    console.log(value);
    return `${value}°C`;
}

function DprSlider() {
    const { dpr, setDpr } = useContext(RefContext);

    // Function to handle slider change
    const handleSliderChange = (event, newValue) => {
        // Update dpr with the current step value
        setDpr(newValue);
    };

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
        // style={{ position: 'absolute', right: '20%', top: '30%', zIndex: '2' }}
        >
            DEVICE PIXEL RATIO :
            <Box sx={{ width: '30%' }}>
                <Slider
                    aria-label="Temperature"
                    defaultValue={dpr}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    step={10}
                    marks
                    min={10}
                    max={100}
                    onChange={handleSliderChange} // Call handleSliderChange on slider change
                    sx={{ color: 'grey', margin: '10%' }}
                />
            </Box>
        </div>

    );
}

export default DprSlider;
