import { FC } from "react";
import React from "react";

import "../common/styles.css";

interface LatestPriceProps {
  latestPrice: number;
  change: number;
  changePercent: number;
}

const LatestPrice: FC<LatestPriceProps> = ({
  latestPrice,
  change,
  changePercent,
}) => {
  return (
    <div className="changesContainer">
      <p className="latesPriceText">Курс закрытия:</p>
      <p className="latestPrice">{latestPrice && latestPrice.toFixed(2)}</p>
      <div
        className="changeBox"
        style={
          change && change > 0
            ? { backgroundColor: "lightGreen" }
            : { backgroundColor: "red" }
        }
      >
        <p className="change">{change && change}</p>
        <p>({changePercent && changePercent.toFixed(2)}%)</p>
      </div>
    </div>
  );
};

export default LatestPrice;
