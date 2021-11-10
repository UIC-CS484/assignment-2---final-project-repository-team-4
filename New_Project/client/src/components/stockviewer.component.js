import React, { useState, useEffect } from "react";
import MyResponsiveLine from "./MyResponsiveLine";
// import data from "../data/mockData.json";
import data1 from "../data/mockData1.json";
import { getHistoricalData } from "../APIConnector";
var yahooFinance = require("yahoo-finance");

const StockViewer = () => {
  const [data, setData] = useState(null);
  // const [state, setState] = React.useState(false);

  // useEffect(() => {
  //   const getData = () => {
  //     return getHistoricalData("AAPL", "2012-01-01", "2012-01-30");
  //   };
  //   const fetchData = async () => {
  //     const API_DATA = await getData();
  //     console.log("Async Marker");
  //     console.log(API_DATA);
  //     setData(formatData(API_DATA));
  //   };
  //   fetchData();
  // }, [data]);

  // const formatData = (data) => {
  //   console.log(data);
  //   setData(data);
  // };

    useEffect(() => {
      yahooFinance
      .historical({
        symbol: "AAPL",
        from: "2012-01-01",
        to: "2012-01-30",
        period: "d",
      })
      .then(function (quotes) {
        if (quotes[0]) {
          console.log(`successfully retrieved ${quotes.length} results`);
          setData(formatData(quotes))
        } else {
          console.log("N/A");
          setData("IDK")
        }
      });
  }, [data]);

  const formatData = (data) => {
    console.log(data);
    setData(data);
  };
  
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
      {data !== null ? (
        <MyResponsiveLine data={data1}></MyResponsiveLine>
      ) : (
        "Loading"
      )}
      {/* <MyResponsiveLine data={data1}></MyResponsiveLine> */}
    </div>
  );
};

export default StockViewer;
