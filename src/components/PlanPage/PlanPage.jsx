import React, { useState } from "react";
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
import { useSelector } from "react-redux";

function PlanPage() {
  const location = useLocation()
  const { plan } = location.state || {}
  const userId = useSelector((state) => state.auth.user)
  const [planImage, setPlanImage] = useState(null)
  const [userPlans, setUserPlans] = useState()
  const getUser = async () => {
    // Get user data from the fake API
    const { data } = await axios.get(
      `http://localhost:8080/api/auth/user/${userId}`
    )
    console.log(data, "bueneeeeeeeeeeeeeeeeeeeeeeeeeeee")
    return data
  }

  const handleAddPlan = async () => {
    try {
      if (!userId) {
        console.error("No user is logged in.")
        return
      }
      const user = await getUser()

        if (user) {
          const updatedPlan = {
            ...plan,
            image: planImage, // Add the image property to the plan
          }
          console.log("USEEEEEEEEEEEER", user)
          await axios({
            method: "post",
            url: "http://localhost:8080/api/plan/add",
            data: plan,
            headers: {
              "Content-Type": "application/json",
            },
          })
  
          setUserPlans(user.plans)
          console.log("Plan successfully added to user:", user.firstName)
        }
       
    } catch (error) {
      console.error("Error adding plan to user:", error)
    }
  };
  const isPlanAdded = () => {}
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
                style={{
                  width: "32px",
                  height: "32px",
                  margin: "0px",
                  padding: "4px",
                  backgroundColor: "white",
                  marginTop: "8px",
                }}
              >
                <FaPlus />
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

      <TravelPlan planData={plan?.selectedPlaces} captureImage={setPlanImage} />
    </div>
  );
}

export default PlanPage;
