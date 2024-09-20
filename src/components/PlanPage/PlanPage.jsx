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
  const userData = useSelector((state) => state.auth.user)
  const [planImage, setPlanImage] = useState(null)
  const handleAddPlan = async () => {
    try {
      if (!userData) {
        console.error("No user is logged in.")
        return
      }
      // Get the user data from the fake API
      const response = await axios.get(`http://localhost:3000/users?email=${userData.email}`);
      const user = response.data[0] // Assuming you get the user object
      
      if (user) {
        const updatedPlan = {
          ...plan,
          image:planImage, // Add the image property to the plan
        }
        // Update the user's plans by appending the new plan
        const updatedPlans = [...(user.plans || []), updatedPlan] // Append the new plan

        // Send the PATCH request to update the user's plans
        await axios.patch(`http://localhost:3000/users/${user.id}`, {
          plans: updatedPlans
        })

        console.log("Plan successfully added to user:", user.firstName)
      }
    } catch (error) {
      console.error("Error adding plan to user:", error)
    }
  }
console.log("NOOOOOLU", plan)

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
          <Tooltip
            title={"ADD TO MY PLANS"}
          >
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
          <Tooltip
            title={"GO BACK TO EDIT"}
          >
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
