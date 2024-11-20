import React, { useEffect, useState } from "react";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import { Document, Page } from "@react-pdf/renderer";
import TravelPlan from "../TravelPlan/TravelPlan";
import { useLocation } from "react-router-dom";
import { Button, Card, Container } from "react-bootstrap";
import { Stack, IconButton, Toolbar } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineDone } from "react-icons/md";
import { setPlanId } from "../../context/slices/planSlice";

function PlanPage() {
  const location = useLocation();
  const { plan, date } = location.state || {};
  const userId = useSelector((state) => state.auth.user);
  const planId = useSelector((state) => state.plan.planId)
  const [planAdded, setPlanAdded] = useState(false)
  const [planImage, setPlanImage] = useState(null);
  const [userPlans, setUserPlans] = useState();
  const dispatch = useDispatch()
  const getUser = async () => {
    // Get user data from the fake API
    const { data } = await axios.get(
      `http://localhost:8080/api/auth/user/${userId}`
    );
    return data;
  };

  const handleAddPlan = async () => {
    try {
      if (!userId) {
        console.error("No user is logged in.");
        return;
      }
      const user = await getUser();

      if (user) {
       const { data } = await axios({
          method: "post",
          url: `http://localhost:8080/api/plan/add?userId=${userId}`,
          data: plan,
          headers: {
            "Content-Type": "application/json",
          },
        });
        dispatch(setPlanId(data))
        setUserPlans(user["plans"]);
        console.log("Plan successfully added to user:", user["firstName"]);
      }
    } catch (error) {
      console.error("Error adding plan to user:", error);
    }
  };
  useEffect(() => {
    const fetchPlanStatus = async () => {
      console.log("neeeeebuuuuuuu", planId)
      try {
        const { data } = await axios.get(`http://localhost:8080/api/plan/exists?userId=${userId}&planId=${planId}`);
        console.log("sonuç", data)
        setPlanAdded(data);  // Set the result directly
      } catch (error) {
        console.error("Error fetching plan status:", error);
        setPlanAdded(false);  // Handle error case, setting to false or handling error state
      }
    };
    // Call the async function
    if (planId) {
      fetchPlanStatus();
    }
  }, [plan])
  return (
    <div style={{ display: "flex" }}>
      <Toolbar
        style={{
          backgroundColor: "green",
          alignItems: "flex-start",
          padding: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Tooltip title={"ADD TO MY PLANS"}>
            <span>
              <IconButton
                onClick={() => handleAddPlan()}
                disabled= {planAdded ? true : false}
                style={{
                  width: "32px",
                  height: "32px",
                  margin: "0px",
                  padding: "4px",
                  backgroundColor: "white",
                  marginTop: "8px",
                }}
              >
                {!planAdded && <FaPlus />}
                {planAdded && <MdOutlineDone />}
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title={"GO BACK TO EDIT"}>
            <span>
              <IconButton
                style={{
                  width: "32px",
                  height: "32px",
                  margin: "0px",
                  padding: "4px",
                  backgroundColor: "white",
                  marginTop: "8px",
                }}
              >
                <MdEdit />
              </IconButton>
            </span>
          </Tooltip>
        </div>
      </Toolbar>

      <TravelPlan planData={plan} date={date} captureImage={setPlanImage} />
    </div>
  );
}

export default PlanPage;
