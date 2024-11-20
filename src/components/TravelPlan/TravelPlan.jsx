import React, {useEffect} from "react";

import "./TravelPlan.css";
import { useDispatch, useSelector } from "react-redux";
import { setPlan } from "../../context/slices/planSlice";
import PlanCard from "./PlanCard";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import dayjs from "dayjs";

import { useRef } from "react";
const TravelPlan = ({ planData, captureImage, date }) => {
  // Styles for PDF
  const previewRef = useRef(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const selectedCity = useSelector((state) => state.city.value)
  const userData = useSelector((state) => state.auth.user)
  // Component to generate PDF

  
  const groupPlacesByDay = (places) => {
    return places.reduce((acc, place) => {
      if (!acc[place.day]) {
        acc[place.day] = [];
      }
      acc[place.day].push(place);
      return acc;
    }, {});
  };

  const groupPlacesByCategory = (places) => {
    return places.reduce((acc, place) => {
      if (!acc[place.category]) {
        acc[place.category] = [];
      }
      acc[place.category].push(place);
      return acc;
    }, {});
  };
  const handleImageGenerated = (imgData) => {
   captureImage(imgData)
  };

  useEffect(() => {
  
    const capturePreview = async () => {
      const canvas = await html2canvas(previewRef.current)
      const imgData = canvas.toDataURL("image/png")
      
      // Call the provided callback to update the plans with the generated image
      if (handleImageGenerated) {
        handleImageGenerated(imgData)
      }

    }
  
    capturePreview()
  }, [planData])
  const formattedDateRange = date.map(dateObj => dayjs(dateObj.$d).format('DD/MM/YYYY'))

  return (
    <div ref={previewRef} className="itinerary-container">

       <header className="itinerary-header">
      
        <div className="header-content">
          <div className="travelText">Travel</div>
           <div className="itineraryText">ITINERARY</div>
          <div className="cityText">{selectedCity.label}</div>
          <div className="cityText">{`${formattedDateRange[0]} - ${formattedDateRange[1]}`}</div>
        </div>
      </header>
      {planData.length > 0 && Object.values(groupPlacesByDay(planData)).map((plan, index) => (
 <PlanCard
 header={`Day ${index + 1}`}
 place={groupPlacesByCategory(plan)}
 date={date}
/>
      )
       
      )}
    </div>
  );
};
export default TravelPlan;
