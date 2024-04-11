import React from 'react'
import { useRef, useState, useEffect, useContext } from 'react'
import { RefContext } from '../context/context'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function PointerStandard({ playerRef }) {

    const cameraRef = useRef();
    const pressed = useRef({});
    const buttonDown = useRef(-1);
    const run = useRef(false);
    const cameraDirection = useRef(new THREE.Spherical(1, Math.PI / 180 * 70, 0));
    const mouse = useRef(new THREE.Vector2(0, 0));
    const lastMouse = useRef(new THREE.Vector2(0, 0));
    let { isPersonView, isWalking, setIsWalking, actions } = useContext(RefContext);

    console.log("isPersonView", isPersonView);

    // if isperson view then camera distance must be 0.1 else 3
    const cameraDis = isPersonView ? 0.1 : 1;

    const [cameraDistance, setCameraDistance] = useState(cameraDis);

    // const cameraDistance = useRef(isPersonView?0.1:5);
    const speed = 3.0;
    const turnSpeed = Math.PI / 2;
    const up = new THREE.Vector3(0, 1, 0);
    const playerHeadOffset = new THREE.Vector3(0, 0.5, 0);
    const playerHeadCameraOffset = new THREE.Vector3(0,-0.5,0);

    const _cameraPos = new THREE.Vector3(0, 0, 0);


    const _move = new THREE.Vector3(0, 0, -1);
    const _forward = new THREE.Vector3(0, 0, -1);
    const _right = new THREE.Vector3(1, 0, 0);
    const _rot = new THREE.Quaternion();
    const _headPos = new THREE.Vector3();
    const new_headPos =new THREE.Vector3();

    useEffect(() => {

        const handleKeyDown = (e) => {
            pressed.current = { ...pressed.current, [e.code]: true };
            run.current = e.shiftKey;
        };

        const handleKeyUp = (e) => {
            pressed.current = { ...pressed.current, [e.code]: false };
            run.current = e.shiftKey;
        };

        const handleMouseDown = (e) => {
            buttonDown.current = e.button;
            mouse.current = new THREE.Vector2(e.clientX, e.clientY);
            lastMouse.current = new THREE.Vector2(0, 0);
        };

        const handleMouseMove = (e) => {
            if (buttonDown.current >= 0) {
                const dx = (e.clientX - mouse.current.x) / (window.innerWidth / 2.0);
                const dy = (e.clientY - mouse.current.y) / (window.innerHeight / 2.0);

                if (buttonDown.current === 0) {
                    // Increase the scaling factor to get a faster rotation
                    const rotationSpeed = 4.0;
                    // console.log("lastMouse.current.x , dx, lastMouse.current.x - dx", lastMouse.current.x, dx, lastMouse.current.x - dx);
                    playerRef.current.setRotation((playerRef.current.rotation()).multiply(_rot.setFromAxisAngle(up, (lastMouse.current.x - dx) * rotationSpeed)));
                    // player should look at where the camera is looking 

                    const newPhi = cameraDirection.current.phi + (lastMouse.current.y - dy) * rotationSpeed;

                    // Ensure that phi remains within the range of -90 to 90 degrees
                    // cameraDirection.current.phi = THREE.MathUtils.clamp(newPhi, 0.1, Math.PI - 0.1);

                    // Clamp phi between 0.3 and Math.PI - 0.3 if in first person view and between 0.7 and Math.PI/2 if in third person view
                    
                    if (isPersonView)
                        cameraDirection.current.phi = THREE.MathUtils.clamp(newPhi, 0.3, Math.PI - 0.3);
                    else {
                        cameraDirection.current.phi = THREE.MathUtils.clamp(newPhi, 0.7, Math.PI / 2 );
                    }
                }
                lastMouse.current.set(dx, dy);
            }
        };

        const handleMouseUp = () => {
            buttonDown.current = -1;
        };

        const handleWheel = (e) => {
            e.preventDefault();
            //the maximum distance the camera can be from the player is 10 and the minimum is 2
            if (!isPersonView) {
                setCameraDistance((prev) => Math.max(4, Math.min(10, prev + Math.sign(e.deltaY) / 10)));
            }
        };

        if (isPersonView) {
            setCameraDistance(0.1);
        } else {
            setCameraDistance(4);
        }

        const handleContextMenu = (e) => {
            e.preventDefault();
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('wheel', handleWheel);
        window.addEventListener('contextmenu', handleContextMenu);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('contextmenu', handleContextMenu);
        };
    }, [isPersonView]);


    useFrame((state, deltaTime) => {


        // console.log(cameraDirection.current.phi);

        // increase the cameara distance increases beyond 1.7 then increase the camera distance dynamically based on increase in cameraDirection.current.phi
        // if(cameraDirection.current.phi>1.7)
        // {
        //     setCameraDistance(cameraDirection.current.phi *2);
        // }
        // else{
        //     setCameraDistance(5);
        // }
        _move.setScalar(0.0);

        // if both key a and key w are pressed then rotate the playerRef.current
        // if up arrow key (not w) is pressed then move the playerRef.current forward
        if ( (pressed.current['ArrowUp'] || pressed.current['KeyW']) && (pressed.current['KeyA'] || pressed.current['ArrowLeft']))
            playerRef.current.setRotation(playerRef.current.rotation().multiply(_rot.setFromAxisAngle(up, turnSpeed * deltaTime)));

        // if both key d and key w are pressed then rotate the playerRef.current
        if ((pressed.current['KeyD'] || pressed.current['ArrowRight']) && (pressed.current['ArrowUp'] || pressed.current['KeyW']))
            playerRef.current.setRotation(playerRef.current.rotation().multiply(_rot.setFromAxisAngle(up, -turnSpeed * deltaTime)));

        if ((pressed.current['KeyA'] || pressed.current['ArrowLeft']) && (pressed.current['ArrowDown'] || pressed.current['KeyS'])) 
            playerRef.current.setRotation(playerRef.current.rotation().multiply(_rot.setFromAxisAngle(up, turnSpeed * deltaTime)));

        if ((pressed.current['KeyD'] || pressed.current['ArrowRight']) && (pressed.current['ArrowDown'] || pressed.current['KeyS']))
            playerRef.current.setRotation(playerRef.current.rotation().multiply(_rot.setFromAxisAngle(up, -turnSpeed * deltaTime)));

        if(pressed.current['KeyQ'])
            playerRef.current.setRotation(playerRef.current.rotation().multiply(_rot.setFromAxisAngle(up, turnSpeed * deltaTime)));

        if (pressed.current['KeyE'])
            playerRef.current.setRotation(playerRef.current.rotation().multiply(_rot.setFromAxisAngle(up, -turnSpeed * deltaTime)));
        
        _forward.set(0, 0, -1).applyQuaternion(playerRef.current.rotation());
        _right.set(1, 0, 0).applyQuaternion(playerRef.current.rotation());

        // if (pressed.current['KeyW']) _move.add(_forward);
        // if (pressed.current['KeyS']) _move.sub(_forward);
        // if (pressed.current['KeyD']) _move.add(_right);
        // if (pressed.current['KeyA']) _move.sub(_right);

        // _move.multiplyScalar(deltaTime * (speed + (run.current ? 3.0 : 0)));

        // playerRef.current.translation().add(_move);

        // console.log("playerRef.current.translation()", playerRef.current.translation());

        _headPos.copy(playerRef.current.translation()).add(playerHeadOffset);
        new_headPos.copy(playerRef.current.translation()).add(playerHeadCameraOffset);

        _cameraPos.setFromSpherical(cameraDirection.current);
        _cameraPos.normalize().multiplyScalar(cameraDistance);
        _cameraPos.applyQuaternion(playerRef.current.rotation());
        _cameraPos.add(_headPos);
        // _cameraPos.add(new_headPos);

        
        state.camera.position.copy(_cameraPos);
        state.camera.lookAt(_headPos);
    });

    return null;
}

export default PointerStandard