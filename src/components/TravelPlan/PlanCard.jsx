import React from "react";
import "./TravelPlan.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import Card from "react-bootstrap/Card";
function PlanCard({ header, place }) {
  const sliderSettings = {
    dots: true, // Show dots for navigation
    infinite: true, // Infinite loop
    speed: 500, // Transition speed
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
  };
  const allImages = Object.keys(place).flatMap((categoryKey) =>
    place[categoryKey].map((item) => item.photo)
  );
  return (
    <Card
      style={{
        marginBottom: "20px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        boxShadow: "none",
        backgroundColor: "floralwhite",
      }}
    >
      <div style={{ width: "200px", backgroundColor: "white" }}>
        <Slider {...sliderSettings}>
          {allImages.map((imgUrl, index) => (
            <div key={index} style={{ backgroundColor: "white" }}>
              <img
                src={imgUrl}
                alt={`place-${index}`}
                style={{
                  objectFit: "fill",
                  height: "200px",
                  width: "100%",
                  padding: "10px",
                  paddingBottom: "24px",
                }}
              />
            </div>
          ))}
        </Slider>
      </div>
      <div style={{ width: "340px" }}>
        <Card.Header className="cardHeader" as="h5">
          {header}
        </Card.Header>
        <Card.Body
          style={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <ul>
            {Object.keys(place).map((categoryKey) => (
              <li style={{ alignItems: "center" }}>
                <div
                  key={categoryKey}
                  style={{ marginBottom: "15px", padding: "0px" }}
                >
                  <Card.Text className="cardText">
                    <strong className="categoryText">
                      {categoryKey.toUpperCase()}:
                    </strong>{" "}
                    {place[categoryKey].map((item) => item.name).join(", ")}
                  </Card.Text>
                </div>
              </li>
            ))}
          </ul>
        </Card.Body>
      </div>
    </Card>
  );
}

export default PlanCard;
