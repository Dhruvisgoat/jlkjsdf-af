import React, { useContext,useRef ,useEffect} from 'react';
import { IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { RefContext } from '../../context/context';


const SettingsIconComponent = () => {
    const { showSettings, setShowSettings } = useContext(RefContext);
    const settingButtonRef=useRef();
    const audioRef = useRef();
    useEffect(() => {
        audioRef.current = new Audio('/audio/button.mp3');
    }, []);

    const toggleSettings = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
        setShowSettings(prevState => !prevState);
        settingButtonRef.current.blur();

    };

    return (
        <div>
            <button
                ref={settingButtonRef}
                onClick={toggleSettings}
                style={{
                    margin: '1%',
                    border: 'none',
                    position: 'absolute',
                    right: '0vh',
                    bottom: '0vh',
                    zIndex: '2',
                    // backgroundColor:'transparent',
                    // height: '30px',
                    // backgroundColor:'white',
                    // opacity:'0.8'
                    // set blur effect
                    opacity:'0.8',
                    // set blur effect
                    // backdropFilter: 'blur(6px)',
                    backgroundColor: 'white',

                }}
            >
                {/* <IconButton onClick={toggleSettings} > */}
                <SettingsIcon />
            </button>
            {/* </IconButton> */}
        </div>
    );
};

export default SettingsIconComponent;
