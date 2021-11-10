import React, { useState, useEffect } from "react";
import MyResponsiveLine from "./MyResponsiveLine";
import data from "../data/mockData.json";
import data1 from "../data/mockData1.json";
import { getHistoricalData } from "../APIConnector";

const StockViewer = () => {
  getHistoricalData("AAPL", "2012-01-01", "2012-01-30");

  return (
    <div
      style={{
        height: "700px",
        width: "80%",
        margin: "auto",
        background: "#ffffff",
        boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
        padding: "40px 55px 45px 55px",
        borderRadius: "15px",
        transition: "all 0.3s",
      }}
    >
      <h3>Stock Viewer</h3>
      <MyResponsiveLine data={data1}></MyResponsiveLine>
    </div>
  );
};

export default StockViewer;
