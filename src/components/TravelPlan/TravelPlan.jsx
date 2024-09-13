import React from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import "./TravelPlan.css";
import bgImage from "../../assets/header.jpg";
import hotelFigure from "../../assets/bed.png";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import figureConfig from "./FigureConfig";
const TravelPlan = ({ planData }) => {
  // Styles for PDF

  console.log("hgujgtujhg", planData);
  // Component to generate PDF

  // Styles for web view
  const groupPlacesByCategory = (places) => {
    return places.reduce((acc, place) => {
      if (!acc[place.category]) {
        acc[place.category] = [];
      }
      acc[place.category].push(place);
      return acc;
    }, {});
  };
  return (
    <div className="itinerary-container">
      {/* Header */}
      <header className="itinerary-header">
        <img src={bgImage} alt="Beach Party Header" className="header-image" />
        <div className="header-content">
          <h1>Travel Itinerary</h1>
          <p>August 2024</p>
        </div>
      </header>

      {/* Travel Plan Content */}
      {planData.map((day, index) => (
        <div key={index} className="day-container">
          <h2>Day {day.day} </h2>

          {Object.keys(groupPlacesByCategory(day.place)).map((category, i) => (
            <div
              key={i}
             className="category-group"
              style={{ display: "flex", flexDirection: "row" }}
            >
              {/* Render category image if available */}
              {figureConfig[category] && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "auto",
                  }}
                >
                  <div className="img-category">
                    {figureConfig[category].label}
                  </div>
                  <img
                    src={figureConfig[category].image}
                    alt={figureConfig[category].label}
                    className="category-photo"
                  />
                </div>
              )}
              <div className="places-container">
              { groupPlacesByCategory(day.place)[category].map((place, i) => (
                <div key={i} className="place-card">
                  <div className="place-info">
                    <h3 className="place-name">{place.name}</h3>
                    <p className="place-details">Rating: {place.rating}</p>
                    <a
                      href={`https://www.google.com/maps?q=${place.location.lat},${place.location.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on Map
                    </a>
                  </div>
                  <img
                    src={place.photo}
                    alt={place.name}
                    className="place-photo"
                  />
                </div>
              ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
export default TravelPlan;
