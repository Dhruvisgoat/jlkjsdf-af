// import * as THREE from "three";
// import { useEffect, useRef } from "react";
// import { useFrame } from "@react-three/fiber";
// import { CapsuleCollider, RigidBody, useRapier } from "@react-three/rapier";
// import { RefContext } from "../../context/context";
// import { useContext } from "react";
// import React from "react";
// import * as RAPIER from "@dimforge/rapier3d-compat";

// let baseSpeed = 5;
// let sprintSpeed = 10;

// export default function MobilePlayer({ lerp = THREE.MathUtils.lerp }) {
//     const ref = useRef();
//     const rapier = useRapier();
//     const { getJoystickState, isJumping, isSprinting } = useContext(RefContext);

//     // Initialize width and height using the current window size
//     const [width, setWidth] = React.useState(window.innerWidth);
//     const [height, setHeight] = React.useState(window.innerHeight);

//     const X = (width * 15) / 100;
//     const Y = (height * 70) / 100;

//     useEffect(() => {
//         const handleResize = () => {
//             // Update width and height on window resize
//             setWidth(window.innerWidth);
//             setHeight(window.innerHeight);
//         };
//         // Attach event listener for window resize
//         window.addEventListener("resize", handleResize);
//         // Cleanup the event listener when the component unmounts
//         return () => {
//             window.removeEventListener("resize", handleResize);
//         };
//     }, []);

//     useFrame((state) => {
//         const joystickState = getJoystickState();

//         const velocity = ref.current.linvel();
//         if (!joystickState) {
//             state.camera.position.set(...ref.current.translation());
//             ref.current.setLinvel({ x: 0, y: velocity.y, z: 0 });
//             //jumping logic 
//             const world = rapier.world.raw();
//             const ray = world.castRay(new RAPIER.Ray(ref.current.translation(), { x: 0, y: -1, z: 0 }));
//             const grounded = ray && ray.collider && Math.abs(velocity.y) <= 0.01; // Check if *RELATIVE* y-velocity is close to zero
//             if (isJumping.current && grounded) ref.current.setLinvel({ x: 0, y: 7.5, z: 0 });

//             return;
//         }
//         state.camera.position.set(...ref.current.translation());
//         console.log(ref.current.translation());

//         const direction = new THREE.Vector3(
//             joystickState.position.x - X,
//             0,
//             +joystickState.position.y - Y
//         ).normalize();

//         const currentSpeed = isSprinting.current ? sprintSpeed : baseSpeed;
//         console.log( 'the current speed is', currentSpeed );

//         direction.multiplyScalar(currentSpeed).applyEuler(state.camera.rotation);
//         ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z });

//         //jumping logic 
//         const world = rapier.world.raw();
//         const ray = world.castRay(new RAPIER.Ray(ref.current.translation(), { x: 0, y: -1, z: 0 }));
//         const grounded = ray && ray.collider && Math.abs(velocity.y) <= 0.01; // Check if *RELATIVE* y-velocity is close to zero
//         if (isJumping.current && grounded) ref.current.setLinvel({ x: 0, y: 7.5, z: 0 });
//     });

//     return (
//         <>
//             <RigidBody ref={ref} position={[110, 10, 0]} colliders={false} mass={1} type="dynamic" enabledRotations={[false, false, false]}>
//                 <CapsuleCollider args={[1, 0.5]} />
//             </RigidBody>
//         </>
//     );
// }

import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RigidBody, useRapier } from "@react-three/rapier";
import { RefContext } from "../context/context";
import { useContext } from "react";
import React from "react";
import * as RAPIER from "@dimforge/rapier3d-compat";
import { DeviceOrientationControls, PerspectiveCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Girl } from "../Characters/Girl"
import { Ninja } from "../Characters/Ninja"
import { useGLTF, useAnimations } from '@react-three/drei'
import { Text } from "@react-three/drei";


let baseSpeed = 3.5;
let sprintSpeed = 7;

