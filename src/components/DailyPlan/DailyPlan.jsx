import React, { useEffect } from "react";
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
import categoriesConfig from "./categoriesConfig";
import { MdDelete } from "react-icons/md";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Tooltip from '@mui/material/Tooltip';
import styles from "./DailyPlan.module.css"
import Button from '@mui/material/Button'

function DailyPlan({ days, date, fullpageApi, selectedCity, setPlan, plan }) {
  const [selectedDay, setSelectedDay] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState("hotel")

  const handleListItemClick = (event, day) => {
    setSelectedDay(day)
    setSelectedCategory("hotel")
  }
  const handleAddLocation = (value) => {
    setPlan(value)
  }
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId)
  }
  const handleDeleteLocation = (day, category, placeName) => {
    setPlan((prevState) => {
      const updatedPlaces = prevState.selectedPlaces
        .map((location) => {
          if (location.day === day) {
            return {
              ...location,
              place: location.place.filter(
                (place) =>
                  !(place.category === category && place.name === placeName)
              ),
            };
          }
          return location;
        })
        .filter((location) => location.place.length > 0); // Remove day if no places left

      return { ...prevState, selectedPlaces: updatedPlaces };
    });
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
      setSelectedDay(index); // Set the selected item to the new one
    }
  };
  const groupPlacesByCategory = (places, selectedDay) => {
    const grouped = {};

    places
      .filter((item) => item.day === selectedDay)
      .flatMap((item) => item.place)
      .forEach((place) => {
        if (!grouped[place.category]) {
          grouped[place.category] = [];
        }
        grouped[place.category].push(place);
      });

    return grouped;
  };
  
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
            {days.length ? (
              days.map((day, index) => (
                <row style={{ display: "flex", flexDirection: "row" }}>
                  <ListItemButton
                    key={index}
                    selected={selectedDay === index + 1}
                    onClick={(event) => handleListItemClick(event, index +1)}
                    style={{ height: "40px", textAlign: "center" }}
                  >
                    <ListItemText primary={` ${index + 1}. day`} />
                  </ListItemButton>
                  <IconButton onClick={(e) => handlePopover(e, index + 1)}>
                    <IoMdArrowDropright />
                  </IconButton>
                </row>
              ))
            ) : (
              <div>Please select date</div>
            )}
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
              {Object.entries(
                groupPlacesByCategory(plan.selectedPlaces, selectedDay)
              ).map(([category, places], index) => (
                <Accordion key={index} style={{ width: "100%" }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    id={`panel${index}-header`}
                    style={{ minHeight: "35px", backgroundColor: "thistle" }}
                  >
                    <div>{category}</div>
                  </AccordionSummary>
                  <AccordionDetails>
                    {places.map((place, placeIndex) => (
                      <div
                        key={placeIndex}
                        style={{
                          justifyContent: "space-between",
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "8px",
                        }}
                      >
                        <div style={{ margin: "3px" }}>
                          {placeIndex + 1}. {place.name}
                        </div>
                        <Button
                          style={{ alignContent: "end", justifyContent: "end" }}
                          onClick={() =>
                            handleDeleteLocation(
                              selectedDay,
                              category,
                              place.name
                            )
                          }
                        >
                          <MdDelete />
                        </Button>
                      </div>
                    ))}
                  </AccordionDetails>
                </Accordion>
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
                category={selectedCategory}
                day={selectedDay}
                date={date}
                selectedCity={selectedCity}
                addPlace={handleAddLocation}
                selectedLocations={plan}
                fullPageApi={fullpageApi}
              ></SelectMap>
               {!days.length && (
              <div className={styles.disabledOverlay}>
                <h2>Please select a date to enable the map</h2>
              </div>
            )}
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
                  alignItems:"center"
                }}
              >
                {categoriesConfig.map((category) => {
                  const Icon = category.icon;
                  return (
                      <Tooltip title={!days.length ? "Please select date first!" : category.id}>
                        <span>
                        <IconButton
                        key={category.id}
                        disabled={!days.length}
                        onClick={() => handleCategoryClick(category.id)}
                      >
                        <Icon
                          style={{
                            color:
                              selectedCategory === category.id
                                ? "blue"
                                : "black",
                          }}
                        />
                      </IconButton>
                        </span>
                     
                      </Tooltip>
                  );
                })}
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
