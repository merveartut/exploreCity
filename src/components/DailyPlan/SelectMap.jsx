import React, { useEffect } from "react"
import { useState, useRef } from "react"
import { Map, Marker, useApiIsLoaded } from "@vis.gl/react-google-maps"
import { APIProvider } from "@vis.gl/react-google-maps"
import { InfoWindow } from "@vis.gl/react-google-maps"
import { useDispatch, useSelector } from "react-redux"
import { setCity } from "../../context/slices/citySlice"
import { FaCheckCircle } from 'react-icons/fa'

import styles from "./DailyPlan.module.css"
import { IconButton } from "@mui/material"
function SelectMap({
  selectedCity,
  category,
  day,
  date,
  addPlace,
  selectedLocations,
  fullPageApi,
}) {
  const [selectedLocation, setSelectedLocation] = useState({
    location: {},
    placeId: "",
    map: null,
  });
  const [showDialog, setShowDialog] = useState(false);
  const [dialogLocation, setDialogLocation] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [cityCoordinates, setCityCoordinates] = useState(null);
  const infoWindowRef = useRef(null)
  const [placeDetails, setPlaceDetails] = useState({ photo: "", rating: "" });
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const city = useSelector((state) => state.city.value);
  
  const geocodeCity = (cityName) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: cityName }, (results, status) => {
      if (status === "OK" && results[0]) {
        const location = results[0].geometry.location;
        dispatch(
          setCity({
            label: selectedCity,
            value: selectedCity,
            coord: { lat: location.lat(), lng: location.lng() },
          })
        );
        setCityCoordinates({ lat: location.lat(), lng: location.lng() });
      } else {
        console.error(
          "Geocode was not successful for the following reason: " + status
        );
      }
    });
  };
  const [markerLocation, setMarkerLocation] = useState(city.coord);
  const handleMapClick = (mapProps) => {
    setShowDialog(false)
    if (!mapRef.current) {
      console.error("Map reference is not initialized.");
      return;
    }
  
    fullPageApi.setAllowScrolling(false);
    setShowDialog(true);
    
    const placeId = mapProps.detail.placeId
    if (placeId) {
      const lat = mapProps.detail.latLng.lat
      const lng = mapProps.detail.latLng.lng
      const map = mapRef.current.map // Use mapRef.current.map
  
      const service = new window.google.maps.places.PlacesService(map)
      const request = { placeId }
  
      service.getDetails(request, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setPlaceName(place.name)
          const placePhoto =
            place.photos && place.photos[0]
              ? place.photos[0].getUrl({ maxWidth: 100 })
              : "";
          const placeRating = place.rating || "No rating available"
          setPlaceDetails({ photo: placePhoto, rating: placeRating })
        } else {
          console.error("PlacesService failed due to: " + status)
        }
      });
  
      setDialogLocation({ lat, lng })
      setSelectedLocation({
        location: { lat, lng },
        placeId: placeId,
        map: map, // Set map to the current instance
      });
    } else {
      alert("Please select the specific location")
    }
  };
  const toggleLocation = () => {
    if (!selectedLocation.location.lat || !selectedLocation.location.lng) {
      alert("Location is not selected.")
      return;
    }

    addPlace((prevState) => {
      const updatedPlaces = [...prevState.selectedPlaces]
      const dayIndex = updatedPlaces.findIndex(
       
        (loc) =>  {
         return loc.day === day
        }
      )
      if (dayIndex !== -1) {
        const locationIndex = updatedPlaces[dayIndex].place.findIndex(
          (p) => p.location.lat === selectedLocation.location.lat && p.location.lng === selectedLocation.location.lng
        )

        if (locationIndex !== -1) {
          // Remove location
          updatedPlaces[dayIndex].place.splice(locationIndex, 1)

          // If no more locations for that day, remove day entry
          if (updatedPlaces[dayIndex].place.length === 0) {
            updatedPlaces.splice(dayIndex, 1)
          }
        } else {
          // Add location
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
            name: placeName || "Unknown Place", // Adjust default name
            location: selectedLocation.location,
            photo: placeDetails.photo,
            rating: placeDetails.rating,
          });
        }
      } else {
        // Day does not exist, add a new entry
        updatedPlaces.push({
          day,
          place: [
            {
              category,
              name: placeName || "Unknown Place", // Adjust default name
              location: selectedLocation.location,
              photo: placeDetails.photo,
              rating: placeDetails.rating,
            },
          ],
        });
      }
      return { ...prevState, selectedPlaces: updatedPlaces };
    });
    fullPageApi.setAllowScrolling(true);
  }
  const isLocationAdded = (location) => {

    return selectedLocations.selectedPlaces.some(
      (place) =>
        place.day === day &&
        place.place.some((p) => p.name === placeName)
    )
  }
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
  const handleClickOutside = (event) => {
    if (infoWindowRef.current && !infoWindowRef.current.contains(event.target)) {
      // Check if the clicked target is a scroll bar or the scrollable content
      if (!event.target.closest(".gm-style-iw") && !event.target.closest(`.${styles.infoWindow}`)) {
        setShowDialog(false);
      }
    }
  }
  useEffect(() => {
    if (showDialog) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDialog])
  const handleMapLoad = (map) => {
    mapRef.current = map; // Store the map instance when the map loads
  }
  console.log("jjjjjjjjjjjj", date)
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
                <InfoWindow 
                headerContent={placeName}
                position={dialogLocation} 
                className={styles.infoWindow}  
                onClose={() => setShowDialog(false)}
                style={{height:"auto", overflow:"visible"}}
                >
                  <div ref={infoWindowRef} className={styles.infoWindow}>
                  <img src={placeDetails.photo}></img>
                  <div className={styles.ratingText}>{placeDetails.rating}</div>
                  
                  {isLocationAdded(cityCoordinates) ? (
                    
                  <IconButton onClick={toggleLocation}>
                    <FaCheckCircle style={{color:"seagreen"}}/>
                  </IconButton>
                ) : (
                  <button className={styles.addButton} onClick={toggleLocation}>
                    Add this location
                  </button>
                )}
                  </div>
                
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
