import { useFrame } from "@react-three/fiber"
import { Box, PerspectiveCamera } from "@react-three/drei"
import * as THREE from "three"
import { RefContext } from "../context/context"
import { useContext, useRef, useEffect, useState } from "react"
import { CapsuleCollider, RigidBody, useRapier } from "@react-three/rapier"
import { useKeyboardControls } from "@react-three/drei"
import * as RAPIER from "@dimforge/rapier3d-compat"
import { Character } from "../Experience/SceneObjects/Character"
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js" // Import PointerLockControls separately
import { useThree } from "@react-three/fiber"
import PointerStandard from "../Controls/PointerStandard"
import PointerLock from "../Controls/PointerLock"
import { memo } from "react"
import { useMemo } from "react"
import { Girl } from "../Characters/Girl"
import { Ninja } from "../Characters/Ninja"
import { Text } from "@react-three/drei"
import { SpotLight } from "@react-three/drei"

let SPEED = 5 // Default speed

const Player = () => {
  const cameraRef = useRef();
  const { isStandardPointer, switchCharacter, isPersonView, playerRef } = useContext(RefContext)

  console.log("player Rerendered")
  const rapier = useRapier()
  const [, get] = useKeyboardControls()

  useFrame((state, delta) => {
    const { forward, backward, left, right, jump, fasten } = get()
    const velocity = playerRef.current.linvel()

    // Movement
    const currentSpeed = fasten ? 10 : SPEED // If fasten is pressed, use a higher speed
    //set the far distance of camera
    // state.camera.far = 100
    state.camera.fov = 45
    const frontVector = new THREE.Vector3(0, 0, backward - forward)
    let sideVector = 0

    if (forward - backward === 0) sideVector = new THREE.Vector3(left - right, 0, 0)
    else if (forward - backward === 1 || forward - backward === -1) sideVector = new THREE.Vector3(0, 0, 0)
    const direction = new THREE.Vector3().subVectors(frontVector, sideVector).normalize().multiplyScalar(currentSpeed).applyEuler(state.camera.rotation)
    //frame dependent movement
    playerRef.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z })

    //frame independent movementw
    // playerRef.current.setTranslation({ x: playerRef.current.translation().x + direction.x * delta, y: playerRef.current.translation().y, z: playerRef.current.translation().z + direction.z * delta })
    //if detect collision then stop 


    // Jumping
    const world = rapier.world.raw()
    const ray = world.castRay(new RAPIER.Ray(playerRef.current.translation(), { x: 0, y: -1, z: 0 }))
    const grounded = ray && ray.collider && Math.abs(velocity.y) <= 0.01

    if (jump && grounded) playerRef.current.setLinvel({ x: 0, y: 4, z: 0 })

  })

  return (
    <>
      {isStandardPointer ? <PointerStandard playerRef={playerRef} /> : <PointerLock playerRef={playerRef} />}
      <RigidBody ref={playerRef} position={[10, 3, 0]} colliders={false} mass={1} type="dynamic" enabledRotations={[false, false, false]} restitution={0.1}>
        <PerspectiveCamera ref={cameraRef} fov={75} aspect={window.innerWidth / window.innerHeight} near={0.1} far={80} position={[0, 5, 10]} />
        <CapsuleCollider args={[0.5, 0.3]} />
        {/* <SpotLight position={[0, 5, 0]} /> */}
        <Text position={[0, 0.9, -0.1]} fontSize={0.1} color="black" outlineColor={"white"} outlineWidth={0.02}  >
          Dhruv Yadav
        </Text>
        {/* <mesh>
          <capsuleBufferGeometry args={[0.5, 1]} />
          <meshBasicMaterial color="red" />
        </mesh> */}

        {!isPersonView &&
          <>
            {switchCharacter === "Ninja" && <Ninja />}
            {switchCharacter === "Girl" && <Girl />}
          </>
        }
      </RigidBody>
    </>
  )
}

export { Player }

// import * as THREE from "three";
// import * as RAPIER from "@dimforge/rapier3d-compat";
// import { useRef,useContext } from "react";
// import { useFrame } from "@react-three/fiber";
// import { useKeyboardControls } from "@react-three/drei";
// import { CapsuleCollider, RigidBody, useRapier } from "@react-three/rapier";
// import { RefContext } from "../../context/context";
// // import Axe from "./Axe";

// let SPEED = 5; // Default speed

// export function Player({ lerp = THREE.MathUtils.lerp }) {
//   const axe = useRef();
//   const ref = useRef();
//   const rapier = useRapier();
//   const [, get] = useKeyboardControls();
//   const {playerPosition} = useContext(RefContext);

//   useFrame((state) => {
//     const { forward, backward, left, right, jump, fasten } = get();

//     const velocity = ref.current.linvel();

//     // store the playerPosition in a useRef
//     playerPosition.current = ref.current.translation();
//     // Update camera
//     state.camera.position.set(...ref.current.translation());

//     // Movement
//     const currentSpeed = fasten ? 10 : SPEED; // If fasten is pressed, use a higher speed
//     const frontVector = new THREE.Vector3(0, 0, backward - forward);
//     const sideVector = new THREE.Vector3(left - right, 0, 0);
//     const direction = new THREE.Vector3().subVectors(frontVector, sideVector).normalize().multiplyScalar(currentSpeed).applyEuler(state.camera.rotation);
//     ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z });

//     // Jumping
//     const world = rapier.world.raw();
//     const ray = world.castRay(new RAPIER.Ray(ref.current.translation(), { x: 0, y: -1, z: 0 }));
//     const grounded = ray && ray.collider && Math.abs(velocity.y) <= 0.01;

//     if (jump && grounded) ref.current.setLinvel({ x: 0, y: 7.5, z: 0 });
//   });

//   return (
//     <>
//       <RigidBody ref={ref} position={playerPosition.current} colliders={false} mass={1} type="dynamic" enabledRotations={[false, false, false]} restitution={0.1}>
//         <CapsuleCollider args={[1, 0.5]} />
//         <mesh>
//           <boxBufferGeometry args={[1, 1, 1]} />
//           <meshBasicMaterial color="red" />
//         </mesh>
//         {/* height of camera is 0.7 */}
//       </RigidBody>

//       {/* <group ref={axe} onPointerMissed={(e) => (axe.current.children[0].rotation.x = -0.5)}>
//         <Axe position={[0.3, -0.35, 0.5]} />
//       </group> */}
//     </>
//   );
// }
