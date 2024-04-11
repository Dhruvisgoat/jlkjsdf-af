// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { useLoader } from '@react-three/fiber'
// import { RigidBody } from "@react-three/rapier"

// export default function House() {
//     const gltf = useLoader(GLTFLoader, "house.glb");
//     return (
//         <RigidBody colliders="trimesh" position={[20, 100, 50]} scale={30}>
//             <primitive object={gltf.scene}/>
//         </RigidBody>
//     )
// }




import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from "@react-three/rapier"

export default function House(props) {
    const { nodes, materials } = useGLTF('./models/house-transformed.glb')
    return (
        <group {...props} dispose={null}>
                <RigidBody colliders="trimesh" type="fixed" scale={20}>
                <group rotation={[-Math.PI / 2, 0, 0]}>
                    <group rotation={[Math.PI / 2, 0, 0]}>
                        <mesh geometry={nodes.defaultMaterial.geometry} material={materials.Bench} />
                        <mesh geometry={nodes.defaultMaterial_1.geometry} material={materials.Logs} />
                        <mesh geometry={nodes.defaultMaterial_2.geometry} material={materials.Barrel} />
                        <mesh geometry={nodes.defaultMaterial_3.geometry} material={materials.Cart} />
                        <mesh geometry={nodes.defaultMaterial_4.geometry} material={materials.House} />
                        <mesh geometry={nodes.defaultMaterial_5.geometry} material={materials.Chapel} />
                        <mesh geometry={nodes.defaultMaterial_6.geometry} material={materials.Walls} />
                        <mesh geometry={nodes.defaultMaterial_7.geometry} material={materials.Ground} />
                    </group>
                </group>
        </RigidBody>
            </group>
    )
}

useGLTF.preload('/house-transformed.glb')



// import React from "react"
// import { useGLTF } from "@react-three/drei"
// import { RigidBody } from "@react-three/rapier"
// import { Detailed } from "@react-three/drei"

// const House = (props) => {
//   const { nodes, materials } = useGLTF("./house-transformed.glb")

//   return (
//     <Detailed distances={[0, 50, 100]} {...props}>
//       <RigidBody colliders="trimesh" type="fixed" position={[50, 5.5, 50]} scale={30}>
//         <mesh geometry={nodes.defaultMaterial_4.geometry} material={materials.House} />
//       </RigidBody>
//       <RigidBody colliders="trimesh" type="fixed" position={[50, 5.5, 50]} scale={30}>
//         <mesh geometry={nodes.defaultMaterial_6.geometry} material={materials.Walls} />
//       </RigidBody>
//       <RigidBody colliders="trimesh" type="fixed" position={[50, 5.5, 50]} scale={30}>
//         <mesh geometry={nodes.defaultMaterial_7.geometry} material={materials.Ground} />
//       </RigidBody>
//     </Detailed>
//   )
// }

// export default House
