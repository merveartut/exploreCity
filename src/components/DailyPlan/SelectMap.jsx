import React from "react";
import { useState } from "react";
import { MDBCard, MDBCardBody, MDBCardText, MDBBtn } from "mdb-react-ui-kit";
import { Map, Marker } from "@vis.gl/react-google-maps";
import { APIProvider } from "@vis.gl/react-google-maps";
import { InfoWindow } from "@vis.gl/react-google-maps";
import Modal from "../CustomModal/CustomModal";

import styles from "./DailyPlan.module.css";
function SelectMap({ title, day, addPlace, selectedLocations, fullPageApi }) {
  const [mapModalVisible, setMapModalVisible] = useState(false);
  const [markerLocation, setMarkerLocation] = useState({
    lat: 51.509865,
    lng: -0.118092,
  });
  const [selectedLocation, setSelectedLocation] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const [dialogLocation, setDialogLocation] = useState("");
  const [placeName, setPlaceName] = useState("");

  const handleMapClick = (mapProps) => {
    // checks if location clicked is valid

    fullPageApi.setAllowScrolling(false)
    if (mapProps.detail.placeId) {
      const lat = mapProps.detail.latLng.lat;
      const lng = mapProps.detail.latLng.lng;
      const map = mapProps.map;
      const placeId = mapProps.detail.placeId;
      setShowDialog(true);
      setDialogLocation({ lat, lng });
      setSelectedLocation({ lat, lng });
      if (window.google && window.google.maps && window.google.maps.places) {
        const service = new window.google.maps.places.PlacesService(map);

        const request = { placeId };

        service.getDetails(request, (place, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            console.log("Place name:", place.name);
            setPlaceName(place.name);
            const placePhoto =
              place.photos && place.photos[0]
                ? place.photos[0].getUrl({ maxWidth: 100 })
                : "";
            const placeRating = place.rating || "No rating available";
            console.log("Place photo URL:", placePhoto);
            console.log("Place rating:", placeRating);
          } else {
            console.error("PlacesService failed due to: " + status);
          }
        });
      } else {
        console.error("Google Maps PlacesService is not available.");
      }
    } else {
      // show alert message
      alert("Please select the specific location");
    }
  };
  const onAddLocation = () => {
    const geocoder = new window.google.maps.Geocoder();
    console.log(day)
    // Check if the day and title already have a location
    const existingLocation = selectedLocations.selectedPlaces.find(
      (loc) => loc.day === day && selectedLocations.title === title
    );

    if (existingLocation) {
      alert(
        `A location for day ${day} has already been added for the title "${title}".`
      );
      return;
    }

    geocoder.geocode({ location: selectedLocation }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          addPlace((prevState) => ({
            title: title, // Keep the title from props
            selectedPlaces: [
              ...prevState.selectedPlaces,
              {
                day: day, // Add the current day
                place: {
                  name: placeName || results[0].formatted_address,
                  location: selectedLocation,
                },
              },
            ],
          }));
          setShowDialog(false)
          fullPageApi.setAllowScrolling(true)
        }
      } else {
        console.error("Geocoder failed due to: " + status);
      }
    });
  };
  const handleMouseEnter = () => {
    if (fullPageApi) fullPageApi.setAllowScrolling(false);
  };

  const handleMouseLeave = () => {
    if (fullPageApi) fullPageApi.setAllowScrolling(true);
  }
  // deletes selected location from the list
  return (
    <div style={{ padding: "2px" }} onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}>
      <APIProvider apiKey={"AIzaSyCiuu-4GECMe7aBpKsXFI1J06lbn80FfbA"}>
        <div className={styles.mapContainer}>
          <Map
            style={{ height: "100%", width: "100%" }}
            defaultZoom={13}
            defaultCenter={markerLocation}
            gestureHandling={"greedy"}
            disableDefaultUI
            onClick={(mapProps) => handleMapClick(mapProps)}
          >
            {showDialog && (
              <InfoWindow position={dialogLocation}>
                <button className="app-button" onClick={() => onAddLocation()}>
                  Add this location
                </button>
              </InfoWindow>
            )}

            <Marker position={markerLocation} />
          </Map>
        </div>
      </APIProvider>
    </div>
  );
}

export default SelectMap;
