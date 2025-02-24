import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { CuboidCollider, RigidBody } from '@react-three/rapier'

export function Model(props : any) {
  const { nodes, materials } = useGLTF('/room.gltf') as any


 const bbox = nodes.floor.geometry.boundingBox;
const width = bbox.max.x - bbox.min.x;
const height = bbox.max.y - bbox.min.y;
const depth = bbox.max.z - bbox.min.z;



  return (
 
    <RigidBody  type="fixed" colliders={false}  >
  <CuboidCollider args={[width, height, depth ]} position={[0, height/2, 0]} />
    <group {...props}>
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.floor.geometry}
      material={materials['Material.004']}
      scale={[2.5, 1.986, 1.986]}
    />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.wall2.geometry}
      material={materials.wallpaper2}
      position={[-0.012, 1.002, -1.989]}
      rotation={[Math.PI / 2, 0, 0]}
      scale={[2.7, 1, 1.1]}
    />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.wall1.geometry}
      material={materials.wallpaper1}
      position={[-2.509, 1.002, -0.013]}
      rotation={[Math.PI / 2, 0, -Math.PI / 2]}
      scale={[1.977, 1, 1.1]}
    />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.wall3.geometry}
      material={materials.wallpaper3}
      position={[2.484, 1.002, -0.013]}
      rotation={[Math.PI / 2, 0, -Math.PI / 2]}
      scale={[1.977, 1, 1.1]}
    />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Plane.geometry}
      material={materials['Material.001']}
      position={[0.785, 2.655, 0.11]}
      rotation={[Math.PI / 2, 0, 0]}
      scale={[2, 1, 0.3]}
    />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Plane001.geometry}
      material={materials['Material.002']}
      position={[-0.398, 2.662, -0.599]}
      rotation={[Math.PI / 2, 0, -Math.PI / 2]}
      scale={[1.6, 1, 0.3]}
    />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Plane002.geometry}
      material={materials['Material.003']}
      position={[4.513, 2.662, -0.599]}
      rotation={[Math.PI / 2, 0, -Math.PI / 2]}
      scale={[1.6, 1, 0.3]}
    />
  </group>

  </RigidBody>
  )
}

useGLTF.preload('/room.gltf')