import React, { useContext, useEffect, useState } from 'react';
import { RefContext } from '../context/context';
import IceCream from './Content-For-Experiences/Town1/IceCream';
import Bank from './Content-For-Experiences/Town1/Bank';
import Beer from './Content-For-Experiences/Town1/Beer';
import School from './Content-For-Experiences/Town1/School';
import PetrolPump from './Content-For-Experiences/Town1/PetrolPump';

function DistanceBasedUi() {
    const { getDistanceRef, playerRef } = useContext(RefContext);

    const [distance, setDistance] = useState({});

    const x = parseInt(playerRef.current?.translation().x);
    const y = parseInt(playerRef.current?.translation().y);
    const z = parseInt(playerRef.current?.translation().z);

    // note the player rotation upto 2 digits of decimal
    const playerRotationY = playerRef.current?.rotation().y.toFixed(2);

    const calculateDistance = (playerRef, x1, y1, z1) => {
        const X = playerRef.current?.translation().x - x1;
        const Y = playerRef.current?.translation().y - y1;
        const Z = playerRef.current?.translation().z - z1;

        return Math.sqrt(X * X + Y * Y + Z * Z);
    }

    const settingDistance = (key, ref) => {
        setDistance(prevState => ({
            ...prevState,
            [key]: ref
        }));
    };

    const getDistance = (key) => {
        return distance[key];
    };

    useEffect(() => {
        const updateDistance = () => {
            const distanceValue = getDistanceRef("coffeeShop");
            settingDistance("coffeeShop", distanceValue);
        };

        const interval = setInterval(updateDistance, 100); // Update every 100 milliseconds or adjust as needed
        return () => clearInterval(interval);
    }, [getDistanceRef]);

    const distanceInRange = calculateDistance(playerRef, 55, 1, -7) >= 0 && calculateDistance(playerRef, 55, 1, -7) <= 6;


    const styleDiv = {
        backgroundColor: 'white',
        opacity: '0.9',
        zIndex: '5',
        position: 'absolute',
        top: '0%',
        left: '0%',
        color: 'black',
        padding: '1.5%',
        borderRadius: '2vw',
        maxWidth: '40vw',
        maxHeight: '50vh',
        overflow: 'auto',
    }

    return (
        <>
            {/* <p style={{
                opacity: '0.8',
                zIndex: '5',
                position: 'absolute',
                top: '90%',
                left: '80%',
                // transform: 'translate(-50%, -50%)',
                backgroundColor: 'white',
                opacity: '0.8'
            }}>({x}, {y}, {z}), {playerRotationY}</p> */}

            <IceCream styleDiv={styleDiv} distanceInRange={calculateDistance(playerRef, 55, 1, -7) >= 0 && calculateDistance(playerRef, 55, 1, -7) <= 6} />
            {/* <IceCream  distanceInRange={calculateDistance(playerRef, 55, 1, -7) >= 0 && calculateDistance(playerRef, 55, 1, -7) <= 6}/> */}
            <Bank styleDiv={styleDiv} distanceInRange={calculateDistance(playerRef, 25, 2, 35) >= 0 && calculateDistance(playerRef, 25, 2, 35) <= 15} />
            <Beer styleDiv={styleDiv} distanceInRange={calculateDistance(playerRef, 1, 1, -6) >= 0 && calculateDistance(playerRef, 1, 1, -6) <= 10} />
            <School styleDiv={styleDiv} distanceInRange={calculateDistance(playerRef, 53, 1, 17) >= 0 && calculateDistance(playerRef, 53, 1, 17) <= 10} />
            <PetrolPump styleDiv={styleDiv} distanceInRange={calculateDistance(playerRef, 3, 1, -27) >= 0 && calculateDistance(playerRef, 3, 1, -27) <= 5} />
        </>
    );
}

export default DistanceBasedUi;