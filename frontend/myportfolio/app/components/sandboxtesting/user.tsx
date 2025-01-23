import { useThree, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, useKeyboardControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

enum Controls {
  forward = "forward",
  back = "back",
  left = "left",
  right = "right",
  jump = "jump",
}

const SPEED = 5;

export function Player() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const { camera } = useThree(); // Access the camera from Three.js

  // Use a selector to access keyboard states
  const forward = useKeyboardControls<Controls>((state) => state.forward);
  const back = useKeyboardControls<Controls>((state) => state.back);
  const left = useKeyboardControls<Controls>((state) => state.left);
  const right = useKeyboardControls<Controls>((state) => state.right);

  const direction = new THREE.Vector3();
  const frontVector = new THREE.Vector3();
  const sideVector = new THREE.Vector3();

  useFrame(() => {
    // Calculate movement direction
    frontVector.set(0, 0, Number(back) - Number(forward));
    sideVector.set(Number(left) - Number(right), 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED);



      const move = new THREE.Vector3();
      camera.getWorldDirection(move); // Get the direction the camera is facing
      move.y = 0; // Prevent vertical movement
      move.normalize();
      move.multiplyScalar(direction.z);
  
      const strafe = new THREE.Vector3();
      strafe.crossVectors(camera.up, move); // Get strafe direction
      strafe.normalize();
      strafe.multiplyScalar(direction.x);
    // Apply movement to the camera
    camera.position.add(move).add(strafe); 
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, -1, 5]} />;
}