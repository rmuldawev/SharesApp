import React from "react";
import { useAppSelector } from "../../store";
import { selectData, selectObj } from "../../store/sharesSlice";
import "../PageHeader/styles.css";
import ChartStocks from "../Chart/Chart";
import InfoItem from "../common/InfoItem";
import InfoTwoItem from "../common/InfoTwoItem";
import LatestPrice from "../common/LatestPrice";

const PageHeader = () => {
  const datas = useAppSelector(selectData);
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
      <div className="arrow"></div>
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
