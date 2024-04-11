import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'


export function DancingCouple(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/Town1/dancingCouple-transformed.glb')
  const { actions } = useAnimations(animations, group)

  console.log(actions);

  useEffect(() => {
    actions['Take 001']?.play();
  }
    , [actions])

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes._rootJoint} />
      <primitive object={nodes._rootJoint_1} />
      <skinnedMesh name="Object_10" geometry={nodes.Object_10.geometry} material={materials.peopleColors} skeleton={nodes.Object_10.skeleton} position={[-17.072, 0, -0.203]} rotation={[-Math.PI / 2, 0, -1.578]} />
      <skinnedMesh name="Object_53" geometry={nodes.Object_53.geometry} material={materials.peopleColors} skeleton={nodes.Object_53.skeleton} position={[-29.27, 0, 0.041]} rotation={[-Math.PI / 2, 0, 1.571]} />
    </group>
  )
}

useGLTF.preload('/dancingCouple-transformed.glb')

