import React from "react"
import { useFrame } from "@react-three/fiber"
import { useKeyboardControls } from "@react-three/drei"
import { useEffect, useContext } from "react"
import { RefContext } from "../context/context"
import * as THREE from "three"
import { useState } from "react"
import { isBrowser, isMobile } from 'react-device-detect';

function AnimateAudio() {
    const { isWalking, setActions, audioRef, setCurrentSource, changeSource, getJoystickState, isRunning, isJumping } = useContext(RefContext)
    const [, get] = useKeyboardControls();
    const [width, setWidth] = React.useState(window.innerWidth)
    const [height, setHeight] = React.useState(window.innerHeight)
    const X = (width * 15) / 100;
    const Y = (height * 70) / 100;

    useFrame((state, delta) => {
        const { forward, backward, left, right, jump, fasten, bkey, isJoystickView } = get()
        const joystickState = getJoystickState();
        // console.log(joystickState?.position.x - X) //moving rightwards using joystick
        // console.log(joystickState?.position.y - Y) //moving forwards using joystick

        if (isMobile) {

            // if (isJoystickView) {
            //     if (joystickState) {
            //         if (audioRef.current?.paused) {
            //             //set the volume to half
            //             audioRef.current?.play()
            //         }
            //     }
            //     else {
            //         audioRef.current?.pause();
            //     }
            // }
            // else {
            if (isRunning.current) {
                //set the volume to half
                if (audioRef.current?.paused) {
                    //set the volume to half
                    audioRef.current?.play()
                }
            }
            else if (joystickState) {
                if (audioRef.current?.paused) {
                    //set the volume to half
                    audioRef.current?.play()
                }
            }

            else {
                audioRef.current?.pause();
            }
            if (isJumping.current) {
                //jumping sound to be added in future
            }
            // }
        }


        // for laptop ----------------------------------------------------------
        if (isBrowser) {
            if (forward - backward === 1) {
                if (audioRef.current?.paused) {
                    audioRef.current?.play()
                }
            }

            else if (forward - backward === -1) {
                if (audioRef.current?.paused) {
                    audioRef.current?.play()
                }
            }

            else if (left - right === 1) {
                if (audioRef.current?.paused) {
                    audioRef.current?.play()
                }
            }
            else if (left - right === -1) {
                if (audioRef.current?.paused) {
                    audioRef.current?.play()
                }
            }

            else if (jump) {
                audioRef.current?.pause();
            }

            else if (!forward) {
                audioRef.current?.pause();
            }
        }

    })

    return null
}

export default AnimateAudio
