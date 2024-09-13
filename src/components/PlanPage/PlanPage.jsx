import React, { useState } from 'react';
import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
import { Document, Page } from '@react-pdf/renderer';
import TravelPlan from '../TravelPlan/TravelPlan';
import { useLocation } from 'react-router-dom';

function PlanPage() {
  const location = useLocation();
  const { plan } = location.state || {};
  console.log(plan)

  return (
    <div>
      <h1>Travel Plan</h1>
      <TravelPlan planData={plan.selectedPlaces} />
    </div>
  );
}

export default PlanPage;
