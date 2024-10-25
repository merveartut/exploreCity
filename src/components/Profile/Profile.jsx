import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PreviewCard from "./PreviewCard";
import PlanCard from "../TravelPlan/PlanCard";
import "./styles.css"

function Profile() {
  const { userId } = useParams();
  const [userPlans, setUserPlans] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUserPlan = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/auth/${userId}/plans`
        );
        console.log("nerde hoca planlar", response);
        setUserPlans(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserPlan();
  }, [userId]);
  const groupPlacesByPlanId = (data) => {
    return Object.values(
      data.reduce((acc, place) => {
        if (!acc[place.planId]) {
          acc[place.planId] = [];
        }
        acc[place.planId].push(place);
        return acc;
      }, {})
    );
  };
  return (
    <div className="profile-container">
    <h2>Your Travel Plans</h2>
    <div className="grid-container">
      {userPlans &&
        groupPlacesByPlanId(userPlans).map((plan, index) => (
          <PlanCard key={index} header="Your Itinerary" place={plan} />
        ))}
    </div>
  </div>
  );
}

export default Profile;
