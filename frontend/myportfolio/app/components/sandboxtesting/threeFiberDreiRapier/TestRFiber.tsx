import { KeyboardControlsEntry, KeyboardControls, PointerLockControls, useTexture } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useMemo } from "react";
import * as THREE from 'three'
import { Model } from "./TestRoom";
import { Player } from "./User";
import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";



export enum PlayerControls {
  forward = 'forward',
  back = 'backward',
  left = 'left',
  right = 'right',
  jump = 'jump',
}



const TestRFiber = () => {
  const map = useMemo<KeyboardControlsEntry<PlayerControls>[]>(() => [
    { name: PlayerControls.forward, keys: ['ArrowUp', 'KeyW'] },
    { name: PlayerControls.back, keys: ['ArrowDown', 'KeyS'] },
    { name: PlayerControls.left, keys: ['ArrowLeft', 'KeyA'] },
    { name: PlayerControls.right, keys: ['ArrowRight', 'KeyD'] },
    { name: PlayerControls.jump, keys: ['Space'] },
  ], [])


 



  return (
    <div className="flex flex-row w-full h-[1000px] bg-white px-6">
      <div className="w-[500px] h-[500px]">
        <KeyboardControls map={map}>
          <Canvas camera={{ fov: 45 , position: [0, 1.5, 5] }} >
            {/* Debugging Helpers */}
            {/* <primitive object={new THREE.AxesHelper(1)} />
            <primitive object={new THREE.GridHelper(100, 100, 100)} /> */}

            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={1} />

            {/* Physics */}
            <Physics gravity={[0, -30, 0]}>
              <Model position={[0, 0, 0]} />
              <Player />
          
            </Physics>

            {/* Controls */}
            <PointerLockControls makeDefault />
          </Canvas>
        </KeyboardControls>
      </div>
    </div>
  );
}





export default TestRFiber;