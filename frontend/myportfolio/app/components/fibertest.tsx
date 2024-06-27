import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import React from 'react'
import {Mesh} from "three"
import { useSpring, animated } from '@react-spring/three'
import ScrollItemOne from './scroll/scrollItemOne'
import { Html, Svg } from '@react-three/drei';
import DiscordLogo from './logos/discordLogo'



function MyRotatingBox() {
  const myMesh = useRef<Mesh>(null!);
  const [active, setActive] = useState(false);
  const {scale} = useSpring({ scale: active ? 5 : 1 })

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    myMesh.current.rotation.x = a;
    myMesh.current.rotation.y = a;
  });

  return (
    <animated.mesh
    scale={scale}
    onClick={() => setActive(!active)}
    ref={myMesh}
  >
    <Html occlude="blending" position={[1.5, 0, 0]} rotation={[Math.PI/2, 0, 0]}>
    <ScrollItemOne />
    </Html>
    

    <boxGeometry args={[3, 3, 3]}>
    <Html occlude="blending"  >
        <div style={{ width: '200px', height: '200px', background: 'lightgreen' }}>
          <h1>Page 2</h1>
          <p>This is content on the second face of the cube.</p>
        </div>
      </Html>
      </boxGeometry>
    
  </animated.mesh>
  );
}

function App() {
  return (
    <div className=" w-[100vw] h-[100vh]">
      <Canvas>
        <MyRotatingBox />
        <ambientLight intensity={0.1} />
        <directionalLight />
      </Canvas>
      <ScrollItemOne />
    </div>
  );
}
export default App;


