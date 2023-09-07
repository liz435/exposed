import React, { useRef, useState } from "react";
import "./App.css";
import css from "./three/three.module.css";
import Home from "./home";
import Background from "./components/Background";

function App() {
  return (
    <div className={css.canvas_container}>
      <Home />
      <Background />
    </div>
  );
}

export default App;
