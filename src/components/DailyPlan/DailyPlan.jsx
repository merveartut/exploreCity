import React from "react";
import { useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import SelectMap from "./SelectMap";
import IconButton from "@mui/material/IconButton";
import { FaHotel } from "react-icons/fa";
import { MdOutlineRestaurant } from "react-icons/md";
import { GiAncientColumns } from "react-icons/gi";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import { ListItemText } from "@mui/material";
import { IoMdArrowDropright } from "react-icons/io";
import Menu from "@mui/material/Menu";
import { Button } from "react-bootstrap";

function DailyPlan({ days, date, fullpageApi }) {
  // const {isLoaded} = useJsApiLoader({
  //   googleMapsApiKey: "AIzaSyCCFb5VXCV397TH6-v5OhfzxRDgcN6TdVk" ,
  // })
  const [listOfLocations, setListOfLocations] = useState({
    title: "",
    selectedPlaces: [{ day: null, place: { name: "", location: null } }],
  });
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedItem, setSelectedItem] = useState(1);
  const handleListItemClick = (event, index) => {
    setSelectedItem(index);
  };
  const handleAddLocation = (value) => {
    setListOfLocations(value);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const [openPopover, setOpenPopover] = useState(false);
  const handlePopover = (event, index) => {
    event.preventDefault(); // Prevent default event behavior
    if (anchorEl && anchorEl === event.currentTarget) {
      // If the same item is clicked, close the menu
      setAnchorEl(null);
      setOpenPopover(false);
    } else {
      // If a different item is clicked, open the menu for the new item
      setAnchorEl(event.currentTarget);
      setOpenPopover(true);
      setSelectedItem(index); // Set the selected item to the new one
    }
  }


  return (
    <Container fluid={false}>
      {/* Stack the columns on mobile by making one full-width and the other half-width */}
      <Row style={{ justifyContent: "center" }}>
        <Col
          xs={2}
          md={2}
          sm={8}
          style={{
            alignContent: "center",
            justifyContent: "center",
            display: "flex",
            border: "2px solid black",
          }}
        >
          <h3>Days</h3>
        </Col>
        <Col
          xs={10}
          sm={8}
          md={8}
          style={{
            alignContent: "center",
            justifyContent: "center",
            display: "flex",
            border: "2px solid black",
          }}
        >
          <h3>Location</h3>
        </Col>
      </Row>

      {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
      <Row style={{ justifyContent: "center" }}>
        <Col
          xs={2}
          md={2}
          style={{
            alignContent: "center",
            justifyContent: "center",
            display: "block",
            border: "2px solid black",
            flexDirection: "column",
          }}
        >
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              height: "400px",
            }}
            style={{ height: "400px" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            {days.map((day, index) => (
              <row style={{ display: "flex", flexDirection: "row" }}>
                <ListItemButton
                  key={index}
                  selected={selectedItem === index + 1}
                  onClick={(event) => handleListItemClick(event, index + 1)}
                  style={{ height: "40px", textAlign: "center" }}
                >
                  <ListItemText primary={` ${index + 1}. day`} />
                </ListItemButton>
                <IconButton onClick={(e) => handlePopover(e, index + 1)}>
                  <IoMdArrowDropright />
                </IconButton>
              </row>
            ))}
          </List>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            open={openPopover}
            anchorEl={anchorEl}
            onClose={() => setOpenPopover(false)}
            anchorOrigin={{
              vertical: "center", // Positioning relative to the button, change to 'top' or 'center' if needed
              horizontal: "right", // Adjust to 'right' or 'center' for different alignments
            }}
            transformOrigin={{
              vertical: "center", // Positioning relative to the menu itself
              horizontal: "left", // You can change this to 'center' or 'right' based on preference
            }}
          >
            <div style={{ padding: "10px" }}>
              <h5>{listOfLocations.title}</h5>
              {listOfLocations.selectedPlaces.map((item) => (
                <div>
                  {selectedItem === item.day && <p>{item.place.name}</p>}
                </div>
              ))}
            </div>
          </Menu>
        </Col>
        <Col xs={10} md={8} style={{ backgroundColor: "white" }}>
          <Row
            style={{
              display: "flex",

              flexDirection: "row",
            }}
          >
            <Col
              xs={12}
              md={11}
              sm={10}
              style={{
                alignContent: "center",
                justifyContent: "center",
                display: "block",
                border: "2px solid black",
                flexDirection: "column",
              }}
            >
              <SelectMap
                title={"Hotel"}
                day={selectedItem}
                addPlace={handleAddLocation}
                selectedLocations={listOfLocations}
                fullPageApi={fullpageApi}
              ></SelectMap>
            </Col>
            <Col xs={2} md={1} sm={2} style={{ padding: "0px" }}>
              <div
                style={{
                  padding: "0px",
                  justifyContent: "flex-start",
                  display: "flex",
                  flexDirection: "column",
                  border: "2px solid black",
                  height: "100%",
                }}
              >
                <IconButton>
                  <FaHotel style={{ color: "black" }} />
                </IconButton>
                <IconButton>
                  <MdOutlineRestaurant />
                </IconButton>
                <IconButton>
                  <GiAncientColumns />
                </IconButton>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Columns are always 50% wide, on mobile and desktop */}
    </Container>
  );
}

export default DailyPlan;
