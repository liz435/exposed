import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Torus from "./Shapes/Torus";

export default function Background(props) {
  const [speed, setSpeed] = useState(1);
  const [shape, setShape] = useState("torus ");

  const handleClick = (e) => {

    if(e.target.value === 'speed up') {
      setSpeed(speed * 2);
      return
    }

    setSpeed(speed / 2);
  };

  function handleChangeShape(e) {
    
    switch (e.target.value) {
      case "sphere":
        setShape("sphere");
        break;
      case "rect":
        setShape("rect");
        break;
      case "torus":
        setShape("torus");
        break;
    }
  }

  return (
    <>
      <button onClick={handleClick} value={'speed up'}>speed up</button>
      <button onClick={handleClick} value={'slow down'}>slow down</button>
      <button onClick={handleChangeShape} value={"sphere"}>
        sphere
      </button>
      <button onClick={handleChangeShape} value={"rect"}>
        rect
      </button>
      <button onClick={handleChangeShape} value={"torus"}>
        torus
      </button>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Torus speed={speed} shape={shape}/>
      </Canvas>
    </>
  );
}
