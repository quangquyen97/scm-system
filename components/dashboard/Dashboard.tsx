import Router from "next/router";
import React, { useEffect } from "react";
import Chartjs from "./chart.js/acquisition";

function Dashboard() {
  useEffect(() => {});
  return (
  
    <div className="relative">
      <Chartjs />
    </div>
    
  );
}

export default Dashboard;
