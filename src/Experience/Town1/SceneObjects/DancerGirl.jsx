import React, { useRef,useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'


export function DancerGirl(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/Town1/dancerGirl-transformed.glb')
  const { actions } = useAnimations(animations, group)

  console.log(actions);
  useEffect(() => {
    actions['mixamo.com']?.play();
  } , [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <primitive object={nodes._rootJoint} />
        <skinnedMesh name="Object_7" geometry={nodes.Object_7.geometry} material={materials.Character} skeleton={nodes.Object_7.skeleton} scale={1} />
      </group>
    </group>
  )
}

useGLTF.preload('/dancerGirl-transformed.glb')
