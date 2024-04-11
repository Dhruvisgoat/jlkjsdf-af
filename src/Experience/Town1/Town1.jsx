import React from 'react'
import { Garden } from '../SceneObjects/Garden'
import { DancingCouple } from './SceneObjects/DancingCouple'
import { Dog2 } from './SceneObjects/Dog2'
import { RigidBody } from '@react-three/rapier'
import { Sphere } from '@react-three/drei'
import { DancerGirl } from './SceneObjects/DancerGirl'
import { Kids } from './SceneObjects/Kids'
import Tv  from '../SceneObjects/Tv'

function Town1() {
    return (
        <>
            {/* <RigidBody type="fixed" colliders="trimesh" > */}
                <Garden position={[10, -5, 0]} />
                <DancingCouple position={[25, 0.4, -28]} scale={[0.01, 0.01, 0.01]} />
                <Dog2 position={[57, 1.7, -8.5]} rotation={[0,12,0]} />
                <DancerGirl position={[-10,0.2,0]} scale={[0.6,0.6,0.6]}  />
                <Kids position={[47,0.3,20]} scale={[0.4,0.4,0.4]} rotation={[0,-Math.PI/2,0]} />
                <Tv position = {[16.5,3,-30.7]} url = {"/videos/videoplayback.mp4"} />
                {/* 
            <RigidBody colliders="trimesh" position={[8, 2.5, 5]} >
                <Sphere args={[1]}  material={{restitution: 0.5}} weight={0.5}>
                    <meshStandardMaterial color="hotpink" />
                </Sphere>
            </RigidBody> */}
            {/* </RigidBody> */}
        </>
    )
}

export default Town1