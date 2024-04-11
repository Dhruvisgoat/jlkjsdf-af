

// import React, { useRef } from 'react'
// import { useGLTF } from '@react-three/drei'
// import { RigidBody } from "@react-three/rapier"

// export function Solar_panel(props) {
//   const { nodes, materials } = useGLTF('/models/solar_panel.glb')
//   return (
//     <RigidBody colliders="trimesh" type="fixed"  >
//       <group {...props} dispose={null} scale={[0.02, 0.02, 0.02]} >
//         <mesh geometry={nodes.SolarPanel_SolarPanel_0.geometry} material={materials.SolarPanel} position={[0, 12.206, 35.525]} rotation={[-Math.PI / 4, 0, 0]} />
//       </group>
//     </RigidBody>
//   )
// }

// useGLTF.preload('/solar_panel.glb')





import React, { useRef, useMemo, useContext, createContext } from 'react'
import { useGLTF, Merged } from '@react-three/drei'
import { RigidBody } from "@react-three/rapier"

const context = createContext()
export function Instances({ children, ...props }) {
  const { nodes } = useGLTF('/models/solar_panel-transformed.glb')
  const instances = useMemo(
    () => ({
      SolarPanelSolarPanel: nodes.SolarPanel_SolarPanel_0,
    }),
    [nodes],
  )
  return (
    <Merged meshes={instances} {...props}>
      {(instances) => <context.Provider value={instances} children={children} />}
    </Merged>
  )
}

export function Solar_panel(props) {
  const instances = useContext(context)
  return (

    <group {...props}  scale={[0.02, 0.02, 0.02]}>
        <instances.SolarPanelSolarPanel  rotation={[-Math.PI / 4, 0, 0]} />
      </group>
  )
}

useGLTF.preload('/solar_panel-transformed.glb')
