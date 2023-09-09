import React from "react";
import { useAppSelector } from "../../store";
import { selectObj } from "../../store/sharesSlice";
import "../PageHeader/styles.css";
import ChartStocks from "../Chart/Chart";
import InfoItem from "../common/InfoItem";
import InfoTwoItem from "../common/InfoTwoItem";
import LatestPrice from "../common/LatestPrice";
import CompanyNameTitle from "../common/CompanyNameTitle";

const PageHeader = () => {
  const obj = useAppSelector(selectObj);
  const {
    companyName,
    symbol,
    marketCap,
    primaryExchange,
    latestPrice,
    change,
    changePercent,
    peRatio,
    previousVolume,
    iexOpen,
    week52High,
    week52Low,
  } = obj;

  const formatLargeNumber = (number: number) => {
    const suffixes = ["", "тыс.", "млн", "млрд", "трлн", "квадрлн"];

    let magnitude = 0;
    while (Math.abs(number) >= 1000) {
      magnitude++;
      number /= 1000;
    }

    return number.toFixed(2) + " " + suffixes[magnitude];
  };

  return (
    <div className="containerBox">
      <CompanyNameTitle
        companyName={companyName}
        symbol={symbol}
        primaryExchange={primaryExchange}
      />
      <div className="blackLine"></div>
      <div className="headerBox">
        <LatestPrice
          latestPrice={latestPrice}
          change={change}
          changePercent={changePercent}
        />
        <InfoItem item={previousVolume} name="Объём:" />
        <InfoItem item={peRatio} name="Цена/прибыль:" />
        <InfoItem
          item={formatLargeNumber(Number(marketCap))}
          name="Рыночная копитализация:"
        />
        <InfoTwoItem min={iexOpen} max={latestPrice} name="Диапазон за день:" />
        <InfoTwoItem min={week52Low} max={week52High} name="Диапазон за год:" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ChartStocks
            startName="Начало дня"
            endName="Конец дня"
            max={latestPrice && Number(latestPrice.toFixed(0)) + 50}
            min={100}
            title="Диапазон цен акций за день"
            start={iexOpen && iexOpen}
            end={latestPrice && latestPrice.toFixed(2)}
          />
          <ChartStocks
            startName="Начало года"
            endName="Конец года"
            max={week52High && Number(week52High.toFixed(0)) + 50}
            min={100}
            title="Диапазон цен акций за год"
            start={week52Low && week52Low}
            end={week52High && week52High}
          />
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
