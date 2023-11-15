import React from "react";
import { FC } from "react";

interface CompanyNameTitleProps {
  companyName: string;
  symbol: string;
  primaryExchange: string;
}

const CompanyNameTitle: FC<CompanyNameTitleProps> = ({
  companyName,
  symbol,
  primaryExchange,
}) => {
  return (
    <div className="headerContainer">
      <div className="titleCompany">
        <p className="nameCompany">{companyName && companyName}</p>
        <p className="nameCompany">({symbol && symbol})</p>
      </div>
      <div className="nasdaqBox">
        <img
          src="https://i.pinimg.com/564x/ff/76/57/ff7657010677b3dbe75fe03c5de5a8d7.jpg"
          style={{ width: "25px", height: "17px" }}
        />
        <p className="nasdaq">{primaryExchange && primaryExchange}</p>
        <div style={{ flexDirection: "row", display: "flex" }}>
          <p>цена в</p>

          <p style={{ fontWeight: "bold", marginLeft: "3px" }}>USD</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyNameTitle;
