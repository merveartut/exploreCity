import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PreviewCard from "./PreviewCard";

function Profile() {
  const { userId } = useParams();
  const [userPlans, setUserPlans] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUserPlan = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/users/${userId}`
        );
        setUserPlans(response.data.plans);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserPlan();
  }, [userId]);
  console.log("bubububuubu", userPlans)
  return (
    <div className="profile-container">
      <h2>Your Travel Plans</h2>
        {userPlans && userPlans.map((plan) => (
            <img src={plan.image} style={{height:"300px", width:"250px"}}></img>
        ))}
    </div>
  );
}

export default Profile;
