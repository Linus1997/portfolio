export default function Cursor(props : any) {
  
    return (
        <group dispose={null} {...props}>
        <group rotation={[0, Math.PI / 1.8, -0.3]} scale={0.5}>
          {/* Replace the original meshes with a sphere */}
          <mesh>
            <sphereGeometry args={[0.1, 16, 16]} /> {/* Small sphere with radius 0.1 */}
            <meshStandardMaterial color="white" /> {/* White material */}
          </mesh>
        </group>
      </group>
    )
  }