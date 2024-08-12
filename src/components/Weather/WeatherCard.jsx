import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { getWeatherIcon } from "./weatherIcon";
function WeatherCard({ cityName, degree, description, day, wind }) {
  useEffect(() => {
    console.log(getWeatherIcon("Clear"));
  }, []);
  return (
    <MDBContainer className="h-100">
      <MDBCard
        style={{ color: "#4B515D", borderRadius: "35px", overflow: "auto" }}
      >
        <MDBCardBody className="p-4">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <MDBTypography tag="h6">{cityName}</MDBTypography>
            <MDBTypography tag="h6">{day}</MDBTypography>
          </div>

          <div className="d-flex flex-column text-center mt-5 mb-4">
            <MDBTypography
              tag="h6"
              className="display-4 mb-0 font-weight-bold"
              style={{ color: "#1C2331" }}
            >
              {" "}
              {degree} °C
            </MDBTypography>
            <span className="small" style={{ color: "#868B94" }}>
              {description}
            </span>
          </div>

          <div className="d-flex align-items-center">
            <div className="flex-grow-1" style={{ fontSize: "1rem" }}>
              <div>
                <MDBIcon fas icon="wind fa-fw" style={{ color: "#868B94" }} />{" "}
                <span className="ms-1"> {wind} km/h</span>
              </div>
            </div>
            <div>
              <img src={getWeatherIcon(description)} width="60px" />
            </div>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default WeatherCard;
