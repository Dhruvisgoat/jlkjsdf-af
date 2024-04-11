/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 kids.glb --transform 
Files: kids.glb [4.05MB] > /Users/dhruvyadav/3dGame/public/models/Town1/kids-transformed.glb [867.74KB] (79%)
Author: TiZeta (https://sketchfab.com/TiZeta)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/kids-avatars-22ec160c6b594b4bb35aa503f945dbbd
Title: Kids (avatars)
*/

import React, { useRef ,useEffect} from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Kids(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/Town1/kids-transformed.glb')
  const { actions } = useAnimations(animations, group)

  console.log(actions);

  useEffect(() => {
    actions['Alltogether']?.play();
  }

    , [actions])


  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Root" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="ARMATURE_D" position={[2.211, 0, 0]} rotation={[0, 0, -0.099]}>
            <primitive object={nodes.ARMATURE_D_rootJoint} />
            <skinnedMesh name="KID_D_0" geometry={nodes.KID_D_0.geometry} material={materials['Material.001']} skeleton={nodes.KID_D_0.skeleton} />
          </group>
        </group>
        {/* <mesh name="FLOOR_0" geometry={nodes.FLOOR_0.geometry} material={materials['Material.001']} position={[0.001, -0.065, -0.139]} rotation={[-Math.PI / 2, 0, 0]} scale={[3.574, 3.574, 0.715]} /> */}
      </group>
    </group>
  )
}

useGLTF.preload('/kids-transformed.glb')