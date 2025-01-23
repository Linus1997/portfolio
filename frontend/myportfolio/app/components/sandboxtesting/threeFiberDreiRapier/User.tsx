import * as THREE from "three"
import * as RAPIER from "@dimforge/rapier3d-compat"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useKeyboardControls, useTexture } from "@react-three/drei"
import { CapsuleCollider, CuboidCollider, RigidBody, useRapier } from "@react-three/rapier"
import { texture } from "three/tsl"
import Cursor from "./Cursor"
import { Group } from "three"

const SPEED = 5
const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()
const rotation = new THREE.Vector3()

export function Player({ lerp = THREE.MathUtils.lerp }) {
  const texture = useTexture("/test2.png")
  const ref = useRef<RAPIER.RigidBody>(null)
  const rapier = useRapier()
  const cursor = useRef<Group>(null)
  const [, get] = useKeyboardControls()
   useFrame((state) => {
    if(!ref.current || !cursor.current) return;
    const { forward, backward: back, left, right, jump } = get()
    const rapierVelocity = ref.current.linvel();
const velocity = new THREE.Vector3(rapierVelocity.x, rapierVelocity.y, rapierVelocity.z);
    // update camera
    
    const playerPosition = ref.current.translation();
    
    // Keep the camera slightly above and behind the player
    state.camera.position.set(
      playerPosition.x,
      playerPosition.y, // Camera above player
      playerPosition.z     // Camera behind player
    );
    
    //state.camera.lookAt(playerPosition.x, playerPosition.y, playerPosition.z);
    cursor.current.children[0].rotation.x = lerp(cursor.current.children[0].rotation.x, Math.sin((velocity.length() > 1 ? 1 : 0) * state.clock.elapsedTime * 10) / 6, 0.1)
    cursor.current.rotation.copy(state.camera.rotation)
    cursor.current.position.copy(state.camera.position).add(state.camera.getWorldDirection(rotation).multiplyScalar(1))
    
    // movement
    frontVector.set(0, 0, Number(back) - Number(forward))
    sideVector.set(Number(left) - Number(right), 0, 0)
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED+5).applyEuler(state.camera.rotation)
    ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z }, false)
    // // jumping
    const world = rapier.world;
    const ray = world.castRay(new RAPIER.Ray(ref.current.translation(), { x: 0, y: 1, z: 0 }), 0.5, true)
    const grounded = ray && ray.collider && Math.abs(ray.timeOfImpact) <= 1.75
    if (jump && grounded) ref.current.setLinvel({ x: 0, y: 7.5, z: 0 }, false)
  })
  return (
    <>
       {/* <RigidBody type="fixed" colliders={false}>
                    <mesh receiveShadow position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
                      <planeGeometry args={[1, 1]} />
                      <meshStandardMaterial map={texture} map-repeat={[240, 240]} color="green" />
                    </mesh>
                    <CuboidCollider args={[1000, -2, 1000]} position={[0, -2, 0]} />
                  </RigidBody> */}
      <RigidBody ref={ref} colliders={false} mass={1} type="dynamic" position={[0, 0.7, 0]} enabledRotations={[false, false, false]}>
        <CapsuleCollider args={[0.75, 0.5]} />
      </RigidBody>
      <group ref={cursor} onPointerMissed={(e) => (cursor && cursor.current ? cursor.current.children[0].rotation.x = -0.5 : undefined)}>
        <Cursor position={[0, 0, 0]} />
      </group>
    </>
  )
}
