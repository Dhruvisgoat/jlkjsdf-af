/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 manWithControls.glb --transform --instance --simplify --draco --resolution 512 webp 
Files: manWithControls.glb [9.33MB] > /Users/dhruvyadav/Desktop/3dportfolio/public/manWithControls-transformed.glb [897.9KB] (90%)
*/

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'


export function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/manWithControls-transformed.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="AuxScene">
        <group position={[0.009, -91.573, 0.289]}>
          <primitive object={nodes.mixamorigHips} />
        </group>
        <skinnedMesh name="vanguard_Mesh" geometry={nodes.vanguard_Mesh.geometry} material={materials.VanguardBodyMat} skeleton={nodes.vanguard_Mesh.skeleton} position={[0.009, -91.573, 0.289]} />
        <skinnedMesh name="vanguard_visor" geometry={nodes.vanguard_visor.geometry} material={materials.VanguardBodyMat} skeleton={nodes.vanguard_visor.skeleton} position={[0.009, -91.573, 0.289]} />
      </group>
    </group>
  )
}

useGLTF.preload('/manWithControls-transformed.glb')
