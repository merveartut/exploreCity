import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function PreviewCard({ planData }) {
    
    const navigate = useNavigate()
    const selectedCity = useSelector((state) => state.city.value)
    const groupPlacesByCategory = (places) => {
        return places.reduce((acc, place) => {
          if (!acc[place.category]) {
            acc[place.category] = [];
          }
          acc[place.category].push(place);
          return acc;
        }, {});
      };
    console.log(planData)
      return (
        <div className="preview-container">
        <header className="itinerary-header">
       
         <div className="header-content">
           <div className="travelText">Travel</div>
            <div className="itineraryText">ITINERARY</div>
           <div className="cityText">{selectedCity.label}</div>
         </div>
       </header>
      
     </div>
      );
}

export default PreviewCard