import React, { useState, useEffect } from "react";
import MyResponsiveLine from "./MyResponsiveLine";
import data from "../data/mockData.json";

const StockViewer = () => {
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
      <MyResponsiveLine data={data}></MyResponsiveLine>
    </div>
  );
};

export default StockViewer;
