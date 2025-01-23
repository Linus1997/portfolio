import { getProjects } from "@/app/utils/helperfunction"
import { Image, AccumulativeShadows, RandomizedLight, CameraControls, Environment, useGLTF, useTexture, Trail, OrbitControls, PerspectiveCamera, KeyboardControlsEntry, KeyboardControls, useKeyboardControls, PointerLockControls } from "@react-three/drei"
import { Canvas, PrimitiveProps, useFrame, useLoader } from "@react-three/fiber"
import { useMemo, useRef } from "react";
import { Group, Mesh, MeshStandardMaterial, TextureLoader, Vector3 } from "three";
import * as THREE from 'three'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Model } from "./testRoom";
import { Player } from "./user";
import { Physics } from "@react-three/rapier";




enum Controls {
  forward = 'forward',
  back = 'back',
  left = 'left',
  right = 'right',
  jump = 'jump',
}



const TestRFiber = () => {
  const map = useMemo<KeyboardControlsEntry<Controls>[]>(() => [
    { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
    { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
    { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
    { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
    { name: Controls.jump, keys: ['Space'] },
  ], [])






  return (

    <div className="flex flex-row w-full h-[1000px] bg-white px-6">


      <div className=" w-[500px] h-[500px]">
        <KeyboardControls map={map}>
          <Canvas >
            <Environment background resolution={256}>
            <PerspectiveCamera position={[0, -1, 0]}>
              {/* <Physics gravity={[0, -30, 0]}> */}
                <Model position={[0, 0, 0]} />
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                {/* <Player /> */}
              <OrbitControls />

              
              </PerspectiveCamera>
            </Environment>

          </Canvas>
        </KeyboardControls>
      </div>
    </div>
  )
}





export default TestRFiber;