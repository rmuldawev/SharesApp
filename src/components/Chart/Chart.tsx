import React, { FC } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import "../Chart/styles.css";
import { StockPriceChart } from "../../types/charts";

const ChartStocks: FC<StockPriceChart> = ({
  title,
  start,
  end,
  max,
  min,
  startName,
  endName,
}) => {
  const data = [
    { name: startName, price: start },
    { name: endName, price: end },
  ];
  return (
    <div className="chartsContainer">
      <h2 className="chartTitle">{title}</h2>
      <LineChart width={400} height={200} data={data}>
        <XAxis dataKey="name" />
        <YAxis
          domain={[min, max]}
          tick={{ fontSize: 12, fill: "black", fontWeight: 700 }}
        />
        <CartesianGrid stroke="#000000" />
        <Line type="monotone" dataKey="price" stroke="red" />
        <Tooltip />
      </LineChart>
    </div>
  );
};

export default ChartStocks;
