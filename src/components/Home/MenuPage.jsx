import React from 'react'
import Menu from '../Menu/Menu'
import DailyPlan from '../DailyPlan/DailyPlan';
import bgImg from "../../assets/2.jpg";
import Image from 'react-bootstrap/Image';

import "./styles.css";
function MenuPage({fullpageApi}) {
  return (
    <div className="menuContainer">
        <Menu fullpageApi={fullpageApi}></Menu>
      </div>
  )
}

export default MenuPage