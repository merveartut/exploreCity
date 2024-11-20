import React from 'react'
import "./styles.css";
import videoBg from "../../assets/background_video.mp4";
import { Button } from 'react-bootstrap';
function WelcomePage({goDown}) {
  return (
    <div className="bgContainer">
      <video autoPlay loop muted src={videoBg}></video>
      <div className="content">
          <h1 className="firstPar">Time for your</h1>
          <h1 className="secPar">next adventure</h1>
          <p className="thirdPar">Lets plan together</p>

        <Button variant='outline-light' className="downButton" onClick={() => goDown()}>Start Now</Button>
        </div>
        
      
      </div>
  )
}

export default WelcomePage