import React from 'react'
import { GoZoomIn } from 'react-icons/go'
import TogglePersonView from './TogglePersonView'
import ToggleJoystick from './ToggleJoystick'
import DprSlider from '../Controls/DprSlider'
import SwitchCharacter from './Ui/SwitchCharacter'
import ToggleMute from './ToggleMute'
import {isMobile,isBrowser} from 'react-device-detect'
import TogglePointer from './Ui/TogglePointer'

function Settings() {

    const settingStyle = {
        position: 'absolute',
        top: '50%',
        zIndex: '1000',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70vw',
        height: '70vh',
        borderRadius: '10px',// Optional: Add border radius for rounded corners
        backdropFilter: 'blur(10px)',
        // opacity:'0.9',
        padding:'20px',
        backgroundColor:'transparent',
        scrollBehavior:'smooth',
        overflowY:'scroll',
        border:'10px solid black'
    }

    return (
        <div style={settingStyle}>
            <>
                {/* <h1 style={{textAlign:'center',color:'black'}}>SETTINGS</h1> */}
                <TogglePersonView />
                {isMobile &&<ToggleJoystick/>}
                <DprSlider/>
                <SwitchCharacter/>
                <ToggleMute/>
                {isBrowser &&  <TogglePointer/> }
            </>
        </div>
    )
}

export default Settings