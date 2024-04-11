import { useThree, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Euler, Vector2 } from 'three';
import React, { useRef, useEffect } from 'react';

const FirstPersonControls = ({ children, ...props }) => {
  const { camera, size, gl } = useThree();
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const euler = new Euler(0, 0, 0, 'YXZ');
  const touchStart = new Vector2();

  const handleMouseDown = (event) => {
    isDragging.current = true;
    previousMousePosition.current = {
      x: event.clientX,
      y: event.clientY,
    };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (event) => {
    if (!isDragging.current) return;

    const { movementX, movementY } = event;
    const rotationFactor = 0.004;

    euler.setFromQuaternion(camera.quaternion);
    euler.y -= movementX * rotationFactor;
    euler.x -= movementY * rotationFactor;
    euler.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.x));

    camera.quaternion.setFromEuler(euler);

    previousMousePosition.current = {
      x: event.clientX,
      y: event.clientY,
    };
  };

  // const handleTouchStart = (event) => {
  //   event.preventDefault();
  //   const touch = event.touches[0];
  //   touchStart.set(touch.clientX, touch.clientY);
  // };

  // const handleTouchMove = (event) => {
  //   event.preventDefault();  

  //   const touch = event.touches[0];
  //   const touchEnd = new Vector2(touch.clientX, touch.clientY);
  //   const delta = touchEnd.clone().sub(touchStart);

  //   const rotationFactor = 0.002;

  //   euler.setFromQuaternion(camera.quaternion);
  //   euler.y -= delta.x * rotationFactor;
  //   euler.x -= delta.y * rotationFactor;
  //   euler.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.x));

  //   camera.quaternion.setFromEuler(euler);

  //   touchStart.copy(touchEnd);
  // };




  const touchStart1 = new Vector2();
  const touchStart2 = new Vector2();
  let twoFingerTouch = false;

  const handleTouchStart = (event) => {
    event.preventDefault();

    const touches = event.touches;

    if (touches.length === 1) {
      const touch = touches[0];
      touchStart.set(touch.clientX, touch.clientY);
    } else if (touches.length === 2) {
      twoFingerTouch = true;
      const touch1 = touches[0];
      const touch2 = touches[1];
      touchStart1.set(touch1.clientX, touch1.clientY);
      touchStart2.set(touch2.clientX, touch2.clientY);
    }
  };

  const handleTouchMove = (event) => {
    event.preventDefault();

    const touches = event.touches;

    if (touches.length === 1) {
      const touch = touches[0];
      const touchEnd = new Vector2(touch.clientX, touch.clientY);
      const delta = touchEnd.clone().sub(touchStart);

      // Handle rotation for single finger touch (original logic)
      handleRotation(delta);
      
      touchStart.copy(touchEnd);
    } else if (touches.length === 2 && twoFingerTouch) {
      const touch1 = touches[0];
      const touch2 = touches[1];
      const touchEnd1 = new Vector2(touch1.clientX, touch1.clientY);
      const touchEnd2 = new Vector2(touch2.clientX, touch2.clientY);

      // Calculate movement based on both fingers
      const delta1 = touchEnd1.clone().sub(touchStart1);
      const delta2 = touchEnd2.clone().sub(touchStart2);
      const delta = delta1.add(delta2);

      // Handle rotation for two-finger touch
      handleRotation(delta);

      touchStart1.copy(touchEnd1);
      touchStart2.copy(touchEnd2);
    }
  };

  const handleRotation = (delta) => {
    const rotationFactor = 0.004;
    euler.setFromQuaternion(camera.quaternion);
    euler.y -= delta.x * rotationFactor;
    euler.x -= delta.y * rotationFactor;
    euler.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.x));
    camera.quaternion.setFromEuler(euler);
  };

  //add the eventlisteners to the canvas instead of the window

  const addEventListeners = () => {
    gl.domElement.addEventListener('mousedown', handleMouseDown);
    gl.domElement.addEventListener('mouseup', handleMouseUp);
    gl.domElement.addEventListener('mousemove', handleMouseMove);
    gl.domElement.addEventListener('touchstart', handleTouchStart, { passive: false });
    gl.domElement.addEventListener('touchmove', handleTouchMove, { passive: false });
  };

  const removeEventListeners = () => {
    gl.domElement.removeEventListener('mousedown', handleMouseDown);
    gl.domElement.removeEventListener('mouseup', handleMouseUp);
    gl.domElement.removeEventListener('mousemove', handleMouseMove);
    gl.domElement.removeEventListener('touchstart', handleTouchStart);
    gl.domElement.removeEventListener('touchmove', handleTouchMove);
    // gl.domElement.removeEventListener('touchend', handleTouchEnd);
  };

  useEffect(() => {
    addEventListeners();
    return () => removeEventListeners();
  }, []);

  useFrame(() => {
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
  });

  return <></>;
};

export default FirstPersonControls;