export default function Cursor(props : any) {
  
    return (
        <group dispose={null} {...props}>
        <group rotation={[0, Math.PI / 1.8, -0.3]} scale={0.5}>
          
          <mesh>
            <sphereGeometry args={[0.1, 16, 16]} /> 
            <meshStandardMaterial color="white" /> 
          </mesh>
        </group>
      </group>
    )
  }