export default function MobilePlayer({ lerp = THREE.MathUtils.lerp }) {
    const { gl } = useThree();
    // const playerRef = useRef();
    const cameraRef = useRef();
    const pressed = useRef({});
    const buttonDown = useRef(-1);
    const run = useRef(false);
    const cameraDirection = useRef(new THREE.Spherical(1, Math.PI / 180 * 70, 0));
    const mouse = useRef(new THREE.Vector2(0, 0));
    const lastMouse = useRef(new THREE.Vector2(0, 0));
    let { isPersonView, isDeviceView, switchCharacter, isRunning, isJumping, actionsRef, playerRef, isPressingAnimating } = useContext(RefContext);
    console.log("isPersonView", isPersonView);


    // if isperson view then camera distance must be 0.1 else 5
    const cameraDis = isPersonView ? 0.1 : 5;
    // const cameraDis = 5;
    console.log(cameraDis);

    const [cameraDistance, setCameraDistance] = useState(cameraDis);

    // const cameraDistance = useRef(isPersonView?0.1:5);
    const speed = 3.0;
    const turnSpeed = Math.PI / 2;
    const up = new THREE.Vector3(0, 1, 0);
    const playerHeadOffset = new THREE.Vector3(0, 0.5, 0);
    const playerHeadCameraOffset = new THREE.Vector3(0, -0.5, 0);


    const _cameraPos = new THREE.Vector3(0, 0, 0);
    const _move = new THREE.Vector3(0, 0, -1);
    const _forward = new THREE.Vector3(0, 0, -1);
    const _right = new THREE.Vector3(1, 0, 0);
    const _rot = new THREE.Quaternion();
    const _headPos = new THREE.Vector3();
    const new_headPos = new THREE.Vector3();


    const group = useRef()
    const { nodes, materials, animations } = useGLTF('/models/girl-transformed.glb')
    const { actions } = useAnimations(animations, group)

    useEffect(() => {

        if (!isPressingAnimating) {
            const handleTouchStart = (e) => {
                if (e.touches.length === 3) {
                    buttonDown.current = 2; // Assuming a single touch corresponds to left mouse button
                    const touch = e.touches[2];
                    mouse.current = new THREE.Vector2(touch.clientX, touch.clientY);
                    lastMouse.current = new THREE.Vector2(0, 0);
                } else if (e.touches.length === 2) {
                    buttonDown.current = 0; // Assuming a single touch corresponds to left mouse button
                    if (e.touches[1].target.tagName !== 'BUTTON' && !e.touches[1].target.classList.contains('ReactNipple')) {

                        // if (e.touches[1].target.tagName !== 'BUTTON') {
                        // Second touch is not on a button
                        const touch = e.touches[1];
                        mouse.current = new THREE.Vector2(touch.clientX, touch.clientY);
                    } else {
                        // Second touch is on a button, consider the first touch
                        const touch = e.touches[0];
                        mouse.current = new THREE.Vector2(touch.clientX, touch.clientY);
                    }
                    lastMouse.current = new THREE.Vector2(0, 0);
                } else if (e.touches.length === 1) {
                    buttonDown.current = 0; // Assuming a single touch corresponds to left mouse button
                    const touch = e.touches[0];
                    mouse.current = new THREE.Vector2(touch.clientX, touch.clientY);
                    lastMouse.current = new THREE.Vector2(0, 0);
                }
            };


            const handleTouchMove = (e) => {
                if (buttonDown.current === 2 && e.touches.length === 3) {
                    const touch = e.touches[2];
                    const dx = (touch.clientX - mouse.current.x) / (window.innerWidth / 2.0);
                    const dy = (touch.clientY - mouse.current.y) / (window.innerHeight / 2.0);

                    // Increase the scaling factor to get a faster rotation
                    const rotationSpeed = 4;

                    playerRef.current.setRotation(
                        playerRef.current.rotation().multiply(
                            _rot.setFromAxisAngle(up, (lastMouse.current.x - dx) * rotationSpeed)
                        )
                    );

                    const newPhi = cameraDirection.current.phi + (lastMouse.current.y - dy) * (rotationSpeed *0.5);

                    // Clamp phi between 0.1 and Math.PI - 0.1 if in first person view and between 0.7 and Math.PI/2 if in third person view
                    if (isPersonView)
                        cameraDirection.current.phi = THREE.MathUtils.clamp(newPhi, 0.3, Math.PI - 0.3);
                    else {
                        cameraDirection.current.phi = THREE.MathUtils.clamp(newPhi, 0.7, Math.PI / 2);
                    }

                    lastMouse.current.set(dx, dy);
                } else if (buttonDown.current === 0 && e.touches.length === 2) {
                    if (e.touches[1].target.tagName !== 'BUTTON' && !e.touches[1].target.classList.contains('ReactNipple')) {

                        // if (e.touches[1].target.tagName !== 'BUTTON') {
                        // Second touch is not on a button
                        const touch = e.touches[1];
                        const dx = (touch.clientX - mouse.current.x) / (window.innerWidth / 2.0);
                        const dy = (touch.clientY - mouse.current.y) / (window.innerHeight / 2.0);

                        // Increase the scaling factor to get a faster rotation
                        const rotationSpeed = 4.0;

                        playerRef.current.setRotation(
                            playerRef.current.rotation().multiply(
                                _rot.setFromAxisAngle(up, (lastMouse.current.x - dx) * rotationSpeed)
                            )
                        );

                        const newPhi = cameraDirection.current.phi + (lastMouse.current.y - dy) * (rotationSpeed *0.5);

                        // Clamp phi between 0.1 and Math.PI - 0.1
                        if (isPersonView)
                            cameraDirection.current.phi = THREE.MathUtils.clamp(newPhi, 0.3, Math.PI - 0.3);
                        else {
                            cameraDirection.current.phi = THREE.MathUtils.clamp(newPhi, 0.7, Math.PI / 2);
                        }
                        lastMouse.current.set(dx, dy);
                    } else {
                        // Second touch is on a button, consider the first touch
                        const touch = e.touches[0];
                        const dx = (touch.clientX - mouse.current.x) / (window.innerWidth / 2.0);
                        const dy = (touch.clientY - mouse.current.y) / (window.innerHeight / 2.0);

                        // Increase the scaling factor to get a faster rotation
                        const rotationSpeed = 4.0;

                        playerRef.current.setRotation(
                            playerRef.current.rotation().multiply(
                                _rot.setFromAxisAngle(up, (lastMouse.current.x - dx) * rotationSpeed)
                            )
                        );

                        const newPhi = cameraDirection.current.phi + (lastMouse.current.y - dy) * (rotationSpeed *0.5);
                        // Clamp phi between 0.1 and Math.PI - 0.1 if in first person view
                        if (isPersonView)
                            cameraDirection.current.phi = THREE.MathUtils.clamp(newPhi, 0.3, Math.PI - 0.3);
                        else {
                            cameraDirection.current.phi = THREE.MathUtils.clamp(newPhi, 0.7, Math.PI / 2);
                        }
                        lastMouse.current.set(dx, dy);
                    }
                } else if (buttonDown.current === 0 && e.touches.length === 1) {
                    const touch = e.touches[0];
                    const dx = (touch.clientX - mouse.current.x) / (window.innerWidth / 2.0);
                    const dy = (touch.clientY - mouse.current.y) / (window.innerHeight / 2.0);

                    // Increase the scaling factor to get a faster rotation
                    const rotationSpeed = 4.0;

                    playerRef.current.setRotation(
                        playerRef.current.rotation().multiply(
                            _rot.setFromAxisAngle(up, (lastMouse.current.x - dx) * rotationSpeed)
                        )
                    );

                    const newPhi = cameraDirection.current.phi + (lastMouse.current.y - dy) * (rotationSpeed *0.5);
                    // Clamp phi between 0.1 and Math.PI - 0.1 if in first person view
                    if (isPersonView)
                        cameraDirection.current.phi = THREE.MathUtils.clamp(newPhi, 0.3, Math.PI - 0.3);
                    else {
                        cameraDirection.current.phi = THREE.MathUtils.clamp(newPhi, 0.7, Math.PI / 2);
                    }
                    lastMouse.current.set(dx, dy);
                }
            };


            const handleTouchEnd = (e) => {
                buttonDown.current = -1;
            };

            if (isPersonView) {
                setCameraDistance(0.1);
            }
            else {
                setCameraDistance(4);
            }

            const handleContextMenu = (e) => {
                e.preventDefault();
            };


            gl.domElement.addEventListener('touchmove', handleTouchMove);
            gl.domElement.addEventListener('touchend', handleTouchEnd);
            gl.domElement.addEventListener('touchstart', handleTouchStart);
            gl.domElement.addEventListener('contextmenu', handleContextMenu);


            return () => {
                gl.domElement.removeEventListener('touchstart', handleTouchStart);
                gl.domElement.removeEventListener('touchmove', handleTouchMove);
                gl.domElement.removeEventListener('touchend', handleTouchEnd);
                gl.domElement.removeEventListener('contextmenu', handleContextMenu);
            };
        }
    }, [isPersonView, isPressingAnimating]);

    const ref = useRef();
    const rapier = useRapier();
    const { getJoystickState, isSprinting } = useContext(RefContext);

    // Initialize width and height using the current window size
    const [width, setWidth] = React.useState(window.innerWidth);
    const [height, setHeight] = React.useState(window.innerHeight);

    const X = (width * 15) / 100;
    const Y = (height * 70) / 100;

    var horizontalFov = 70;

    useEffect(() => {
        const handleResize = () => {
            // Update width and height on window resize
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };
        // Attach event listener for window resize
        window.addEventListener("resize", handleResize);
        // Cleanup the event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useFrame((state) => {

        // state.camera.far = 150;
        state.camera.fov = 45;

        _headPos.copy(playerRef.current.translation()).add(playerHeadOffset);
        new_headPos.copy(playerRef.current.translation()).add(playerHeadCameraOffset);

        _cameraPos.setFromSpherical(cameraDirection.current);
        _cameraPos.normalize().multiplyScalar(cameraDistance);
        _cameraPos.applyQuaternion(playerRef.current.rotation());
        _cameraPos.add(_headPos);

        state.camera.position.copy(_cameraPos);
        if (!isDeviceView)
            state.camera.lookAt(_headPos);

        const joystickState = getJoystickState();
        const velocity = playerRef.current.linvel();

        if (!joystickState) {
            // state.camera.position.set(...playerRef.current.translation());
            playerRef.current.setLinvel({ x: 0, y: velocity.y, z: 0 });
            //jumping logic 
            const world = rapier.world.raw();
            const ray = world.castRay(new RAPIER.Ray(playerRef.current.translation(), { x: 0, y: -1, z: 0 }));
            const grounded = ray && ray.collider && Math.abs(velocity.y) <= 0.01; // Check if *RELATIVE* y-velocity is close to zero
            if (isJumping.current && grounded) playerRef.current.setLinvel({ x: 0, y: 4, z: 0 });
            if (isRunning.current) {
                const directionNew = new THREE.Vector3(0, 0, -1).normalize();
                const currentSpeed = isSprinting.current ? sprintSpeed : baseSpeed;
                directionNew.multiplyScalar(currentSpeed).applyEuler(state.camera.rotation);
                playerRef.current.setLinvel({ x: directionNew.x, y: velocity.y, z: directionNew.z });
                if (isJumping.current && grounded) playerRef.current.setLinvel({ x: 0, y: 4, z: 0 });
            }
            return;
        }
        // state.camera.position.set(...ref.current.translation());
        // console.log(ref.current.translation());
        console.log(joystickState.position.x - X, joystickState.position.y - Y);

        let xVAlueofJoystick = joystickState.position.x - X;
        let yVAlueofJoystick = joystickState.position.y - Y;


        // if joystickState.position.x-X, joystickState.position.y-Y is in the range 2.5 and -2.5 then make xvalueofjoystick and yvalueofjoystick to 0

        if (joystickState.position.x - X < 15 && joystickState.position.x - X > -15) {
            xVAlueofJoystick = 0;
        }
        if (joystickState.position.y - Y < 15 && joystickState.position.y - Y > -15) {
            yVAlueofJoystick = 0;
        }

        console.log(xVAlueofJoystick, yVAlueofJoystick);
        // const direction = new THREE.Vector3(
        //     joystickState.position.x - X,
        //     0,
        //     +joystickState.position.y - Y
        // ).normalize();

        let direction = new THREE.Vector3(
            xVAlueofJoystick,
            0,
            yVAlueofJoystick
        ).normalize();

        const currentSpeed = isSprinting.current ? sprintSpeed : baseSpeed;
        console.log('the current speed is', currentSpeed);

        direction.multiplyScalar(currentSpeed).applyEuler(state.camera.rotation);
        playerRef.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z });
        // if isRunning is true then setlinvel in z to 1 
        //make the player move forward if isRunning is true

        //jumping logic 
        const world = rapier.world.raw();
        const ray = world.castRay(new RAPIER.Ray(playerRef.current.translation(), { x: 0, y: -1, z: 0 }));
        const grounded = ray && ray.collider && Math.abs(velocity.y) <= 0.01; // Check if *RELATIVE* y-velocity is close to zero
        if (isJumping.current && grounded) playerRef.current.setLinvel({ x: 0, y: 4, z: 0 });

    });

    return (
        <>
            {isDeviceView && <DeviceOrientationControls ref={cameraRef} />}
            <RigidBody ref={playerRef} position={[10, 5, 0]} colliders={false} mass={1} type="dynamic" enabledRotations={[false, false, false]} restitution={0.1}>
                <Text position={[0, 0.8, 0.3]} fontSize={0.1} color="black" outlineColor={"white"} outlineWidth={0.02}  >
                    Dhruv Yadav
                </Text>
                <PerspectiveCamera ref={cameraRef} fov={75} aspect={window.innerWidth / window.innerHeight} near={0.1} far={1000} position={[0, 5, 10]} />
                <CapsuleCollider args={[0.5, 0.3]} />
                {/* create a capsule mesh */}
                {/* <mesh>
                    <capsuleBufferGeometry args={[0.5, 1]} />
                    <meshBasicMaterial color="red" />
                </mesh> */}
                {/* {(!isPersonView) && <Model />} */}
                {/* <Model/> */}
                {!isPersonView &&
                    <>
                        {switchCharacter === "Ninja" && <Ninja />}
                        {switchCharacter === "Girl" && <Girl />}
                    </>
                }

            </RigidBody>
        </>
    );
}

