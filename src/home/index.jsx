import React, { useState } from "react";
import s from "./index.module.css";

function Home() {
  const handleMouseEnter = (e) => {
    setIsHovered(true);
  };

  const [isHovered, setIsHovered] = useState(false);


  const style = isHovered ? s.titleDiv : s.title_hovered;
  const text = isHovered ? "hovered" : "not hovered";
  

  return (
    <main className={s.container}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
        className={style}
      >
        <h1 className={s.title}>Hello World, I am being {text}</h1>
        
      </div>
    </main>
  );
}

export default Home;
