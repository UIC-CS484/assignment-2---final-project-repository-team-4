import React, { useState, useEffect } from "react";
import MyResponsiveLine from "./MyResponsiveLine";
import data from "../data/mockData.json";

const StockViewer = () => {
  return (
    <div style={{ height: "400px", width: "800px" }}>
      <h3>Stock Viewer</h3>
      <MyResponsiveLine data={data}></MyResponsiveLine>
    </div>
  );
};

export default StockViewer;
