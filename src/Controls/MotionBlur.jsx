import React, { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Effects } from '@react-three/postprocessing';
import { useKeyboardControls } from "@react-three/drei"

const MotionBlurEffect = () => {
  const { gl, scene, camera, size } = useThree();
  const [motionBlurEnabled, setMotionBlurEnabled] = useState(false);
  const [, get] = useKeyboardControls()
  const motionBlurRef = useRef();

  useFrame(() => {
    // Enable motion blur when Shift key is pressed
    const { fasten } = get()

    if (fasten && !motionBlurEnabled) {
      setMotionBlurEnabled(true);
    } else if (!fasten && motionBlurEnabled) {
      // Disable motion blur when Shift key is released
      setMotionBlurEnabled(false);
    }
  });

  return (
    <>
      <Effects
        children={<motionBlurRef.current factor={0.6} />}
        bloom={{ luminanceThreshold: 0.99 }}
        disableGamma
      />
    </>
  );
};

const MotionBlur = () => {
  // Your existing React Three Fiber component

  return (
    <>
      {/* Your scene components here */}
      <MotionBlurEffect />
    </>
  );
};

export default MotionBlur;
