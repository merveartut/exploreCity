import React from "react";
import "./styles.css";
import WelcomePage from "./WelcomePage";
import MenuPage from "./MenuPage";
import ReactFullpage from "@fullpage/react-fullpage";
function Home() {

  return (
    <ReactFullpage
    //fullpage options
    normalScrollElements="[data-fullpage-ignore]"
    scrollingSpeed = {1000} /* Options here */

    render={({ state, fullpageApi }) => {
      return (
        <ReactFullpage.Wrapper>
          <div className="section" style={{position:"static"}}>
           <WelcomePage goDown={() => fullpageApi.moveSectionDown()}/>
         
          </div>
          <div className="section">
           <MenuPage/>
          </div>
        </ReactFullpage.Wrapper>
      );
    }}
  />
  );
}
export default Home;
