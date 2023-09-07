import React from "react";
import { useAppSelector } from "../../store";
import { selectData, selectObj } from "../../store/sharesSlice";
import "../PageHeader/styles.css";
import { ItemProps } from "../../types/stocks";

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
        <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
          <p>Объём:</p>
          <p className="avgTotal">{previousVolume && previousVolume}</p>
        </div>
        <div className="peRatio">
          <p>Цена/прибыль:</p>
          <p className="boldText">{peRatio && peRatio}</p>
        </div>
        <div className="marketCap">
          <p>Рыночная копитализация: </p>
          <p className="boldText">
            {marketCap && formatLargeNumber(Number(marketCap))}
          </p>
        </div>
        <div className="oneDay_oneYear">
          <p style={{ marginRight: "10px" }}>Диапазон за день:</p>
          <div className="oneYear">
            <p className="text">{iexOpen && iexOpen}</p>
            <div className="colon"> -</div>
            <p className="text">{latestPrice && latestPrice.toFixed(1)}</p>
          </div>
        </div>
        <div className="oneYear">
          <p>Диапазон за год:</p>
          <p className="text">{week52Low && week52Low}</p>
          <div className="colon">-</div>
          <p className="text">{week52High && week52High}</p>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
