import React, { FC } from "react";
import "../common/styles.css";

interface InfoTwoItem {
  min: number;
  max: number;
  name: string;
}

const InfoTwoItem: FC<InfoTwoItem> = ({ min, max, name }) => {
  return (
    <div className="oneDay_oneYear">
      <p className="infoItemText" style={{ marginRight: "10px" }}>
        {name}
      </p>
      <div className="oneYear">
        <p className="text">{min && min.toFixed(2)}</p>
        <div className="colon"> -</div>
        <p className="text">{max && max.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default InfoTwoItem;
