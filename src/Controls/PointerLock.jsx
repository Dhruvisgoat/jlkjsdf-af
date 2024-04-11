import React from 'react'
import { useRef, useState, useEffect, useContext } from 'react'
import { RefContext } from '../context/context'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'

function PointerLock({ playerRef }) {

    const cameraRef = useRef();
    const pressed = useRef({});
    const buttonDown = useRef(-1);
    const run = useRef(false);
    const cameraDirection = useRef(new THREE.Spherical(1, Math.PI / 180 * 70, 0));
    const mouse = useRef(new THREE.Vector2(0, 0));
    const lastMouse = useRef(new THREE.Vector2(0, 0));
    let { isPersonView, isWalking, setIsWalking } = useContext(RefContext);
    console.log("isPersonView", isPersonView);

    // if isperson view then camera distance must be 0.1 else 3
    const cameraDis = isPersonView ? 0.1 : 1;
    // console.log(cameraDis);

    const [cameraDistance, setCameraDistance] = useState(cameraDis);

    // const cameraDistance = useRef(isPersonView?0.1:5);
    const speed = 3.0;
    const turnSpeed = Math.PI / 2;
    const up = new THREE.Vector3(0, 1, 0);
    const playerHeadOffset = new THREE.Vector3(0, 0.5, 0);

    const _cameraPos = new THREE.Vector3(0, 0, 0);
    const _move = new THREE.Vector3(0, 0, -1);
    const _forward = new THREE.Vector3(0, 0, -1);
    const _right = new THREE.Vector3(1, 0, 0);
    const _rot = new THREE.Quaternion();
    const _headPos = new THREE.Vector3();

    const { gl } = useThree();

    useEffect(() => {

        // gl.domElement?.requestPointerLock();w

        const handleKeyDown = (e) => {
            pressed.current = { ...pressed.current, [e.code]: true };
            run.current = e.shiftKey;
        };

        const handleKeyUp = (e) => {
            pressed.current = { ...pressed.current, [e.code]: false };
            run.current = e.shiftKey;
        };

        const handlePointerLockChange = () => {
            if (document.pointerLockElement === gl.domElement) {
                // Pointer is locked, add event listeners for mouse movement
                document.addEventListener('mousemove', handleLockedMouseMove);

            } else {
                // Pointer is unlocked, remove event listeners for mouse movement
                document.removeEventListener('mousemove', handleLockedMouseMove);
            }
        };

        const handleLockedMouseMove = (e) => {
            const movementX = e.movementX;
            const movementY = e.movementY;

            const dx = (e.clientX - mouse.current.x) / (window.innerWidth / 2.0);
            const dy = (e.clientY - mouse.current.y) / (window.innerHeight / 2.0);

            // Your existing camera movement logic here based on movementX and movementY
            const rotationSpeed = 0.002; // Adjust sensitivity as needed
            cameraDirection.current.phi -= movementY * rotationSpeed;
            // cameraDirection.current.theta -= movementX * rotationSpeed;

            const newPhi = cameraDirection.current.phi + dy * rotationSpeed;


            // rotate the player such that it always faces the direction of the camera

            playerRef.current.setRotation(playerRef.current.rotation().multiply(_rot.setFromAxisAngle(up, - movementX * rotationSpeed)));
            // Clamp phi to avoid gimbal lock
            if (isPersonView)
                cameraDirection.current.phi = THREE.MathUtils.clamp(newPhi, 0.3, Math.PI - 0.3);
            else
                cameraDirection.current.phi = THREE.MathUtils.clamp(newPhi, 0.7, Math.PI / 2 );

            lastMouse.current.set(dx, dy);

        };

        const handleCanvasClick = (e) => {
            // Check if the left mouse button was pressed
            if (e.button === 2) {
                // Check if the pointer is currently locked
                if (document.pointerLockElement === gl.domElement) {
                    // Pointer is locked, release the lock
                    document.exitPointerLock();
                }
            }
            else {
                // Pointer is not locked, request the lock
                mouse.current = new THREE.Vector2(e.clientX, e.clientY);
                lastMouse.current = new THREE.Vector2(0, 0);
                gl.domElement?.requestPointerLock();
            }
        };

        const handleContextMenu = (e) => {
            e.preventDefault();
        };

        const handleWheel = (e) => {
            //the maximum distance the camera can be from the player is 10 and the minimum is 2
            if (!isPersonView) {
                setCameraDistance((prev) => Math.max(2, Math.min(10, prev + Math.sign(e.deltaY) / 10)));
            }
        };


        if (isPersonView) {
            setCameraDistance(0.1);
        } else {
            setCameraDistance(4);
        }

        gl.domElement.addEventListener('click', handleCanvasClick);
        gl.domElement.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('pointerlockchange', handlePointerLockChange);
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('wheel', handleWheel);


        return () => {
            gl.domElement.removeEventListener('click', handleCanvasClick);
            gl.domElement.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('pointerlockchange', handlePointerLockChange);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('wheel', handleWheel);
        };
    }, [gl, isPersonView]);


    useFrame((state, deltaTime) => {

        _move.setScalar(0.0);

        if ((pressed.current['KeyA'] || pressed.current['ArrowLeft']) && (pressed.current['ArrowUp'] || pressed.current['KeyW']))
            playerRef.current.setRotation(playerRef.current.rotation().multiply(_rot.setFromAxisAngle(up, turnSpeed * deltaTime)));

        // if both key d and key w are pressed then rotate the playerRef.current
        if ((pressed.current['KeyD'] || pressed.current['ArrowRight']) && (pressed.current['ArrowUp'] || pressed.current['KeyW']))
            playerRef.current.setRotation(playerRef.current.rotation().multiply(_rot.setFromAxisAngle(up, -turnSpeed * deltaTime)));

        if ((pressed.current['KeyA'] || pressed.current['ArrowLeft']) && (pressed.current['ArrowDown'] || pressed.current['KeyS']))
            playerRef.current.setRotation(playerRef.current.rotation().multiply(_rot.setFromAxisAngle(up, turnSpeed * deltaTime)));

        if ((pressed.current['KeyD'] || pressed.current['ArrowRight']) && (pressed.current['ArrowDown'] || pressed.current['KeyS']))
            playerRef.current.setRotation(playerRef.current.rotation().multiply(_rot.setFromAxisAngle(up, -turnSpeed * deltaTime)));

        // if (pressed.current['KeyA'])
        //     playerRef.current.setRotation(playerRef.current.rotation().multiply(_rot.setFromAxisAngle(up, turnSpeed * deltaTime)));

        // if (pressed.current['KeyD'])
        //     playerRef.current.setRotation(playerRef.current.rotation().multiply(_rot.setFromAxisAngle(up, -turnSpeed * deltaTime)));

        // _forward.set(0, 0, -1).applyQuaternion(playerRef.current.rotation);
        _right.set(1, 0, 0).applyQuaternion(playerRef.current.rotation());

        // if (pressed.current['KeyW']) _move.add(_forward);
        // if (pressed.current['KeyS']) _move.sub(_forward);
        // if (pressed.current['KeyD']) _move.add(_right);
        // if (pressed.current['KeyA']) _move.sub(_right);

        // _move.multiplyScalar(deltaTime * (speed + (run.current ? 3.0 : 0)));
        // (playerRef.current.translation()).add(_move);

        _headPos.copy(playerRef.current.translation()).add(playerHeadOffset);
        _cameraPos.setFromSpherical(cameraDirection.current);
        _cameraPos.normalize().multiplyScalar(cameraDistance);

        _cameraPos.applyQuaternion(playerRef.current.rotation());
        _cameraPos.add(_headPos);
        state.camera.position.copy(_cameraPos);
        state.camera.lookAt(_headPos);
    });

    return null;
}

export default PointerLock