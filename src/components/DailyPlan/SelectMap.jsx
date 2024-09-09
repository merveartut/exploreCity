import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { MDBCard, MDBCardBody, MDBCardText, MDBBtn } from "mdb-react-ui-kit";
import { Map, Marker, useApiIsLoaded } from "@vis.gl/react-google-maps";
import { APIProvider } from "@vis.gl/react-google-maps";
import { InfoWindow } from "@vis.gl/react-google-maps";
import Modal from "../CustomModal/CustomModal";

import styles from "./DailyPlan.module.css";
function SelectMap({
  selectedCity,
  category,
  day,
  addPlace,
  selectedLocations,
  fullPageApi,
}) {
  const [mapModalVisible, setMapModalVisible] = useState(false);
  const [markerLocation, setMarkerLocation] = useState({
    lat: 51.509865,
    lng: -0.118092,
  });
  const [selectedLocation, setSelectedLocation] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const [dialogLocation, setDialogLocation] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [cityCoordinates, setCityCoordinates] = useState(null);
  const mapRef = useRef(null);
  const geocodeCity = (cityName) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: cityName }, (results, status) => {
      if (status === "OK" && results[0]) {
        const location = results[0].geometry.location;
        setCityCoordinates({ lat: location.lat(), lng: location.lng() });
      } else {
        console.error(
          "Geocode was not successful for the following reason: " + status
        );
      }
    });
  };
  const handleMapClick = (mapProps) => {
    if (!mapRef.current) {
      mapRef.current = mapProps.map; // Store the map instance on first interaction
    }
    // checks if location clicked is valid

    fullPageApi.setAllowScrolling(false);
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
    // Check if the day and title already have a location
    const existingLocation = selectedLocations.selectedPlaces.find(
      (loc) => loc.day === day && loc.place.some((p) => p.category === category)
    );
    if (category === "hotel" && existingLocation) {
      alert(`A hotel for day ${day} has already been added.`);
      return;
    }

    geocoder.geocode({ location: selectedLocation }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          addPlace((prevState) => {
            const updatedPlaces = [...prevState.selectedPlaces];
            const dayIndex = updatedPlaces.findIndex((loc) => loc.day === day);

            if (dayIndex !== -1) {
              // Day exists, update the existing entry
              if (
                category === "hotel" &&
                updatedPlaces[dayIndex].place.some(
                  (p) => p.category === "hotel"
                )
              ) {
                alert(`A hotel for day ${day} has already been added.`);
                return;
              }
              updatedPlaces[dayIndex].place.push({
                category,
                name: placeName || results[0].formatted_address,
                location: selectedLocation,
              });
            } else {
              // Day does not exist, add a new entry
              updatedPlaces.push({
                day,
                place: [
                  {
                    category,
                    name: placeName || results[0].formatted_address,
                    location: selectedLocation,
                  },
                ],
              });
            }
            return { ...prevState, selectedPlaces: updatedPlaces };
          });
          setShowDialog(false);
          fullPageApi.setAllowScrolling(true);
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
  };

  useEffect(() => {
    geocodeCity(selectedCity);
  }, [selectedCity]);

  useEffect(() => {
    if (mapRef.current && cityCoordinates) {
      mapRef.current.map.setCenter(cityCoordinates); // Use setCenter method
      mapRef.current.map.setZoom(13); // Set zoom level as needed
    }
  }, [cityCoordinates]);
  const handleMapLoad = (map) => {
    mapRef.current = map; // Store the map instance when the map loads
  };
  return (
    <div
      style={{ padding: "2px" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <APIProvider
        apiKey={"AIzaSyCiuu-4GECMe7aBpKsXFI1J06lbn80FfbA"}
        onLoad={(e) => handleMapLoad(e)}
      >
        <div className={styles.mapContainer}>
          <Map
            style={{ height: "100%", width: "100%" }}
            defaultZoom={13}
            defaultCenter={markerLocation}
            gestureHandling={"greedy"}
            disableDefaultUI
            onIdle={handleMapLoad} // Capture the map instance here
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
