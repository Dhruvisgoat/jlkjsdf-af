import React, { Suspense, useMemo } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';
import { useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { RigidBody } from "@react-three/rapier";
import { useContext } from 'react';
import { RefContext } from '../../context/context';
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import PositionalSound from '../../Controls/PositionalSound';
import { useFrame } from '@react-three/fiber';

function CoffeShop() {

  const { showButton, isMuted,setDistanceRef,getDistanceRef } = useContext(RefContext);

  const coffeeShopRef = useRef();

  const gltf = useLoader(GLTFLoader, "coffee.gltf");

  const handleClick = () => {
    window.open('https://canteen-proj.web.app', '_blank');
  }

  const distanceCalculation = useMemo(() => {
    return (cameraPosition, coffeeShopPosition) => {
      return cameraPosition.distanceTo(coffeeShopPosition);
    };
  }, []);

  useFrame(({ camera }) => {
    if (coffeeShopRef.current) {
      const distance = distanceCalculation(camera.position, coffeeShopRef.current.translation());
      // console.log("Distance from camera to coffee shop:", distance);
      setDistanceRef("coffeeShop", distance); // Set distance reference for coffee shop
    }
  });

  return (
    <>
      <Suspense fallback={null}>
        <mesh position={[49, -1.65, 20]} >
          {!showButton &&
            <PositionalSound url="/audio/ghost.mp3" />}
        </mesh>
      </Suspense>

      <RigidBody colliders="trimesh" position={[49, 0, 20]} ref={coffeeShopRef} >
        <primitive object={gltf.scene}
          onClick={handleClick}
        />
      </RigidBody>


    </>
  )
}

export default CoffeShop;
