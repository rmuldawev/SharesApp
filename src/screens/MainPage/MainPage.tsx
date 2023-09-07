import PageHeader from "../../components/PageHeader/PageHeader";
import StockTable from "../../components/StockTable/StockTable";
import React from "react";

const MainPage = () => {
  return (
    <>
      <div className="mainContainer">
        <PageHeader />
        <StockTable />
      </div>
    </>
  );
};

export default MainPage;
