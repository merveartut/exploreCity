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
  const groupPlacesByCategory = (places) => {
    return places.reduce((acc, place) => {
      const { category } = place;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(place); // Add the place to its category array
      return acc;
    }, {});
  };
  const transformedPlaces = groupPlacesByCategory(place);
  Object.keys(transformedPlaces).map((place) => console.log(place));
  const allImages = Object.keys(transformedPlaces).flatMap((categoryKey) =>
    transformedPlaces[categoryKey].map((item) => ({
      photo: item.photo, // URL of the photo
      name: item.name, // Name of the item
    }))
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
        padding: "30px",
        width: "600px",
      }}
    >
      <div style={{ width: "200px", backgroundColor: "white" }}>
        <Slider {...sliderSettings}>
          {allImages.map((img, index) => (
            <div key={index} style={{ backgroundColor: "white" }}>
              <img
                src={img.photo} // Use img.photo for the image URL
                alt={img.name} // Use img.name for the alt text
                style={{
                  objectFit: "fill",
                  height: "200px",
                  width: "100%",
                  padding: "10px",
                  paddingBottom: "14px",
                }}
              />
              {/* Display the name of the item below the image */}
              <div
                style={{
                  textAlign: "center",
                  paddingBottom: "10px",
                  fontSize: "10px",
                }}
              >
                {img.name}
              </div>
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
            {Object.keys(transformedPlaces).map((categoryKey) => (
              <li key={categoryKey} style={{ alignItems: "center" }}>
                <div style={{ marginBottom: "15px", padding: "0px" }}>
                  <Card.Text className="cardText">
                    <strong className="categoryText">
                      {categoryKey.toUpperCase()}:
                    </strong>{" "}
                    {transformedPlaces[categoryKey]
                      .map((item) => item.name)
                      .join(", ")}
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
