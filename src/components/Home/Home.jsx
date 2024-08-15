import React from "react";
import videoBg from "../../assets/background_video.mp4";
import "./styles.css";
import Menu from "../Menu/Menu";
function Home() {
  return (
    <div className="app">
      <div className="bgContainer">
      <video autoPlay loop muted src={videoBg}></video>
      <div className="content">
          <h1 className="firstPar">Time for your</h1>
          <h1 className="secPar">next adventure</h1>
          <p className="thirdPar">Lets plan together</p>
        </div>
        
      
      </div>
      <div className="menuContainer">
        <Menu></Menu>
      </div>
    </div>
  );
}
export default Home;
