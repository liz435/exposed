import React, { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Torus({ speed, shape, ...props }) {
  const meshRef = useRef(null);

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((_, delta) => {
    meshRef.current.rotation.x += delta * (speed || 1);
  });

  let geometry = <torusKnotGeometry args={[12, 2, 1024, 11, 1, 1]} />;

  if (shape === "sphere") {
    geometry =   <sphereGeometry args={[1,20,20, 0, 6.283185307179586,0,3.14]} />
  }

  if (shape === "rect") {
    geometry = <boxGeometry args={[1,1,1]} />;
  }

  console.log(speed)

  return (
    <mesh
      {...props}
      position={[0, 0, 0]}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
        {geometry}
      <meshStandardMaterial color={"orange"} />
    </mesh>
  );
}
