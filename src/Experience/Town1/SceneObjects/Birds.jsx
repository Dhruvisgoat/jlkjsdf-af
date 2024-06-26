/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 birds.glb --transform 
Files: birds.glb [190.97KB] > /Users/dhruvyadav/3dGame/public/models/Town1/birds-transformed.glb [60.4KB] (68%)
Author: Zacxophone (https://sketchfab.com/Zacxophone)
License: SKETCHFAB Standard (https://sketchfab.com/licenses)
Source: https://sketchfab.com/3d-models/birds-3a9bb97be78944f9bffc23fb25c2154e
Title: Birds
*/

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Birds(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/Town1/birds-transformed.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <primitive object={nodes._rootJoint} />
        <primitive object={nodes._rootJoint_1} />
        <primitive object={nodes._rootJoint_2} />
        <primitive object={nodes._rootJoint_3} />
        <primitive object={nodes._rootJoint_4} />
        <skinnedMesh name="Object_9" geometry={nodes.Object_9.geometry} material={materials.Material} skeleton={nodes.Object_9.skeleton} rotation={[-Math.PI / 2, 0, 0]} scale={0.209} />
        <skinnedMesh name="Object_10" geometry={nodes.Object_10.geometry} material={materials['Material.001']} skeleton={nodes.Object_10.skeleton} rotation={[-Math.PI / 2, 0, 0]} scale={0.209} />
        <skinnedMesh name="Object_25" geometry={nodes.Object_25.geometry} material={materials.Material} skeleton={nodes.Object_25.skeleton} position={[0.583, 0.022, 0.606]} rotation={[-Math.PI / 2, 0, 0]} scale={0.2} />
        <skinnedMesh name="Object_26" geometry={nodes.Object_26.geometry} material={materials['Material.001']} skeleton={nodes.Object_26.skeleton} position={[0.583, 0.022, 0.606]} rotation={[-Math.PI / 2, 0, 0]} scale={0.2} />
        <skinnedMesh name="Object_41" geometry={nodes.Object_41.geometry} material={materials.Material} skeleton={nodes.Object_41.skeleton} position={[-0.68, -0.022, 0.906]} rotation={[-Math.PI / 2, 0, 0]} scale={0.209} />
        <skinnedMesh name="Object_42" geometry={nodes.Object_42.geometry} material={materials['Material.001']} skeleton={nodes.Object_42.skeleton} position={[-0.68, -0.022, 0.906]} rotation={[-Math.PI / 2, 0, 0]} scale={0.209} />
        <skinnedMesh name="Object_57" geometry={nodes.Object_57.geometry} material={materials.Material} skeleton={nodes.Object_57.skeleton} position={[0.79, -0.046, 1.564]} rotation={[-Math.PI / 2, 0, 0]} scale={0.209} />
        <skinnedMesh name="Object_58" geometry={nodes.Object_58.geometry} material={materials['Material.001']} skeleton={nodes.Object_58.skeleton} position={[0.79, -0.046, 1.564]} rotation={[-Math.PI / 2, 0, 0]} scale={0.209} />
        <skinnedMesh name="Object_73" geometry={nodes.Object_73.geometry} material={materials.Material} skeleton={nodes.Object_73.skeleton} position={[-0.815, 0.045, 1.981]} rotation={[-Math.PI / 2, 0, 0]} scale={0.173} />
        <skinnedMesh name="Object_74" geometry={nodes.Object_74.geometry} material={materials['Material.001']} skeleton={nodes.Object_74.skeleton} position={[-0.815, 0.045, 1.981]} rotation={[-Math.PI / 2, 0, 0]} scale={0.173} />
      </group>
    </group>
  )
}

useGLTF.preload('/birds-transformed.glb')
