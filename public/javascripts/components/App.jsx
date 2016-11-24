import React from "react";
import Grapher from "./Grapher";

export default function App () {
  return (
    <Grapher tickers={["AAPL"]} startDate={"20160505"} endDate={"20161111"}/>
  );
}
