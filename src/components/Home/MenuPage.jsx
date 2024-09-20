import React from "react";
import Menu from "../Menu/Menu";
import signBoard from "../../assets/signboard.png";
import "./styles.css";
import { useSelector } from "react-redux";
function MenuPage({ fullpageApi }) {
  const selectedCity = useSelector((state) => state.city.value);
  return (
    <div className="menuContainer">
      <img src={signBoard} className="signBoardImg"></img>
      <div className="boardText">{selectedCity.label.toUpperCase()}</div>
      <Menu fullpageApi={fullpageApi}></Menu>
    </div>
  );
}

export default MenuPage;
