import React, { useState } from "react";
import s from "./index.module.css";

function Home() {
  const handleMouseEnter = (e) => {
    setIsHovered(true);
  };

  const [isHovered, setIsHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const button = clicked ? s.button_clicked : s.button;
  const style = isHovered ?   s.title_hovered:s.titleDiv;
  const text = isHovered ? "hovered" : "not hovered";
  

  return (
    <main className={s.container}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
        onClick={()=> setClicked(true)}
        className={style}
      >
      
        <h1 className={s.title}> {text}</h1>
        
      </div>
    </main>
  );
}

export default Home;
