import React from "react";
import StockTable from "./screens/Home/StockTable";
import PageHeader from "./components/PageHeader/PageHeader";

const Main = () => {
  return (
    <div className="mainContainer">
      <PageHeader />
      <StockTable />
    </div>
  );
};

export default Main;
