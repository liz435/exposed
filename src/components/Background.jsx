import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Torus from "./Shapes/Torus";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

export default function Background(props) {
  const [speed, setSpeed] = useState(1);
  const [shape, setShape] = useState("torus");

  const handleClick = (e) => {
    if (e.target.value === "speed up") {
      setSpeed(speed * 2);
    } else if (e.target.value === "slow down") {
      setSpeed(speed / 2);
    }
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
      case "cone":
        setShape("cone");
        break;
      default:
        break;
    }
  }

  return (
    <Routes>
    <Router>
      <div>
        <button onClick={handleClick} value="speed up">Speed Up</button>
        <button onClick={handleClick} value="slow down">Slow Down</button>
        <Link to="/sphere">
          <button onClick={() => setShape("sphere")}>Sphere</button>
        </Link>
        <Link to="/rect">
          <button onClick={() => setShape("rect")}>Rect</button>
        </Link>
        <Link to="/torus">
          <button onClick={() => setShape("torus")}>Torus</button>
        </Link>
        <Link to="/cone">
          <button onClick={() => setShape("cone")}>Cone</button>
        </Link>
      </div>

      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Route path="/sphere" render={() => <Torus speed={speed} shape="sphere" />} />
        <Route path="/rect" render={() => <Torus speed={speed} shape="rect" />} />
        <Route path="/torus" render={() => <Torus speed={speed} shape="torus" />} />
        <Route path="/cone" render={() => <Torus speed={speed} shape="cone" />} />
      </Canvas>
    </Router>
    </Routes>
  );
}
