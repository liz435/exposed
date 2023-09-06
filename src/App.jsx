import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import './App.css'
import css from "./three/three.module.css"
import Home from './home'

function Torus(props) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (meshRef.current.rotation.x += delta*0.3))
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <torusKnotGeometry args={[12, 2, 1024, 11,1, 1]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>

  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className={css.canvas_container}>
      <Home />
    <Canvas>
    
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <Torus position={[0,0,0]} />
  </Canvas>
  </div>
  )
}

export default App




