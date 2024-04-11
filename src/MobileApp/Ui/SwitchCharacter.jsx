import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { RefContext } from '../../context/context';
import FormHelperText from '@mui/material/FormHelperText';

export default function SwitchCharacter() {
    const [Character, setCharacter] = React.useState('');
    const { switchCharacter, setSwitchCharacter, isPersonView } = React.useContext(RefContext);

    const handleChange = (event) => {
        setSwitchCharacter(event.target.value);
    };

    return (
        <

            // style={{ position: 'absolute', top: 0, right: "30%", padding: '10px', zIndex: '5', opacity: '0.8' }}
            >

            {!isPersonView &&
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
            }} 
                >
                    CHOOSE CHARACTER:
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl style={{ backgroundColor: 'white' }} sx={{ m: 1, minWidth: 120 }}>
                            <Select
                                value={switchCharacter}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                {/* <MenuItem value="">
                            <em>{switchCharacter}</em>
                        </MenuItem> */}
                                <MenuItem value={'Girl'}>Girl</MenuItem>
                                <MenuItem value={'Ninja'}>Ninja</MenuItem>
                            </Select>
                        </FormControl>

                        {/* <FormControl fullWidth>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={Character}
                        label="Character"
                        onChange={handleChange}
                    >
                        <MenuItem value={'Girl'}>Girl</MenuItem>
                        <MenuItem value={'Ninja'}>Ninja</MenuItem>
                    </Select>
                </FormControl> */}
                    </Box>
                </div>
            }
        </>
    );
}